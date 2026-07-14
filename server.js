const express = require("express");
const path = require("path");
const compression = require("compression");
const WebSocket = require("ws");
const http = require("http");

const app = express();
const port = process.env.PORT || 3100;
const publicDir = path.join(__dirname, "public");

// Request logging (registered first so static asset requests are logged too)
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

app.use(compression());
app.use(
    express.static(publicDir, {
        maxAge: "1d",
        setHeaders: (res, filePath) => {
            if (filePath.endsWith(".html")) {
                // The entry point must always revalidate so app updates roll out.
                res.setHeader("Cache-Control", "no-cache");
            } else if (filePath.startsWith(path.join(publicDir, "assets"))) {
                // Versioned assets (requested with ?v=...) can be cached aggressively.
                res.setHeader("Cache-Control", "public, max-age=604800, immutable");
            }
        },
    })
);
app.use(express.json());

const server = http.createServer(app);

const wss = new WebSocket.Server({
    server,
    path: "/license",
});

wss.on("connection", (ws, req) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const lang = url.searchParams.get("lang");

    console.log(`🟢 WebSocket connected with lang=${lang} from ${req.headers.origin}`);

    ws.on("message", (message) => {
        try {
            const parsed = JSON.parse(message.toString());
            if (parsed.name === "ping") {
                ws.send(JSON.stringify({ name: "pong" }));
            } else {
                console.log("📩 Unhandled message:", parsed);
            }
        } catch (e) {
            console.warn("❌ Invalid JSON received:", message.toString());
        }
    });

    ws.on("close", () => {
        console.log("🔌 WebSocket closed");
    });
});

app.get("/connection/test", (req, res) => {
    res.send("OK");
});

app.get("/maintenance/status", (req, res) => {
    res.json({ cloud: false, clientAllowed: true });
});

app.get("/user/settings", (req, res) => {
    return res.json({
        notifications_disabled: false,
        trialDays: 15,
        quotas: { free: null, pro: null },
        subscription: {
            annual: { productId: null, coupon: "Trial20" },
            extraParameters: { "x-at": null, "x-clickref": null },
        },
        license: { offlineExpirationTime: 1296000000, offlineCountdown: 604800000 },
        reminders: {
            offlineWarning: 86400000,
            proOfferInFree: 1296000000,
            proOfferInTrial: 432000000,
            proOfferInTrialExpired: 1296000000,
            proOfferInTrialExpireSoon: 86400000,
            proOfferInTrialLastWarning: 0,
            proOfferSpecialPrice: 0,
            proExpireSoon: 2592000000,
        },
        flags: {
            welcomeMessage: false,
            windowsStoreAnnouncement: false,
            proOfferSpecialPrice: false,
            proOfferInTrialExpireSoon: true,
            proOfferInTrialLastWarning: true,
        },
    });
});

const SUPPORTED_LOCALES = [
    "de-de",
    "en",
    "zh-cn",
    "pt-br",
    "es-es",
    "fr-fr",
    "pl-pl",
    "ru-ru",
    "tr-tr",
    "cs-cz",
    "zh-tw",
    "it-it",
    "ja-jp",
    "nl-nl",
    "sv-se",
];

app.put("/user", (req, res) => {
    const { locale } = req.body ?? {};

    const normalized = locale?.toLowerCase();
    const languageCode = SUPPORTED_LOCALES.includes(normalized) ? normalized : "en";

    return res.json({
        id: "12345678",
        name: "PlasmaTrap User",
        locale: languageCode,
        email: "example@example.net",
        version: "3.15.0",
        runtime: "Browser",
        settings: {
            notifications_disabled: false,
        },
    });
});

app.get("/user", (req, res) => {
    const { lang } = req.query;

    const languages = {
        0: "de-DE",
        1: "en",
        2: "zh-CN",
        3: "pt-BR",
        4: "es-ES",
        5: "fr-FR",
        6: "pl-PL",
        7: "ru-RU",
        8: "tr-TR",
        9: "cs-CZ",
        10: "zh-TW",
        11: "it-IT",
        12: "ja-JP",
        13: "nl-NL",
        14: "sv-SE",
    };

    const languageCode = languages[lang] || "en";

    return res.json({
        id: "12345678",
        email: "example@example.net",
        email_verified: true,
        email_expire: null,
        login: null,
        name: "Placeholder User",
        avatar: "https://s3.plasmatrap.com/plasmatrap/8482ae21-71f2-4324-8e3e-5fdc5be66d4d.gif",
        admin: null,
        flash: null,
        last_seen: "2025-06-14T09:28:26.899Z",
        app: "designer",
        last_update: "2025-06-13T15:08:43.989Z",
        stats: {},
        address: "",
        city: "",
        zip: "",
        state: "",
        country: "",
        trial_created: "2021-09-22T19:58:35.018Z",
        trial_expire: "2026-10-07T19:58:35.018Z",
        pro_created: null,
        pro_expire: null,
        created: "2021-09-22T19:58:32.748Z",
        last_name: "PlasmaTrap",
        settings: {
            flags: {
                welcomeMessage: false,
                proOfferSpecialPrice: true,
                windowsStoreAnnouncement: false,
                proOfferInTrialExpireSoon: true,
                proOfferInTrialLastWarning: true,
            },
            quotas: {
                pro: null,
                free: null,
            },
            license: {},
            reminders: {},
            trialDays: 15,
            subscription: {
                annual: {
                    coupon: "Trial20",
                    productId: null,
                },
                extraParameters: {
                    "x-at": null,
                    "x-clickref": null,
                },
            },
            notifications_disabled: false,
        },
        runtime: "Browser",
        locale: languageCode,
        user_type: "normal",
        deactivated: false,
        legacy: false,
        guest_created: null,
        guest_expire: null,
        version: "3.15.0",
    });
});

// Error handler: return JSON instead of the default HTML error page.
app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    const status = err.status || err.statusCode || 500;
    if (status >= 500) {
        console.error(err);
    }
    res.status(status).json({ error: err.message || "Internal Server Error" });
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

const shutdown = () => {
    console.log("Shutting down...");
    wss.clients.forEach((ws) => ws.close(1001, "Server shutting down"));
    server.close(() => process.exit(0));
    setTimeout(() => process.exit(0), 3000).unref();
};

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);

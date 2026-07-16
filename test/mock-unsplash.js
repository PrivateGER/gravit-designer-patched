// Minimal stand-in for api.unsplash.com, used by test/smoke.js to exercise
// the Unsplash proxy in server.js without a real API key or network access.
// Photo/search payloads mirror the fields the proxy reads; /img/* serves a
// 1x1 PNG (the real Unsplash image CDN requires no auth either).
// Usage: node test/mock-unsplash.js [port]
const http = require("http");

const PORT = parseInt(process.argv[2], 10) || 3290;
const BASE = `http://localhost:${PORT}`;

const PNG = Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==", "base64");

function photo(i) {
    return {
        id: `mockphoto${i}`,
        width: 400 + (i % 3) * 100,
        height: 300 + (i % 4) * 80,
        urls: {
            thumb: `${BASE}/img/${i}.png`,
            small: `${BASE}/img/${i}.png`,
            regular: `${BASE}/img/${i}.png`,
            full: `${BASE}/img/${i}.png`,
        },
        user: { name: `Mock Photographer ${i}`, links: { html: `https://unsplash.com/@mock${i}` } },
        links: { download_location: `${BASE}/dl/${i}` },
    };
}

let downloadsReported = 0;

http.createServer((req, res) => {
    const url = new URL(req.url, BASE);
    const json = (status, body) => {
        res.writeHead(status, { "content-type": "application/json" });
        res.end(JSON.stringify(body));
    };
    if (url.pathname.startsWith("/img/")) {
        res.writeHead(200, { "content-type": "image/png", "access-control-allow-origin": "*" });
        return res.end(PNG);
    }
    if (url.pathname === "/__downloads") return json(200, { downloadsReported });
    if (!(req.headers.authorization || "").startsWith("Client-ID ")) return json(401, { errors: ["OAuth error"] });
    if (url.pathname === "/photos")
        return json(
            200,
            Array.from({ length: 12 }, (_, i) => photo(i))
        );
    if (url.pathname === "/search/photos")
        return json(200, { total: 3, total_pages: 1, results: Array.from({ length: 3 }, (_, i) => photo(100 + i)) });
    const m = url.pathname.match(/^\/photos\/mockphoto(\d+)$/);
    if (m) return json(200, photo(parseInt(m[1], 10)));
    if (url.pathname.startsWith("/dl/")) {
        downloadsReported++;
        return json(200, { url: `${BASE}/img/dl.png` });
    }
    json(404, { errors: ["not found"] });
}).listen(PORT, () => console.log(`mock unsplash listening on :${PORT}`));

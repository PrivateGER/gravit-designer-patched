// Pre-compress the large text assets in public/ so the server can send
// static .br/.gz variants instead of re-compressing multi-megabyte bundles
// on every request. Run at image build time (see Dockerfile); output files
// are gitignored.
const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

const publicDir = path.join(__dirname, "..", "public");
const MIN_SIZE = 16 * 1024; // skip tiny files, compression framing isn't worth it

const targets = fs
    .readdirSync(publicDir)
    .filter((f) => /\.(js|css)$/.test(f))
    .map((f) => path.join(publicDir, f))
    .filter((f) => fs.statSync(f).isFile() && fs.statSync(f).size >= MIN_SIZE);

for (const file of targets) {
    const source = fs.readFileSync(file);
    const brotli = zlib.brotliCompressSync(source, {
        params: {
            [zlib.constants.BROTLI_PARAM_QUALITY]: 10,
            [zlib.constants.BROTLI_PARAM_SIZE_HINT]: source.length,
        },
    });
    fs.writeFileSync(file + ".br", brotli);
    const gzip = zlib.gzipSync(source, { level: 9 });
    fs.writeFileSync(file + ".gz", gzip);
    console.log(
        `${path.basename(file)}: ${(source.length / 1024 / 1024).toFixed(1)}MB -> br ${(brotli.length / 1024 / 1024).toFixed(1)}MB, gz ${(gzip.length / 1024 / 1024).toFixed(1)}MB`
    );
}

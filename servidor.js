/* Servidorzinho local pro jogo — necessário só pro MICROFONE funcionar.
   O Chrome/Edge nega o mic em arquivos abertos por duplo clique (file://).
   Rodando em http://127.0.0.1:8123 o navegador mostra o pedido de permissão. */
const http = require("http"), fs = require("fs"), path = require("path");
const PORT = 8123, ROOT = __dirname;
const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json",
  ".png": "image/png", ".jpg": "image/jpeg", ".ico": "image/x-icon"
};
const srv = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split("?")[0]);
  if (p === "/") p = "/index.html";
  const f = path.normalize(path.join(ROOT, p));
  if (!f.startsWith(ROOT)) { res.writeHead(403); return res.end(); }
  fs.readFile(f, (e, d) => {
    if (e) { res.writeHead(404); return res.end("404"); }
    res.writeHead(200, { "Content-Type": MIME[path.extname(f).toLowerCase()] || "application/octet-stream", "Cache-Control": "no-store" });
    res.end(d);
  });
});
srv.on("error", e => {
  if (e.code === "EADDRINUSE") { console.log("O jogo ja estava aberto em http://127.0.0.1:" + PORT + " — otimo!"); process.exit(0); }
  throw e;
});
srv.listen(PORT, "127.0.0.1", () => {
  console.log("Jogo rodando em http://127.0.0.1:" + PORT);
  console.log("Deixe esta janela aberta enquanto joga. Pode minimizar!");
});

// Run after pnpm build and a local Wrangler preview on port 8787.
// Holds About page data to reproduce a click before prefetch completes.
// GET /__test/release resumes responses; /__test/reset?mode=all also holds the route tree.
import http from "node:http"

let held = []
let blocked = true
let mode = "page"
const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, "http://localhost:8790")
  if (url.pathname === "/__test/reset") {
    for (const release of held) release()
    held = []
    blocked = true
    mode = url.searchParams.get("mode") ?? "page"
    res.end("reset")
    return
  }
  if (url.pathname === "/__test/release") {
    blocked = false
    for (const release of held) release()
    held = []
    res.end("released")
    return
  }
  if (
    blocked &&
    url.pathname.startsWith("/about") &&
    url.pathname.endsWith(".txt") &&
    (mode === "all" || url.pathname.includes("__PAGE__") || url.pathname === "/about.txt")
  ) {
    console.log("Waiting for next page:", url.pathname)
    await new Promise((resolve) => held.push(resolve))
  }
  try {
    const upstream = await fetch(`http://localhost:8787${req.url}`, {
      method: req.method,
      redirect: "manual",
    })
    res.statusCode = upstream.status
    for (const [key, value] of upstream.headers) {
      if (!["content-encoding", "content-length", "transfer-encoding", "connection"].includes(key))
        res.setHeader(key, value)
    }
    res.setHeader("cache-control", "no-store")
    res.end(Buffer.from(await upstream.arrayBuffer()))
  } catch {
    res.statusCode = 502
    res.end("Test origin unavailable")
  }
})
server.listen(8790, "127.0.0.1", () =>
  console.log(
    "Navigation test: http://127.0.0.1:8790 (about route data held until /__test/release)",
  ),
)

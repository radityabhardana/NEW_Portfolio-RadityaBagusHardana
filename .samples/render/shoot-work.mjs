// Expects `vite preview` on localhost:4173. Drives headless Chrome over CDP
// (node's built-in WebSocket) and screenshots the pinned Work section at its reel end.
import { spawn } from "node:child_process";
import { writeFileSync } from "node:fs";
import { setTimeout as sleep } from "node:timers/promises";

const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const PORT = 9333;
const BASE = "http://localhost:4173/";
const OUT = new URL("../../", import.meta.url).pathname.replace(/^\//, "").replace(/%20/g, " ");

const chrome = spawn(CHROME, [
  "--headless=new", "--disable-gpu", "--hide-scrollbars",
  `--remote-debugging-port=${PORT}`,
  "--user-data-dir=C:\\Users\\rexna\\AppData\\Local\\Temp\\opencode\\cdp\\profile",
  "--no-first-run", "--no-default-browser-check", "--window-size=1440,900", "about:blank",
], { stdio: "ignore" });

async function waitPort() {
  for (let i = 0; i < 60; i++) {
    try { if ((await fetch(`http://127.0.0.1:${PORT}/json/version`)).ok) return; } catch {}
    await sleep(250);
  }
  throw new Error("chrome devtools port never opened");
}

function cdp(ws) {
  let id = 0;
  const pending = new Map();
  const events = new Map();
  ws.onmessage = (e) => {
    const m = JSON.parse(e.data);
    if (m.id && pending.has(m.id)) {
      const p = pending.get(m.id); pending.delete(m.id);
      m.error ? p.reject(new Error(m.error.message)) : p.resolve(m.result);
    } else if (m.method && events.has(m.method)) {
      events.get(m.method).forEach((fn) => fn(m.params)); events.delete(m.method);
    }
  };
  return {
    send: (method, params = {}) => new Promise((res, rej) => {
      const mid = ++id; pending.set(mid, { resolve: res, reject: rej });
      ws.send(JSON.stringify({ id: mid, method, params }));
    }),
    once: (method) => new Promise((res) => {
      if (!events.has(method)) events.set(method, []);
      events.get(method).push(res);
    }),
  };
}

async function shoot(width, height, file) {
  const target = await (await fetch(`http://127.0.0.1:${PORT}/json/new?about:blank`, { method: "PUT" })).json();
  const ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((r) => (ws.onopen = r));
  const { send, once } = cdp(ws);

  await send("Page.enable");
  await send("Runtime.enable");
  await send("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: 1, mobile: false });

  const loaded = once("Page.loadEventFired");
  await send("Page.navigate", { url: BASE });
  await loaded;
  await sleep(3000); // fonts, images, first ScrollTrigger pass

  const ev = async (expr) => (await send("Runtime.evaluate", { expression: expr, returnByValue: true, awaitPromise: true })).result.value;
  const scrollTo = (y) => ev(`window.scrollTo(0, ${y}); 'ok'`);
  const state = () => ev(`(() => {
    const s = document.querySelector('#work');
    const f = document.querySelector('.work-flex');
    const t = getComputedStyle(f).transform;
    const x = t.startsWith('matrix') ? Math.round(+t.split(',')[4]) : 0;
    return { top: Math.round(s.getBoundingClientRect().top), reelX: x };
  })()`);

  const metrics = await ev(`(() => {
    const boxes = [...document.querySelectorAll('.work-flex .work-box')];
    const last = boxes[boxes.length - 1];
    const more = document.querySelector('.work-box-more');
    const r = more.getBoundingClientRect();
    return {
      boxes: boxes.length,
      scrollAmount: Math.max(0, last.offsetLeft + last.offsetWidth - innerWidth + 120),
      moreW: Math.round(r.width),
    };
  })()`);

  // ScrollSmoother eases every jump, so wait for the reel transform to stop moving.
  const settle = async () => {
    let prev = null;
    for (let i = 0; i < 30; i++) {
      const s = await state();
      if (prev && prev.reelX === s.reelX && prev.top === s.top) return s;
      prev = s;
      await sleep(200);
    }
    return prev;
  };
  await scrollTo(0);
  await settle();

  // The section is pinned (rect.top === 0) up to the end of the reel; find the last
  // native scroll that holds it there — that frame shows the closing card flush right.
  let lo = 0, hi = 9000;
  for (let i = 0; i < 9; i++) {
    const mid = Math.round((lo + hi) / 2);
    await scrollTo(mid);
    const s = await settle();
    if (s.top < -1) hi = mid; else lo = mid;
  }
  await scrollTo(lo);
  const end = await settle();

  const shot = await send("Page.captureScreenshot", { format: "png" });
  writeFileSync(file, Buffer.from(shot.data, "base64"));

  console.log(JSON.stringify({ file, viewport: `${width}x${height}`, ...metrics, pinnedY: lo, ...end }));
  ws.close();
  await fetch(`http://127.0.0.1:${PORT}/json/close/${target.id}`);
}

try {
  await waitPort();
  await shoot(1440, 900, OUT + ".samples/work-1440x900.png");
  await shoot(1440, 760, OUT + ".samples/work-1440x760.png");
} finally {
  chrome.kill();
}
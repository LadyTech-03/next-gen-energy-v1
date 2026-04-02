import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const TRUE_VALUES = new Set(["1", "true", "yes", "on"]);
const SERVICE_UNAVAILABLE_HEADERS = {
  "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
  Pragma: "no-cache",
  Expires: "0",
  "Retry-After": "3600",
  "X-Robots-Tag": "noindex, nofollow",
};

function isServiceLockEnabled(): boolean {
  const rawValue = process.env.FORCE_SITE_503;
  return rawValue ? TRUE_VALUES.has(rawValue.trim().toLowerCase()) : false;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function build503Html(requestPath: string): string {
  const safePath = escapeHtml(requestPath || "/");
  const generatedAt = new Date().toUTCString();

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>503 — Service Unavailable</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet">
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --bg: #0b0c0f;
      --surface: #13151a;
      --border: #1f2229;
      --accent: #e8c547;
      --accent-dim: rgba(232, 197, 71, 0.12);
      --text-primary: #f0efe8;
      --text-muted: #5a5f6e;
      --text-dim: #3a3f4d;
      --red: #e05252;
    }

    html, body {
      height: 100%;
      background: var(--bg);
      color: var(--text-primary);
      font-family: 'DM Mono', monospace;
      overflow: hidden;
    }

    /* Subtle grid background */
    body::before {
      content: '';
      position: fixed;
      inset: 0;
      background-image:
        linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px);
      background-size: 48px 48px;
      pointer-events: none;
      z-index: 0;
    }

    /* Radial glow behind content */
    body::after {
      content: '';
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -60%);
      width: 600px;
      height: 600px;
      background: radial-gradient(ellipse, rgba(232,197,71,0.055) 0%, transparent 70%);
      pointer-events: none;
      z-index: 0;
    }

    .page {
      position: relative;
      z-index: 1;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      gap: 0;
    }

    /* Status pill */
    .status-pill {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 999px;
      padding: 6px 14px 6px 10px;
      font-size: 11px;
      letter-spacing: 0.08em;
      color: var(--text-muted);
      text-transform: uppercase;
      margin-bottom: 2.5rem;
      animation: fadeSlideIn 0.6s ease both;
    }

    .dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: var(--red);
      box-shadow: 0 0 6px var(--red);
      animation: pulse 1.8s ease-in-out infinite;
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50%       { opacity: 0.4; transform: scale(0.8); }
    }

    /* Big 503 */
    .code {
      font-family: 'DM Serif Display', Georgia, serif;
      font-size: clamp(96px, 18vw, 180px);
      line-height: 1;
      letter-spacing: -0.03em;
      color: var(--text-primary);
      animation: fadeSlideIn 0.7s 0.1s ease both;
      position: relative;
    }

    .code span {
      color: var(--accent);
    }

    /* Divider line */
    .divider {
      width: 48px;
      height: 1px;
      background: var(--border);
      margin: 2rem 0;
      animation: fadeSlideIn 0.7s 0.2s ease both;
    }

    /* Heading */
    h1 {
      font-family: 'DM Serif Display', Georgia, serif;
      font-weight: 400;
      font-size: clamp(20px, 3vw, 28px);
      letter-spacing: -0.02em;
      color: var(--text-primary);
      text-align: center;
      margin-bottom: 1rem;
      animation: fadeSlideIn 0.7s 0.25s ease both;
    }

    p {
      font-size: 13px;
      line-height: 1.75;
      color: var(--text-muted);
      text-align: center;
      max-width: 380px;
      animation: fadeSlideIn 0.7s 0.35s ease both;
    }

    /* Info card */
    .info-card {
      margin-top: 2.5rem;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 10px;
      padding: 1.25rem 1.5rem;
      width: 100%;
      max-width: 380px;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      animation: fadeSlideIn 0.7s 0.45s ease both;
    }

    .info-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 11.5px;
    }

    .info-row .label {
      color: var(--text-dim);
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }

    .info-row .value {
      color: var(--text-muted);
    }

    .info-row .value.red { color: var(--red); }
    .info-row .value.yellow { color: var(--accent); }

    .info-divider {
      height: 1px;
      background: var(--border);
    }

    /* Retry button */
    .btn {
      margin-top: 2rem;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: var(--accent-dim);
      border: 1px solid rgba(232, 197, 71, 0.3);
      color: var(--accent);
      font-family: 'DM Mono', monospace;
      font-size: 12px;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      padding: 11px 22px;
      border-radius: 6px;
      cursor: pointer;
      text-decoration: none;
      transition: background 0.2s, border-color 0.2s, transform 0.15s;
      animation: fadeSlideIn 0.7s 0.55s ease both;
    }

    .btn:hover {
      background: rgba(232, 197, 71, 0.18);
      border-color: rgba(232, 197, 71, 0.5);
      transform: translateY(-1px);
    }

    .btn svg {
      width: 13px;
      height: 13px;
      stroke: currentColor;
      fill: none;
      stroke-width: 2;
      stroke-linecap: round;
      stroke-linejoin: round;
    }

    /* Footer */
    footer {
      position: fixed;
      bottom: 1.5rem;
      left: 0;
      right: 0;
      text-align: center;
      font-size: 11px;
      color: var(--text-dim);
      letter-spacing: 0.04em;
      animation: fadeSlideIn 0.7s 0.65s ease both;
    }

    @keyframes fadeSlideIn {
      from { opacity: 0; transform: translateY(12px); }
      to   { opacity: 1; transform: translateY(0); }
    }
  </style>
</head>
<body>
  <div class="page">

    // <div class="status-pill">
    //   <span class="dot"></span>
    //   Service Unavailable
    // </div>

    <div class="code">5<span>0</span>3</div>

    <div class="divider"></div>

    <p>This page can not be accessed due to some technical issues.</p>

    <div class="info-card">
      <div class="info-row">
        <span class="label">Status</span>
        <span class="value red">● Unavailable</span>
      </div>
      <div class="info-divider"></div>
      <div class="info-row">
        <span class="label">Error</span>
        <span class="value">503 Service Unavailable</span>
      </div>
      <div class="info-divider"></div>
      <div class="info-row">
        <span class="label">Timestamp</span>
        <span class="value" id="ts">—</span>
      </div>
    </div>

    <a href="javascript:location.reload()" class="btn">
      <svg viewBox="0 0 24 24"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>
      Retry Request
    </a>

  </div>

  <footer>
    If the issue persists, please contact support.
  </footer>

  <script>
    // Live timestamp
    const ts = document.getElementById('ts');
    const fmt = d => d.toISOString().replace('T',' ').slice(0,19) + ' UTC';
    ts.textContent = fmt(new Date());
  </script>
</body>
</html>`;
}

export function proxy(request: NextRequest): Response {
  if (!isServiceLockEnabled()) {
    return NextResponse.next();
  }

  const headers = new Headers(SERVICE_UNAVAILABLE_HEADERS);

  if (request.method === "HEAD") {
    return new Response(null, { status: 503, headers });
  }

  if (request.method !== "GET") {
    headers.set("Content-Type", "application/json; charset=utf-8");
    return new Response(
      JSON.stringify({
        status: 503,
        error: "Service Unavailable",
        reason: "Billing hold mode is enabled.",
      }),
      {
        status: 503,
        headers,
      },
    );
  }

  const requestPath = `${request.nextUrl.pathname}${request.nextUrl.search}`;
  headers.set("Content-Type", "text/html; charset=utf-8");
  return new Response(build503Html(requestPath), {
    status: 503,
    headers,
  });
}

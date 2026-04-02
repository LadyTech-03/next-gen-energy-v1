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

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>503 Service Unavailable</title>
    <meta name="robots" content="noindex, nofollow" />
    <style>
      :root {
        color-scheme: light;
        --bg: #f7f9fc;
        --fg: #0f172a;
        --muted: #475569;
        --brand: #0a2a66;
        --accent: #f4b400;
        --surface: #ffffff;
        --border: #d7dfeb;
        --danger: #b91c1c;
      }

      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        font-family: "Manrope", "Segoe UI", "Helvetica Neue", Arial, sans-serif;
        background:
          radial-gradient(circle at 20% -10%, rgba(30, 103, 216, 0.15), transparent 48%),
          radial-gradient(circle at 85% 5%, rgba(244, 180, 0, 0.2), transparent 42%),
          var(--bg);
        color: var(--fg);
      }

      main {
        min-height: 100vh;
        display: grid;
        place-items: center;
        padding: 1.5rem;
      }

      .panel {
        width: min(44rem, 100%);
        background: var(--surface);
        border: 1px solid var(--border);
        border-radius: 1rem;
        box-shadow: 0 20px 40px -24px rgba(15, 23, 42, 0.45);
        overflow: hidden;
      }

      .header {
        border-bottom: 1px solid var(--border);
        background: linear-gradient(145deg, rgba(10, 42, 102, 0.06), rgba(244, 180, 0, 0.13));
        padding: 1.5rem;
      }

      .badge {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        background: rgba(185, 28, 28, 0.1);
        border: 1px solid rgba(185, 28, 28, 0.25);
        color: var(--danger);
        font-size: 0.75rem;
        font-weight: 700;
        letter-spacing: 0.04em;
        border-radius: 999px;
        padding: 0.35rem 0.75rem;
        text-transform: uppercase;
      }

      h1 {
        margin: 0.9rem 0 0.25rem;
        font-size: clamp(1.55rem, 4vw, 2.1rem);
        line-height: 1.2;
        color: var(--brand);
      }

      .subtitle {
        margin: 0;
        color: var(--muted);
        line-height: 1.5;
      }

      .content {
        padding: 1.35rem 1.5rem 1.5rem;
      }

      .status-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(11rem, 1fr));
        gap: 0.75rem;
        margin: 0 0 1rem;
      }

      .status-box {
        background: #f8fbff;
        border: 1px solid var(--border);
        border-radius: 0.75rem;
        padding: 0.75rem;
      }

      .label {
        margin: 0;
        font-size: 0.73rem;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        color: var(--muted);
      }

      .value {
        margin: 0.35rem 0 0;
        font-size: 0.96rem;
        font-weight: 700;
        color: var(--fg);
        word-break: break-word;
      }

      .callout {
        margin: 0;
        padding: 0.9rem 1rem;
        border-radius: 0.75rem;
        border: 1px solid rgba(10, 42, 102, 0.18);
        background: rgba(10, 42, 102, 0.04);
        color: var(--fg);
        line-height: 1.55;
      }

      .actions {
        margin-top: 1rem;
        display: flex;
        flex-wrap: wrap;
        gap: 0.65rem;
      }

      .btn {
        border-radius: 0.7rem;
        font-size: 0.9rem;
        font-weight: 700;
        text-decoration: none;
        border: 1px solid transparent;
        padding: 0.6rem 0.9rem;
        transition: transform 0.15s ease, box-shadow 0.15s ease;
      }

      .btn-primary {
        background: var(--brand);
        color: #f8fbff;
      }

      .btn-secondary {
        border-color: var(--border);
        color: var(--fg);
        background: #fff;
      }

      .btn:hover {
        transform: translateY(-1px);
      }
    </style>
  </head>
  <body>
    <main>
      <section class="panel" aria-labelledby="page-title">
        <header class="header">
          <p class="badge">HTTP 503 Service Unavailable</p>
          <h1 id="page-title">Service Temporarily Suspended</h1>
          <p class="subtitle">
            This site is currently in billing-hold mode due to an unpaid balance.
            Public access will be restored as soon as payment is cleared.
          </p>
        </header>

        <div class="content">
          <div class="status-grid" role="list">
            <article class="status-box" role="listitem">
              <p class="label">Incident</p>
              <p class="value">BILLING-HOLD</p>
            </article>
            <article class="status-box" role="listitem">
              <p class="label">Requested Path</p>
              <p class="value">${safePath}</p>
            </article>
            <article class="status-box" role="listitem">
              <p class="label">Generated At</p>
              <p class="value">${generatedAt}</p>
            </article>
          </div>

          <p class="callout">
            If this is unexpected, contact the site administrator or billing owner and request
            immediate invoice settlement. Access remains blocked until the account returns to good standing.
          </p>

          <div class="actions">
            <a class="btn btn-primary" href="${safePath}">Retry</a>
            <a class="btn btn-secondary" href="mailto:billing@nextgen-energy.local">Contact Billing</a>
          </div>
        </div>
      </section>
    </main>
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

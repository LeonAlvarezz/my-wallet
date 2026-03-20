const API_PREFIX = "/api";
const SITEMAP_PATH = "/sitemap.xml";
const ROBOTS_PATH = "/robots.txt";
const PUBLIC_SITEMAP_ROUTES = ["/auth/login/", "/auth/register/"];
const PRIVATE_ROUTE_PREFIXES = ["/profile", "/settings", "/transaction"];

interface AssetsBinding {
  fetch(request: Request): Promise<Response>;
}

interface Env {
  API_BASE_URL?: string;
  ASSETS: AssetsBinding;
}

function ensureTrailingSlash(value: string): string {
  return value.endsWith("/") ? value : `${value}/`;
}

function buildApiUrl(requestUrl: string, apiBaseUrl: string): URL {
  const url = new URL(requestUrl);
  const normalizedPath = url.pathname.replace(/^\/api/, "") || "/";
  return new URL(
    `${normalizedPath.replace(/^\//, "")}${url.search}`,
    ensureTrailingSlash(apiBaseUrl),
  );
}

function buildRobotsTxt(origin: string): string {
  return [
    "User-agent: *",
    "Allow: /auth/login/",
    "Allow: /auth/register/",
    "Disallow: /api/",
    ...PRIVATE_ROUTE_PREFIXES.map((prefix) => `Disallow: ${prefix}`),
    `Sitemap: ${origin}${SITEMAP_PATH}`,
  ].join("\n");
}

function buildSitemapXml(origin: string): string {
  const now = new Date().toISOString();
  const urls = PUBLIC_SITEMAP_ROUTES.map((path) => {
    return [
      "  <url>",
      `    <loc>${origin}${path}</loc>`,
      `    <lastmod>${now}</lastmod>`,
      "  </url>",
    ].join("\n");
  }).join("\n");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    urls,
    "</urlset>",
  ].join("\n");
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === ROBOTS_PATH) {
      return new Response(buildRobotsTxt(url.origin), {
        headers: {
          "content-type": "text/plain; charset=utf-8",
          "cache-control": "public, max-age=3600",
        },
      });
    }

    if (url.pathname === SITEMAP_PATH) {
      return new Response(buildSitemapXml(url.origin), {
        headers: {
          "content-type": "application/xml; charset=utf-8",
          "cache-control": "public, max-age=3600",
        },
      });
    }

    if (url.pathname.startsWith(API_PREFIX)) {
      if (!env.API_BASE_URL) {
        return new Response("Missing API_BASE_URL worker variable", {
          status: 500,
        });
      }

      const targetUrl = buildApiUrl(request.url, env.API_BASE_URL);
      return fetch(new Request(targetUrl, request));
    }

    return env.ASSETS.fetch(request);
  },
};

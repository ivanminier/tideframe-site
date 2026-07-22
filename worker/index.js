const UPDATE_PREFIX = "/updates/modeboard/";
const UPDATE_ROOT = UPDATE_PREFIX.slice(0, -1);
const APPCAST_PATH = `${UPDATE_PREFIX}appcast.xml`;
const VERSIONED_UPDATE_PATTERN = /^Modeboard-\d+\.\d+\.\d+-[1-9]\d*\.(?:zip|md)$/;
const DOWNLOAD_PREFIX = "/downloads/modeboard/";
const DOWNLOAD_ROOT = DOWNLOAD_PREFIX.slice(0, -1);
const VERSIONED_DOWNLOAD_PATTERN = /^Modeboard-\d+\.\d+\.\d+-[1-9]\d*\.dmg$/;

function unavailable(status = 404, artifact = "update") {
  return new Response(`Modeboard ${artifact} file is not available.\n`, {
    status,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
      "X-Robots-Tag": "noindex",
    },
  });
}

function downloadResponse(response, pathname) {
  const headers = new Headers(response.headers);
  headers.set("Content-Type", "application/x-apple-diskimage");
  headers.set("Content-Disposition", `attachment; filename="${pathname.split("/").at(-1)}"`);
  headers.set("Cache-Control", "public, max-age=31536000, immutable");
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("X-Robots-Tag", "noindex");

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

function updateResponse(response, pathname) {
  const headers = new Headers(response.headers);
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("X-Robots-Tag", "noindex");

  if (pathname === APPCAST_PATH) {
    headers.set("Content-Type", "application/xml; charset=utf-8");
    headers.set("Cache-Control", "no-cache, no-store, must-revalidate");
  } else if (pathname.endsWith(".zip")) {
    headers.set("Content-Type", "application/zip");
    headers.set("Content-Disposition", `attachment; filename="${pathname.split("/").at(-1)}"`);
    headers.set("Cache-Control", "public, max-age=31536000, immutable");
  } else {
    headers.set("Content-Type", "text/markdown; charset=utf-8");
    headers.set("Cache-Control", "public, max-age=31536000, immutable");
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const isUpdatePath = url.pathname === UPDATE_ROOT || url.pathname.startsWith(UPDATE_PREFIX);
    const isDownloadPath = url.pathname === DOWNLOAD_ROOT || url.pathname.startsWith(DOWNLOAD_PREFIX);
    if (!isUpdatePath && !isDownloadPath) {
      return env.ASSETS.fetch(request);
    }

    if (request.method !== "GET" && request.method !== "HEAD") {
      const response = unavailable(405);
      response.headers.set("Allow", "GET, HEAD");
      return response;
    }

    if (isDownloadPath) {
      const filename = url.pathname.slice(DOWNLOAD_PREFIX.length);
      if (!VERSIONED_DOWNLOAD_PATTERN.test(filename)) {
        return unavailable(404, "download");
      }

      const response = await env.ASSETS.fetch(request);
      const contentType = response.headers.get("Content-Type") ?? "";
      if (!response.ok || contentType.toLowerCase().includes("text/html")) {
        return unavailable(503, "download");
      }
      return downloadResponse(response, url.pathname);
    }

    const filename = url.pathname.slice(UPDATE_PREFIX.length);
    if (url.pathname !== APPCAST_PATH && !VERSIONED_UPDATE_PATTERN.test(filename)) {
      return unavailable();
    }

    const response = await env.ASSETS.fetch(request);
    const contentType = response.headers.get("Content-Type") ?? "";
    if (!response.ok || contentType.toLowerCase().includes("text/html")) {
      // The site uses an SPA fallback. Never let missing update files become a
      // successful HTML response that Sparkle might mistake for update data.
      return unavailable(503);
    }
    return updateResponse(response, url.pathname);
  },
};

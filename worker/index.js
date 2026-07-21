export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Until a real signed Sparkle appcast is published, fail closed.
    if (url.pathname === "/updates/modeboard/appcast.xml") {
      return new Response("Modeboard update feed is not available yet.\n", {
        status: 404,
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Cache-Control": "no-store",
          "X-Content-Type-Options": "nosniff",
        },
      });
    }

    return env.ASSETS.fetch(request);
  },
};

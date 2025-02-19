self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(clients.claim());
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  if (url.pathname === "/login") {
    event.respondWith(
      new Promise((resolve) => {
        const delay = Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000;
        setTimeout(() => {
          resolve(
            new Response(JSON.stringify({ error: "Unauthorized" }), {
              status: 401,
              headers: { "Content-Type": "application/json" },
            })
          );
        }, delay);
      })
    );
  }
});

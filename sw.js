// v1.8 · Push con OneSignal: solo si la página registró este worker con &push=1 (fase 2)
try{if(new URL(self.location.href).searchParams.get('push')==='1')importScripts('https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.sw.js')}catch(e){}
const CACHE_NAME = 'josfit-pwa-v1-8';
const APP_SHELL = ['./', './index.html', './manifest.json', './icon-192.png', './icon-512.png'];
self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    for (const resource of APP_SHELL) {
      try { await cache.add(resource); }
      catch (error) { console.warn(`No se pudo cachear ${resource}`, error); }
    }
    await self.skipWaiting();
  })());
});
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key.startsWith('josfit-pwa-') && key !== CACHE_NAME).map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});
self.addEventListener('fetch', event => {
  const request = event.request, url = new URL(request.url);
  if (url.origin !== self.location.origin || request.method !== 'GET') return;
  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(request);
    if (cached) return cached;
    try {
      const response = await fetch(request);
      if (response && response.ok) await cache.put(request, response.clone());
      return response;
    } catch (error) {
      if (request.mode === 'navigate') return (await cache.match('./index.html')) || Response.error();
      return Response.error();
    }
  })());
});

// v1.8 · Al tocar una notificación local de JOS Fit, abre o enfoca la app
self.addEventListener('notificationclick', event => {
  if (!event.notification.data || !event.notification.data.josLocal) return;
  event.notification.close();
  event.waitUntil((async () => {
    const all = await clients.matchAll({ type: 'window', includeUncontrolled: true });
    for (const c of all) { if ('focus' in c) return c.focus(); }
    return clients.openWindow('./index.html');
  })());
});

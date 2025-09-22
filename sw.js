// sw.js - very small service worker for caching
const CACHE='greenbite-v1';
const toCache = ['/', '/index.html','/styles.css','/recipes.html','/calculator.html','/workouts.html','/mindfulness.html','/contact.html'];
self.addEventListener('install', e=>{ e.waitUntil(caches.open(CACHE).then(c=>c.addAll(toCache))); });
self.addEventListener('fetch', e=>{ e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request))); });

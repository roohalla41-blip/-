// Service Worker — ذخیره برنامه در حافظه داخلی برای کار آفلاین
// پس از اولین بارگذاری موفق، تمام فایل‌ها کش می‌شوند و برنامه بدون اینترنت هم کار می‌کند

const CACHE_NAME = 'hesab-sarraf-v1';
const APP_SHELL = [
  '/',
  '/index.html',
  '/manifest.json',
];

// نصب: کش کردن فایل‌های اصلی برنامه
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(APP_SHELL).catch(() => {});
    })
  );
  self.skipWaiting();
});

// فعال‌سازی: پاک کردن کش‌های قدیمی
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

// درخواست‌ها: اول کش، بعد شبکه
self.addEventListener('fetch', (event) => {
  // فقط درخواست‌های GET را مدیریت کن
  if (event.request.method !== 'GET') return;

  // درخواست‌های API را رد کن (اینها باید به سرور بروند)
  const url = new URL(event.request.url);
  if (url.pathname.startsWith('/api/') || url.pathname.startsWith('/functions/')) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // اگر در کش بود، از کش برگردان
      if (cachedResponse) {
        // در پس‌زمینه هم نسخه جدید را بگیر (stale-while-revalidate)
        fetch(event.request)
          .then((response) => {
            if (response && response.status === 200) {
              const responseClone = response.clone();
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, responseClone).catch(() => {});
              });
            }
          })
          .catch(() => {});
        return cachedResponse;
      }

      // اگر در کش نبود، از شبکه بگیر و کش کن
      return fetch(event.request)
        .then((response) => {
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone).catch(() => {});
          });
          return response;
        })
        .catch(() => {
          // اگر شبکه هم جواب نداد و فایل HTML خواسته شد، index.html را از کش برگردان
          if (event.request.mode === 'navigate') {
            return caches.match('/index.html');
          }
        });
    })
  );
});

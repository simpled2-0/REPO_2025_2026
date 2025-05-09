// shutdown-sw.js - Service Worker to enforce site shutdown
const CACHE_NAME = 'shutdown-cache-v1';
const shutdownHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SHUT DOWN....</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
        }
        .center {
            text-align: center;
            border: 3px solid black;
            max-width: 800px;
            margin: 50px auto;
            padding: 20px;
        }
    </style>
</head>
<body>
    <div class="center">
        <h1>This Website is Shut Down</h1>
        <h1>It has come to my attention that this website has caused a lot of problems</h1>
        <h1>with finals coming soon Ive made the decsion for everyone to take down minecraft so its a not a distraction and to stop this constant fighting between the two teams and if you dont know about this good for you</h1>
        <h1>So with that said I might reopen next school year and I wish you all do good on your exams and pass them with flying colors</h1>
        <h3>Sincerely, yk who</h3>
        <p>(Site has been shut down. Please close this window.)</p>
    </div>
</body>
</html>`;

// Install event - cache the shutdown page
self.addEventListener('install', event => {
  console.log('Shutdown Service Worker installing.');
  self.skipWaiting(); // Force activation
  
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      // Create a response for the shutdown page
      const response = new Response(shutdownHTML, {
        headers: { 'Content-Type': 'text/html' }
      });
      
      // Cache the shutdown page
      return cache.put('/', response);
    })
  );
});

// Activate event - take control immediately
self.addEventListener('activate', event => {
  console.log('Shutdown Service Worker activating.');
  event.waitUntil(clients.claim());
  
  // Clean up any old caches
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Intercept ALL fetch requests and respond with the shutdown page
self.addEventListener('fetch', event => {
  console.log('Intercepting fetch request:', event.request.url);
  
  // Special handling for assets that must be blocked
  if (event.request.url.includes('classes.js') || 
      event.request.url.includes('assets.epk') ||
      event.request.url.includes('lang/')) {
    console.log('Blocking game resource:', event.request.url);
    event.respondWith(new Response('// Site is shut down', {
      headers: { 'Content-Type': 'text/javascript' }
    }));
    return;
  }
  
  // For HTML requests, always serve the shutdown page
  if (event.request.mode === 'navigate' || 
      event.request.headers.get('accept').includes('text/html')) {
    console.log('Serving shutdown page for HTML request');
    event.respondWith(
      caches.match('/').then(response => {
        return response || new Response(shutdownHTML, {
          headers: { 'Content-Type': 'text/html' }
        });
      })
    );
    return;
  }
  
  // For non-HTML requests, try network first, then cache
  event.respondWith(
    fetch(event.request)
      .catch(() => {
        return caches.match(event.request)
          .then(cachedResponse => {
            if (cachedResponse) {
              return cachedResponse;
            }
            
            // If it's an image, return a placeholder
            if (event.request.destination === 'image') {
              return new Response('', {
                status: 204,
                statusText: 'No Content'
              });
            }
            
            // For JS/CSS, return empty content
            if (event.request.destination === 'script' || 
                event.request.destination === 'style') {
              const contentType = event.request.destination === 'script' 
                ? 'text/javascript' 
                : 'text/css';
              
              return new Response('// Site is shut down', {
                headers: { 'Content-Type': contentType }
              });
            }
            
            // Default response
            return new Response('Site is shut down', {
              status: 503,
              headers: { 'Content-Type': 'text/plain' }
            });
          });
      })
  );
});

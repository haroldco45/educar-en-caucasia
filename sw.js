// Educar en Caucasia · service worker
// Cambie la versión cada vez que suba cambios para que los celulares descarguen lo nuevo.
const CACHE='educar-caucasia-v1';
const PRECACHE=["./", "index.html", "manifest.webmanifest", "og-image.jpg", "icons/icon-192.png", "icons/icon-512.png", "img/abuelo.jpg", "img/aseo.jpg", "img/autonomia.jpg", "img/barrer.jpg", "img/cocina.jpg", "img/curiosidad.jpg", "img/equilibrio.jpg", "img/fila.jpg", "img/juego.jpg", "img/limpio.jpg", "img/maestro.jpg", "img/orden.jpg", "img/pingpong.jpg", "img/respeto.jpg", "img/taller.jpg", "img/tren.jpg"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(PRECACHE)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==CACHE).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const r=e.request; if(r.method!=='GET') return;
  if(new URL(r.url).origin!==location.origin) return;
  if(r.headers.has('range')) return;
  e.respondWith(fetch(r).then(res=>{if(res.status===200){const c=res.clone();caches.open(CACHE).then(x=>x.put(r,c))}return res})
    .catch(()=>caches.match(r).then(m=>m||caches.match('index.html'))));
});

/* 공부노트 — 오프라인 캐시. 빌드가 바뀌면 캐시 이름이 바뀌어 통째로 새로 받는다. */
const V = "notes-51357e1c";
const FILES = ["./", "index.html?v=51357e1c", "manifest.webmanifest?v=51357e1c", "icon-192.png", "icon-512.png", "n-5b24cafdbe.html?v=51357e1c", "n-ba34e98937.html?v=51357e1c", "n-7b0894094b.html?v=51357e1c", "n-e1dc58aa79.html?v=51357e1c", "n-69bd1c661f.html?v=51357e1c", "n-5b641a4b28.html?v=51357e1c", "n-b21ba3a315.html?v=51357e1c", "n-63363687a5.html?v=51357e1c", "n-2be97116ed.html?v=51357e1c", "n-3d6084d599.html?v=51357e1c", "n-119413004b.html?v=51357e1c", "n-c890ed2fbd.html?v=51357e1c", "n-df62f397ba.html?v=51357e1c", "n-9c41c24f65.html?v=51357e1c", "n-33b09db397.html?v=51357e1c", "n-2fad3b8893.html?v=51357e1c", "n-01a283a401.html?v=51357e1c", "n-dc74a38001.html?v=51357e1c", "n-9d584fa1ae.html?v=51357e1c", "n-0724b0acca.html?v=51357e1c", "n-e3de72e888.html?v=51357e1c", "n-a85bbe596b.html?v=51357e1c", "n-513f643d8f.html?v=51357e1c", "n-9385b116cf.html?v=51357e1c", "n-c1dd353300.html?v=51357e1c", "n-313195f026.html?v=51357e1c", "n-2a5628a067.html?v=51357e1c", "n-efb56c1a23.html?v=51357e1c", "n-24de916397.html?v=51357e1c", "n-c6e5d2700f.html?v=51357e1c", "n-0b87493203.html?v=51357e1c", "n-131b9b5cd6.html?v=51357e1c", "n-2dafdd6074.html?v=51357e1c", "n-46f44553d8.html?v=51357e1c", "n-b6d6eda8f5.html?v=51357e1c", "n-139d7a5b88.html?v=51357e1c", "n-bd420be76c.html?v=51357e1c", "n-d4285b1ad1.html?v=51357e1c", "n-273e15167e.html?v=51357e1c", "n-f5397eb2a9.html?v=51357e1c", "n-4ee3a8f052.html?v=51357e1c", "n-ff2b548c03.html?v=51357e1c", "n-16f30fef06.html?v=51357e1c", "n-1797b3b2eb.html?v=51357e1c", "n-faa1083398.html?v=51357e1c", "n-b93fa82740.html?v=51357e1c", "n-70ce063719.html?v=51357e1c", "n-21c08856e4.html?v=51357e1c", "n-3a001b76aa.html?v=51357e1c", "n-5978634731.html?v=51357e1c", "n-2d4d44f846.html?v=51357e1c", "n-436babb53b.html?v=51357e1c", "n-33c13bd2f9.html?v=51357e1c", "mermaid.min.js?v=51357e1c"];
self.addEventListener("install", e => {
  self.skipWaiting();
  e.waitUntil(caches.open(V).then(c => c.addAll(FILES)).catch(() => {}));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks =>
    Promise.all(ks.filter(k => k !== V).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const u = new URL(e.request.url);
  if (u.origin !== location.origin) return;            // GitHub API 등은 그대로 통과
  e.respondWith(caches.match(e.request, { ignoreSearch: true })
    .then(r => r || fetch(e.request)));
});

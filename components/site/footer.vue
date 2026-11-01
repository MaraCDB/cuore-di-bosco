<template>
  <footer class="redesign site-footer">
    <p class="footer-name">B&amp;B Cuore di Bosco</p>
    <div class="footer-welcome">
      <h2>Ti aspettiamo!</h2>
      <p>Prenotare è molto semplice: puoi scriverci una mail a <a href="mailto:info@cuoredibosco.it">info@cuoredibosco.it</a> o un messaggio whatsapp o telegram al <a href="https://wa.me/393494960228">349 4960228</a>, ti risponderemo al più presto!</p>
      <ul class="footer-contacts">
        <li><a href="tel:+393494960228" aria-label="Chiamaci al 349 4960228"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg></a></li>
        <li><a href="https://wa.me/393494960228" aria-label="Scrivici su WhatsApp"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg></a></li>
        <li><a href="mailto:info@cuoredibosco.it" aria-label="Scrivici una mail a info@cuoredibosco.it"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 4L12 13 2 4"/></svg></a></li>
        <li><a href="https://www.facebook.com/profile.php?id=61583661897314" target="_blank" rel="noopener" aria-label="Cuore di Bosco su Facebook"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></a></li>
        <li><a href="https://www.instagram.com/bbcuoredibosco/" target="_blank" rel="noopener" aria-label="Cuore di Bosco su Instagram"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><path d="M17.5 6.5h.01"/></svg></a></li>
      </ul>
    </div>
    <div class="footer-info">
      <p><strong>B&amp;B Cuore di Bosco</strong><br>Via Gardesani, 15<br>Brentonico – fraz. Prada (TN)</p>
      <p class="footer-legal">CIN IT022025C1W3ZHJVK4<br>CF MLCMRA86P66L781J · <NuxtLink to="/it/privacy-policy" no-prefetch>Privacy</NuxtLink></p>
    </div>
  </footer>
</template>

<style scoped>
.site-footer{background:var(--forest-deep);color:var(--on-forest);display:grid;grid-template-columns:minmax(0,6fr) minmax(0,5fr);gap:20px clamp(32px,5vw,96px);align-items:end;padding:28px max(var(--margin),calc((100% - var(--page-max)) / 2 + var(--margin))) calc(16px + 64px + env(safe-area-inset-bottom))}
.site-footer :focus-visible{outline-color:var(--lime)}
.footer-name{font-family:var(--display);font-weight:var(--display-weight);font-size:clamp(2.25rem,1.25rem + 3.5vw,4rem);line-height:1;margin:0}
.footer-welcome h2,.footer-welcome p,.footer-info{font-family:var(--body);font-size:var(--step-body)}
.footer-welcome h2{font-weight:700;line-height:1.65;margin-bottom:4px;color:inherit}
.footer-welcome p{max-width:56ch;margin:0}
.footer-welcome a{white-space:nowrap}
.footer-contacts{display:flex;flex-wrap:wrap;gap:8px;list-style:none;margin:16px 0 0;padding:0}
.footer-contacts a{display:grid;place-items:center;width:48px;height:48px;border-radius:50%;background:var(--forest);color:var(--on-forest);transition:background var(--t-hover) var(--ease-out),color var(--t-hover) var(--ease-out)}
.footer-contacts svg{width:22px;height:22px}
@media (hover:hover){.footer-contacts a:hover{background:var(--lime);color:var(--ink)}}
.footer-info{grid-column:2;grid-row:1 / span 2;align-self:start}
.footer-info p{margin:0}
.site-footer a{color:var(--on-forest)}
.footer-info .footer-legal{margin-top:16px;font-size:var(--step-small);color:var(--on-forest-soft)}
@media (max-width:900px){
  .site-footer{grid-template-columns:minmax(0,1fr)}
  .footer-info{grid-column:auto;grid-row:auto}
}
</style>

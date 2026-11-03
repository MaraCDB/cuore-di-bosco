<template>
  <div ref="root">
    <div class="band">
      <section class="policy-hero">
        <div class="hero-text">
          <h1>COOKIES PRIVACY POLICY</h1>
        </div>
        <figure class="hero-photo">
          <img :src="cookies" alt="Casetta di pan di zenzero e biscotti a forma di casa" decoding="async">
        </figure>
      </section>
    </div>

    <div class="policy">
      <section class="policy-card" data-reveal>
        <h2>Cookie Policy di Cuore di Bosco</h2>
        <p>Questo sito web (<strong>cuoredibosco.it</strong>) utilizza cookie per garantire il corretto funzionamento e migliorare l’esperienza di navigazione degli utenti.</p>
      </section>

      <section class="policy-card" data-reveal>
        <h2>Cosa sono i cookie</h2>
        <p>I cookie sono piccoli file di testo che i siti web inviano al dispositivo dell’utente durante la navigazione. Servono per raccogliere informazioni su come l’utente utilizza il sito, per memorizzare le preferenze e per fornire contenuti personalizzati.</p>
      </section>

      <section class="policy-card" data-reveal>
        <h2>Tipologie di cookie utilizzati</h2>
        <ol>
          <li><strong>Cookie tecnici (necessari):</strong> essenziali per il corretto funzionamento del sito e non richiedono il consenso dell’utente.</li>
          <li><strong>Cookie di funzionalità:</strong> permettono al sito di ricordare le scelte dell’utente (come la lingua o le credenziali per l’accesso). Possono essere disattivati, ma alcune funzionalità potrebbero non essere disponibili.</li>
          <li><strong>Cookie di terze parti (analitici e di profilazione):</strong> strumenti come Google Analytics, mappe o social plugin che raccolgono dati a fini statistici o pubblicitari. Questi cookie richiedono il consenso esplicito dell’utente.</li>
        </ol>
      </section>

      <section class="policy-card" data-reveal>
        <h2>Cookie usati su questo sito</h2>
        <p>Il sito può utilizzare:</p>
        <ul>
          <li>Google Analytics per raccogliere informazioni anonime sull’uso del sito.</li>
          <li>Social plugin (es. Facebook, Instagram) per condividere contenuti.</li>
          <li>Booking o mappe incorporate (es. Google Maps, sistemi di prenotazione).</li>
        </ul>
      </section>

      <section class="policy-card" data-reveal>
        <h2>Come gestire i cookie</h2>
        <p>Puoi gestire le preferenze sui cookie direttamente dal banner mostrato all’apertura del sito. Inoltre, puoi disattivarli dal tuo browser, seguendo le istruzioni specifiche:</p>
        <ul>
          <li><a href="https://support.google.com/chrome/answer/95647?hl=it" target="_blank" rel="noopener">Google Chrome</a></li>
          <li><a href="https://support.mozilla.org/it/kb/Gestione%20dei%20cookie" target="_blank" rel="noopener">Mozilla Firefox</a></li>
          <li><a href="https://support.microsoft.com/it-it/microsoft-edge/eliminare-i-cookie-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener">Microsoft Edge</a></li>
          <li><a href="https://support.apple.com/it-it/guide/safari/sfri11471/mac" target="_blank" rel="noopener">Safari (Mac)</a></li>
        </ul>
        <button type="button" class="button" @click="openPreferences">Preferenze cookie</button>
      </section>

      <section class="policy-card" data-reveal>
        <h2>Titolare del trattamento</h2>
        <p><strong>Cuore di Bosco – B&amp;B</strong><br>Email: <a href="mailto:info@cuoredibosco.it"><em>info@cuoredibosco.it</em></a></p>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import cookies from "~/assets/images/cookies.webp";

useHead({
  title: "Cookie e Privacy Policy | Cuore di Bosco - B&B Prada di Brentonico",
  meta: [
    {
      name: "description",
      content:
        "Informativa sulla privacy e cookie policy del sito cuoredibosco.it. Scopri come gestiamo i tuoi dati e i cookie.",
    },
    {
      property: "og:title",
      content: "Cookie e Privacy Policy | B&B Cuore di Bosco",
    },
    {
      property: "og:description",
      content:
        "Informativa sulla privacy e cookie policy del sito cuoredibosco.it.",
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      property: "og:url",
      content: "https://www.cuoredibosco.it/it/privacy-policy",
    },
    {
      property: "og:image",
      content: "https://www.cuoredibosco.it/images/cuore-casa.webp",
    },
  ],
  link: [{ rel: "canonical", href: "https://www.cuoredibosco.it/it/privacy-policy" }],
});

const root = ref<HTMLElement | null>(null);
useReveal(root);
const { openPreferences } = useCookieConsent();
</script>

<style scoped>
.policy-hero{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);min-height:min(calc(100svh - 84px),780px)}
.policy-hero .hero-text{align-self:center;padding:48px clamp(32px,4vw,64px) 72px max(var(--margin),calc((100vw - var(--page-max)) / 2 + var(--margin)))}
.policy-hero h1{font-size:var(--step-display);line-height:1;color:var(--on-forest)}
.policy-hero .hero-photo{margin:0;position:relative}
.policy-hero .hero-photo img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:50% 50%}

.policy{max-width:var(--page-max);margin:var(--section-gap) auto 0;padding:0 var(--margin) var(--section-gap);display:grid;grid-template-columns:minmax(0,1fr);align-items:start;gap:clamp(28px,3.5vw,56px) clamp(32px,5vw,96px)}
.policy-card{border-top:3px solid var(--meadow);padding-top:16px}
.policy-card h2{font-family:var(--display);font-weight:var(--display-weight);font-size:var(--step-title);line-height:1.1;color:var(--forest);margin-bottom:10px}
.policy-card p,.policy-card li{max-width:68ch;text-align:justify;hyphens:auto}
.policy-card ul{list-style:disc;padding-left:1.1em}
.policy-card ol{list-style:decimal;padding-left:1.1em}
.policy-card li+li{margin-top:0.5em}
.policy-card a{color:var(--forest);text-decoration:underline}
.policy-card .button{margin-top:16px;border:0;font-size:inherit;cursor:pointer}
.policy-card>:last-child{margin-bottom:0}
@media (min-width:901px){
  .policy-hero{min-height:min(calc(50svh - 59px),340px)}
  .policy-hero .hero-text{padding-top:34px;padding-right:clamp(22px,2.8vw,45px);padding-bottom:50px}
  .policy{grid-template-columns:repeat(2,minmax(0,1fr))}
}
@media (max-width:900px){
  .policy-hero{grid-template-columns:minmax(0,1fr);min-height:0}
  .policy-hero .hero-photo{aspect-ratio:4/3;min-height:0;order:-1}
  .policy-hero .hero-text{padding:24px var(--margin) 32px}
}
@media (max-width:520px){
  .policy-card p,.policy-card li{text-align:left}
}
</style>

<template>
    <div class="welcome">
        <img decoding="async" width="1400" height="800" class="landing-image" alt="panorama" :src="cookies"
            data-object-fit="cover" loading="lazy" /><span aria-hidden="true"
            class="wp-block-cover__background has-background-dim-30 has-background-dim"
            style="background-color: #526a71"></span>
        <div class="landing-text">
            <h1 class="landing-title">
                COOKIES PRIVACY POLICY
            </h1>
        </div>
    </div>

    <section id="cookie-policy-text">
        <h3>Cookie Policy di Cuore di Bosco</h3>
        <p>Questo sito web (<strong>cuoredibosco.it</strong>) utilizza cookie per garantire il corretto funzionamento e
            migliorare l’esperienza di navigazione degli utenti.</p>

        <h3>Cosa sono i cookie</h3>
        <p>I cookie sono piccoli file di testo che i siti web inviano al dispositivo dell’utente durante la navigazione.
            Servono per raccogliere informazioni su come l’utente utilizza il sito, per memorizzare le preferenze e per
            fornire contenuti personalizzati.</p>

        <h3>Tipologie di cookie utilizzati</h3>
        <ol>
            <li><strong>Cookie tecnici (necessari):</strong> essenziali per il corretto funzionamento del sito e non
                richiedono il consenso dell’utente.</li>
            <li><strong>Cookie di funzionalità:</strong> permettono al sito di ricordare le scelte dell’utente (come la
                lingua o le credenziali per l’accesso). Possono essere disattivati, ma alcune funzionalità potrebbero
                non essere disponibili.</li>
            <li><strong>Cookie di terze parti (analitici e di profilazione):</strong> strumenti come Google Analytics,
                mappe o social plugin che raccolgono dati a fini statistici o pubblicitari. Questi cookie richiedono il
                consenso esplicito dell’utente.</li>
        </ol>

        <h3>Cookie usati su questo sito</h3>
        <p>Il sito può utilizzare:</p>
        <ul>
            <li>Google Analytics per raccogliere informazioni anonime sull’uso del sito.</li>
            <li>Social plugin (es. Facebook, Instagram) per condividere contenuti.</li>
            <li>Booking o mappe incorporate (es. Google Maps, sistemi di prenotazione).</li>
        </ul>

        <h3>Come gestire i cookie</h3>
        <p>Puoi gestire le preferenze sui cookie direttamente dal banner mostrato all’apertura del sito. Inoltre, puoi
            disattivarli dal tuo browser, seguendo le istruzioni specifiche:</p>
        <ul>
            <li><a href="https://support.google.com/chrome/answer/95647?hl=it" target="_blank" rel="noopener">Google
                    Chrome</a></li>
            <li><a href="https://support.mozilla.org/it/kb/Gestione%20dei%20cookie" target="_blank" rel="noopener">Mozilla
                    Firefox</a></li>
            <li><a href="https://support.microsoft.com/it-it/microsoft-edge/eliminare-i-cookie-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                    target="_blank" rel="noopener">Microsoft Edge</a></li>
            <li><a href="https://support.apple.com/it-it/guide/safari/sfri11471/mac" target="_blank"
                    rel="noopener">Safari (Mac)</a></li>
        </ul>

        <h3>Titolare del trattamento</h3>
        <p><strong>Cuore di Bosco – B&B</strong><br>
            Email: <em>info@cuoredibosco.it</em><br>
        </p>
    </section>
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
</script>


<style scope>
.landing-image:where(:not(.redesign, .redesign *)) {
    width: 100%;
    height: 400px;
    object-fit: cover;
    object-position: center 26%;
    display: block;
}

.landing-text:where(:not(.redesign, .redesign *)) {
    position: relative;
}

.landing-title:where(:not(.redesign, .redesign *)) {
    color: white;
    line-height: 1.25;
    font-size: 64px;
    color: white;
    font-weight: bold;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
}

.landing-title strong:where(:not(.redesign, .redesign *)) {
    font-weight: 15555;
}

.welcome:where(:not(.redesign, .redesign *)) {
    position: relative;
    overflow: hidden;
}

.landing-text:where(:not(.redesign, .redesign *)) {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    text-align: center;
}

#cookie-policy-text:where(:not(.redesign, .redesign *)) {
    margin-top: 15px;
    padding-left: 15px;
    padding-right: 10px;
}

#cookie-policy-text h3:where(:not(.redesign, .redesign *)) {
    margin-top: 1em;
}

#cookie-policy-text a:where(:not(.redesign, .redesign *)) {
    text-decoration: underline;
}
</style>
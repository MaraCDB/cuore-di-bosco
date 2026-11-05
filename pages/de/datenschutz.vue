<template>
  <div ref="root">
    <div class="band">
      <section class="policy-hero">
        <div class="hero-text">
          <h1>COOKIE- UND DATENSCHUTZ&shy;ERKLÄRUNG</h1>
        </div>
        <figure class="hero-photo">
          <img :src="cookies" alt="Lebkuchenhaus und Kekse in Hausform" decoding="async">
        </figure>
      </section>
    </div>

    <div class="policy">
      <section class="policy-card" data-reveal>
        <h2>Cookie-Richtlinie von Cuore di Bosco</h2>
        <p>Diese Website (<strong>cuoredibosco.it</strong>) verwendet Cookies, um den ordnungsgemäßen Betrieb zu gewährleisten und das Surferlebnis der Nutzer zu verbessern.</p>
      </section>

      <section class="policy-card" data-reveal>
        <h2>Was sind Cookies?</h2>
        <p>Cookies sind kleine Textdateien, die Websites während des Besuchs an das Gerät des Nutzers senden. Sie dienen dazu, Informationen darüber zu sammeln, wie der Nutzer die Website verwendet, Einstellungen zu speichern und personalisierte Inhalte bereitzustellen.</p>
      </section>

      <section class="policy-card" data-reveal>
        <h2>Arten der verwendeten Cookies</h2>
        <ol>
          <li><strong>Technische Cookies (notwendig):</strong> unerlässlich für das ordnungsgemäße Funktionieren der Website; sie erfordern nicht die Einwilligung des Nutzers.</li>
          <li><strong>Funktionalitäts-Cookies:</strong> ermöglichen es der Website, sich an die Entscheidungen des Nutzers zu erinnern (wie die Sprache oder die Anmeldedaten). Sie können deaktiviert werden, aber einige Funktionen könnten dann nicht verfügbar sein.</li>
          <li><strong>Cookies von Drittanbietern (Analyse und Profilbildung):</strong> Werkzeuge wie Google Analytics, Karten oder Social-Media-Plugins, die Daten zu statistischen oder Werbezwecken erfassen. Diese Cookies erfordern die ausdrückliche Einwilligung des Nutzers.</li>
        </ol>
      </section>

      <section class="policy-card" data-reveal>
        <h2>Auf dieser Website verwendete Cookies</h2>
        <p>Die Website kann Folgendes verwenden:</p>
        <ul>
          <li>Google Analytics, um anonyme Informationen über die Nutzung der Website zu erfassen.</li>
          <li>Social-Media-Plugins (z. B. Facebook, Instagram), um Inhalte zu teilen.</li>
          <li>Eingebettete Buchungsfunktionen oder Karten (z. B. Google Maps, Buchungssysteme).</li>
        </ul>
        <p>Gewählte Sprache: Wenn Sie auf eine der Flaggen (IT, EN, DE) klicken, speichert die Website im Browser Ihres Geräts (localStorage) den Eintrag „cdb-language“ mit dem Wert „it“, „en“ oder „de“. Er dient nur dazu, die Hauptadresse der Website in der gewählten Sprache zu öffnen: Er bleibt auf Ihrem Gerät, wird an niemanden weitergegeben und kann jederzeit in den Browsereinstellungen gelöscht werden.</p>
      </section>

      <section class="policy-card" data-reveal>
        <h2>Cookies verwalten</h2>
        <p>Sie können die Cookie-Einstellungen direkt über das Banner verwalten, das beim Öffnen der Website angezeigt wird. Außerdem können Sie Cookies in Ihrem Browser deaktivieren, indem Sie den jeweiligen Anleitungen folgen:</p>
        <ul>
          <li><a href="https://support.google.com/chrome/answer/95647?hl=de" target="_blank" rel="noopener">Google Chrome</a></li>
          <li><a href="https://support.mozilla.org/de/kb/cookies-und-website-daten-in-firefox-loschen" target="_blank" rel="noopener">Mozilla Firefox</a></li>
          <li><a href="https://support.microsoft.com/de-de/microsoft-edge/eliminare-i-cookie-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener">Microsoft Edge</a></li>
          <li><a href="https://support.apple.com/de-de/guide/safari/sfri11471/mac" target="_blank" rel="noopener">Safari (Mac)</a></li>
        </ul>
        <button type="button" class="button" @click="openPreferences">Cookie-Einstellungen</button>
      </section>

      <section class="policy-card" data-reveal>
        <h2>Verantwortlicher</h2>
        <p><strong>Cuore di Bosco – B&amp;B</strong><br>E-Mail: <a href="mailto:info@cuoredibosco.it"><em>info@cuoredibosco.it</em></a></p>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import cookies from "~/assets/images/cookies.webp";

useHead({
  title: "Cookie- und Datenschutzerklärung | Cuore di Bosco – B&B Prada di Brentonico",
  meta: [
    {
      name: "description",
      content:
        "Datenschutzerklärung und Cookie-Richtlinie der Website cuoredibosco.it. Erfahren Sie, wie wir mit Ihren Daten und Cookies umgehen.",
    },
    {
      property: "og:title",
      content: "Cookie- und Datenschutzerklärung | Cuore di Bosco – B&B Prada di Brentonico",
    },
    {
      property: "og:description",
      content:
        "Datenschutzerklärung und Cookie-Richtlinie der Website cuoredibosco.it. Erfahren Sie, wie wir mit Ihren Daten und Cookies umgehen.",
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      property: "og:url",
      content: "https://www.cuoredibosco.it/de/datenschutz",
    },
    {
      property: "og:image",
      content: "https://www.cuoredibosco.it/images/cuore-casa.webp",
    },
  ],
  link: [{ rel: "canonical", href: "https://www.cuoredibosco.it/de/datenschutz" }],
});

const root = ref<HTMLElement | null>(null);
useReveal(root);
const { openPreferences } = useCookieConsent();
</script>

<style scoped src="../../assets/css/pages/privacy.css"></style>

<template>
  <div ref="root">
    <div class="band">
      <section class="policy-hero">
        <div class="hero-text">
          <h1>COOKIES PRIVACY POLICY</h1>
        </div>
        <figure class="hero-photo">
          <img :src="cookies" alt="Gingerbread house and house-shaped biscuits" decoding="async">
        </figure>
      </section>
    </div>

    <div class="policy">
      <section class="policy-card" data-reveal>
        <h2>Cuore di Bosco Cookie Policy</h2>
        <p>This website (<strong>cuoredibosco.it</strong>) uses cookies to ensure proper functioning and improve users’ browsing experience.</p>
      </section>

      <section class="policy-card" data-reveal>
        <h2>What are cookies</h2>
        <p>Cookies are small text files that websites send to the user’s device during browsing. They are used to collect information about how the user uses the site, to store preferences, and to provide personalised content.</p>
      </section>

      <section class="policy-card" data-reveal>
        <h2>Types of cookies used</h2>
        <ol>
          <li><strong>Technical cookies (necessary):</strong> essential for the correct functioning of the site and do not require user consent.</li>
          <li><strong>Functionality cookies:</strong> allow the site to remember the user’s choices (such as language or login credentials). They can be disabled, but some features may not be available.</li>
          <li><strong>Third-party cookies (analytics and profiling):</strong> tools like Google Analytics, maps, or social plugins that collect data for statistical or advertising purposes. These cookies require explicit user consent.</li>
        </ol>
      </section>

      <section class="policy-card" data-reveal>
        <h2>Cookies used on this site</h2>
        <p>The site may use:</p>
        <ul>
          <li>Google Analytics to collect anonymous information about site usage.</li>
          <li>Social plugins (e.g., Facebook, Instagram) to share content.</li>
          <li>Booking or embedded maps (e.g., Google Maps, booking systems).</li>
        </ul>
        <p>Chosen language: when the user clicks one of the flags (IT, EN, DE), the site saves the entry "cdb-language" with the value "it", "en" or "de" in the browser of their device (localStorage). It is used only to open the site's main address in the chosen language: it stays on the device, is not sent to anyone and can be deleted at any time in the browser settings.</p>
      </section>

      <section class="policy-card" data-reveal>
        <h2>How to manage cookies</h2>
        <p>You can manage cookie preferences directly from the banner shown when opening the site. Additionally, you can disable them from your browser by following these specific instructions:</p>
        <ul>
          <li><a href="https://support.google.com/chrome/answer/95647?hl=en" target="_blank" rel="noopener">Google Chrome</a></li>
          <li><a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" target="_blank" rel="noopener">Mozilla Firefox</a></li>
          <li><a href="https://support.microsoft.com/en-us/microsoft-edge/eliminare-i-cookie-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener">Microsoft Edge</a></li>
          <li><a href="https://support.apple.com/en-us/guide/safari/sfri11471/mac" target="_blank" rel="noopener">Safari (Mac)</a></li>
        </ul>
        <button type="button" class="button" @click="openPreferences">Cookie preferences</button>
      </section>

      <section class="policy-card" data-reveal>
        <h2>Data Controller</h2>
        <p><strong>Cuore di Bosco – B&amp;B</strong><br>Email: <a href="mailto:info@cuoredibosco.it"><em>info@cuoredibosco.it</em></a></p>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import cookies from "~/assets/images/cookies.webp";

useHead({
  title: "Cookie & Privacy Policy | Cuore di Bosco - B&B Prada di Brentonico",
  meta: [
    {
      name: "description",
      content:
        "Privacy and cookie policy for cuoredibosco.it. Learn how we manage your data and cookies.",
    },
    {
      property: "og:title",
      content: "Cookie & Privacy Policy | B&B Cuore di Bosco",
    },
    {
      property: "og:description",
      content:
        "Privacy and cookie policy for cuoredibosco.it.",
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      property: "og:url",
      content: "https://www.cuoredibosco.it/en/privacy-policy",
    },
    {
      property: "og:image",
      content: "https://www.cuoredibosco.it/images/cuore-casa.webp",
    },
  ],
  link: [{ rel: "canonical", href: "https://www.cuoredibosco.it/en/privacy-policy" }],
});

const root = ref<HTMLElement | null>(null);
useReveal(root);
const { openPreferences } = useCookieConsent();
</script>

<style scoped src="../../assets/css/pages/privacy.css"></style>

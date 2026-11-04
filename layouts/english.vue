<template>
    <header>
        <TopNavbar />
    </header>

    <CookieBanner />

    <div id="page">
        <main>
            <Toast message="Welcome to B&B Cuore di Bosco. See you soon!"
                type="warning" />
            <slot />
            <a href="https://wa.me/393494960228" target="_blank" class="whatsapp">
                <div class="whatsapp-btn" data-nb_top="-10px" data-nb_right="-10px">
                    <!-- WhatsApp SVG omitted for brevity -->
                    <span class="ctc_cta">WhatsApp!</span>
                </div>
            </a>
        </main>

        <footer>
            <div class="footer-content">
                <h2 class="footer-title">We’re waiting for you!</h2>
                <p class="footer-actions">
                    Booking is very easy: you can email us at <a
                        href="mailto:info@cuoredibosco.it">info@cuoredibosco.it</a>
                    or send a WhatsApp or Telegram message to <a href="tel:+3934960228">349 4960228</a>, and we’ll reply
                    as soon as possible!
                </p>
                <div class="footer-cards">
                    <a href="https://maps.app.goo.gl/eWviFC8GAjJaqzSU6" target="_blank" class="card link">
                        <h3>How to reach us</h3>
                        <img src="/images/altervista/localization.png"
                            alt="point" width="64" />
                        <p>Set this address on Google Maps: it will bring you straight to us!</p>
                        <p><strong>B&B Cuore di Bosco</strong><br />
                            Via Gardesani, 15<br />
                             Prada di Brentonico (TN)</p>
                    </a>
                    <div class="card">
                        <h3>Opening Hours</h3>
                        <img src="/images/altervista/home.png" alt="home"
                            width="64" />
                        <p>Check-in 3:00 PM – 6:00 PM<br />
                            Check-out 9:00 AM – 10:30 AM</p>
                        <p><strong>B&B Cuore di Bosco</strong><br />
                            CIN IT022025C1W3ZHJVK4<br />
                            CF MLCMRA86P66L781J</p>
                    </div>
                    <div class="card">
                        <h3>Contacts</h3>
                        <img src="/images/altervista/phone-call.png"
                            alt="phone" width="64" />
                        <p>You can write to us at <a href="tel:+393494960228">+39 3494960228</a><br />
                            or email us at <a href="mailto:info@cuoredibosco.it">info@cuoredibosco.it</a></p>
                    <p>
                             <a href="https://www.facebook.com/profile.php?id=61583661897314"
                                target="_blank"
                                rel="noopener"
                                aria-label="Facebook"
                                >
                                <img src="/images/altervista/facebook-2.png" alt="Facebook" width="50" />
                            </a>
                        &nbsp;
                             <a href="https://www.instagram.com/bbcuoredibosco/"
                                target="_blank"
                                rel="noopener"
                                aria-label="Instagram"
                                >
                                <img src="/images/altervista/instagram-1.png" alt="Instagram" width="50" />
                            </a>
                        </p></div>
                    <div>
                    </div>
                </div>
                <p><button type="button" class="link cookie-preferences" @click="openPreferences">Cookie preferences</button></p>
            </div>
        </footer>

        <MobileBottomBar lang="en" />
    </div>
</template>



<script setup lang="ts">
import Toast from '~/components/toast.vue';

const { setLocale } = useI18n();
setLocale("en");
const { openPreferences } = useCookieConsent();

useHead({
  htmlAttrs: { lang: 'en' },
  meta: [
    { name: 'geo.position', content: '45.8015;10.9562' },
    { name: 'geo.placename', content: 'Prada di Brentonico, Trentino' },
    { name: 'geo.region', content: 'IT-TN' },
    { name: 'ICBM', content: '45.8015, 10.9562' },
    { name: 'place:location:latitude', content: '45.8015' },
    { name: 'place:location:longitude', content: '10.9562' },
  ],
  link: [
    { rel: 'alternate', hreflang: 'it', href: 'https://www.cuoredibosco.it/it' },
    { rel: 'alternate', hreflang: 'en', href: 'https://www.cuoredibosco.it/en' },
    { rel: 'alternate', hreflang: 'x-default', href: 'https://www.cuoredibosco.it/it' },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(JSON.stringify(lodgingBusinessJsonLd('en'))),
    },
  ],
});
</script>

<style scoped>
#page {
    margin-top: 80px;
}

header {
    top: 0;
    gap: 1.5em;
    position: fixed;
    z-index: 10;
    background-color: var(--color-background);
    width: 100%;
}

.footer-content {
    background-color: var(--color-background);
    padding: 2em;
    text-align: center;
}

.cookie-preferences {
    font: inherit;
    background: none;
    border: 0;
    padding: 0;
}

.footer-cards {
    display: flex;
    justify-content: center;
    gap: 3em;
    flex-wrap: wrap;
    margin-top: 2em;
}

.card {
    text-decoration: none;
    color: black;
    width: 400px;
}

.whatsapp {
    position: fixed;
    bottom: 15px;
    right: 15px;
    cursor: pointer;
    z-index: 100;
}

.whatsapp-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #e4e4e4;
    color: #7f7d7d;
    padding: 0 12px;
    border-radius: 25px;
    font-size: 13px;
    line-height: 32px;
}

@media (max-width: 1024px) {
    #page {
        margin-top: 50px;
        padding-bottom: 70px;
    }

    .whatsapp {
        display: none;
    }

    p {
        font-size: 14pt;
    }

    h1,
    .page-title,
    .landing-title {
        font-size: 24pt;
    }

    h2 {
        font-size: 18pt;
    }

    h3 {
        font-size: 16pt;
    }
}
</style>
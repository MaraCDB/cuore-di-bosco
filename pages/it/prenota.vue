<template>
  <div>
    <div class="welcome">
      <img decoding="async" width="1400" height="800" class="landing-image" alt="casa" :src="camere"
        data-object-fit="cover" sizes="(max-width: 1200px) 100vw, 1200px"><span aria-hidden="true"
        style="background-color:#526a71"></span>
      <div class="landing-text">
        <h1 class="page-title text-white">PRENOTA</h1>
      </div>
    </div>

    <div class="booking-widget js-booking-engine-container" data-idstruttura="68002" data-tipostruttura="bbit"
      data-tipo="widget" data-lingua="it"
      data-action="https://www.bed-and-breakfast.it/it/trentino-alto-adige/bb-cuore-di-bosco-brentonico/68002"
      data-colore="green" data-wl="true"></div>

    <section class="text-center intro-section">
      <p>Benvenuti al&nbsp;<strong>B&amp;B&nbsp;<em>Cuore di Bosco</em></strong>,<br>un rifugio immerso nella natura
        della&nbsp;<strong>Vallagarina</strong>,<br>sull’A<strong>ltopiano di Brentonico</strong>,&nbsp;<strong>il
          giardino d’Europa</strong>.<br>Circondati da rigogliose montagne, il tempo rallenta<br>e la tranquillità regna
        sovrana.</p>
      <p>Di b&b ce ne sono tanti, ma noi speriamo di offrirvi<br> un mix di esperienze speciali: la bellezza delle
        montagne intorno,<br>
        la passione per la cucina e l’ospitalità e tutto l’entusiasmo<br> che mettiamo nel nostro lavoro!</p>
      <p>Per esigenze alimentari particolari come vegetariano,<br> vegano, no glutine, no lattosio e altre siamo a tua
        disposizione,<br> ti chiediamo di avvisarci prima dell’arrivo <br>per poterci organizzare al meglio!</p>
      <p> Ci vediamo presto!</p>
    </section>

    <div class="text-center">
      <figure class="separator-wrapper">
        <img decoding="async" class="separator" :src="separator" alt="separator" />
      </figure>
    </div>

    <section class="intro">
      <h2 class="intro-title">Scopri le nostre camere</h2>
      <blockquote class="intro-text">
        <p>B&amp;B Cuore di Bosco è la nostra e la vostra casa in
          montagna, un rifugio di pace e quiete dove riposare mente e cuore</p>
        <p>Le camere sono spaziose e luminose, ideali sia per coppie sia per famiglie.
           Offrono comfort moderni, bagno privato, biancheria e prodotti igiene inclusi e un’atmosfera
           che invita al riposo.</p><p>Su richiesta sono disponibili dotazioni dedicate ai più piccoli:
            lettino con materasso, lenzuola e coperte, fasciatoio e scalda biberon, spondine per letto,
             vasino e scalini per il bagno per tutte le età. 
             E poi libri, colori e giochi! Per un soggiorno sereno anche a chi viaggia con bambini.</p>
      </blockquote>
    </section>

    <section class="rooms">
      <!-- CAMERA LAMPONE -->
      <div class="room-block" id="lampone">
        <div class="card text-center">
          <figure>
            <img decoding="async" width="128" height="128"
              src="/images/altervista/raspberry.png" alt="lampone">
          </figure>
          <div class="room-info">
            <h2>LAMPONE</h2>
            <p class="room-short">Spaziosa e accogliente, adatta a famiglie che desiderano comfort e tranquillità.</p>
            <p>Ampia camera da 34 mq con letto matrimoniale e due letti singoli. Armadio con cassettiera, bollitore,
              frigobar.
              Bagno privato con doccia, lavabo e bidet. Prodotti per igiene personale, pulizia e biancheria inclusi.</p>
            <p>Culla attrezzata, sponde per letti e fasciatoio su richiesta.
              Per famiglie con bambini tutto lo spazio e le comodità necessarie!</p>
            <h3>da 2 a 4 posti letto adulti</h3>
          </div>
        </div>
        <div class="room-gallery">
          <img
            v-for="(photo, i) in lamponePhotos"
            :key="i"
            :src="photo"
            :alt="`Camera Lampone foto ${i + 1}`"
            loading="lazy"
            @click="openLightbox(lamponePhotos, i)"
          />
        </div>
      </div>

      <!-- CAMERA MIRTILLO -->
      <div class="room-block" id="mirtillo">
        <div class="card text-center">
          <figure>
            <img decoding="async" width="128" height="128"
              src="/images/altervista/blueberry.png" alt="mirtillo">
          </figure>
          <div class="room-info">
            <h2>MIRTILLO</h2>
            <p class="room-short">Fresca e luminosa, perfetta per chi ama la natura.</p>
            <p>Ampia camera matrimoniale da 28 mq con letto matrimoniale. Armadio con cassettiera, zona relax con divano e
              scrivania. Divano letto matrimoniale per aggiungere due ospiti in più. 
              Bagno privato con doccia, lavabo e bidet. Prodotti per igiene personale, pulizia e biancheria inclusi.
            </p>
            <p>Culla attrezzata, sponde per letti e fasciatoio su richiesta.
              Per famiglia o tra amici, con vista panoramica e pace!</p>
            <h3>da 2 a 4 posti letto adulti</h3>
          </div>
        </div>
        <div class="room-gallery">
          <img
            v-for="(photo, i) in mirtilloPhotos"
            :key="i"
            :src="photo"
            :alt="`Camera Mirtillo foto ${i + 1}`"
            loading="lazy"
            @click="openLightbox(mirtilloPhotos, i)"
          />
        </div>
      </div>
    </section>

    <!-- Lightbox -->
    <Teleport to="body">
      <div v-if="lightbox.visible" class="lightbox-overlay" @click.self="closeLightbox">
        <button class="lightbox-close" @click="closeLightbox" aria-label="Chiudi">✕</button>
        <button class="lightbox-prev" @click="prevPhoto" aria-label="Precedente">&#8249;</button>
        <img :src="lightbox.images[lightbox.index]" class="lightbox-img" :alt="`Foto ${lightbox.index + 1}`" />
        <button class="lightbox-next" @click="nextPhoto" aria-label="Successiva">&#8250;</button>
        <div class="lightbox-counter">{{ lightbox.index + 1 }} / {{ lightbox.images.length }}</div>
      </div>
    </Teleport>

    <div class="welcome">
      <img decoding="async" width="1400" height="800" class="service-image" alt="casa" :src="colazioni"
        data-object-fit="cover" sizes="(max-width: 1200px) 100vw, 1200px" />
      <div class="landing-text">
        <h1 class="page-title">I NOSTRI SERVIZI</h1>
      </div>
    </div>

    <section>
      <div class="wp-block-group">
        <figure class="icon"><img src="/images/altervista/wifi.png"
            alt="FREE WIFI" />
          <figcaption>FREE WIFI</figcaption>
        </figure>
        <figure class="icon"><img src="/images/altervista/towels-1.png"
            alt="ASCIUGAMANI E BIANCHERIA INCLUSI" />
          <figcaption>ASCIUGAMANI E BIANCHERIA INCLUSI</figcaption>
        </figure>
        <figure class="icon"><img src="/images/altervista/products.png"
            alt="DOTAZIONI DI CORTESIA PER GLI OSPITI" />
          <figcaption>DOTAZIONI DI CORTESIA PER GLI OSPITI</figcaption>
        </figure>
        <figure class="icon"><img src="/images/altervista/shower.png"
            alt="DOCCIA E BAGNO PRIVATI" />
          <figcaption>DOCCIA E BAGNO PRIVATI</figcaption>
        </figure>
        <figure class="icon"><img src="/images/altervista/breakfast.png"
            alt="COLAZIONE DOLCE E SALATA" />
          <figcaption>COLAZIONE DOLCE E SALATA</figcaption>
        </figure>
        <figure class="icon"><img src="/images/altervista/kettle.png"
            alt="SET BOLLITORE" />
          <figcaption>SET BOLLITORE</figcaption>
        </figure>
        <figure class="icon"><img
            src="/images/altervista/laundry-machine.png"
            alt="SERVIZIO LAVANDERIA" />
          <figcaption>SERVIZIO LAVANDERIA</figcaption>
        </figure>
        <figure class="icon"><img src="/images/altervista/bicycle.png"
            alt="BICICLETTE A DISPOSIZIONE" />
          <figcaption>BICICLETTE A DISPOSIZIONE</figcaption>
        </figure>
        <figure class="icon"><img src="/images/altervista/toys.png"
            alt="GIOCHI PER BAMBINI" />
          <figcaption>GIOCHI PER BAMBINI</figcaption>
        </figure>
        <figure class="icon"><img src="/images/altervista/pencils.png"
            alt="DOTAZIONI PER BAMBINI" />
          <figcaption>DOTAZIONI PER BAMBINI</figcaption>
        </figure>
        <figure class="icon"><img src="/images/altervista/crib.png"
            alt="CULLA PER BAMBINI" />
          <figcaption>CULLA PER BAMBINI</figcaption>
        </figure>
        <figure class="icon"><img src="/images/altervista/coloring.png"
            alt="MATERIALI PER BAMBINI" />
          <figcaption>MATERIALI PER BAMBINI</figcaption>
        </figure>
        <figure class="icon"><img src="/images/altervista/baby-carrier.png"
            alt="SUPPORTI PER PORTARE" />
          <figcaption>SUPPORTI PER PORTARE</figcaption>
        </figure>
        <figure class="icon"><img src="/images/altervista/bookshelf.png"
            alt="LIBRERIA PER ADULTI E BAMBINI" />
          <figcaption>LIBRERIA PER ADULTI E BAMBINI</figcaption>
        </figure>
        <figure class="icon"><img src="/images/altervista/picnic-basket.png"
            alt="SERVIZIO PIC-NIC" />
          <figcaption>SERVIZIO PIC-NIC</figcaption>
        </figure>
      </div>
    </section>

    <section class="text-left">
      <p><b>Servizi per famiglie</b></p>

      <p>Sappiamo bene quanto è complicato spostarsi e rilassarsi con uno o più figli!<br>
        Per questo abbiamo cercato di rendere la vita più facile e la vacanza più rilassata ai genitori! Da noi
        troverete:</p>
      <p>BABY KIT: Abbiamo tutto quello che serve! Fasciatoio con vaschetta per bagno o vasino, seggiolone,
        scaldabiberon o microonde a disposizione in sala colazione,
        frigobar in camera, passeggino, marsupio 6/36 mesi o preschool 3-6 anni o fasce (con cauzione), scaletta o
        gradino per il bagno, piattini, posate e bicchieri da bimbi,
        libreria ed angolo giochi attrezzato (in realizzazione).</p>
      <p>SCRIVICI! A colazione preferiscono qualcosa di particolare? Informateci e ci attrezziamo! <br> Giornata grigia?
        Organizziamo la merenda insieme! Merenda per i piccoli e aperitivo relax per i grandi!</p>
      <p>NOLEGGIO BICI: le nostre bici per grandi e piccoli sono a vostra disposizione (con cauzione)</p>
      <p>PIC NIC DAY: Gita nel bosco? Prepariamo noi il cestino, preavvisateci 1-2 giorni prima con le vostre preferenze
        e l’orario e provvediamo al cesto pronto da portare via. (servizio a pagamento)</p>
      <p></p>

      <p><b>Servizi in camera</b></p>
      <p>Nelle nostre stanze attrezzate troverai:</p>
      <p>Bagno con doccia, bidet, wc <br>
        Kit asciugamani per ogni ospite<br>
        Pulizia regolare<br>
        Prodotti ecologici ricaricabili per l’igiene personale<br>
        Omaggio di benvenuto<br>
        Bicchieri e tazze a disposizione<br>
        Materiale ecologico per pulizie, scopa e paletta<br>
        Stendino e mollette in balcone (clima permettendo)
      </p>

      <p><b>Altri servizi per te!</b></p>
      <p>Wi-fi gratuita <br> Servizio deposito bici / scarponi / sci e altro materiale <br>
        Servizio a richiesta di lavanderia express con prodotti ecologici, biodegradabili certificati (a pagamento)<br>
        Angolo libreria e relax (orario 15-18) con ampia terrazza (clima permettendo)<br>
        Nell’apposito stand inoltre troverei tutte le mappe e i depliant informativi di APT Rovereto e Vallagarina.
      </p>
    </section>
  </div>
</template>

<script lang="ts" setup>
import camere from "~/assets/images/camere.webp";
import colazioni from "~/assets/images/colazioni.webp";
import separator from "~/assets/images/separator.webp";

// ── Foto camere ──────────────────────────────────────────────────────────────
// Metti le foto in public/images/lampone/ e public/images/mirtillo/
// nominate 1.webp, 2.webp, 3.webp, 4.webp (o .jpg se preferisci)
const lamponePhotos = [
  '/images/lampone/1.webp',
  '/images/lampone/2.webp',
  '/images/lampone/3.webp',
  '/images/lampone/4.webp',
];
const mirtilloPhotos = [
  '/images/mirtillo/1.webp',
  '/images/mirtillo/2.webp',
  '/images/mirtillo/3.webp',
  '/images/mirtillo/4.webp',
];

// ── Lightbox ──────────────────────────────────────────────────────────────────
const lightbox = reactive({
  visible: false,
  images: [] as string[],
  index: 0,
});

function openLightbox(images: string[], index: number) {
  lightbox.images = images;
  lightbox.index = index;
  lightbox.visible = true;
}

function closeLightbox() {
  lightbox.visible = false;
}

function prevPhoto() {
  lightbox.index = (lightbox.index - 1 + lightbox.images.length) % lightbox.images.length;
}

function nextPhoto() {
  lightbox.index = (lightbox.index + 1) % lightbox.images.length;
}

function handleKeydown(e: KeyboardEvent) {
  if (!lightbox.visible) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') prevPhoto();
  if (e.key === 'ArrowRight') nextPhoto();
}

onMounted(() => window.addEventListener('keydown', handleKeydown));
onBeforeUnmount(() => window.removeEventListener('keydown', handleKeydown));

useHead({
  title: "Prenota il tuo soggiorno | B&B Cuore di Bosco - Vacanze famiglie Brentonico",
  meta: [
    {
      name: "description",
      content:
        "Prenota al B&B Cuore di Bosco: vacanze in montagna per famiglie con bambini a Prada di Brentonico. Kit bimbo, colazioni genuine e natura nel Trentino.",
    },
    {
      name: "keywords",
      content:
        "prenotazione B&B famiglie, vacanze montagna bambini Trentino, B&B Cuore di Bosco, Prada di Brentonico, bed and breakfast famiglie, kit bimbo montagna, soggiorno famiglia Brentonico",
    },
    {
      property: "og:title",
      content: "Prenota | B&B Cuore di Bosco - Vacanze per famiglie in Trentino",
    },
    {
      property: "og:description",
      content:
        "Prenota la tua vacanza in montagna per famiglie con bambini al B&B Cuore di Bosco. Kit bimbo, colazioni fatte in casa e natura a Brentonico.",
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      property: "og:url",
      content: "https://www.cuoredibosco.it/it/prenota",
    },
    {
      property: "og:image",
      content: "https://www.cuoredibosco.it/images/cuore-casa.webp",
    },
    {
      name: "twitter:card",
      content: "summary_large_image",
    },
    {
      name: "twitter:title",
      content: "Prenota | B&B Cuore di Bosco - Famiglie in montagna",
    },
    {
      name: "twitter:description",
      content:
        "Prenota al B&B Cuore di Bosco: vacanze in montagna per famiglie con bambini a Brentonico, Trentino.",
    },
  ],
  link: [
    {
      rel: "canonical",
      href: "https://www.cuoredibosco.it/it/prenota",
    },
  ],
  script: [
    {
      innerHTML: 'var wdgBeConf = { autoInit: false };',
    },
    {
      src: "https://d117yjdt0789wg.cloudfront.net/CDN-widget/grunt/wdg-booking-engine.min.js",
      defer: true,
    },
  ]
});

onMounted(() => {
  const w = window as any;
  const initWidget = () => {
    if (w.WdgBe && typeof w.WdgBe.wdgInitAll === 'function') {
      w.WdgBe.wdgInitAll();
    }
  };
  if (w.WdgBe) {
    initWidget();
  } else {
    const interval = setInterval(() => {
      if (w.WdgBe) {
        clearInterval(interval);
        initWidget();
      }
    }, 200);
    setTimeout(() => clearInterval(interval), 10000);
  }
});

</script>

<style>
section:where(:not(.redesign, .redesign *)) {
  margin: 1em auto;
  max-width: 1200px;
  padding: 2rem;
}

.booking-widget:where(:not(.redesign, .redesign *)) {
  margin-top: 1.5em;
}

.intro-section:where(:not(.redesign, .redesign *)) {
  margin-top: 0.5em;
}

.bg-red:where(:not(.redesign, .redesign *)) {
  background-color: red;
}

.page-title:where(:not(.redesign, .redesign *)) {
  font-size: 42pt;
  color: white;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
}

.landing-image:where(:not(.redesign, .redesign *)) {
  width: 100%;
  height: 400px;
  object-fit: cover;
  object-position: center 50%;
  display: block;
}

.opacity50:where(:not(.redesign, .redesign *)) {
  opacity: 0.5;
}

.landing-title:where(:not(.redesign, .redesign *)) {
  line-height: 1.25;
  font-size: 28pt;
  color: white;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
}

.welcome:where(:not(.redesign, .redesign *)) {
  position: relative;
  overflow: hidden;
}

.contact-us:where(:not(.redesign, .redesign *)) {
  position: relative;
  overflow: hidden;
}

.landing-text:where(:not(.redesign, .redesign *)) {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.intro:where(:not(.redesign, .redesign *)) {
  padding: 2em;
  margin: auto;
  display: flex;
  flex-direction: column;
  text-align: center;
  font-size: 16pt;
  max-width: 700px;
}

.content-wrapper:where(:not(.redesign, .redesign *)) {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  align-items: center;
}

.image-container:where(:not(.redesign, .redesign *)) {
  flex: 1 1 45%;
  margin: 0;
}

.image-container img:where(:not(.redesign, .redesign *)) {
  width: 100%;
  max-height: 500px;
  height: auto;
  display: block;
  border-radius: 8px;
  object-fit: cover;
}

.text-content:where(:not(.redesign, .redesign *)) {
  flex: 1 1 45%;
  font-size: 16pt;
  color: #333;
}

.text-content h2:where(:not(.redesign, .redesign *)) {
  font-size: 18pt;
}

.separator-wrapper:where(:not(.redesign, .redesign *)) {
  display: flex;
  margin: 0px;
  justify-content: center;
}

.separator:where(:not(.redesign, .redesign *)) {
  display: block;
  margin: 0.5rem 0;
  /* max-width: 100%; */
  min-width: 100px;
  width: 200px;
}

.text-content p:where(:not(.redesign, .redesign *)) {
  line-height: 1.7;
  margin-bottom: 1rem;
}

.photos:where(:not(.redesign, .redesign *)) {
  display: flex;
  gap: 1em;
}

.photos img:where(:not(.redesign, .redesign *)) {
  width: 100%;
  height: auto;
  max-height: 300px;
  object-fit: cover;
}

.card:where(:not(.redesign, .redesign *)) {
  flex: 1 1 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 12px;
  background-color: #fff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  background-color: var(--color-background);
  padding: 2em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 300px;
}

.room-info h2:where(:not(.redesign, .redesign *)) {
  font-size: 1.6rem;
  font-weight: bold;
  margin-top: 1rem;
  color: #526a71;
}

.room-info h3:where(:not(.redesign, .redesign *)) {
  font-size: 1.2rem;
  color: #333;
  margin-top: 1rem;
}

.room-short:where(:not(.redesign, .redesign *)) {
  font-weight: 500;
  font-style: italic;
  color: #526a71;
  margin: 0.5rem 0 1rem;
}

.room-list:where(:not(.redesign, .redesign *)) {
  display: flex;
  flex-direction: column;
  font-size: 14pt;
  gap: 1em;
}

.room-list div:where(:not(.redesign, .redesign *)) {
  text-align: left;
}

section.rooms:where(:not(.redesign, .redesign *)) {
  display: flex !important;
  flex-direction: row;
  gap: 5rem;
  max-width: 1050px;
  width: 100%;
  margin: 0 auto 2rem;
  padding: 0 2rem;
  align-items: flex-start;
  box-sizing: border-box;
}

.room-block:where(:not(.redesign, .redesign *)) {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;
}

.room-block .card:where(:not(.redesign, .redesign *)) {
  max-width: 100%;
  width: 100%;
}

.room-gallery:where(:not(.redesign, .redesign *)) {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
  width: 100%;
}

.room-gallery img:where(:not(.redesign, .redesign *)) {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.room-gallery img:hover:where(:not(.redesign, .redesign *)) {
  transform: scale(1.03);
  opacity: 0.85;
}

/* ── Lightbox ── */
.lightbox-overlay:where(:not(.redesign, .redesign *)) {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.88);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.lightbox-img:where(:not(.redesign, .redesign *)) {
  max-width: 90vw;
  max-height: 85vh;
  object-fit: contain;
  border-radius: 4px;
}

.lightbox-close:where(:not(.redesign, .redesign *)) {
  position: absolute;
  top: 1rem;
  right: 1.5rem;
  background: none;
  border: none;
  color: #fff;
  font-size: 2rem;
  cursor: pointer;
  line-height: 1;
  padding: 0.25rem 0.5rem;
}

.lightbox-prev:where(:not(.redesign, .redesign *)),
.lightbox-next:where(:not(.redesign, .redesign *)) {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.15);
  border: none;
  color: #fff;
  font-size: 3rem;
  cursor: pointer;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  line-height: 1;
  transition: background 0.2s;
}

.lightbox-prev:hover:where(:not(.redesign, .redesign *)),
.lightbox-next:hover:where(:not(.redesign, .redesign *)) {
  background: rgba(255, 255, 255, 0.3);
}

.lightbox-prev:where(:not(.redesign, .redesign *)) { left: 1rem; }
.lightbox-next:where(:not(.redesign, .redesign *)) { right: 1rem; }

.lightbox-counter:where(:not(.redesign, .redesign *)) {
  position: absolute;
  bottom: 1.25rem;
  left: 50%;
  transform: translateX(-50%);
  color: #fff;
  font-size: 0.9rem;
  letter-spacing: 0.05em;
}

.wp-block-group:where(:not(.redesign, .redesign *)) {
  display: flex;
  flex-wrap: wrap;
  gap: 0rem;
  justify-content: center;
  margin-top: 2em;
}

.icon:where(:not(.redesign, .redesign *)) {
  flex: 0 1 120px;
  text-align: center;
  padding: 1em;
  border-radius: 8px;
  background-color: #f9f9f9;
  transition: transform 0.2s ease-in-out, background-color 0.3s;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
}

.icon:hover:where(:not(.redesign, .redesign *)) {
  transform: scale(1.05);
  background-color: #eef3f5;
}

.icon img:where(:not(.redesign, .redesign *)) {
  max-width: 64px;
  height: auto;
  margin-bottom: 0.5em;
}

figcaption:where(:not(.redesign, .redesign *)) {
  font-size: 0.95rem;
  color: #333;
}

.service-image:where(:not(.redesign, .redesign *)) {
  width: 100%;
  height: 400px;
  object-fit: cover;
  object-position: center 46%;
  display: block;
  opacity: 0.7;
  border-radius: 8px;
}

@media (max-width: 750px) {
  section.rooms:where(:not(.redesign, .redesign *)) {
    flex-direction: column !important;
    align-items: center;
    gap: 2rem;
  }
}

@media (max-width: 600px) {
  .lightbox-prev:where(:not(.redesign, .redesign *)) { left: 0.25rem; }
  .lightbox-next:where(:not(.redesign, .redesign *)) { right: 0.25rem; }

  .landing-text:where(:not(.redesign, .redesign *)) {
    bottom: 1rem;
  }

  .page-title:where(:not(.redesign, .redesign *)) {
    font-size: 2rem;
  }
}

@media (max-width: 1024px) {
  p:where(:not(.redesign, .redesign *)) {
    font-size: 14pt;
  }

  h1:where(:not(.redesign, .redesign *)),
  .page-title:where(:not(.redesign, .redesign *)),
  .landing-title:where(:not(.redesign, .redesign *)) {
    font-size: 24pt;
  }

  h2:where(:not(.redesign, .redesign *)) {
    font-size: 18pt;
  }

  h3:where(:not(.redesign, .redesign *)) {
    font-size: 16pt;
  }
}

@media (max-width: 800px) {
  .landing-title:where(:not(.redesign, .redesign *)) {
    font-size: 24px;
  }

  .separator:where(:not(.redesign, .redesign *)) {
    min-width: 400px;
  }

  .photos:where(:not(.redesign, .redesign *)) {
    display: flex;
    flex-direction: column;
    gap: 1em;
  }

  .icon:where(:not(.redesign, .redesign *)) {
    flex: 0 1 45%;
  }
}

@media (max-width: 500px) {
  .separator:where(:not(.redesign, .redesign *)) {
    min-width: 200px;
  }

  .icon:where(:not(.redesign, .redesign *)) {
    flex: 0 1 100%;
  }
}

</style>
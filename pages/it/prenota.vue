<template>
  <div ref="root">
    <div class="band booking-carousel">
      <SitePhotoCarousel :photos="carouselPhotos" label="Fotografie delle camere e della casa" />
    </div>

    <section class="booking-strip">
      <h1>PRENOTA</h1>
      <div class="booking-widget js-booking-engine-container" data-idstruttura="68002" data-tipostruttura="bbit"
        data-tipo="widget" data-lingua="it"
        data-action="https://www.bed-and-breakfast.it/it/trentino-alto-adige/bb-cuore-di-bosco-brentonico/68002"
        data-colore="green" data-wl="true"></div>
    </section>

    <section class="wrap booking-intro" data-reveal>
      <p>Benvenuti al&nbsp;<strong>B&amp;B&nbsp;<em>Cuore di Bosco</em></strong>, un rifugio immerso nella natura
        della&nbsp;<strong>Vallagarina</strong>, sull’<strong>Altopiano di Brentonico</strong>,&nbsp;<strong>il
          giardino d’Europa</strong>. Circondati da rigogliose montagne, il tempo rallenta e la tranquillità regna
        sovrana.</p>
      <p>Di b&amp;b ce ne sono tanti, ma noi speriamo di offrirvi un mix di esperienze speciali: la bellezza delle
        montagne intorno, la passione per la cucina e l’ospitalità e tutto l’entusiasmo che mettiamo nel nostro lavoro!</p>
      <p>Per esigenze alimentari particolari come vegetariano, vegano, no glutine, no lattosio e altre siamo a tua
        disposizione, ti chiediamo di avvisarci prima dell’arrivo per poterci organizzare al meglio!</p>
      <p>Ci vediamo presto!</p>
    </section>

    <section class="booking-rooms">
      <div class="wrap">
        <div class="rooms-head" data-reveal>
          <h2>Scopri le nostre camere</h2>
          <p>B&amp;B Cuore di Bosco è la nostra e la vostra casa in montagna, un rifugio di pace e quiete dove riposare
            mente e cuore</p>
          <p>Le camere sono spaziose e luminose, ideali sia per coppie sia per famiglie. Offrono comfort moderni, bagno
            privato, biancheria e prodotti igiene inclusi e un’atmosfera che invita al riposo.</p>
          <p>Su richiesta sono disponibili dotazioni dedicate ai più piccoli: lettino con materasso, lenzuola e coperte,
            fasciatoio e scalda biberon, spondine per letto, vasino e scalini per il bagno per tutte le età. E poi libri,
            colori e giochi! Per un soggiorno sereno anche a chi viaggia con bambini.</p>
        </div>
        <article id="lampone" class="room">
          <div class="room-photos" data-reveal>
            <img
              v-for="(photo, i) in lamponePhotos"
              :key="i"
              :src="photo"
              :alt="`Camera Lampone foto ${i + 1}`"
              loading="lazy"
              @click="openLightbox(lamponePhotos, i)"
            />
          </div>
          <div class="room-text" data-reveal>
            <h3>Lampone</h3>
            <p class="lead">Spaziosa e accogliente, adatta a famiglie che desiderano comfort e tranquillità.</p>
            <p>Ampia camera da 34 mq con letto matrimoniale e due letti singoli. Armadio con cassettiera, bollitore,
              frigobar. Bagno privato con doccia, lavabo e bidet. Prodotti per igiene personale, pulizia e biancheria
              inclusi.</p>
            <p>Culla attrezzata, sponde per letti e fasciatoio su richiesta. Per famiglie con bambini tutto lo spazio e
              le comodità necessarie!</p>
            <p class="beds">Da 2 a 4 posti letto adulti</p>
          </div>
        </article>
        <article id="mirtillo" class="room">
          <div class="room-photos" data-reveal>
            <img
              v-for="(photo, i) in mirtilloPhotos"
              :key="i"
              :src="photo"
              :alt="`Camera Mirtillo foto ${i + 1}`"
              loading="lazy"
              @click="openLightbox(mirtilloPhotos, i)"
            />
          </div>
          <div class="room-text" data-reveal>
            <h3>Mirtillo</h3>
            <p class="lead">Fresca e luminosa, perfetta per chi ama la natura.</p>
            <p>Ampia camera matrimoniale da 28 mq con letto matrimoniale. Armadio con cassettiera, zona relax con divano
              e scrivania. Divano letto matrimoniale per aggiungere due ospiti in più. Bagno privato con doccia, lavabo e
              bidet. Prodotti per igiene personale, pulizia e biancheria inclusi.</p>
            <p>Culla attrezzata, sponde per letti e fasciatoio su richiesta. Per famiglia o tra amici, con vista
              panoramica e pace!</p>
            <p class="beds">Da 2 a 4 posti letto adulti</p>
          </div>
        </article>
        <p class="rooms-family" data-reveal>Culla gratis · 1° bambino gratis · 2° bambino al 50% · &lt;12 anni</p>
      </div>
    </section>

    <Teleport to="body">
      <div v-if="lightbox.visible" class="lightbox-overlay" @click.self="closeLightbox">
        <button class="lightbox-close" @click="closeLightbox" aria-label="Chiudi">✕</button>
        <button class="lightbox-prev" @click="prevPhoto" aria-label="Precedente">&#8249;</button>
        <img :src="lightbox.images[lightbox.index]" class="lightbox-img" :alt="`Foto ${lightbox.index + 1}`" />
        <button class="lightbox-next" @click="nextPhoto" aria-label="Successiva">&#8250;</button>
        <div class="lightbox-counter">{{ lightbox.index + 1 }} / {{ lightbox.images.length }}</div>
      </div>
    </Teleport>

    <section class="band services">
      <div class="wrap">
        <h2 data-reveal>I nostri servizi</h2>
        <div class="service-icons" data-reveal>
          <figure v-for="icon in serviceIcons" :key="icon.src">
            <img :src="icon.src" :alt="icon.caption">
            <figcaption>{{ icon.caption }}</figcaption>
          </figure>
        </div>
      </div>
    </section>

    <section class="wrap service-texts">
      <div class="service-column" data-reveal>
        <h3>Servizi per famiglie</h3>
        <p>Sappiamo bene quanto è complicato spostarsi e rilassarsi con uno o più figli! Per questo abbiamo cercato di
          rendere la vita più facile e la vacanza più rilassata ai genitori! Da noi troverete:</p>
        <p>BABY KIT: Abbiamo tutto quello che serve! Fasciatoio con vaschetta per bagno o vasino, seggiolone,
          scaldabiberon o microonde a disposizione in sala colazione, frigobar in camera, passeggino, marsupio 6/36 mesi
          o preschool 3-6 anni o fasce (con cauzione), scaletta o gradino per il bagno, piattini, posate e bicchieri da
          bimbi, libreria ed angolo giochi attrezzato.</p>
        <p>SCRIVICI! A colazione preferiscono qualcosa di particolare? Informateci e ci attrezziamo! Giornata grigia?
          Organizziamo la merenda insieme! Merenda per i piccoli e aperitivo relax per i grandi!</p>
        <p>NOLEGGIO BICI: le nostre bici per grandi e piccoli sono a vostra disposizione (con cauzione)</p>
        <p>PIC NIC DAY: Gita nel bosco? Prepariamo noi il cestino, preavvisateci 1-2 giorni prima con le vostre
          preferenze e l’orario e provvediamo al cesto pronto da portare via. (servizio a pagamento)</p>
      </div>
      <div class="service-column" data-reveal>
        <h3>Servizi in camera</h3>
        <p>Nelle nostre stanze attrezzate troverai:</p>
        <p>Bagno con doccia, bidet, wc<br>
          Kit asciugamani per ogni ospite<br>
          Pulizia regolare<br>
          Prodotti ecologici ricaricabili per l’igiene personale<br>
          Omaggio di benvenuto<br>
          Bicchieri e tazze a disposizione<br>
          Materiale ecologico per pulizie, scopa e paletta<br>
          Stendino e mollette in balcone (clima permettendo)</p>
      </div>
      <div class="service-column" data-reveal>
        <h3>Altri servizi per te!</h3>
        <p>Wi-fi gratuita<br>
          Servizio deposito bici / scarponi / sci e altro materiale<br>
          Servizio a richiesta di lavanderia express con prodotti ecologici, biodegradabili certificati (a pagamento)<br>
          Angolo libreria e relax (orario 15-18) con ampia terrazza (clima permettendo)<br>
          Nell’apposito stand inoltre troverai tutte le mappe e i depliant informativi di APT Rovereto e Vallagarina.</p>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
const root = ref<HTMLElement | null>(null);
useReveal(root);

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

const carouselPhotos: { src: string, alt: string }[] = [
  { src: '/images/home/casa-1600.webp', alt: 'La casa in pietra del B&B Cuore di Bosco a Prada' },
  { src: '/images/lampone/1.webp', alt: 'Camera Lampone foto 1' },
  { src: '/images/lampone/2.webp', alt: 'Camera Lampone foto 2' },
  { src: '/images/lampone/3.webp', alt: 'Camera Lampone foto 3' },
  { src: '/images/lampone/4.webp', alt: 'Camera Lampone foto 4' },
  { src: '/images/lampone/5.webp', alt: 'Camera Lampone foto 5' },
  { src: '/images/home/lampone-balcone-1200.webp', alt: 'Il Monte Baldo innevato visto dal balcone della camera Lampone' },
  { src: '/images/mirtillo/1.webp', alt: 'Camera Mirtillo foto 1' },
  { src: '/images/mirtillo/2.webp', alt: 'Camera Mirtillo foto 2' },
  { src: '/images/mirtillo/3.webp', alt: 'Camera Mirtillo foto 3' },
  { src: '/images/mirtillo/4.webp', alt: 'Camera Mirtillo foto 4' },
  { src: '/images/home/colazione-1280.webp', alt: 'La colazione con la torta fatta in casa' },
];

const serviceIcons = [
  { src: '/images/altervista/wifi.png', caption: 'FREE WIFI' },
  { src: '/images/altervista/towels-1.png', caption: 'ASCIUGAMANI E BIANCHERIA INCLUSI' },
  { src: '/images/altervista/products.png', caption: 'DOTAZIONI DI CORTESIA PER GLI OSPITI' },
  { src: '/images/altervista/shower.png', caption: 'DOCCIA E BAGNO PRIVATI' },
  { src: '/images/altervista/breakfast.png', caption: 'COLAZIONE DOLCE E SALATA' },
  { src: '/images/altervista/kettle.png', caption: 'SET BOLLITORE' },
  { src: '/images/altervista/laundry-machine.png', caption: 'LAVANDERIA' },
  { src: '/images/altervista/bicycle.png', caption: 'BICICLETTE A DISPOSIZIONE' },
  { src: '/images/altervista/toys.png', caption: 'GIOCHI PER BAMBINI' },
  { src: '/images/altervista/pencils.png', caption: 'DOTAZIONI PER BAMBINI' },
  { src: '/images/altervista/crib.png', caption: 'CULLA PER BAMBINI' },
  { src: '/images/altervista/coloring.png', caption: 'MATERIALI PER BAMBINI' },
  { src: '/images/altervista/baby-carrier.png', caption: 'SUPPORTI PER PORTARE' },
  { src: '/images/altervista/bookshelf.png', caption: 'LIBRERIA PER ADULTI E BAMBINI' },
  { src: '/images/altervista/picnic-basket.png', caption: 'PIC-NIC' },
];

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
  const w = window as Window & { WdgBe?: { wdgInitAll?: () => void } };
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

<style scoped>
.booking-carousel{padding:var(--band-pad) 0;--carousel-control:var(--on-forest);--carousel-control-ink:var(--forest)}

.booking-strip{background:var(--lime);padding:var(--band-pad) var(--margin);text-align:center}
.booking-strip h1{font-size:var(--step-display);line-height:1;color:var(--forest-deep);text-align:center;margin-bottom:20px}
.booking-widget{width:100%;max-width:960px;margin:0 auto}

.booking-intro{margin-top:var(--section-gap);margin-bottom:var(--section-gap)}
.booking-intro p,.rooms-head p,.room-text p,.service-column p{max-width:68ch;text-align:justify;hyphens:auto}
.booking-intro p{margin-left:auto;margin-right:auto}

.booking-rooms{background:var(--champagne);padding:var(--band-pad) 0}
.rooms-head h2{margin-bottom:20px}
.room{display:grid;grid-template-columns:minmax(0,7fr) minmax(0,5fr);gap:clamp(32px,5vw,96px);align-items:center;margin-top:32px}
.room:nth-of-type(even){grid-template-columns:minmax(0,5fr) minmax(0,7fr)}
.room:nth-of-type(even) .room-photos{order:2}
.room-photos{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:6px}
.room-photos img{width:100%;aspect-ratio:4/3;object-fit:cover}
.room h3{font-family:var(--display);font-weight:var(--display-weight);font-size:var(--step-title);line-height:1.05;color:var(--forest)}
.room .lead{margin:12px 0 20px}
.room .beds{display:inline-block;margin:8px 0 0;padding:8px 18px;border-radius:999px;background:var(--linen);color:var(--forest-deep);font-weight:600}
.rooms-family{margin:20px 0 0;padding:14px 24px;border-radius:999px;background:var(--lime);color:var(--ink);text-align:center;font-family:var(--sub);font-size:var(--step-small);font-weight:600;text-transform:uppercase;letter-spacing:0.08em}

.services{padding:var(--band-pad) 0}
.services h2{margin-bottom:20px}
.service-icons{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));overflow:hidden;border-radius:16px;background:var(--linen);color:var(--ink)}
.service-icons figure{margin:0;padding:16px 8px;display:grid;justify-items:center;align-content:start;gap:8px;box-shadow:1px 0 0 var(--champagne),0 1px 0 var(--champagne)}
.service-icons img{width:56px;height:56px;object-fit:contain}
.service-icons figcaption{font-size:var(--step-micro);line-height:1.3;overflow-wrap:anywhere;text-align:center}

.service-texts{display:grid;grid-template-columns:minmax(0,1fr);gap:clamp(28px,3.5vw,56px);margin-top:var(--section-gap);margin-bottom:var(--section-gap);align-items:start}
.service-column{border-top:3px solid var(--meadow);padding-top:16px}
.service-column h3{font-family:var(--display);font-weight:var(--display-weight);font-size:var(--step-title);line-height:1.1;color:var(--forest);margin-bottom:10px}
.service-column>:last-child{margin-bottom:0}
@media (min-width:901px){
  .rooms-head h2{margin-bottom:14px}
  .room{gap:clamp(22px,3.5vw,67px);margin-top:22px}
  .room .lead{margin:8px 0 14px}
  .room .beds{padding:8px 13px}
  .rooms-family{margin:14px 0 0;padding:10px 17px}
  .services h2{margin-bottom:14px}
  .service-icons{grid-template-columns:repeat(8,minmax(0,1fr))}
  .service-texts{grid-template-columns:repeat(3,minmax(0,1fr));gap:clamp(22px,3.5vw,67px)}
}
@media (max-width:900px){
  .room,.room:nth-of-type(even){grid-template-columns:minmax(0,1fr)}
  .room:nth-of-type(even) .room-photos{order:0}
}
@media (max-width:520px){
  .booking-intro p,.rooms-head p,.room-text p,.service-column p{text-align:left}
  .service-icons{grid-template-columns:repeat(3,minmax(0,1fr))}
}
</style>

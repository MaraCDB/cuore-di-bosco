<template>
  <div ref="root" class="booking-page">
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

    <section class="booking-intro">
      <div class="booking-intro-photo">
        <img src="/images/home/casa-neve-1600.webp"
          srcset="/images/home/casa-neve-900.webp 900w, /images/home/casa-neve-1600.webp 1600w"
          sizes="(max-width: 900px) 100vw, 50vw" alt="Neve in montagna in Trentino"
          loading="lazy">
      </div>
      <div class="booking-intro-text" data-reveal>
        <p>Benvenuti al&nbsp;<strong>B&amp;B&nbsp;<em>Cuore di Bosco</em></strong>, un rifugio immerso nella natura
          della&nbsp;<strong>Vallagarina</strong>, sull’<strong>Altopiano di Brentonico</strong>,&nbsp;<strong>il
            giardino d’Europa</strong>. Circondati da rigogliose montagne, il tempo rallenta e la tranquillità regna
          sovrana.</p>
        <p>Di b&amp;b ce ne sono tanti, ma noi speriamo di offrirvi un mix di esperienze speciali: la bellezza delle
          montagne intorno, la passione per la cucina e l’ospitalità e tutto l’entusiasmo che mettiamo nel nostro lavoro!</p>
        <p>Per esigenze alimentari particolari come vegetariano, vegano, no glutine, no lattosio e altre siamo a tua
          disposizione, ti chiediamo di avvisarci prima dell’arrivo per poterci organizzare al meglio!</p>
        <p>Ci vediamo presto!</p>
      </div>
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
          <img class="rooms-logo" :src="logo" alt="">
        </div>
        <article id="lampone" class="room">
          <div class="room-photos" data-reveal>
            <button
              v-for="(photo, i) in lamponePhotos"
              :key="photo.src"
              type="button"
              class="room-photo"
              @click="openLightbox(lamponePhotos, i, $event)"
            >
              <img :src="photo.src" :alt="photo.alt" loading="lazy" />
            </button>
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
            <button
              v-for="(photo, i) in mirtilloPhotos"
              :key="photo.src"
              type="button"
              class="room-photo"
              @click="openLightbox(mirtilloPhotos, i, $event)"
            >
              <img :src="photo.src" :alt="photo.alt" loading="lazy" />
            </button>
          </div>
          <div class="room-text" data-reveal>
            <h3>Mirtillo</h3>
            <p class="lead">Fresca e luminosa, perfetta per chi ama la natura.</p>
            <p>Ampia camera matrimoniale da 28 mq con letto matrimoniale. Armadio con cassettiera, zona relax con divano,
              scrivania e set bollitore. Divano letto matrimoniale per aggiungere due ospiti in più. Bagno privato con doccia, lavabo e
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
      <div v-if="lightbox.visible" ref="dialog" class="redesign lightbox" role="dialog" aria-modal="true" :aria-label="lightbox.photos[lightbox.index].alt" @click.self="closeLightbox">
        <button ref="closeButton" type="button" class="lightbox-close" aria-label="Chiudi" @click="closeLightbox">✕</button>
        <button type="button" class="lightbox-prev" aria-label="Precedente" @click="prevPhoto">&#8249;</button>
        <img :src="lightbox.photos[lightbox.index].src" class="lightbox-img" :alt="lightbox.photos[lightbox.index].alt" />
        <button type="button" class="lightbox-next" aria-label="Successiva" @click="nextPhoto">&#8250;</button>
        <div class="lightbox-counter">{{ lightbox.index + 1 }} / {{ lightbox.photos.length }}</div>
      </div>
    </Teleport>

    <section class="band services">
      <div class="wrap">
        <h2 data-reveal>I nostri servizi</h2>
        <div class="service-icons" data-reveal>
          <figure v-for="icon in serviceIcons" :key="icon.src">
            <img :src="icon.src" alt="">
            <figcaption>{{ icon.caption }}</figcaption>
          </figure>
        </div>
      </div>
    </section>

    <section class="wrap service-texts">
      <div class="service-column" data-reveal>
        <h3>Servizi per famiglie</h3>
        <p>Sappiamo bene quanto è complicato spostarsi e rilassarsi con uno o più figli!<br>
          Per questo abbiamo cercato di
          rendere la vita più facile e la vacanza più rilassata ai genitori! Da noi troverete:</p>
        <p>BABY KIT: Abbiamo tutto quello che serve! Fasciatoio con vaschetta per bagno o vasino, seggiolone,
          scaldabiberon o microonde a disposizione in sala colazione, frigobar in camera, passeggino, marsupio 6/36 mesi
          o preschool 3-6 anni o fasce, scaletta o gradino per il bagno, piattini, posate e bicchieri da
          bimbi, libreria ed angolo giochi attrezzato.</p>
      </div>
      <div class="service-column" data-reveal>
        <h3>Servizi in camera</h3>
        <p>Nelle nostre stanze attrezzate troverai:</p>
        <p>Bagno con doccia, bidet, wc<br>
          Kit asciugamani per ogni ospite<br>
          Pulizia regolare<br>
          Prodotti ecologici ricaricabili per l’igiene personale<br>
          Dolcetto di benvenuto<br>
          Angolo tisane con bollitore, tè, camomilla, tisane, bicchieri e tazze<br>
          Materiale ecologico per pulizie, scopa e paletta<br>
          Stendino e mollette in balcone</p>
      </div>
      <div class="service-column" data-reveal>
        <h3>Altri servizi per te!</h3>
        <p>Wi-fi gratuita<br>
          Servizio deposito bici / scarponi / sci e altro materiale<br>
          Servizio a richiesta di lavanderia express con prodotti ecologici, biodegradabili certificati<br>
          Angolo libreria e relax (orario 15-18) con ampia terrazza (clima permettendo)<br>
          Nell’apposito stand inoltre troverai tutte le mappe e i depliant informativi di APT Rovereto e Vallagarina.</p>
        <p>A colazione preferite qualcosa di particolare? Informateci e ci attrezziamo!</p>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import logo from '~/assets/images/logo_400.webp';

const root = ref<HTMLElement | null>(null);
useReveal(root);

type RoomPhoto = { src: string, alt: string };

const lamponePhotos: RoomPhoto[] = [
  { src: '/images/lampone/1.webp', alt: 'Camera Lampone foto 1' },
  { src: '/images/lampone/2.webp', alt: 'Camera Lampone foto 2' },
  { src: '/images/lampone/3.webp', alt: 'Camera Lampone foto 3' },
  { src: '/images/lampone/4.webp', alt: 'Camera Lampone foto 4' },
];
const mirtilloPhotos: RoomPhoto[] = [
  { src: '/images/mirtillo/1.webp', alt: 'Camera Mirtillo foto 1' },
  { src: '/images/mirtillo/2.webp', alt: 'Camera Mirtillo foto 2' },
  { src: '/images/mirtillo/3.webp', alt: 'Camera Mirtillo foto 3' },
  { src: '/images/mirtillo/4.webp', alt: 'Camera Mirtillo foto 4' },
];

const carouselPhotos: { src: string, alt: string }[] = [
  { src: '/images/home/casa-portone-960.webp', alt: 'Il portone in legno della casa sotto l’arco in pietra, con la ghirlanda' },
  { src: '/images/home/terrazza-neve-1280.webp', alt: 'La terrazza coperta di neve con le luci accese e un albero carico di neve' },
  { src: '/images/home/terrazza-estate-1280.webp', alt: 'La terrazza con la vista sui prati e sulle montagne in una giornata di sole' },
  { src: '/images/home/terrazza-tramonto-1280.webp', alt: 'La terrazza al tramonto, con il cielo rosa sopra le montagne' },
  { src: '/images/home/mirtillo-letto-960.webp', alt: 'Il letto matrimoniale della camera Mirtillo con il copriletto a fiori' },
  { src: '/images/home/mirtillo-relax-960.webp', alt: 'La zona relax della camera Mirtillo con il divano azzurro e la scrivania' },
  { src: '/images/home/mirtillo-balcone-960.webp', alt: 'Il balcone della camera Mirtillo con la vista sugli alberi e sulle montagne' },
  { src: '/images/home/lampone-letti-1280.webp', alt: 'La camera Lampone con il letto matrimoniale, il letto singolo e l’armadio dipinto' },
  { src: '/images/home/lampone-angolo-960.webp', alt: 'L’angolo in legno con il bollitore nella camera Lampone' },
  { src: '/images/home/colazione-dolci-1280.webp', alt: 'Il bancone della colazione con torte, dolci e marmellate' },
  { src: '/images/home/sala-colazione-1280.webp', alt: 'La sala colazioni con i tavoli e la panca lungo la parete' },
  { src: '/images/home/colazione-frutta-1280.webp', alt: 'Il bancone della colazione con frutta, succhi e dolci' },
  { src: '/images/home/colazione-bancone-1280.webp', alt: 'Il bancone della sala colazioni con bicchieri, tazze e piatti' },
  { src: '/images/home/sala-tavolo-960.webp', alt: 'Un tavolo della sala colazioni accanto alla finestra' },
  { src: '/images/home/colazione-yogurt-1280.webp', alt: 'Yogurt, succhi, marmellate e una torta sul bancone della colazione' },
  { src: '/images/home/ingresso-mappe-960.webp', alt: 'L’ingresso con il porta-depliant e le mappe del territorio' },
  { src: '/images/home/casa-1600.webp', alt: 'La casa in pietra del B&B Cuore di Bosco a Prada' },
  { src: '/images/lampone/1.webp', alt: 'Camera Lampone foto 1' },
  { src: '/images/lampone/2.webp', alt: 'Camera Lampone foto 2' },
  { src: '/images/lampone/3.webp', alt: 'Camera Lampone foto 3' },
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
  photos: [] as RoomPhoto[],
  index: 0,
});
const closeButton = ref<HTMLButtonElement | null>(null);
const dialog = ref<HTMLElement | null>(null);
let openingButton: HTMLElement | null = null;

function openLightbox(photos: RoomPhoto[], index: number, event: MouseEvent) {
  openingButton = event.currentTarget as HTMLElement;
  lightbox.photos = photos;
  lightbox.index = index;
  lightbox.visible = true;
  nextTick(() => closeButton.value?.focus());
}

function closeLightbox() {
  lightbox.visible = false;
  openingButton?.focus();
  openingButton = null;
}

function prevPhoto() {
  lightbox.index = (lightbox.index - 1 + lightbox.photos.length) % lightbox.photos.length;
}

function nextPhoto() {
  lightbox.index = (lightbox.index + 1) % lightbox.photos.length;
}

function trapFocus(e: KeyboardEvent) {
  const focusable = dialog.value?.querySelectorAll<HTMLElement>('button');
  if (!focusable?.length) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault();
    first.focus();
  }
}

function handleKeydown(e: KeyboardEvent) {
  if (!lightbox.visible) return;
  if (e.key === 'Tab') trapFocus(e);
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') prevPhoto();
  if (e.key === 'ArrowRight') nextPhoto();
}

onMounted(() => window.addEventListener('keydown', handleKeydown));
onBeforeUnmount(() => window.removeEventListener('keydown', handleKeydown));

useHead({
  title: "Prenota | B&B Cuore di Bosco a Brentonico, vicino a Polsa",
  meta: [
    {
      name: "description",
      content:
        "Prenota il tuo soggiorno al B&B Cuore di Bosco a Prada di Brentonico: camere Lampone e Mirtillo, colazione inclusa, kit bimbo e parcheggio gratuito vicino.",
    },
    {
      name: "keywords",
      content:
        "prenotazione B&B famiglie, vacanze montagna bambini Trentino, B&B Cuore di Bosco, Prada di Brentonico, bed and breakfast famiglie, kit bimbo montagna, soggiorno famiglia Brentonico, dove dormire a Polsa sci, B&B vicino alle piste Polsa, vacanza sulla neve Brentonico, B&B per trekking Monte Baldo, B&B Brentonico",
    },
    {
      property: "og:title",
      content: "Prenota | B&B Cuore di Bosco a Brentonico, vicino a Polsa",
    },
    {
      property: "og:description",
      content:
        "Prenota il tuo soggiorno al B&B Cuore di Bosco a Prada di Brentonico: camere Lampone e Mirtillo, colazione inclusa, kit bimbo e parcheggio gratuito vicino.",
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
      content: "Prenota | B&B Cuore di Bosco a Brentonico, vicino a Polsa",
    },
    {
      name: "twitter:description",
      content:
        "Prenota il tuo soggiorno al B&B Cuore di Bosco a Prada di Brentonico: camere Lampone e Mirtillo, colazione inclusa, kit bimbo e parcheggio gratuito vicino.",
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

<style scoped src="../../assets/css/pages/booking.css"></style>

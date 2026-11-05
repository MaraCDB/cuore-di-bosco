<template>
  <div ref="root" class="booking-page">
    <div class="band booking-carousel">
      <SitePhotoCarousel :photos="carouselPhotos" label="Fotos der Zimmer und des Hauses" />
    </div>

    <section class="booking-strip">
      <h1>BUCHEN</h1>
      <div class="booking-widget js-booking-engine-container" data-idstruttura="68002" data-tipostruttura="bbit"
        data-tipo="widget" data-lingua="de"
        data-action="https://www.bed-and-breakfast.it/de/trentino-alto-adige/bb-cuore-di-bosco-brentonico/68002"
        data-colore="green" data-wl="true"></div>
    </section>

    <section class="booking-intro">
      <div class="booking-intro-photo">
        <img src="/images/home/casa-neve-1600.webp"
          srcset="/images/home/casa-neve-900.webp 900w, /images/home/casa-neve-1600.webp 1600w"
          sizes="(max-width: 900px) 100vw, 50vw" alt="Schnee in den Bergen im Trentino"
          loading="lazy">
      </div>
      <div class="booking-intro-text" data-reveal>
        <p>Willkommen im&nbsp;<strong>B&amp;B&nbsp;<em>Cuore di Bosco</em></strong>, einem Rückzugsort mitten in der
          Natur der&nbsp;<strong>Vallagarina</strong>, auf der <strong>Hochebene von Brentonico</strong>,&nbsp;<strong>dem
            Garten Europas</strong>. Umgeben von üppig grünen Bergen vergeht die Zeit langsamer, und überall herrscht
          Ruhe.</p>
        <p>B&amp;Bs gibt es viele, aber wir hoffen, Ihnen eine Mischung aus besonderen Erlebnissen zu bieten: die
          Schönheit der Berge ringsum, unsere Leidenschaft für die Küche und die Gastfreundschaft und all die
          Begeisterung, die wir in unsere Arbeit stecken!</p>
        <p>Bei besonderen Ernährungswünschen wie vegetarisch, vegan, glutenfrei, laktosefrei und anderen sind wir gerne
          für Sie da. Bitte sagen Sie uns vor Ihrer Ankunft Bescheid, damit wir uns gut darauf vorbereiten können!</p>
        <p>Bis bald!</p>
      </div>
    </section>

    <section class="booking-rooms">
      <div class="wrap">
        <div class="rooms-head" data-reveal>
          <h2>Entdecken Sie unsere Zimmer</h2>
          <p>Das B&amp;B Cuore di Bosco ist unser und Ihr Zuhause in den Bergen, ein friedlicher, stiller Rückzugsort, an
            dem Kopf und Herz zur Ruhe kommen</p>
          <p>Die Zimmer sind geräumig und hell, ideal für Paare wie für Familien. Sie bieten modernen Komfort, ein eigenes
            Bad, Bettwäsche und Pflegeprodukte inklusive und eine Atmosphäre, die zum Ausruhen einlädt.</p>
          <p>Auf Wunsch gibt es Ausstattung speziell für die Kleinsten: Kinderbett mit Matratze, Laken und Decken,
            Wickeltisch und Flaschenwärmer, Bettgitter, Töpfchen und Tritthocker fürs Bad für jedes Alter. Und dazu
            Bücher, Buntstifte und Spielsachen! Für einen entspannten Aufenthalt, auch wenn Sie mit Kindern reisen.</p>
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
            <p class="lead">Geräumig und gemütlich, ideal für Familien, die Komfort und Ruhe suchen.</p>
            <p>Großes Zimmer mit 34&nbsp;m², Doppelbett und zwei Einzelbetten. Kleiderschrank mit Schubladen,
              Wasserkocher, Minibar. Eigenes Bad mit Dusche, Waschbecken und Bidet. Körperpflegeprodukte, Reinigung und
              Bettwäsche inklusive.</p>
            <p>Auf Wunsch komplett ausgestattetes Babybett, Bettgitter und Wickeltisch. Für Familien mit Kindern: all der
              Platz und Komfort, den Sie brauchen!</p>
            <p class="beds">2 bis 4 Schlafplätze für Erwachsene</p>
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
            <p class="lead">Frisch und hell, perfekt für alle, die die Natur lieben.</p>
            <p>Großes Doppelzimmer mit 28&nbsp;m² und Doppelbett. Kleiderschrank mit Schubladen, Sitzecke mit Sofa,
              Schreibtisch und Wasserkocher-Set. Doppel-Schlafsofa für zwei zusätzliche Gäste. Eigenes Bad mit Dusche,
              Waschbecken und Bidet. Körperpflegeprodukte, Reinigung und Bettwäsche inklusive.</p>
            <p>Auf Wunsch komplett ausgestattetes Babybett, Bettgitter und Wickeltisch. Für Familien oder Freunde, mit
              Panoramablick und viel Ruhe!</p>
            <p class="beds">2 bis 4 Schlafplätze für Erwachsene</p>
          </div>
        </article>
        <p class="rooms-family" data-reveal>Babybett kostenlos · 1. Kind kostenlos · 2. Kind 50&nbsp;% · &lt;12 Jahre</p>
      </div>
    </section>

    <Teleport to="body">
      <div v-if="lightbox.visible" ref="dialog" class="redesign lightbox" role="dialog" aria-modal="true" :aria-label="lightbox.photos[lightbox.index].alt" @click.self="closeLightbox">
        <button ref="closeButton" type="button" class="lightbox-close" aria-label="Schließen" @click="closeLightbox">✕</button>
        <button type="button" class="lightbox-prev" aria-label="Zurück" @click="prevPhoto">&#8249;</button>
        <img :src="lightbox.photos[lightbox.index].src" class="lightbox-img" :alt="lightbox.photos[lightbox.index].alt" />
        <button type="button" class="lightbox-next" aria-label="Weiter" @click="nextPhoto">&#8250;</button>
        <div class="lightbox-counter">{{ lightbox.index + 1 }} / {{ lightbox.photos.length }}</div>
      </div>
    </Teleport>

    <section class="band services">
      <div class="wrap">
        <h2 data-reveal>Unser Service</h2>
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
        <h3>Angebote für Familien</h3>
        <p>Wir wissen genau, wie kompliziert es ist, mit einem oder mehreren Kindern unterwegs zu sein und sich zu
          erholen!<br>
          Deshalb haben wir versucht, den Eltern das Leben leichter und den Urlaub entspannter zu machen! Bei uns finden
          Sie:</p>
        <p>BABY KIT: Wir haben alles, was Sie brauchen! Wickeltisch mit Babywanne oder Töpfchen, Hochstuhl,
          Flaschenwärmer oder Mikrowelle im Frühstücksraum, Minibar im Zimmer, Kinderwagen, Babytrage für 6–36 Monate
          oder Kleinkindtrage für 3–6 Jahre oder Tragetücher, Tritthocker oder Stufe fürs Bad, Teller, Besteck und
          Gläser für Kinder, Bücherregal und gut ausgestattete Spielecke.</p>
      </div>
      <div class="service-column" data-reveal>
        <h3>Ausstattung im Zimmer</h3>
        <p>In unseren gut ausgestatteten Zimmern finden Sie:</p>
        <p>Bad mit Dusche, Bidet, WC<br>
          Handtuchset für jeden Gast<br>
          Regelmäßige Reinigung<br>
          Nachfüllbare, umweltfreundliche Körperpflegeprodukte<br>
          Süße Kleinigkeit zur Begrüßung<br>
          Tee-Ecke mit Wasserkocher, Tee, Kamillentee, Kräutertees, Gläsern und Tassen<br>
          Umweltfreundliche Putzmittel, Besen und Kehrschaufel<br>
          Wäscheständer und Wäscheklammern auf dem Balkon</p>
      </div>
      <div class="service-column" data-reveal>
        <h3>Weitere Angebote für Sie!</h3>
        <p>Kostenloses WLAN<br>
          Aufbewahrung für Fahrräder / Stiefel / Ski und weitere Ausrüstung<br>
          Express-Wäscheservice auf Anfrage mit zertifiziert umweltfreundlichen, biologisch abbaubaren Produkten<br>
          Lese- und Ruheecke (15–18 Uhr) mit großer Terrasse (wenn das Wetter es zulässt)<br>
          Am Infostand finden Sie außerdem alle Karten und Informationsbroschüren der APT Rovereto und Vallagarina.</p>
        <p>Wünschen Sie sich zum Frühstück etwas Besonderes? Sagen Sie uns Bescheid, und wir kümmern uns darum!</p>
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
  { src: '/images/lampone/1.webp', alt: 'Zimmer Lampone, Foto 1' },
  { src: '/images/lampone/2.webp', alt: 'Zimmer Lampone, Foto 2' },
  { src: '/images/lampone/3.webp', alt: 'Zimmer Lampone, Foto 3' },
  { src: '/images/lampone/4.webp', alt: 'Zimmer Lampone, Foto 4' },
];
const mirtilloPhotos: RoomPhoto[] = [
  { src: '/images/mirtillo/1.webp', alt: 'Zimmer Mirtillo, Foto 1' },
  { src: '/images/mirtillo/2.webp', alt: 'Zimmer Mirtillo, Foto 2' },
  { src: '/images/mirtillo/3.webp', alt: 'Zimmer Mirtillo, Foto 3' },
  { src: '/images/mirtillo/4.webp', alt: 'Zimmer Mirtillo, Foto 4' },
];

const carouselPhotos: { src: string, alt: string }[] = [
  { src: '/images/home/casa-portone-960.webp', alt: 'Die Holztür des Hauses unter dem Steinbogen, mit dem Kranz' },
  { src: '/images/home/terrazza-neve-1280.webp', alt: 'Die verschneite Terrasse mit brennenden Lichtern und einem schneebedeckten Baum' },
  { src: '/images/home/terrazza-estate-1280.webp', alt: 'Die Terrasse mit Blick auf die Wiesen und die Berge an einem sonnigen Tag' },
  { src: '/images/home/terrazza-tramonto-1280.webp', alt: 'Die Terrasse bei Sonnenuntergang, mit rosa Himmel über den Bergen' },
  { src: '/images/home/mirtillo-letto-960.webp', alt: 'Das Doppelbett im Zimmer Mirtillo mit der geblümten Tagesdecke' },
  { src: '/images/home/mirtillo-relax-960.webp', alt: 'Die Sitzecke im Zimmer Mirtillo mit dem hellblauen Sofa und dem Schreibtisch' },
  { src: '/images/home/mirtillo-balcone-960.webp', alt: 'Der Balkon des Zimmers Mirtillo mit Blick auf die Bäume und die Berge' },
  { src: '/images/home/lampone-letti-1280.webp', alt: 'Das Zimmer Lampone mit dem Doppelbett, dem Einzelbett und dem bemalten Kleiderschrank' },
  { src: '/images/home/lampone-angolo-960.webp', alt: 'Die Holzecke mit dem Wasserkocher im Zimmer Lampone' },
  { src: '/images/home/colazione-dolci-1280.webp', alt: 'Die Frühstückstheke mit Kuchen, Süßem und Marmeladen' },
  { src: '/images/home/sala-colazione-1280.webp', alt: 'Der Frühstücksraum mit den Tischen und der Bank an der Wand' },
  { src: '/images/home/colazione-frutta-1280.webp', alt: 'Die Frühstückstheke mit Obst, Säften und Süßem' },
  { src: '/images/home/colazione-bancone-1280.webp', alt: 'Die Theke im Frühstücksraum mit Gläsern, Tassen und Tellern' },
  { src: '/images/home/sala-tavolo-960.webp', alt: 'Ein Tisch im Frühstücksraum am Fenster' },
  { src: '/images/home/colazione-yogurt-1280.webp', alt: 'Joghurt, Säfte, Marmeladen und ein Kuchen auf der Frühstückstheke' },
  { src: '/images/home/ingresso-mappe-960.webp', alt: 'Der Eingang mit dem Prospektständer und den Karten der Umgebung' },
  { src: '/images/home/casa-1600.webp', alt: 'Das Steinhaus des B&B Cuore di Bosco in Prada' },
  { src: '/images/lampone/1.webp', alt: 'Zimmer Lampone, Foto 1' },
  { src: '/images/lampone/2.webp', alt: 'Zimmer Lampone, Foto 2' },
  { src: '/images/lampone/3.webp', alt: 'Zimmer Lampone, Foto 3' },
  { src: '/images/lampone/5.webp', alt: 'Zimmer Lampone, Foto 5' },
  { src: '/images/home/lampone-balcone-1200.webp', alt: 'Der verschneite Monte Baldo, vom Balkon des Zimmers Lampone aus gesehen' },
  { src: '/images/mirtillo/1.webp', alt: 'Zimmer Mirtillo, Foto 1' },
  { src: '/images/mirtillo/2.webp', alt: 'Zimmer Mirtillo, Foto 2' },
  { src: '/images/mirtillo/3.webp', alt: 'Zimmer Mirtillo, Foto 3' },
  { src: '/images/mirtillo/4.webp', alt: 'Zimmer Mirtillo, Foto 4' },
  { src: '/images/home/colazione-1280.webp', alt: 'Das Frühstück mit dem hausgemachten Kuchen' },
];

const serviceIcons = [
  { src: '/images/altervista/wifi.png', caption: 'KOSTEN­LOSES WLAN' },
  { src: '/images/altervista/towels-1.png', caption: 'HANDTÜCHER UND BETTWÄSCHE INKLUSIVE' },
  { src: '/images/altervista/products.png', caption: 'PFLEGE­PRODUKTE FÜR DIE GÄSTE' },
  { src: '/images/altervista/shower.png', caption: 'EIGENE DUSCHE UND EIGENES BAD' },
  { src: '/images/altervista/breakfast.png', caption: 'SÜSSES UND HERZHAFTES FRÜHSTÜCK' },
  { src: '/images/altervista/kettle.png', caption: 'WASSER­KOCHER-SET' },
  { src: '/images/altervista/laundry-machine.png', caption: 'WÄSCHE­SERVICE' },
  { src: '/images/altervista/bicycle.png', caption: 'FAHRRÄDER ZUR VERFÜGUNG' },
  { src: '/images/altervista/toys.png', caption: 'SPIELZEUG FÜR KINDER' },
  { src: '/images/altervista/pencils.png', caption: 'AUS­STATTUNG FÜR KINDER' },
  { src: '/images/altervista/crib.png', caption: 'BABYBETT' },
  { src: '/images/altervista/coloring.png', caption: 'MATERIAL FÜR KINDER' },
  { src: '/images/altervista/baby-carrier.png', caption: 'TRAGE­HILFEN' },
  { src: '/images/altervista/bookshelf.png', caption: 'BÜCHER FÜR ERWACHSENE UND KINDER' },
  { src: '/images/altervista/picnic-basket.png', caption: 'PICKNICK' },
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
  title: "Buchen | B&B Cuore di Bosco in Brentonico, nahe Polsa",
  meta: [
    {
      name: "description",
      content:
        "Buchen Sie Ihren Aufenthalt im B&B Cuore di Bosco in Prada di Brentonico: Zimmer Lampone und Mirtillo, Frühstück inklusive, Babyausstattung, Parkplatz gratis.",
    },
    {
      name: "keywords",
      content:
        "B&B Brentonico buchen, Familienurlaub Trentino buchen, B&B Cuore di Bosco, Prada di Brentonico, Unterkunft Brentonico, Unterkunft Polsa Skifahren, B&B nahe Skipisten Polsa, Winterurlaub Brentonico, B&B zum Wandern Monte Baldo, Babyausstattung",
    },
    {
      property: "og:title",
      content: "Buchen | B&B Cuore di Bosco in Brentonico, nahe Polsa",
    },
    {
      property: "og:description",
      content:
        "Buchen Sie Ihren Aufenthalt im B&B Cuore di Bosco in Prada di Brentonico: Zimmer Lampone und Mirtillo, Frühstück inklusive, Babyausstattung, Parkplatz gratis.",
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      property: "og:url",
      content: "https://www.cuoredibosco.it/de/buchen",
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
      content: "Buchen | B&B Cuore di Bosco in Brentonico, nahe Polsa",
    },
    {
      name: "twitter:description",
      content:
        "Buchen Sie Ihren Aufenthalt im B&B Cuore di Bosco in Prada di Brentonico: Zimmer Lampone und Mirtillo, Frühstück inklusive, Babyausstattung, Parkplatz gratis.",
    },
  ],
  link: [
    {
      rel: "canonical",
      href: "https://www.cuoredibosco.it/de/buchen",
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

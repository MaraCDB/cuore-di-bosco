<template>
  <div ref="root" class="booking-page">
    <div class="band booking-carousel">
      <SitePhotoCarousel :photos="carouselPhotos" label="Photos of the rooms and the house" />
    </div>

    <section class="booking-strip">
      <h1>BOOK</h1>
      <div class="booking-widget js-booking-engine-container" data-idstruttura="68002" data-tipostruttura="bbit"
        data-tipo="widget" data-lingua="en"
        data-action="https://www.bed-and-breakfast.it/en/trentino-alto-adige/bb-cuore-di-bosco-brentonico/68002"
        data-colore="green" data-wl="true"></div>
    </section>

    <section class="booking-intro">
      <div class="booking-intro-photo">
        <img src="/images/home/casa-neve-1600.webp"
          srcset="/images/home/casa-neve-900.webp 900w, /images/home/casa-neve-1600.webp 1600w"
          sizes="(max-width: 900px) 100vw, 50vw" alt="Snow in the mountains in Trentino"
          loading="lazy">
      </div>
      <div class="booking-intro-text" data-reveal>
        <p>Welcome to&nbsp;<strong>B&amp;B&nbsp;<em>Cuore di Bosco</em></strong>, a haven immersed in the nature of
          the&nbsp;<strong>Vallagarina</strong>, on the <strong>Brentonico Plateau</strong>,&nbsp;<strong>Europe’s
            Garden</strong>. Surrounded by lush mountains, time slows down and tranquility reigns supreme.</p>
        <p>There are many B&amp;Bs, but we hope to offer you a mix of special experiences: the beauty of the
          surrounding mountains, our passion for cooking and hospitality, and all the enthusiasm we put into our work!</p>
        <p>For special dietary needs like vegetarian, vegan, gluten-free, lactose-free, or others—we’re here for you!
          Just let us know before your arrival so we can prepare accordingly!</p>
        <p>See you soon!</p>
      </div>
    </section>

    <section class="booking-rooms">
      <div class="wrap">
        <div class="rooms-head" data-reveal>
          <h2>Discover our rooms</h2>
          <p>B&amp;B Cuore di Bosco is our home and yours in the mountains—a peaceful refuge to rest your mind and
            heart.</p>
          <p>The rooms are spacious and bright, ideal for couples and families alike. They offer modern comforts, a
            private bathroom, linens and toiletries included, and an atmosphere that invites you to rest.</p>
          <p>On request, we have things just for the little ones: a cot with mattress, sheets and blankets, a changing
            table and bottle warmer, bed rails, a potty and bathroom steps for all ages. And then books, crayons and
            toys! For a carefree stay, even when you travel with children.</p>
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
            <p class="lead">Spacious and welcoming, ideal for families seeking comfort and tranquility.</p>
            <p>Spacious 34 sqm room with a double bed and two single beds. Wardrobe with drawers, kettle, minibar.
              Private bathroom with shower, sink and bidet. Personal hygiene products, cleaning and linens
              included.</p>
            <p>Fully equipped baby cot, bed rails and changing table on request. For families with kids, all the space
              and comfort you need!</p>
            <p class="beds">2 to 4 adult beds available</p>
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
            <p class="lead">Fresh and bright, perfect for nature lovers.</p>
            <p>Spacious 28 sqm double room with a double bed. Wardrobe with drawers, relax area with sofa, desk and
              kettle set. Double sofa bed for two more guests. Private bathroom with shower, sink and bidet. Personal
              hygiene products, cleaning and linens included.</p>
            <p>Fully equipped baby cot, bed rails and changing table on request. For families or friends, with
              panoramic views and peace!</p>
            <p class="beds">2 to 4 adult beds available</p>
          </div>
        </article>
        <p class="rooms-family" data-reveal>Free cot · 1st child free · 2nd child 50% off · &lt;12 years</p>
      </div>
    </section>

    <Teleport to="body">
      <div v-if="lightbox.visible" ref="dialog" class="redesign lightbox" role="dialog" aria-modal="true" :aria-label="lightbox.photos[lightbox.index].alt" @click.self="closeLightbox">
        <button ref="closeButton" type="button" class="lightbox-close" aria-label="Close" @click="closeLightbox">✕</button>
        <button type="button" class="lightbox-prev" aria-label="Previous" @click="prevPhoto">&#8249;</button>
        <img :src="lightbox.photos[lightbox.index].src" class="lightbox-img" :alt="lightbox.photos[lightbox.index].alt" />
        <button type="button" class="lightbox-next" aria-label="Next" @click="nextPhoto">&#8250;</button>
        <div class="lightbox-counter">{{ lightbox.index + 1 }} / {{ lightbox.photos.length }}</div>
      </div>
    </Teleport>

    <section class="band services">
      <div class="wrap">
        <h2 data-reveal>Our services</h2>
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
        <h3>Family services</h3>
        <p>We know how tricky it can be to travel and relax with one or more kids!<br>
          That’s why we’ve tried to make life easier and vacations more relaxing for parents! Here you’ll find:</p>
        <p>BABY KIT: We have everything you need! Changing table with tub or potty, high chair, bottle warmer or
          microwave in the breakfast room, in-room minibar, stroller, baby carrier for 6–36 months or preschool 3–6
          years or wraps (with a security bond), bathroom step stool, children’s plates, cutlery and glasses, library
          and a well-equipped play corner.</p>
      </div>
      <div class="service-column" data-reveal>
        <h3>In-room services</h3>
        <p>In our well-equipped rooms you’ll find:</p>
        <p>Bathroom with shower, bidet, toilet<br>
          Towel kit for each guest<br>
          Regular cleaning<br>
          Refillable eco-friendly hygiene products<br>
          Welcome sweet treat<br>
          Herbal tea corner with kettle, tea, chamomile, herbal teas, glasses and cups<br>
          Eco-friendly cleaning products, broom and dustpan<br>
          Clothes rack and pegs on the balcony</p>
      </div>
      <div class="service-column" data-reveal>
        <h3>Other services for you!</h3>
        <p>Free Wi-Fi<br>
          Storage for bikes / boots / skis and other gear<br>
          Express laundry service on request with certified ecological, biodegradable products<br>
          Reading and relaxation corner (open 3–6 pm) with a large terrace (when the weather allows)<br>
          You’ll also find all maps and brochures from APT Rovereto and Vallagarina at the dedicated stand.</p>
        <p>Would you like something special at breakfast? Let us know and we’ll get it ready!</p>
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
  { src: '/images/lampone/1.webp', alt: 'Lampone room photo 1' },
  { src: '/images/lampone/2.webp', alt: 'Lampone room photo 2' },
  { src: '/images/lampone/3.webp', alt: 'Lampone room photo 3' },
  { src: '/images/lampone/4.webp', alt: 'Lampone room photo 4' },
];
const mirtilloPhotos: RoomPhoto[] = [
  { src: '/images/mirtillo/1.webp', alt: 'Mirtillo room photo 1' },
  { src: '/images/mirtillo/2.webp', alt: 'Mirtillo room photo 2' },
  { src: '/images/mirtillo/3.webp', alt: 'Mirtillo room photo 3' },
  { src: '/images/mirtillo/4.webp', alt: 'Mirtillo room photo 4' },
];

const carouselPhotos: { src: string, alt: string }[] = [
  { src: '/images/home/casa-portone-960.webp', alt: 'The wooden front door of the house under the stone arch, with the wreath' },
  { src: '/images/home/terrazza-neve-1280.webp', alt: 'The terrace covered in snow, with the lights on and a tree heavy with snow' },
  { src: '/images/home/terrazza-estate-1280.webp', alt: 'The terrace with the view over the meadows and the mountains on a sunny day' },
  { src: '/images/home/terrazza-tramonto-1280.webp', alt: 'The terrace at sunset, with a pink sky over the mountains' },
  { src: '/images/home/mirtillo-letto-960.webp', alt: 'The double bed of the Mirtillo room, with the flowered bedspread' },
  { src: '/images/home/mirtillo-relax-960.webp', alt: 'The relax area of the Mirtillo room, with the light blue sofa and the desk' },
  { src: '/images/home/mirtillo-balcone-960.webp', alt: 'The balcony of the Mirtillo room, with the view over the trees and the mountains' },
  { src: '/images/home/lampone-letti-1280.webp', alt: 'The Lampone room with the double bed, the single bed and the painted wardrobe' },
  { src: '/images/home/lampone-angolo-960.webp', alt: 'The wooden corner with the kettle in the Lampone room' },
  { src: '/images/home/colazione-dolci-1280.webp', alt: 'The breakfast counter with cakes, sweets and jams' },
  { src: '/images/home/sala-colazione-1280.webp', alt: 'The breakfast room with the tables and the bench along the wall' },
  { src: '/images/home/colazione-frutta-1280.webp', alt: 'The breakfast counter with fruit, juices and sweets' },
  { src: '/images/home/colazione-bancone-1280.webp', alt: 'The breakfast room counter with glasses, cups and plates' },
  { src: '/images/home/sala-tavolo-960.webp', alt: 'A table in the breakfast room, next to the window' },
  { src: '/images/home/colazione-yogurt-1280.webp', alt: 'Yoghurt, juices, jams and a cake on the breakfast counter' },
  { src: '/images/home/ingresso-mappe-960.webp', alt: 'The entrance with the brochure stand and the maps of the area' },
  { src: '/images/home/casa-1600.webp', alt: 'The stone house of B&B Cuore di Bosco in Prada' },
  { src: '/images/lampone/1.webp', alt: 'Lampone room photo 1' },
  { src: '/images/lampone/2.webp', alt: 'Lampone room photo 2' },
  { src: '/images/lampone/3.webp', alt: 'Lampone room photo 3' },
  { src: '/images/lampone/5.webp', alt: 'Lampone room photo 5' },
  { src: '/images/home/lampone-balcone-1200.webp', alt: 'Snowy Monte Baldo seen from the balcony of the Lampone room' },
  { src: '/images/mirtillo/1.webp', alt: 'Mirtillo room photo 1' },
  { src: '/images/mirtillo/2.webp', alt: 'Mirtillo room photo 2' },
  { src: '/images/mirtillo/3.webp', alt: 'Mirtillo room photo 3' },
  { src: '/images/mirtillo/4.webp', alt: 'Mirtillo room photo 4' },
  { src: '/images/home/colazione-1280.webp', alt: 'Breakfast with the homemade cake' },
];

const serviceIcons = [
  { src: '/images/altervista/wifi.png', caption: 'FREE WIFI' },
  { src: '/images/altervista/towels-1.png', caption: 'TOWELS AND LINENS INCLUDED' },
  { src: '/images/altervista/products.png', caption: 'COMPLI­MENTARY AMENITIES' },
  { src: '/images/altervista/shower.png', caption: 'PRIVATE SHOWER AND BATHROOM' },
  { src: '/images/altervista/breakfast.png', caption: 'SWEET AND SAVOURY BREAKFAST' },
  { src: '/images/altervista/kettle.png', caption: 'KETTLE SET' },
  { src: '/images/altervista/laundry-machine.png', caption: 'LAUNDRY' },
  { src: '/images/altervista/bicycle.png', caption: 'BICYCLES AVAILABLE' },
  { src: '/images/altervista/toys.png', caption: 'TOYS FOR CHILDREN' },
  { src: '/images/altervista/pencils.png', caption: 'CHILDREN’S SUPPLIES' },
  { src: '/images/altervista/crib.png', caption: 'BABY COT' },
  { src: '/images/altervista/coloring.png', caption: 'MATERIALS FOR CHILDREN' },
  { src: '/images/altervista/baby-carrier.png', caption: 'BABY CARRIERS' },
  { src: '/images/altervista/bookshelf.png', caption: 'LIBRARY FOR ADULTS AND CHILDREN' },
  { src: '/images/altervista/picnic-basket.png', caption: 'PICNIC' },
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
  title: "Book Your Stay | B&B Cuore di Bosco - Family Holidays Brentonico",
  meta: [
    {
      name: "description",
      content:
        "Book at B&B Cuore di Bosco: family mountain holidays with children in Prada di Brentonico. Baby kit, homemade breakfasts and nature in Trentino.",
    },
    {
      name: "keywords",
      content:
        "family B&B booking, mountain holidays with kids Trentino, B&B Cuore di Bosco, Prada di Brentonico, family bed and breakfast, baby kit mountain, family stay Brentonico",
    },
    {
      property: "og:title",
      content: "Book | B&B Cuore di Bosco - Family Holidays in Trentino",
    },
    {
      property: "og:description",
      content:
        "Book your family mountain holiday with children at B&B Cuore di Bosco. Baby kit, homemade breakfasts and nature in Brentonico.",
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      property: "og:url",
      content: "https://www.cuoredibosco.it/en/booking",
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
      content: "Book | B&B Cuore di Bosco - Family Mountain Holidays",
    },
    {
      name: "twitter:description",
      content:
        "Book at B&B Cuore di Bosco: family mountain holidays with children in Brentonico, Trentino.",
    },
  ],
  link: [
    {
      rel: "canonical",
      href: "https://www.cuoredibosco.it/en/booking",
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

<template>
  <div>
    <div class="welcome">
      <img decoding="async" width="1400" height="800" class="landing-image" alt="house" :src="camere"
        data-object-fit="cover" sizes="(max-width: 1200px) 100vw, 1200px"><span aria-hidden="true"
        style="background-color:#526a71"></span>
      <div class="landing-text">
        <h1 class="page-title text-white">BOOK NOW</h1>
      </div>
    </div>

    <div class="booking-widget js-booking-engine-container" data-idstruttura="68002" data-tipostruttura="bbit"
      data-tipo="widget" data-lingua="en"
      data-action="https://www.bed-and-breakfast.it/en/trentino-alto-adige/bb-cuore-di-bosco-brentonico/68002"
      data-colore="green" data-wl="true"></div>

    <section class="text-center intro-section">
      <p>Welcome to <strong>B&amp;B <em>Cuore di Bosco</em></strong>,<br>a haven immersed in the nature of the
        <strong>Vallagarina</strong>,<br>on the <strong>Brentonico Plateau</strong>, <strong>Europe’s Garden</strong>.
        <br>Surrounded by lush mountains, time slows down<br>and tranquility reigns supreme.
      </p>
      <p>There are many B&amp;Bs, but we hope to offer you<br> a mix of special experiences: the beauty of the
        surrounding mountains,<br>
        our passion for cooking and hospitality, and all the enthusiasm<br> we put into our work!</p>
      <p>For special needs like vegetarian,<br> vegan, gluten-free, lactose-free, or others—we’re here for you!
        <br> Just let us know before your arrival<br> so we can prepare accordingly!
      </p>
      <p> See you soon!</p>
    </section>

    <!-- Booking widget placeholder -->

    <div class="text-center">
      <figure class="separator-wrapper">
        <img decoding="async" class="separator" :src="separator" alt="separator" />
      </figure>
    </div>

    <section class="intro">
      <h2 class="intro-title">Discover our rooms</h2>
      <blockquote class="intro-text">
        <p>B&amp;B Cuore di Bosco is our home and yours in the
          mountains—a peaceful refuge to rest your mind and heart.</p>
        <p>Upon request, baby kit including baby cot with mattress, sheets and blankets, changing table, and bottle warmer.
        </p>
      </blockquote>
    </section>

    <section class="rooms">
      <!-- BLUEBERRY room -->
      <div class="room-block">
        <div class="card text-center">
          <figure>
            <img decoding="async" width="128" height="128"
              src="/images/altervista/blueberry.png" alt="blueberry">
          </figure>
          <div class="room-info">
            <h2>MIRTILLO</h2>
            <p class="room-short">Spacious and welcoming, ideal for families seeking comfort and tranquility.</p>
            <p>Double room with 34 sqm, double bed and 2 singles beds. Wardrobe with drawers, minibar and kettle.
              Bathroom with shower, sink, and bidet. Personal hygiene products, cleaning, and linens included.
              Baby cot with linens, bed rails, and changing table available upon request.
              Perfect for families with kids, offering all the space and comfort you need!</p>
            <h3>2 to 4 adult beds available</h3>
          </div>
        </div>
        <div class="room-gallery">
          <img
            v-for="(photo, i) in blueberryPhotos"
            :key="i"
            :src="photo"
            :alt="`Blueberry room photo ${i + 1}`"
            loading="lazy"
            @click="openLightbox(blueberryPhotos, i)"
          />
        </div>
      </div>

      <!-- RASPBERRY room -->
      <div class="room-block">
        <div class="card text-center">
          <figure>
            <img decoding="async" width="128" height="128"
              src="/images/altervista/raspberry.png" alt="raspberry">
          </figure>
          <div class="room-info">
            <h2>LAMPONE</h2>
            <p class="room-short">Fresh and bright, perfect for nature lovers.</p>
            <p>Spacious 28 sqm double room with double bed, wardrobe with drawers, relax area with sofa and kettle.
              Bathroom with shower, sink, and bidet. Personal hygiene products, cleaning, and linens included.
              Baby cot with linens, bed rails, and changing table available upon request. Double sofa bed to accomodate 2 more guests.
              Great for families or friends, with panoramic views and peace!</p>
            <h3>2 to 4 adults beds available</h3>
          </div>
        </div>
        <div class="room-gallery">
          <img
            v-for="(photo, i) in raspberryPhotos"
            :key="i"
            :src="photo"
            :alt="`Raspberry room photo ${i + 1}`"
            loading="lazy"
            @click="openLightbox(raspberryPhotos, i)"
          />
        </div>
      </div>
    </section>

    <!-- Lightbox -->
    <Teleport to="body">
      <div v-if="lightbox.visible" class="lightbox-overlay" @click.self="closeLightbox">
        <button class="lightbox-close" @click="closeLightbox" aria-label="Close">✕</button>
        <button class="lightbox-prev" @click="prevPhoto" aria-label="Previous">&#8249;</button>
        <img :src="lightbox.images[lightbox.index]" class="lightbox-img" :alt="`Photo ${lightbox.index + 1}`" />
        <button class="lightbox-next" @click="nextPhoto" aria-label="Next">&#8250;</button>
        <div class="lightbox-counter">{{ lightbox.index + 1 }} / {{ lightbox.images.length }}</div>
      </div>
    </Teleport>

    <div class="welcome">
      <img decoding="async" width="1400" height="800" class="service-image" alt="house" :src="colazioni"
        data-object-fit="cover" sizes="(max-width: 1200px) 100vw, 1200px" />
      <div class="landing-text">
        <h1 class="page-title">OUR SERVICES</h1>
      </div>
    </div>

    <section>
      <div class="wp-block-group">
        <figure class="icon"><img src="/images/altervista/wifi.png"
            alt="FREE WIFI" />
          <figcaption>FREE WIFI</figcaption>
        </figure>
        <figure class="icon"><img src="/images/altervista/towels-1.png"
            alt="TOWELS AND LINENS INCLUDED" />
          <figcaption>TOWELS AND LINENS INCLUDED</figcaption>
        </figure>
        <figure class="icon"><img src="/images/altervista/products.png"
            alt="COMPLIMENTARY AMENITIES" />
          <figcaption>COMPLIMENTARY AMENITIES</figcaption>
        </figure>
        <figure class="icon"><img src="/images/altervista/shower.png"
            alt="PRIVATE SHOWER AND BATHROOM" />
          <figcaption>PRIVATE SHOWER AND BATHROOM</figcaption>
        </figure>
        <figure class="icon"><img src="/images/altervista/breakfast.png"
            alt="SWEET AND SAVOURY BREAKFAST" />
          <figcaption>SWEET AND SAVOURY BREAKFAST</figcaption>
        </figure>
        <figure class="icon"><img src="/images/altervista/kettle.png"
            alt="KETTLE SET" />
          <figcaption>KETTLE SET</figcaption>
        </figure>
        <figure class="icon"><img
            src="/images/altervista/laundry-machine.png"
            alt="LAUNDRY SERVICE" />
          <figcaption>LAUNDRY SERVICE</figcaption>
        </figure>
        <figure class="icon"><img src="/images/altervista/bicycle.png"
            alt="BICYCLES AVAILABLE" />
          <figcaption>BICYCLES AVAILABLE</figcaption>
        </figure>
        <figure class="icon"><img src="/images/altervista/toys.png"
            alt="TOYS FOR CHILDREN" />
          <figcaption>TOYS FOR CHILDREN</figcaption>
        </figure>
        <figure class="icon"><img src="/images/altervista/pencils.png"
            alt="CHILDREN’S SUPPLIES" />
          <figcaption>CHILDREN’S SUPPLIES</figcaption>
        </figure>
        <figure class="icon"><img src="/images/altervista/crib.png"
            alt="BABY CRIB" />
          <figcaption>BABY CRIB</figcaption>
        </figure>
        <figure class="icon"><img src="/images/altervista/coloring.png"
            alt="MATERIALS FOR CHILDREN" />
          <figcaption>MATERIALS FOR CHILDREN</figcaption>
        </figure>
        <figure class="icon"><img src="/images/altervista/baby-carrier.png"
            alt="BABY CARRIERS" />
          <figcaption>BABY CARRIERS</figcaption>
        </figure>
        <figure class="icon"><img src="/images/altervista/bookshelf.png"
            alt="LIBRARY FOR ADULTS AND CHILDREN" />
          <figcaption>LIBRARY FOR ADULTS AND CHILDREN</figcaption>
        </figure>
        <figure class="icon"><img src="/images/altervista/picnic-basket.png"
            alt="PICNIC SERVICE" />
          <figcaption>PICNIC SERVICE</figcaption>
        </figure>
      </div>
    </section>

    <section class="text-left">
      <p><b>Family Services</b></p>

      <p>We know how tricky it can be to travel and relax with one or more kids!<br>
        That’s why we’ve tried to make life easier and vacations more relaxing for parents! Here you’ll find:</p>
      <p>BABY KIT: We have everything you need! Changing table with tub or potty, high chair, bottle warmer or microwave
        in the breakfast room,
        in-room minibar, stroller, baby carrier (6–36 months or preschool 3–6 years, or wraps with deposit), bathroom
        step stool, children’s plates, cutlery, and cups,
        library and play area (under development).</p>
      <p>WRITE TO US! Do they have breakfast preferences? Let us know and we’ll get ready!<br> Gray day?
        Let’s organize a snack together! Treats for the kids and a relaxing aperitif for the grown-ups!</p>
      <p>BIKE RENTAL: Our bikes for adults and children (with helmets!) are at your disposal (with deposit)</p>
      <p>PICNIC DAY: Heading into the woods? We’ll prepare the basket—just let us know 1–2 days in advance with your
        preferences and time and we’ll have it ready to go. (paid service)</p>

      <p><b>In-Room Services</b></p>
      <p>In our well-equipped rooms you’ll find:</p>
      <p>Bathroom with shower, bidet, toilet<br>
        Towel kit for each guest<br>
        Regular cleaning<br>
        Refillable eco-friendly hygiene products<br><br>
        Welcome gift<br>
        Drinking glasses<br><br>
        Eco-friendly cleaning products, broom and dustpan<br>
        Clothes rack and pegs on the balcony (weather permitting)
      </p>

      <p><b>Other services for you!</b></p>
      <p>Free Wi-Fi<br>
        Storage for bikes / boots / skis and other gear<br>
        Express laundry service on request with certified ecological, biodegradable products (paid service)<br>
        Reading and relaxation corner (open 3–6 pm) with a large terrace (weather permitting)<br>
        You’ll also find all maps and brochures from APT Rovereto and Vallagarina at the dedicated stand.
      </p>
    </section>
  </div>
</template>


<script lang="ts" setup>
import camere from "~/assets/images/camere.webp";
import colazioni from "~/assets/images/colazioni.webp";
import separator from "~/assets/images/separator.webp";

// Blueberry = Mirtillo room, Raspberry = Lampone room (same photos as Italian page)
const blueberryPhotos = [
  '/images/mirtillo/1.webp',
  '/images/mirtillo/2.webp',
  '/images/mirtillo/3.webp',
  '/images/mirtillo/4.webp',
];
const raspberryPhotos = [
  '/images/lampone/1.webp',
  '/images/lampone/2.webp',
  '/images/lampone/3.webp',
  '/images/lampone/4.webp',
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
function closeLightbox() { lightbox.visible = false; }
function prevPhoto() { lightbox.index = (lightbox.index - 1 + lightbox.images.length) % lightbox.images.length; }
function nextPhoto() { lightbox.index = (lightbox.index + 1) % lightbox.images.length; }
function handleKeydown(e: KeyboardEvent) {
  if (!lightbox.visible) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') prevPhoto();
  if (e.key === 'ArrowRight') nextPhoto();
}
onMounted(() => window.addEventListener('keydown', handleKeydown));
onBeforeUnmount(() => window.removeEventListener('keydown', handleKeydown));

definePageMeta({
  layout: 'english'
});

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
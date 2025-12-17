<template>
  <div
    class="relative w-full bg-background overflow-hidden flex flex-col md:block"
  >
    <!-- Mobile Layout -->
    <div class="md:hidden relative h-[600px] w-full overflow-hidden">
      <!-- Background Images Slideshow -->
      <transition-group name="fade">
        <div
          v-for="(image, index) in heroImages"
          :key="image"
          v-show="currentImageIndex === index"
          class="absolute inset-0 w-full h-full"
        >
          <img
            :src="image"
            alt="Background"
            class="w-full h-full object-cover transition-transform duration-10000ms ease-linear scale-110"
            :class="{ 'scale-100': currentImageIndex !== index }"
          />
        </div>
      </transition-group>

      <!-- Dark Overlay -->
      <div class="absolute inset-0 bg-black/60 z-10"></div>

      <!-- Content -->
      <div
        class="relative z-20 h-full flex flex-col justify-center px-6 text-left pb-16"
      >
        <h1
          class="text-4xl font-extrabold text-secondary leading-tight mb-4 drop-shadow-lg"
        >
          Temukan Rumah <br />
          Impianmu
        </h1>
        <p
          class="text-white text-sm font-medium mb-8 leading-relaxed drop-shadow-md max-w-xs"
        >
          Bersama HR Group, Wujudkan Hunian yang nyaman untuk Kehidupan Yang
          Penuh Berkah
        </p>
        <a
          href="#projects"
          class="w-fit bg-secondary text-white hover:bg-secondary-dark rounded-full px-8 py-3.5 text-sm font-bold shadow-xl transition-all active:scale-95 flex items-center gap-2"
        >
          <Home class="w-5 h-5" />
          LIHAT PROYEK KAMI
        </a>

        <!-- Slide Indicators -->
        <div
          class="absolute bottom-24 left-0 right-0 flex justify-center gap-2 z-30"
        >
          <button
            v-for="(_, index) in heroImages"
            :key="index"
            @click="currentImageIndex = index"
            class="w-2 h-2 rounded-full transition-all duration-300"
            :class="
              currentImageIndex === index
                ? 'bg-secondary w-6'
                : 'bg-white/50 hover:bg-white'
            "
          ></button>
        </div>
      </div>
    </div>

    <!-- Desktop Layout (Original Design) -->
    <div class="hidden md:block relative min-h-[85vh]">
      <!-- Family Image - Right Side -->
      <div class="absolute top-0 right-0 bottom-0 w-[65%] z-0">
        <img
          src="/happy-family.webp"
          alt="Happy Family"
          class="w-full h-full object-cover object-left"
        />
      </div>

      <!-- Curved Overlay -->
      <div
        class="absolute top-0 left-0 bottom-0 w-[55%] bg-background z-10"
        :style="{
          clipPath: 'ellipse(100% 110% at 0% 50%)',
          WebkitClipPath: 'ellipse(100% 110% at 0% 50%)',
        }"
      >
        <div class="absolute inset-0 opacity-30">
          <img
            src="/backgroundHouse.webp"
            alt="Background House"
            class="w-full h-full object-cover object-left"
          />
          <div
            class="absolute inset-0 bg-linear-to-r from-background/90 to-transparent"
          ></div>
        </div>
      </div>

      <!-- Content Grid -->
      <div
        class="relative z-20 grid grid-cols-12 max-w-[1440px] mx-auto w-full h-full pointer-events-none"
      >
        <!-- Left Column - Content -->
        <div
          class="col-span-6 lg:col-span-5 flex flex-col justify-center px-12 pointer-events-auto h-full"
        >
          <div class="pt-20 pl-4 lg:pl-12">
            <h1
              class="text-5xl lg:text-[72px] font-extrabold text-primary leading-[1.1] mb-8 tracking-tight drop-shadow-sm"
            >
              Temukan Rumah <br />
              <span class="text-secondary">Impianmu</span>
            </h1>
            <p
              class="text-primary/80 text-lg max-w-lg font-medium mb-12 leading-relaxed"
            >
              Bersama HR Group, Wujudkan Hunian yang nyaman untuk Kehidupan Yang
              Penuh Berkah
            </p>
            <a
              href="#projects"
              class="w-fit bg-secondary text-white hover:bg-secondary-dark rounded-full px-10 py-4 text-lg font-bold shadow-xl transition-all hover:-translate-y-1 hover:shadow-2xl cursor-pointer flex items-center gap-3"
            >
              <Home class="w-6 h-6" />
              Lihat Proyek Kami
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { Home } from "lucide-vue-next";

const heroImages = [
  "/hero.webp",
  "/happy-family.webp",
  "/backgroundHouse.webp",
];

const currentImageIndex = ref(0);
let slideInterval;

const startSlideShow = () => {
  slideInterval = setInterval(() => {
    currentImageIndex.value = (currentImageIndex.value + 1) % heroImages.length;
  }, 5000); // Change every 5 seconds
};

onMounted(() => {
  startSlideShow();
});

onUnmounted(() => {
  if (slideInterval) clearInterval(slideInterval);
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

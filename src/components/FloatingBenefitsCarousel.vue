<template>
  <div
    class="relative md:absolute left-0 right-0 -mt-6 md:mt-0 md:-bottom-14 z-40 mb-12 md:mb-0"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div
        class="bg-gradient-to-r from-primary via-primary-dark to-primary rounded-2xl shadow-2xl overflow-hidden"
      >
        <div class="flex items-center">
          <!-- Logo Section - Fixed on the left -->
          <div
            class="hidden md:flex items-center justify-center bg-secondary p-4 min-w-[140px]"
          >
            <div class="text-center">
              <div class="w-16 h-16 mx-auto mb-2 relative">
                <img
                  src="/logo.png"
                  alt="HR Group Logo"
                  class="w-full h-full object-contain"
                />
              </div>
              <h3 class="text-white font-bold text-base">HR GROUP</h3>
              <p class="text-white/90 text-[10px] mt-0.5">Hunian Berkah</p>
            </div>
          </div>

          <!-- Carousel Section - Animated benefits -->
          <div class="flex-1 relative overflow-hidden h-24 md:h-28">
            <div
              class="flex transition-transform duration-700 ease-in-out h-full"
              :style="{
                transform: `translateX(-${currentSlide * 100}%)`,
              }"
            >
              <div
                v-for="(benefit, index) in benefits"
                :key="index"
                class="min-w-full h-full flex items-center justify-center px-6 md:px-8"
              >
                <div class="flex items-center gap-3 md:gap-4">
                  <div
                    :class="[
                      'w-10 h-10 md:w-12 md:h-12 rounded-lg bg-gradient-to-br flex items-center justify-center shadow-lg shrink-0',
                      benefit.color,
                    ]"
                  >
                    <component
                      :is="benefit.icon"
                      :size="24"
                      class="text-white"
                    />
                  </div>
                  <div>
                    <h4
                      class="text-base md:text-lg font-bold text-white mb-0.5"
                    >
                      {{ benefit.title }}
                    </h4>
                    <p class="text-xs md:text-sm text-white/80">
                      {{ benefit.description }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Carousel Indicators -->
            <div
              class="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5"
            >
              <button
                v-for="(_, index) in benefits"
                :key="index"
                @click="currentSlide = index"
                :class="[
                  'h-1 rounded-full transition-all',
                  index === currentSlide
                    ? 'w-6 bg-secondary'
                    : 'w-1 bg-white/40 hover:bg-white/60',
                ]"
                :aria-label="`Go to slide ${index + 1}`"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import {
  Shield,
  Award,
  Home,
  TrendingUp,
  CheckCircle2,
  Heart,
} from "lucide-vue-next";

const currentSlide = ref(0);
let interval = null;

const benefits = [
  {
    icon: Shield,
    title: "Legalitas Terpercaya",
    description: "Sertifikat resmi & aman",
    color: "from-secondary to-secondary-dark",
  },
  {
    icon: Award,
    title: "Kualitas Terjamin",
    description: "Material berkualitas tinggi",
    color: "from-primary to-primary-dark",
  },
  {
    icon: Home,
    title: "Lokasi Strategis",
    description: "Dekat fasilitas umum",
    color: "from-secondary to-secondary-dark",
  },
  {
    icon: TrendingUp,
    title: "Investasi Menguntungkan",
    description: "Nilai properti meningkat",
    color: "from-primary to-primary-dark",
  },
  {
    icon: CheckCircle2,
    title: "KPR Syariah",
    description: "Proses mudah & cepat",
    color: "from-secondary to-secondary-dark",
  },
  {
    icon: Heart,
    title: "Lingkungan Islami",
    description: "Komunitas yang berkah",
    color: "from-primary to-primary-dark",
  },
];

onMounted(() => {
  interval = setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % benefits.length;
  }, 3000);
});

onUnmounted(() => {
  if (interval) {
    clearInterval(interval);
  }
});
</script>

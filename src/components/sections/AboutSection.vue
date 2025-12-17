<template>
  <section class="relative pt-24 pb-20 md:pb-28 bg-background">
    <div class="absolute inset-0 z-0 opacity-5">
      <img
        src="/hero.webp"
        alt="Background"
        class="w-full h-full object-cover"
      />
    </div>
    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div
        class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
      >
        <div>
          <h2
            class="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-6 leading-tight"
          >
            Kami Membantu Anda
            <br />
            Menemukan
            <br />
            Rumah Impian Anda
          </h2>
          <p
            class="text-base md:text-lg text-gray-700 leading-relaxed mb-8 text-justify"
          >
            HR GROUP – Developer properti syariah terpercaya tanpa riba.
            Menghadirkan hunian Islami yang nyaman, terjangkau, dan berkah untuk
            keluarga. Proyek unggulan kami: Trishania Village Tanjung, Griya
            Sakinah Village Ketanggungan, dan Griya Sakinah 2. Mewujudkan rumah
            penuh keberkahan untuk keluarga.
          </p>
          <div class="grid grid-cols-3 gap-6 md:gap-8">
            <div>
              <div class="text-3xl md:text-4xl font-bold text-primary mb-2">
                {{ stats.availableHouses }}+
              </div>
              <div class="text-sm md:text-base text-gray-600">
                Rumah Tersedia
              </div>
            </div>
            <div>
              <div class="text-3xl md:text-4xl font-bold text-primary mb-2">
                {{ stats.soldHouses }}+
              </div>
              <div class="text-sm md:text-base text-gray-600">
                Rumah Terjual
              </div>
            </div>
            <div>
              <div class="text-3xl md:text-4xl font-bold text-primary mb-2">
                {{ stats.trustedAgencies }}+
              </div>
              <div class="text-sm md:text-base text-gray-600">
                Agensi Terpercaya
              </div>
            </div>
          </div>
        </div>
        <div class="relative z-10 h-[400px] md:h-[500px] lg:h-[600px]">
          <img
            src="/hero.webp"
            alt="Modern House"
            class="w-full h-full object-cover rounded-2xl shadow-2xl"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/config";

const stats = ref({
  availableHouses: 150,
  soldHouses: 300,
  trustedAgencies: 50,
});

const loadStatistics = async () => {
  try {
    const docRef = doc(db, "settings", "statistics");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      stats.value = docSnap.data();
    }
  } catch (error) {
    console.error("Error loading statistics:", error);
  }
};

onMounted(() => {
  loadStatistics();
});
</script>

<template>
  <main class="bg-background min-h-screen pb-20">
    <!-- Header Section -->
    <section
      class="relative bg-primary text-white py-16 md:py-24 bg-cover bg-center bg-no-repeat"
      style="background-image: url('/background_header.jpg')"
    >
      <div class="absolute inset-0 bg-black/60"></div>
      <div
        class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10"
      >
        <h1 class="text-4xl md:text-5xl font-bold mb-4">PROFIL HR GROUP</h1>
        <div
          class="flex justify-center items-center space-x-2 text-sm md:text-base opacity-80"
        >
          <router-link to="/" class="hover:text-gray-300 transition-colors"
            >Home</router-link
          >
          <span>&gt;</span>
          <span class="font-semibold">Profil</span>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section class="py-16 md:py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <!-- Image -->
          <div class="relative max-w-md mx-auto lg:mx-0">
            <img
              :src="aboutImage || '/tentang-kami.webp'"
              class="w-full h-auto object-cover rounded-2xl shadow-xl"
              alt="Tentang HR Group"
            />

            <div
              class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-xl z-10 animate-pulse"
            >
              <div
                class="w-12 h-12 bg-primary rounded-full flex items-center justify-center"
              >
                <svg
                  class="w-6 h-6 text-white ml-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>

          <!-- Text -->
          <div>
            <div class="flex items-center gap-2 mb-4">
              <i class="text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </i>
              <span class="text-primary font-semibold tracking-wider text-sm"
                >GET TO KNOW ABOUT HR GROUP</span
              >
            </div>

            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {{ tagline || "Mewujudkan Rumah Impian Tanpa Riba" }}
            </h2>

            <div class="prose prose-lg text-gray-600 space-y-6">
              <div
                v-if="description"
                v-html="description"
                class="whitespace-pre-line"
              ></div>
              <template v-else>
                <p>
                  HR GROUP adalah perusahaan pengembang properti berbasis
                  syariah yang berkomitmen menghadirkan hunian nyaman,
                  terjangkau, dan bebas dari transaksi ribawi.
                </p>
                <p>
                  Dengan pengalaman dan tim profesional, HR GROUP telah sukses
                  membangun beberapa proyek unggulan seperti
                  <strong>Triehans Village Tanjung</strong>,
                  <strong>Sakinah Village Kertasinduyasa</strong>, dan
                  <strong>Griya Sakinah 2</strong>.
                </p>
              </template>
            </div>
          </div>
        </div>

        <!-- Visi & Misi -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <h3
              class="text-xl font-bold text-primary flex items-center gap-2 mb-4"
            >
              <i class="w-1 h-6 bg-primary rounded-full"></i>
              VISI
            </h3>
            <div
              class="bg-white p-6 rounded-xl shadow-sm border-l-4 border-primary h-full"
            >
              <p class="text-gray-700 text-lg leading-relaxed">
                "{{
                  visi ||
                  "Membangun Kerajaan Bisnis Untuk Kesejahteraan Ummat dan Bangsa"
                }}"
              </p>
            </div>
          </div>

          <div>
            <h3
              class="text-xl font-bold text-primary flex items-center gap-2 mb-4"
            >
              <i class="w-1 h-6 bg-primary rounded-full"></i>
              MISI
            </h3>
            <div
              class="bg-white p-6 rounded-xl shadow-sm border-l-4 border-primary h-full"
            >
              <ol
                class="list-decimal list-outside ml-5 text-gray-700 space-y-3"
              >
                <template v-if="misi && misi.length">
                  <li v-for="(item, index) in misi" :key="index">
                    {{ item }}
                  </li>
                </template>
                <template v-else>
                  <li>
                    Menumbuhkan karyawan yang semangat, setia dan bahagia.
                  </li>
                  <li>
                    Mewujudkan hunian nyaman, berkualitas dan berbasis syari’ah.
                  </li>
                  <li>Memberikan kemanfaatan yang tinggi untuk stakeholder.</li>
                </template>
              </ol>
            </div>
          </div>
        </div>

        <!-- Developer Section -->
        <div>
          <h3
            class="text-xl font-bold text-primary flex items-center gap-2 mb-8"
          >
            <i class="w-1 h-6 bg-primary rounded-full"></i>
            DEVELOPER
          </h3>

          <div
            class="relative overflow-hidden group bg-white p-8 rounded-2xl shadow-sm border border-gray-100"
          >
            <div
              class="flex animate-marquee items-center gap-16 whitespace-nowrap"
            >
              <!-- Logos (Full Color, No Grayscale) -->
              <img
                src="/proyek/triehans-558x200.png"
                alt="Triehans Village"
                class="h-24 w-auto object-contain transition-all duration-300"
              />
              <img
                src="/proyek/sakinah-village-450x200.png"
                alt="Sakinah Village"
                class="h-24 w-auto object-contain transition-all duration-300"
              />
              <img
                src="/proyek/griya-sakinah-392x200.png"
                alt="Griya Sakinah"
                class="h-24 w-auto object-contain transition-all duration-300"
              />

              <!-- Duplicate 1 -->
              <img
                src="/proyek/triehans-558x200.png"
                class="h-24 w-auto object-contain transition-all duration-300"
              />
              <img
                src="/proyek/sakinah-village-450x200.png"
                class="h-24 w-auto object-contain transition-all duration-300"
              />
              <img
                src="/proyek/griya-sakinah-392x200.png"
                class="h-24 w-auto object-contain transition-all duration-300"
              />

              <!-- Duplicate 2 -->
              <img
                src="/proyek/triehans-558x200.png"
                class="h-24 w-auto object-contain transition-all duration-300"
              />
              <img
                src="/proyek/sakinah-village-450x200.png"
                class="h-24 w-auto object-contain transition-all duration-300"
              />
              <img
                src="/proyek/griya-sakinah-392x200.png"
                class="h-24 w-auto object-contain transition-all duration-300"
              />

              <!-- Duplicate 3 -->
              <img
                src="/proyek/triehans-558x200.png"
                class="h-24 w-auto object-contain transition-all duration-300"
              />
              <img
                src="/proyek/sakinah-village-450x200.png"
                class="h-24 w-auto object-contain transition-all duration-300"
              />
              <img
                src="/proyek/griya-sakinah-392x200.png"
                class="h-24 w-auto object-contain transition-all duration-300"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Section -->
    <section class="py-16 md:py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2
            class="text-3xl md:text-4xl font-bold text-primary uppercase tracking-wider"
          >
            Our Team
          </h2>
          <div class="w-24 h-1 bg-primary mx-auto mt-4 rounded-full"></div>
        </div>

        <div
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
        >
          <div
            v-for="(member, index) in teamMembers"
            :key="index"
            class="group relative bg-background rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
          >
            <div
              class="aspect-3/4 w-full relative overflow-hidden bg-cover bg-center"
              style="background-image: url('/background_profile.jpeg')"
            >
              <img
                :src="
                  member.image ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    member.name
                  )}&background=random&size=512`
                "
                :alt="member.name"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              <div
                class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
              >
                <span
                  class="text-white font-semibold tracking-wide px-4 text-center"
                  >{{ member.role }}</span
                >
              </div>
            </div>

            <div class="p-6 text-center bg-white border-t border-gray-100">
              <h3 class="text-xl font-bold text-primary mb-1">
                {{ member.name }}
              </h3>
              <p
                class="text-sm text-gray-500 font-medium uppercase tracking-wide"
              >
                {{ member.role }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/config";

const teamMembers = ref([]);
const aboutImage = ref("");
const description = ref("");
const tagline = ref("");
const visi = ref("");
const misi = ref([]);

const fetchProfileData = async () => {
  try {
    const docRef = doc(db, "settings", "profile");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      if (data.team && Array.isArray(data.team)) {
        teamMembers.value = data.team;
      }
      if (data.aboutImage) aboutImage.value = data.aboutImage;
      if (data.description) description.value = data.description;
      if (data.tagline) tagline.value = data.tagline;
      if (data.visi) visi.value = data.visi;
      if (data.misi && Array.isArray(data.misi)) misi.value = data.misi;
    }
  } catch (error) {
    console.error("Error fetching profile data:", error);
  }
};

onMounted(() => {
  fetchProfileData();
});
</script>

<style scoped>
@keyframes marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

.animate-marquee {
  animation: marquee 12s linear infinite; /* lebih cepat */
}

.animate-marquee:hover {
  animation-play-state: paused;
}
</style>

<template>
  <section v-if="hasPromo" class="py-12 md:py-20 bg-background">
    <div class="container mx-auto px-4">
      <!-- Header -->
      <div class="text-center mb-10">
        <div
          class="inline-block px-5 py-1.5 bg-secondary text-white text-xs font-bold rounded-full mb-3 shadow-lg"
        >
          PROMO SPESIAL
        </div>
        <h2
          class="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4"
        >
          Penawaran Terbatas
        </h2>
        <p class="text-muted text-base md:text-lg max-w-2xl mx-auto">
          Jangan lewatkan kesempatan emas untuk memiliki hunian impian
        </p>
      </div>

      <!-- CARD YANG SUDAH BENAR-BENAR PAS & KECIL -->
      <div class="max-w-5xl mx-auto">
        <div
          class="bg-surface rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 grid grid-cols-1 lg:grid-cols-2"
        >
          <!-- Gambar Kiri -->
          <div
            class="relative w-full aspect-3/4 lg:aspect-auto lg:min-h-[480px]"
          >
            <img
              :src="promo.image"
              :alt="promo.title"
              class="w-full h-full object-cover"
              @error="$event.target.src = '/placeholder.jpeg'"
            />
            <div
              class="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent lg:bg-linear-to-r lg:from-black/50"
            ></div>
            <div
              class="absolute top-5 left-5 bg-red-600 text-white px-4 py-2 rounded-full font-bold text-xs shadow-xl animate-pulse"
            >
              PROMO TERBATAS
            </div>
          </div>

          <!-- Konten Kanan – DIPAKSA RAPAT & PROPORSIONAL -->
          <div
            class="p-6 md:p-7 lg:p-8 flex flex-col justify-center bg-linear-to-br from-primary to-primary-dark space-y-3.5 max-w-full"
          >
            <!-- Subtitle & Judul -->
            <div class="space-y-0.5">
              <p
                class="text-secondary text-xs font-bold uppercase tracking-wider"
              >
                {{ promo.subtitle }}
              </p>
              <h3
                class="text-xl md:text-2xl lg:text-3xl font-bold text-white leading-tight"
              >
                {{ promo.title }}
              </h3>
            </div>

            <p class="text-gray-200 text-xs md:text-sm leading-relaxed">
              {{ promo.description }}
            </p>

            <!-- Daftar Benefit – lebih rapat -->
            <div
              class="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"
            >
              <h4
                class="text-secondary font-bold text-xs md:text-sm mb-2 flex items-center gap-2"
              >
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd"
                  />
                </svg>
                Keuntungan Anda
              </h4>
              <ul class="space-y-1.5">
                <li
                  v-for="(benefit, i) in promo.benefits"
                  :key="i"
                  class="flex items-start gap-2 text-white text-xs md:text-sm"
                >
                  <svg
                    class="w-4 h-4 text-secondary shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span class="font-medium">{{ benefit }}</span>
                </li>
              </ul>
            </div>

            <!-- Periode -->
            <div
              class="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/20"
            >
              <svg
                class="w-4 h-4 text-secondary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <div>
                <p class="text-secondary text-xs font-bold uppercase">
                  Periode
                </p>
                <p class="text-white text-sm font-bold">{{ promo.period }}</p>
              </div>
            </div>

            <!-- Tombol CTA -->
            <button
              class="w-full py-2.5 px-5 bg-linear-to-r from-secondary to-secondary-light text-white font-bold rounded-lg hover:from-secondary-light hover:to-secondary transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:scale-105 text-sm cursor-pointer"
            >
              <span>Klaim Promo Sekarang</span>
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </button>

            <p class="text-gray-300 text-xs text-center -mt-2">
              *Syarat dan ketentuan berlaku
            </p>
          </div>
        </div>
      </div>

      <!-- Bottom CTA -->
      <div class="mt-12 text-center">
        <p class="text-muted mb-6">Masih ragu? Hubungi kami sekarang!</p>
        <div
          class="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto"
        >
          <a
            href="https://wa.me/6281234567890"
            target="_blank"
            rel="noopener noreferrer"
            class="px-8 py-3.5 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 flex items-center justify-center gap-3 shadow-lg transition-colors"
          >
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"
              />
            </svg>
            WhatsApp
          </a>
          <a
            href="tel:+6281234567890"
            class="px-8 py-3.5 bg-secondary text-white font-semibold rounded-xl hover:bg-secondary-dark flex items-center justify-center gap-3 shadow-lg transition-colors"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            Telepon
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { collection, getDocs, query, limit } from "firebase/firestore";
import { db } from "@/firebase/config";

const hasPromo = ref(false);
const promo = ref({
  title: "",
  subtitle: "",
  image: "",
  description: "",
  period: "",
  benefits: [],
});

const loadPromo = async () => {
  try {
    const q = query(collection(db, "promotions"), limit(1));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const promoData = querySnapshot.docs[0].data();
      promo.value = {
        title: promoData.title || "",
        subtitle: promoData.subtitle || "",
        image: promoData.imageUrl || "/placeholder.jpeg",
        description: promoData.description || "",
        period: promoData.period || "",
        benefits: promoData.benefits || [],
      };
      hasPromo.value = true;
    }
  } catch (error) {
    console.error("Error loading promo:", error);
  }
};

onMounted(() => {
  loadPromo();
});
</script>

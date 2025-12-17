<template>
  <div class="min-h-screen bg-white">
    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center py-20">
      <div
        class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#F99D1C]"
      ></div>
    </div>

    <!-- Error State -->
    <div v-else-if="!article" class="text-center py-20">
      <h2 class="text-2xl font-bold text-gray-900 mb-4">
        Artikel Tidak Ditemukan
      </h2>
      <router-link
        to="/"
        class="text-[#F99D1C] hover:text-[#e08d19] font-medium"
      >
        &larr; Kembali ke Beranda
      </router-link>
    </div>

    <div v-else>
      <!-- Hero Section with Featured Image -->
      <div
        class="relative w-full h-[400px] md:h-[500px] bg-linear-to-br from-[#3E2E27] to-[#1a192a] bg-cover bg-center"
        style="background-image: url('/background_header.jpg')"
      >
        <div class="absolute inset-0 bg-black/50 z-10" />
        <div
          class="absolute inset-0 z-20 flex flex-col items-center justify-center text-white px-4"
        >
          <div class="max-w-4xl mx-auto text-center">
            <h1 class="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              {{ article.title }}
            </h1>
            <div
              class="flex items-center justify-center gap-6 text-sm text-white/90"
            >
              <div class="flex items-center gap-2">
                <Calendar class="w-4 h-4" />
                <span>{{ formatDate(article.date) }}</span>
              </div>
              <div class="flex items-center gap-2">
                <User class="w-4 h-4" />
                <span>{{ article.author || "Admin" }}</span>
              </div>
            </div>
          </div>
        </div>
        <!-- Pattern Overlay -->
        <div
          class="absolute inset-0 opacity-20 pointer-events-none"
          style="
            background-image: radial-gradient(#ffffff 1px, transparent 1px);
            background-size: 20px 20px;
          "
        ></div>
      </div>

      <!-- Main Content - 2 Column Layout -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <!-- Left Column - Article Content -->
          <article class="lg:col-span-8">
            <!-- Featured Image -->
            <div
              v-if="article.imageUrl || article.image"
              class="relative w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden mb-8 shadow-lg"
            >
              <img
                :src="article.imageUrl || article.image || '/placeholder.jpeg'"
                :alt="article.title"
                class="w-full h-full object-cover"
                @error="$event.target.src = '/placeholder.jpeg'"
              />
            </div>

            <!-- Content -->
            <div class="prose prose-lg max-w-none mb-8">
              <!-- Check if content is object (old static data) or string (new firebase data) -->
              <template v-if="typeof article.content === 'object'">
                <p class="text-lg text-gray-700 leading-relaxed">
                  {{ article.content.introduction }}
                </p>
                <section
                  v-for="(section, index) in article.content.sections"
                  :key="index"
                  class="mb-8"
                >
                  <h2
                    class="text-2xl md:text-3xl font-bold text-[#3E2E27] mb-6 border-l-4 border-[#F99D1C] pl-4"
                  >
                    {{ section.title }}
                  </h2>

                  <div
                    v-if="section.type === 'highlight'"
                    class="bg-linear-to-br from-[#FFF8F0] to-[#FFF0E0] p-6 md:p-8 rounded-xl shadow-sm border border-[#F99D1C]/20"
                  >
                    <p class="text-gray-700 leading-relaxed">
                      {{ section.content }}
                    </p>
                  </div>

                  <div
                    v-else-if="section.type === 'list'"
                    class="bg-gray-50 p-6 md:p-8 rounded-xl shadow-sm"
                  >
                    <p
                      v-if="section.content"
                      class="text-gray-700 leading-relaxed mb-4"
                    >
                      {{ section.content }}
                    </p>
                    <ul class="space-y-3">
                      <li
                        v-for="(item, itemIndex) in section.items"
                        :key="itemIndex"
                        class="flex items-start gap-3"
                      >
                        <span class="text-[#F99D1C] font-bold text-xl mt-1"
                          >•</span
                        >
                        <p class="text-gray-700 leading-relaxed">
                          {{ item }}
                        </p>
                      </li>
                    </ul>
                  </div>

                  <div
                    v-else
                    class="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-200"
                  >
                    <p class="text-gray-700 leading-relaxed">
                      {{ section.content }}
                    </p>
                  </div>
                </section>
              </template>

              <!-- New Firebase Data (String Content) -->
              <template v-else>
                <div class="whitespace-pre-wrap text-gray-700 leading-relaxed">
                  {{ article.content }}
                </div>
              </template>
            </div>

            <!-- CTA Section -->
            <section class="mb-12">
              <div
                class="bg-linear-to-r from-[#3E2E27] to-[#2A1E19] p-8 md:p-10 rounded-2xl shadow-xl text-center border border-[#F99D1C]/20"
              >
                <h3 class="text-2xl md:text-3xl font-bold text-white mb-4">
                  Tertarik dengan Properti Syariah?
                </h3>
                <p
                  class="text-white/90 text-base md:text-lg mb-6 max-w-2xl mx-auto"
                >
                  HR Group menyediakan berbagai pilihan properti syariah dengan
                  cicilan fleksibel, bebas riba, dan proses mudah. Hubungi kami
                  untuk konsultasi gratis!
                </p>
                <div class="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="/#contact"
                    class="inline-block bg-[#F99D1C] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#e08d19] transition-colors shadow-lg"
                  >
                    Hubungi Kami
                  </a>
                  <a
                    href="/#projects"
                    class="inline-block bg-white text-[#3E2E27] px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors shadow-lg"
                  >
                    Lihat Proyek Kami
                  </a>
                </div>
              </div>
            </section>

            <!-- Comment Form -->
            <section class="mb-12">
              <h3 class="text-2xl font-bold text-[#3E2E27] mb-6">
                Tinggalkan Balasan
              </h3>
              <p class="text-gray-600 mb-6">
                Alamat email Anda tidak akan dipublikasikan. Ruas yang wajib
                ditandai <span class="text-red-500">*</span>
              </p>
              <form class="space-y-6" @submit.prevent>
                <div>
                  <label
                    for="comment"
                    class="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Komentar <span class="text-red-500">*</span>
                  </label>
                  <textarea
                    id="comment"
                    rows="6"
                    required
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F99D1C] focus:border-transparent outline-none transition-all"
                    placeholder="Tulis komentar Anda..."
                  ></textarea>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      for="name"
                      class="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Nama <span class="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F99D1C] focus:border-transparent outline-none transition-all"
                      placeholder="Nama Anda"
                    />
                  </div>

                  <div>
                    <label
                      for="email"
                      class="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Email <span class="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F99D1C] focus:border-transparent outline-none transition-all"
                      placeholder="email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label
                    for="website"
                    class="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Situs Web
                  </label>
                  <input
                    type="url"
                    id="website"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F99D1C] focus:border-transparent outline-none transition-all"
                    placeholder="https://example.com"
                  />
                </div>

                <div class="flex items-start">
                  <input
                    type="checkbox"
                    id="save-info"
                    class="mt-1 h-4 w-4 text-[#F99D1C] border-gray-300 rounded focus:ring-[#F99D1C]"
                  />
                  <label for="save-info" class="ml-2 text-sm text-gray-700">
                    Simpan nama, email, dan situs web saya pada peramban ini
                    untuk komentar saya berikutnya.
                  </label>
                </div>

                <button
                  type="submit"
                  class="px-8 py-3 bg-[#F99D1C] text-white font-bold rounded-lg hover:bg-[#FF8C00] transition-colors shadow-lg cursor-pointer"
                >
                  Kirim Komentar
                </button>
              </form>
            </section>
          </article>

          <!-- Right Column - Sidebar -->
          <aside class="lg:col-span-4">
            <div class="sticky top-24 space-y-8">
              <!-- Recent Posts -->
              <div
                class="bg-white rounded-xl shadow-md p-6 border border-gray-200"
              >
                <h3
                  class="text-xl font-bold text-[#3E2E27] mb-6 pb-3 border-b-2 border-[#F99D1C]"
                >
                  Recent Posts
                </h3>
                <div class="space-y-4">
                  <router-link
                    v-for="recentArticle in relatedArticles"
                    :key="recentArticle.id"
                    :to="`/artikel/${recentArticle.slug}`"
                    class="group flex gap-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0"
                  >
                    <div
                      class="relative w-20 h-20 shrink-0 rounded-lg overflow-hidden"
                    >
                      <img
                        :src="
                          recentArticle.imageUrl ||
                          recentArticle.image ||
                          '/placeholder.jpeg'
                        "
                        :alt="recentArticle.title"
                        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        @error="$event.target.src = '/placeholder.jpeg'"
                      />
                    </div>
                    <div class="flex-1 min-w-0">
                      <h4
                        class="text-sm font-bold text-gray-800 group-hover:text-[#F99D1C] transition-colors line-clamp-2 mb-1"
                      >
                        {{ recentArticle.title }}
                      </h4>
                      <p class="text-xs text-gray-500">
                        {{ formatDate(recentArticle.date) }}
                      </p>
                    </div>
                  </router-link>
                </div>
              </div>

              <!-- Categories -->
              <div
                class="bg-white rounded-xl shadow-md p-6 border border-gray-200"
              >
                <h3
                  class="text-xl font-bold text-[#3E2E27] mb-6 pb-3 border-b-2 border-[#F99D1C]"
                >
                  Kategori
                </h3>
                <div class="space-y-3">
                  <a
                    v-for="category in categories"
                    :key="category"
                    href="/#articles"
                    class="flex items-center justify-between text-gray-700 hover:text-[#F99D1C] transition-colors group"
                  >
                    <span class="text-sm font-medium">{{ category }}</span>
                    <span
                      class="text-xs text-gray-400 group-hover:text-[#F99D1C]"
                      >→</span
                    >
                  </a>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from "vue";
import { useRoute } from "vue-router";
import { Calendar, User } from "lucide-vue-next";
import {
  collection,
  getDocs,
  query,
  where,
  limit,
  orderBy,
} from "firebase/firestore";
import { db } from "@/firebase/config";
import { articles as staticArticles } from "../data/articles";

const route = useRoute();
const loading = ref(true);
const article = ref(null);
const allArticles = ref([]);

const categories = ["Tips & Trik", "Investasi", "Desain", "Pembiayaan"];

const relatedArticles = computed(() => {
  if (!article.value) return [];
  return allArticles.value.filter((a) => a.id !== article.value.id).slice(0, 3);
});

const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const loadArticle = async () => {
  loading.value = true;
  const slug = route.params.slug;

  try {
    // Try to find in static data first (for backward compatibility if needed, or fallback)
    // Actually, let's prioritize Firebase, and fallback to static if not found in Firebase?
    // Or better: Check Firebase first.

    const q = query(collection(db, "articles"), where("slug", "==", slug));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      article.value = { id: doc.id, ...doc.data() };
    } else {
      // Fallback to static data
      const foundStatic = staticArticles.find((a) => a.slug === slug);
      if (foundStatic) {
        article.value = foundStatic;
      } else {
        article.value = null;
      }
    }

    // Load other articles for "Recent Posts"
    const recentQuery = query(
      collection(db, "articles"),
      orderBy("date", "desc"),
      limit(5)
    );
    const recentSnapshot = await getDocs(recentQuery);

    // Only use Firebase articles for Recent Posts
    allArticles.value = recentSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error loading article:", error);
    // Fallback to static data on error
    const foundStatic = staticArticles.find((a) => a.slug === slug);
    article.value = foundStatic || null;
  } finally {
    loading.value = false;
    window.scrollTo(0, 0);
  }
};

onMounted(() => {
  loadArticle();
});

// Watch for route changes to reload article when navigating from sidebar
watch(
  () => route.params.slug,
  () => {
    loadArticle();
  }
);
</script>

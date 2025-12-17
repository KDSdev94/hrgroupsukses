<template>
  <section id="articles" class="py-20 bg-background">
    <div class="container mx-auto px-4">
      <div
        class="flex flex-col md:flex-row justify-between items-end mb-12 gap-4"
      >
        <div class="max-w-2xl">
          <h2 class="text-3xl md:text-4xl font-bold text-primary mb-4">
            Artikel & Berita
          </h2>
          <p class="text-muted">
            Dapatkan wawasan terbaru seputar properti, desain rumah, dan gaya
            hidup.
          </p>
        </div>
        <a
          href="/#articles"
          class="px-6 py-3 bg-surface border border-secondary text-secondary rounded-full font-semibold hover:bg-secondary hover:text-white transition-all duration-300"
        >
          Lihat Semua Artikel
        </a>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <router-link
          v-for="article in articles"
          :key="article.id"
          :to="`/artikel/${article.slug}`"
          class="bg-surface rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col group cursor-pointer"
        >
          <div class="relative h-56 overflow-hidden">
            <img
              :src="article.image"
              :alt="article.title"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              @error="$event.target.src = '/placeholder.jpeg'"
            />
            <div
              class="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-primary"
            >
              {{ article.category }}
            </div>
          </div>
          <div class="p-6 flex-1 flex flex-col">
            <div class="flex items-center gap-2 text-sm text-muted mb-3">
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
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              {{ article.date }}
            </div>
            <h3
              class="text-xl font-bold text-primary mb-3 group-hover:text-secondary transition-colors"
            >
              {{ article.title }}
            </h3>
            <p class="text-muted mb-4 line-clamp-3 flex-1">
              {{ article.excerpt }}
            </p>
            <div class="pt-4 border-t border-gray-100">
              <span
                class="text-secondary font-semibold text-sm group-hover:underline"
              >
                Baca Selengkapnya →
              </span>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "@/firebase/config";

const articles = ref([]);
const loading = ref(true);

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const loadArticles = async () => {
  try {
    const q = query(
      collection(db, "articles"),
      orderBy("date", "desc"),
      limit(3)
    );
    const querySnapshot = await getDocs(q);

    articles.value = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        slug: data.slug,
        title: data.title,
        category: data.category,
        date: formatDate(data.date),
        excerpt: data.excerpt,
        image: data.imageUrl || "/placeholder.jpeg",
      };
    });
  } catch (error) {
    console.error("Error loading articles:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  loadArticles();
});
</script>

<template>
  <div>
    <div class="w-full px-6 py-8">
      <!-- Header -->
      <AdminHeader
        :title="
          showAddForm
            ? editingArticle
              ? 'Edit Artikel'
              : 'Tambah Artikel'
            : 'Kelola Artikel'
        "
        :subtitle="
          showAddForm ? 'Articles/Edit Details' : 'Profile/All articles'
        "
        :searchPlaceholder="showAddForm ? null : 'Cari artikel...'"
        @search="handleSearch"
      >
        <template #actions>
          <div v-if="showAddForm" class="flex items-center gap-3">
            <button
              @click="closeForm"
              class="px-4 py-2 bg-white border border-gray-200 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm"
            >
              Cancel
            </button>
            <button
              @click="saveArticle"
              :disabled="saving"
              class="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm disabled:opacity-50"
            >
              {{ saving ? "Saving..." : "Save Changes" }}
            </button>
          </div>
          <div v-else>
            <button
              @click="showAddForm = true"
              class="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm flex items-center"
            >
              <svg
                class="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 4v16m8-8H4"
                ></path>
              </svg>
              Tambah Artikel
            </button>
          </div>
        </template>
      </AdminHeader>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-12">
        <div
          class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"
        ></div>
        <p class="mt-4 text-gray-600">Memuat data...</p>
      </div>

      <!-- Main Content -->
      <div v-else>
        <!-- LIST VIEW -->
        <div
          v-if="!showAddForm"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <!-- Article Cards -->
          <div
            v-for="article in filteredArticles"
            :key="article.id"
            class="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative group"
          >
            <!-- Card Header -->
            <div class="flex items-start justify-between mb-4">
              <div class="flex items-center gap-4">
                <div
                  class="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden shrink-0"
                >
                  <img
                    :src="article.imageUrl"
                    :alt="article.title"
                    class="w-full h-full object-cover"
                    @error="handleImageError"
                  />
                </div>
                <div>
                  <h3
                    class="text-base font-bold text-gray-800 leading-tight line-clamp-1"
                  >
                    {{ article.title }}
                  </h3>
                  <p class="text-xs text-gray-500 mt-1">
                    {{ article.category }}
                  </p>
                </div>
              </div>

              <!-- Menu Button -->
              <div class="relative">
                <button class="text-gray-400 hover:text-gray-600">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M12 13a1 1 0 100-2 1 1 0 000 2zm0-5a1 1 0 100-2 1 1 0 000 2zm0 10a1 1 0 100-2 1 1 0 000 2z"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Description -->
            <p class="text-gray-500 text-sm mb-6 line-clamp-2">
              {{ article.excerpt }}
            </p>

            <!-- Card Footer -->
            <div
              class="flex items-center justify-between pt-4 border-t border-gray-50"
            >
              <div class="flex flex-col">
                <span class="text-xs text-gray-400">Status</span>
                <span
                  class="text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full"
                  >Published</span
                >
              </div>
              <div class="flex flex-col items-end">
                <span class="text-xs text-gray-400">Tanggal</span>
                <span class="text-xs text-gray-600">{{
                  formatDate(article.date)
                }}</span>
              </div>
            </div>

            <!-- Hover Actions -->
            <div
              class="absolute top-4 right-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 rounded-lg p-1"
            >
              <button
                @click="editArticle(article)"
                class="p-1 text-blue-600 hover:bg-blue-50 rounded"
              >
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
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  ></path>
                </svg>
              </button>
              <button
                @click="deleteArticle(article.id)"
                class="p-1 text-red-600 hover:bg-red-50 rounded"
              >
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
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  ></path>
                </svg>
              </button>
            </div>
          </div>

          <!-- Add New Article Card -->
          <button
            @click="showAddForm = true"
            class="bg-white rounded-xl p-6 shadow-sm border-2 border-dashed border-gray-200 hover:border-primary hover:bg-primary/5 transition-all flex flex-col items-center justify-center min-h-[200px] group"
          >
            <div
              class="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-primary group-hover:text-white transition-colors mb-3"
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
                  d="M12 4v16m8-8H4"
                ></path>
              </svg>
            </div>
            <span class="text-gray-500 font-medium group-hover:text-primary"
              >New article</span
            >
          </button>
        </div>

        <!-- EDIT/ADD VIEW (Full Page) -->
        <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Left Column: Main Form -->
          <div class="lg:col-span-2">
            <div
              class="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
            >
              <h3 class="text-lg font-bold text-gray-800 mb-6">
                Konten Artikel
              </h3>

              <div class="space-y-6">
                <!-- Title -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2"
                    >Judul Artikel</label
                  >
                  <input
                    v-model="formData.title"
                    type="text"
                    class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary bg-gray-50 focus:bg-white transition-all"
                    placeholder="Contoh: Tips Memilih Rumah Syariah"
                  />
                </div>

                <!-- Category & Date -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2"
                      >Kategori</label
                    >
                    <select
                      v-model="formData.category"
                      class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary bg-gray-50 focus:bg-white transition-all"
                    >
                      <option value="">Pilih Kategori</option>
                      <option value="Berita">Berita</option>
                      <option value="Tips">Tips</option>
                      <option value="Promo">Promo</option>
                      <option value="Artikel">Artikel</option>
                    </select>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2"
                      >Tanggal</label
                    >
                    <input
                      v-model="formData.date"
                      type="date"
                      class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary bg-gray-50 focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <!-- Excerpt -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2"
                    >Ringkasan</label
                  >
                  <textarea
                    v-model="formData.excerpt"
                    rows="3"
                    class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary bg-gray-50 focus:bg-white transition-all"
                    placeholder="Ringkasan singkat artikel..."
                  ></textarea>
                </div>

                <!-- Content -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2"
                    >Konten Lengkap</label
                  >
                  <textarea
                    v-model="formData.content"
                    rows="12"
                    class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary bg-gray-50 focus:bg-white transition-all"
                    placeholder="Tulis konten artikel di sini..."
                  ></textarea>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Column: Image -->
          <div class="lg:col-span-1 space-y-6">
            <!-- Featured Image Card -->
            <div
              class="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
            >
              <h3 class="text-lg font-bold text-gray-800 mb-4">Gambar Utama</h3>

              <div
                class="border-2 border-dashed border-gray-200 rounded-xl p-4 text-center hover:border-primary/50 transition-colors relative"
              >
                <input
                  type="file"
                  accept="image/*"
                  @change="handleImageUpload"
                  class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div
                  v-if="imagePreview || formData.imageUrl"
                  class="relative z-0"
                >
                  <img
                    :src="imagePreview || formData.imageUrl"
                    class="w-full h-48 object-cover rounded-lg mx-auto"
                    alt="Featured Image"
                  />
                  <p class="text-xs text-gray-500 mt-2">Klik untuk mengganti</p>
                </div>
                <div v-else class="py-8">
                  <div
                    class="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-3"
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
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      ></path>
                    </svg>
                  </div>
                  <p class="text-sm font-medium text-gray-700">Upload Gambar</p>
                  <p class="text-xs text-gray-400 mt-1">
                    SVG, PNG, JPG or GIF (max. 800x400px)
                  </p>
                </div>
              </div>

              <!-- Upload Mode Selection -->
              <div class="mt-4">
                <label class="text-xs text-gray-500 block mb-2"
                  >Metode Upload:</label
                >
                <select
                  v-model="uploadMode"
                  class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  <option value="base64">Base64 (Default)</option>
                  <option value="storage">Firebase Storage</option>
                  <option value="url">URL Eksternal</option>
                </select>
              </div>

              <div v-if="uploadMode === 'url'" class="mt-3">
                <input
                  v-model="formData.imageUrl"
                  type="text"
                  placeholder="https://example.com/image.jpg"
                  class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import AdminHeader from "@/components/admin/AdminHeader.vue";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { db, storage } from "@/firebase/config";

const loading = ref(true);
const saving = ref(false);
const showAddForm = ref(false);
const editingArticle = ref(null);
const articles = ref([]);
const imageFile = ref(null);
const imagePreview = ref(null);
const searchQuery = ref("");

const filteredArticles = computed(() => {
  if (!searchQuery.value) return articles.value;
  const query = searchQuery.value.toLowerCase();
  return articles.value.filter(
    (article) =>
      article.title.toLowerCase().includes(query) ||
      article.category.toLowerCase().includes(query)
  );
});

const handleSearch = (query) => {
  searchQuery.value = query;
};

const uploadMode = ref("base64");

const formData = ref({
  title: "",
  category: "",
  date: new Date().toISOString().split("T")[0],
  excerpt: "",
  content: "",
  imageUrl: "",
});

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
    const querySnapshot = await getDocs(collection(db, "articles"));
    articles.value = querySnapshot.docs
      .map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  } catch (error) {
    console.error("Error loading articles:", error);
  } finally {
    loading.value = false;
  }
};

const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    if (file.size > 10 * 1024 * 1024) {
      alert("Ukuran file terlalu besar. Maksimal 10MB");
      return;
    }
    imageFile.value = file;

    if (uploadMode.value === "base64") {
      const reader = new FileReader();
      reader.onload = (e) => {
        imagePreview.value = e.target.result;
      };
      reader.readAsDataURL(file);
    } else {
      imagePreview.value = URL.createObjectURL(file);
    }
  }
};

const handleImageError = (e) => {
  e.target.src = "https://via.placeholder.com/400x300?text=Image+Error";
};

const compressImage = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        // Max dimensions to ensure reasonable size
        const MAX_WIDTH = 1024;
        const MAX_HEIGHT = 1024;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        // Initial compression
        let quality = 0.7;
        let dataUrl = canvas.toDataURL("image/jpeg", quality);

        // If still too large (> 900KB for Firestore safety), reduce quality and/or size
        while (dataUrl.length > 900 * 1024 && quality > 0.1) {
          quality -= 0.1;
          dataUrl = canvas.toDataURL("image/jpeg", quality);
        }

        resolve(dataUrl);
      };
      img.onerror = (error) => reject(error);
    };
    reader.onerror = (error) => reject(error);
  });
};

const uploadImage = async () => {
  if (uploadMode.value === "url") return formData.value.imageUrl;

  if (uploadMode.value === "base64") {
    if (imageFile.value) {
      try {
        const compressedBase64 = await compressImage(imageFile.value);
        return compressedBase64;
      } catch (error) {
        console.error("Error compressing image:", error);
        alert("Gagal memproses gambar. Silakan coba lagi.");
        throw error;
      }
    }
    return formData.value.imageUrl;
  }

  // Storage mode
  if (!imageFile.value) return formData.value.imageUrl;

  const timestamp = Date.now();
  const fileName = `articles/${timestamp}_${imageFile.value.name}`;
  const imageRef = storageRef(storage, fileName);

  await uploadBytes(imageRef, imageFile.value);
  return await getDownloadURL(imageRef);
};

const saveArticle = async () => {
  saving.value = true;

  try {
    let imageUrl = await uploadImage();
    if (!imageUrl) {
      imageUrl = "/placeholder.jpeg";
    }

    const slug = formData.value.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const articleData = {
      ...formData.value,
      imageUrl,
      slug,
      updatedAt: new Date().toISOString(),
    };

    if (editingArticle.value) {
      await updateDoc(
        doc(db, "articles", editingArticle.value.id),
        articleData
      );
    } else {
      articleData.createdAt = new Date().toISOString();
      await addDoc(collection(db, "articles"), articleData);
    }

    await loadArticles();
    closeForm();
  } catch (error) {
    console.error("Error saving article:", error);
    alert("Gagal menyimpan artikel. Silakan coba lagi.");
  } finally {
    saving.value = false;
  }
};

const editArticle = (article) => {
  editingArticle.value = article;
  formData.value = { ...article };
  imagePreview.value = null;
  showAddForm.value = true;
};

const deleteArticle = async (id) => {
  if (!confirm("Yakin ingin menghapus artikel ini?")) return;

  try {
    await deleteDoc(doc(db, "articles", id));
    await loadArticles();
  } catch (error) {
    console.error("Error deleting article:", error);
    alert("Gagal menghapus artikel. Silakan coba lagi.");
  }
};

const closeForm = () => {
  showAddForm.value = false;
  editingArticle.value = null;
  formData.value = {
    title: "",
    category: "",
    date: new Date().toISOString().split("T")[0],
    excerpt: "",
    content: "",
    imageUrl: "",
  };
  imageFile.value = null;
  imagePreview.value = null;
  uploadMode.value = "base64";
};

onMounted(() => {
  loadArticles();
});
</script>

<template>
  <div>
    <div class="w-full px-6 py-8">
      <AdminHeader
        title="Kelola Promo"
        subtitle="Profile/All promotions"
        searchPlaceholder="Cari promo..."
        @search="handleSearch"
      >
        <template #actions>
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
            Tambah Promo
          </button>
        </template>
      </AdminHeader>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-12">
        <div
          class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"
        ></div>
        <p class="mt-4 text-gray-600">Memuat data...</p>
      </div>

      <!-- Promo Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Promo Cards -->
        <div
          v-for="promo in filteredPromos"
          :key="promo.id"
          class="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative group"
        >
          <!-- Card Header -->
          <div class="flex items-start justify-between mb-4">
            <div class="flex items-center gap-4">
              <div
                class="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden shrink-0"
              >
                <img
                  :src="promo.imageUrl"
                  :alt="promo.title"
                  class="w-full h-full object-cover"
                  @error="handleImageError"
                />
              </div>
              <div>
                <h3
                  class="text-base font-bold text-gray-800 leading-tight line-clamp-1"
                >
                  {{ promo.title }}
                </h3>
                <p class="text-xs text-gray-500 mt-1">{{ promo.period }}</p>
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
            {{ promo.description }}
          </p>

          <!-- Card Footer -->
          <div
            class="flex items-center justify-between pt-4 border-t border-gray-50"
          >
            <div class="flex flex-col">
              <span class="text-xs text-gray-400">Subtitle</span>
              <span class="text-xs font-semibold text-gray-700">{{
                promo.subtitle || "-"
              }}</span>
            </div>
            <div class="flex flex-col items-end">
              <span class="text-xs text-gray-400">Update</span>
              <span class="text-xs text-gray-600">{{
                formatDate(promo.updatedAt || promo.createdAt)
              }}</span>
            </div>
          </div>

          <!-- Hover Actions -->
          <div
            class="absolute top-4 right-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 rounded-lg p-1"
          >
            <button
              @click="editPromo(promo)"
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
              @click="deletePromo(promo.id)"
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

        <!-- Add New Promo Card -->
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
            >New promo</span
          >
        </button>
      </div>
    </div>

    <!-- Add/Edit Modal -->
    <div
      v-if="showAddForm"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      @click.self="closeForm"
    >
      <div
        class="bg-surface rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div class="p-6">
          <h2 class="text-2xl font-bold text-primary mb-6">
            {{ editingPromo ? "Edit Promo" : "Tambah Promo Baru" }}
          </h2>

          <form @submit.prevent="savePromo" class="space-y-4">
            <!-- Title -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Judul Promo</label
              >
              <input
                v-model="formData.title"
                type="text"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Contoh: Promo Spesial Ramadhan"
              />
            </div>

            <!-- Description -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Deskripsi</label
              >
              <textarea
                v-model="formData.description"
                required
                rows="3"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Deskripsi singkat promo"
              ></textarea>
            </div>

            <!-- Subtitle -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Subtitle</label
              >
              <input
                v-model="formData.subtitle"
                type="text"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Contoh: Spesial Agustus 2025"
              />
            </div>

            <!-- Period -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Periode Promo</label
              >
              <input
                v-model="formData.period"
                type="text"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Contoh: 1 - 31 Agustus 2025"
              />
            </div>

            <!-- Benefits -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Keuntungan (pisahkan dengan enter)</label
              >
              <textarea
                v-model="benefitsText"
                rows="4"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Diskon hingga 20%&#10;Cicilan 0% untuk 6 bulan pertama&#10;Gratis biaya notaris"
              ></textarea>
            </div>

            <!-- Image Upload Mode -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Metode Upload Gambar</label
              >
              <div class="mb-4">
                <select
                  v-model="uploadMode"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="base64">Base64 (Default)</option>
                  <option value="storage">Firebase Storage</option>
                  <option value="url">URL Eksternal</option>
                </select>
              </div>

              <!-- URL Input -->
              <div v-if="uploadMode === 'url'">
                <input
                  v-model="formData.imageUrl"
                  type="text"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <!-- File Input (Storage & Base64) -->
              <div v-else>
                <input
                  type="file"
                  accept="image/*"
                  @change="handleImageUpload"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <p class="text-sm text-gray-500 mt-1">
                  Format: JPG, PNG. Maksimal 2MB
                  <span v-if="uploadMode === 'base64'" class="text-red-500"
                    >(Mode Base64: Gunakan gambar ukuran kecil agar tidak
                    memberatkan database)</span
                  >
                </p>
              </div>

              <!-- Image Preview -->
              <div v-if="imagePreview || formData.imageUrl" class="mt-4">
                <img
                  :src="imagePreview || formData.imageUrl"
                  alt="Preview"
                  class="w-full h-48 object-cover rounded-lg"
                  @error="handleImageError"
                />
              </div>
            </div>

            <!-- Buttons -->
            <div class="flex justify-end space-x-4 pt-4">
              <button
                type="button"
                @click="closeForm"
                class="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Batal
              </button>
              <button
                type="submit"
                :disabled="saving"
                class="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {{ saving ? "Menyimpan..." : "Simpan" }}
              </button>
            </div>
          </form>
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
const editingPromo = ref(null);
const promos = ref([]);
const imageFile = ref(null);
const imagePreview = ref(null);
const benefitsText = ref("");
const searchQuery = ref("");

const filteredPromos = computed(() => {
  if (!searchQuery.value) return promos.value;
  const query = searchQuery.value.toLowerCase();
  return promos.value.filter(
    (promo) =>
      promo.title.toLowerCase().includes(query) ||
      (promo.subtitle && promo.subtitle.toLowerCase().includes(query))
  );
});

const handleSearch = (query) => {
  searchQuery.value = query;
};

const formatDate = (dateString) => {
  if (!dateString) return "-";
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const uploadMode = ref("base64");

const formData = ref({
  title: "",
  subtitle: "",
  description: "",
  period: "",
  benefits: [],
  imageUrl: "",
});

const loadPromos = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "promotions"));
    promos.value = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error loading promos:", error);
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
        // For base64, we'll set the imageUrl directly in the save function or here
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
        alert(
          "Gagal memproses gambar. Silakan coba lagi atau gunakan metode Storage."
        );
        throw error;
      }
    }
    return formData.value.imageUrl;
  }

  // Storage mode
  if (!imageFile.value) return formData.value.imageUrl;

  const timestamp = Date.now();
  const fileName = `promotions/${timestamp}_${imageFile.value.name}`;
  const imageRef = storageRef(storage, fileName);

  await uploadBytes(imageRef, imageFile.value);
  return await getDownloadURL(imageRef);
};

const savePromo = async () => {
  saving.value = true;

  try {
    let imageUrl = await uploadImage();
    if (!imageUrl) {
      imageUrl = "/placeholder.jpeg";
    }

    const promoData = {
      ...formData.value,
      imageUrl,
      benefits: benefitsText.value.split("\n").filter((b) => b.trim()),
      updatedAt: new Date().toISOString(),
    };

    if (editingPromo.value) {
      await updateDoc(doc(db, "promotions", editingPromo.value.id), promoData);
    } else {
      promoData.createdAt = new Date().toISOString();
      await addDoc(collection(db, "promotions"), promoData);
    }

    await loadPromos();
    closeForm();
  } catch (error) {
    console.error("Error saving promo:", error);
    alert("Gagal menyimpan promo. Silakan coba lagi.");
  } finally {
    saving.value = false;
  }
};

const editPromo = (promo) => {
  editingPromo.value = promo;
  formData.value = { ...promo };
  benefitsText.value = (promo.benefits || []).join("\n");
  imagePreview.value = null;
  showAddForm.value = true;
};

const deletePromo = async (id) => {
  if (!confirm("Yakin ingin menghapus promo ini?")) return;

  try {
    await deleteDoc(doc(db, "promotions", id));
    await loadPromos();
  } catch (error) {
    console.error("Error deleting promo:", error);
    alert("Gagal menghapus promo. Silakan coba lagi.");
  }
};

const closeForm = () => {
  showAddForm.value = false;
  editingPromo.value = null;
  formData.value = {
    title: "",
    subtitle: "",
    description: "",
    period: "",
    benefits: [],
    imageUrl: "",
  };
  benefitsText.value = "";
  imageFile.value = null;
  imagePreview.value = null;
  uploadMode.value = "base64";
};

onMounted(() => {
  loadPromos();
});
</script>

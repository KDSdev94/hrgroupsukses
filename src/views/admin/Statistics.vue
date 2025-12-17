<template>
  <div>
    <div class="w-full px-6 py-8">
      <AdminHeader
        title="Kelola Statistik"
        subtitle="Settings/Statistics"
        :searchPlaceholder="null"
      >
        <template #actions>
          <button
            class="px-4 py-2 bg-white border border-gray-200 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm"
          >
            Cancel
          </button>
          <button
            @click="saveStatistics"
            class="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm"
          >
            Save Changes
          </button>
        </template>
      </AdminHeader>

      <div v-if="loading" class="text-center py-12">
        <div
          class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"
        ></div>
        <p class="mt-4 text-gray-600">Memuat data...</p>
      </div>

      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Left Column: Stats Cards -->
        <div class="lg:col-span-1 space-y-6">
          <!-- Rumah Tersedia Card -->
          <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div class="flex items-center justify-between mb-4">
              <div class="p-3 bg-blue-50 text-blue-600 rounded-lg">
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
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  ></path>
                </svg>
              </div>
              <span
                class="text-xs font-medium px-2.5 py-0.5 rounded-full bg-green-100 text-green-800"
              >
                +12%
              </span>
            </div>
            <h3 class="text-2xl font-bold text-gray-800 mb-1">
              {{ stats.availableHouses }}
            </h3>
            <p class="text-sm text-gray-500">Rumah Tersedia</p>
          </div>

          <!-- Rumah Terjual Card -->
          <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div class="flex items-center justify-between mb-4">
              <div class="p-3 bg-green-50 text-green-600 rounded-lg">
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
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
              <span
                class="text-xs font-medium px-2.5 py-0.5 rounded-full bg-green-100 text-green-800"
              >
                +25%
              </span>
            </div>
            <h3 class="text-2xl font-bold text-gray-800 mb-1">
              {{ stats.soldHouses }}
            </h3>
            <p class="text-sm text-gray-500">Rumah Terjual</p>
          </div>

          <!-- Agensi Terpercaya Card -->
          <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div class="flex items-center justify-between mb-4">
              <div class="p-3 bg-purple-50 text-purple-600 rounded-lg">
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
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  ></path>
                </svg>
              </div>
              <span
                class="text-xs font-medium px-2.5 py-0.5 rounded-full bg-green-100 text-green-800"
              >
                +5%
              </span>
            </div>
            <h3 class="text-2xl font-bold text-gray-800 mb-1">
              {{ stats.trustedAgencies }}
            </h3>
            <p class="text-sm text-gray-500">Agensi Terpercaya</p>
          </div>
        </div>

        <!-- Right Column: Form -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h4 class="text-base font-bold text-gray-800 mb-6 border-b pb-4">
              Detail Statistik
            </h4>

            <form @submit.prevent="saveStatistics" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Rumah Tersedia -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Rumah Tersedia
                  </label>
                  <input
                    v-model.number="stats.availableHouses"
                    type="number"
                    required
                    class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-gray-50 focus:bg-white"
                    placeholder="150"
                  />
                </div>

                <!-- Rumah Terjual -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Rumah Terjual
                  </label>
                  <input
                    v-model.number="stats.soldHouses"
                    type="number"
                    required
                    class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-gray-50 focus:bg-white"
                    placeholder="300"
                  />
                </div>

                <!-- Agensi Terpercaya -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Agensi Terpercaya
                  </label>
                  <input
                    v-model.number="stats.trustedAgencies"
                    type="number"
                    required
                    class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-gray-50 focus:bg-white"
                    placeholder="50"
                  />
                </div>
              </div>

              <!-- Success Message -->
              <div
                v-if="showSuccess"
                class="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 flex items-center"
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
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                Data statistik berhasil disimpan!
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import AdminHeader from "@/components/admin/AdminHeader.vue";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/firebase/config";

const loading = ref(true);
const saving = ref(false);
const showSuccess = ref(false);

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
  } finally {
    loading.value = false;
  }
};

const saveStatistics = async () => {
  saving.value = true;
  showSuccess.value = false;

  try {
    const docRef = doc(db, "settings", "statistics");
    await setDoc(docRef, stats.value);

    showSuccess.value = true;
    setTimeout(() => {
      showSuccess.value = false;
    }, 3000);
  } catch (error) {
    console.error("Error saving statistics:", error);
    alert("Gagal menyimpan data. Silakan coba lagi.");
  } finally {
    saving.value = false;
  }
};

onMounted(() => {
  loadStatistics();
});
</script>

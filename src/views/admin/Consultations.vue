<template>
  <div>
    <div class="w-full px-6 py-8">
      <AdminHeader
        title="Data Konsultasi"
        subtitle="Messages/Inbox"
        searchPlaceholder="Cari pesan..."
        @search="handleSearch"
      >
        <template #actions>
          <div
            class="text-sm text-gray-600 bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm"
          >
            Total:
            <span class="font-bold text-primary">{{
              consultations.length
            }}</span>
            pesan
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

      <!-- Consultations List -->
      <div v-else class="grid grid-cols-1 gap-4">
        <div
          v-for="consultation in filteredConsultations"
          :key="consultation.id"
          class="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative group"
          :class="{
            'border-l-4 border-l-primary': consultation.status !== 'read',
          }"
        >
          <div
            class="flex flex-col md:flex-row justify-between items-start gap-4"
          >
            <!-- User Info -->
            <div class="flex items-start gap-4">
              <div
                class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl shrink-0"
              >
                {{ consultation.name.charAt(0).toUpperCase() }}
              </div>
              <div>
                <h3 class="text-base font-bold text-gray-800">
                  {{ consultation.name }}
                </h3>
                <p class="text-xs text-gray-500">
                  {{ consultation.email }} • {{ consultation.phone }}
                </p>
                <div
                  class="mt-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg border border-gray-100"
                >
                  {{ consultation.message }}
                </div>
              </div>
            </div>

            <!-- Meta & Actions -->
            <div class="flex flex-col items-end gap-2 shrink-0">
              <span class="text-xs text-gray-400">{{
                formatDate(consultation.createdAt)
              }}</span>

              <div class="flex items-center gap-2 mt-2">
                <span
                  v-if="consultation.status === 'read'"
                  class="px-2 py-1 bg-green-50 text-green-600 text-xs rounded-full border border-green-100"
                >
                  Dibaca
                </span>
                <span
                  v-else
                  class="px-2 py-1 bg-yellow-50 text-yellow-600 text-xs rounded-full border border-yellow-100"
                >
                  Baru
                </span>
              </div>

              <!-- Action Buttons -->
              <div class="flex gap-2 mt-2">
                <button
                  v-if="consultation.status !== 'read'"
                  @click="markAsRead(consultation.id)"
                  class="p-2 text-green-600 hover:bg-green-50 rounded-lg border border-gray-200 hover:border-green-200 transition-colors text-xs flex items-center"
                  title="Tandai Sudah Dibaca"
                >
                  <svg
                    class="w-4 h-4 mr-1"
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
                  Mark Read
                </button>

                <a
                  :href="`https://wa.me/${consultation.phone.replace(
                    /\D/g,
                    ''
                  )}`"
                  target="_blank"
                  class="p-2 text-green-600 hover:bg-green-50 rounded-lg border border-gray-200 hover:border-green-200 transition-colors text-xs flex items-center"
                  title="Balas via WhatsApp"
                >
                  <svg
                    class="w-4 h-4 mr-1"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"
                    />
                  </svg>
                  WhatsApp
                </a>

                <button
                  @click="deleteConsultation(consultation.id)"
                  class="p-2 text-red-600 hover:bg-red-50 rounded-lg border border-gray-200 hover:border-red-200 transition-colors text-xs flex items-center"
                  title="Hapus Pesan"
                >
                  <svg
                    class="w-4 h-4 mr-1"
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
                  Hapus
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="consultations.length === 0" class="text-center py-12">
          <svg
            class="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          <p class="mt-4 text-gray-600">Belum ada pesan konsultasi.</p>
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
  updateDoc,
  deleteDoc,
  doc,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "@/firebase/config";

const loading = ref(true);
const consultations = ref([]);
const searchQuery = ref("");

const filteredConsultations = computed(() => {
  if (!searchQuery.value) return consultations.value;
  const query = searchQuery.value.toLowerCase();
  return consultations.value.filter(
    (consultation) =>
      consultation.name.toLowerCase().includes(query) ||
      consultation.email.toLowerCase().includes(query) ||
      consultation.message.toLowerCase().includes(query)
  );
});

const handleSearch = (query) => {
  searchQuery.value = query;
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const loadConsultations = async () => {
  try {
    const q = query(
      collection(db, "consultations"),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    consultations.value = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error loading consultations:", error);
  } finally {
    loading.value = false;
  }
};

const markAsRead = async (id) => {
  try {
    await updateDoc(doc(db, "consultations", id), {
      status: "read",
      readAt: new Date().toISOString(),
    });
    await loadConsultations();
  } catch (error) {
    console.error("Error marking as read:", error);
    alert("Gagal mengubah status. Silakan coba lagi.");
  }
};

const deleteConsultation = async (id) => {
  if (!confirm("Yakin ingin menghapus pesan ini?")) return;

  try {
    await deleteDoc(doc(db, "consultations", id));
    await loadConsultations();
  } catch (error) {
    console.error("Error deleting consultation:", error);
    alert("Gagal menghapus pesan. Silakan coba lagi.");
  }
};

onMounted(() => {
  loadConsultations();
});
</script>

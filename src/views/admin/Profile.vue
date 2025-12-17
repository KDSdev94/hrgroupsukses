<template>
  <div>
    <div class="w-full px-6 py-8">
      <AdminHeader
        title="Kelola Profile"
        subtitle="Settings/Profile"
        :searchPlaceholder="null"
      >
        <template #actions>
          <button
            class="px-4 py-2 bg-white border border-gray-200 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm"
          >
            Cancel
          </button>
          <button
            @click="saveProfile"
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
        <!-- Left Column: Navigation/Context -->
        <div class="lg:col-span-1 space-y-6">
          <!-- About Image Card -->
          <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 class="text-base font-bold text-gray-800 mb-4">
              Foto Tentang Kami
            </h3>
            <div class="flex flex-col items-center w-full">
              <!-- Upload Method Selector -->
              <div class="mb-4 w-full">
                <select
                  v-model="aboutUploadMode"
                  class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary bg-gray-50"
                >
                  <option value="base64">Base64 (Default)</option>
                  <option value="storage">Firebase Storage</option>
                  <option value="url">URL Langsung</option>
                </select>
              </div>

              <!-- URL Input -->
              <div v-if="aboutUploadMode === 'url'" class="w-full mb-4">
                <input
                  v-model="profile.aboutImage"
                  type="url"
                  class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="https://example.com/foto.jpg"
                />
              </div>

              <!-- Image Preview / File Input -->
              <div
                v-if="aboutUploadMode !== 'url'"
                class="w-full h-48 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 flex items-center justify-center mb-4 overflow-hidden relative group"
              >
                <img
                  v-if="aboutImagePreview || profile.aboutImage"
                  :src="aboutImagePreview || profile.aboutImage"
                  alt="About Preview"
                  class="w-full h-full object-cover"
                />
                <div v-else class="text-gray-400 text-center p-2">
                  <svg
                    class="w-8 h-8 mx-auto mb-1"
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
                  <span class="text-xs">Upload Foto</span>
                </div>

                <!-- Overlay Upload -->
                <label
                  class="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                >
                  <span class="text-white text-xs font-medium">Ganti Foto</span>
                  <input
                    type="file"
                    accept="image/*"
                    @change="handleAboutImageUpload"
                    class="hidden"
                  />
                </label>
              </div>

              <!-- URL Preview -->
              <div
                v-if="aboutUploadMode === 'url' && profile.aboutImage"
                class="w-full h-48 rounded-xl overflow-hidden border border-gray-200 mb-4"
              >
                <img
                  :src="profile.aboutImage"
                  class="w-full h-full object-cover"
                />
              </div>

              <p class="text-xs text-gray-500 text-center">
                Rekomendasi: Landscape (16:9).<br />Maksimal 2MB.
              </p>
            </div>
          </div>

          <!-- Team Management (Moved from Right Column) -->
          <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 class="text-lg font-bold text-gray-800 mb-6 border-b pb-4">
              Kelola Tim
            </h2>

            <!-- Add/Edit Form -->
            <div class="bg-gray-50 rounded-lg p-4 mb-6 border border-gray-200">
              <h3 class="text-sm font-bold text-gray-700 mb-4">
                {{
                  editingMemberIndex > -1
                    ? "Edit Anggota Tim"
                    : "Tambah Anggota Tim"
                }}
              </h3>
              <div class="flex flex-col gap-4">
                <!-- Photo Upload -->
                <div>
                  <!-- Upload Method Selector -->
                  <div class="mb-2">
                    <select
                      v-model="teamUploadMode"
                      class="w-full px-2 py-1 border border-gray-200 rounded text-xs focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    >
                      <option value="base64">Base64 (Default)</option>
                      <option value="storage">Firebase Storage</option>
                      <option value="url">URL</option>
                    </select>
                  </div>

                  <!-- URL Input -->
                  <div v-if="teamUploadMode === 'url'" class="mb-2">
                    <input
                      v-model="newMember.image"
                      type="url"
                      class="w-full px-2 py-1 border border-gray-200 rounded text-xs focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      placeholder="https://example.com/foto.jpg"
                    />
                  </div>

                  <!-- Image Preview / File Input -->
                  <div
                    v-if="teamUploadMode !== 'url'"
                    class="relative group cursor-pointer border-2 border-dashed border-gray-300 rounded-lg h-32 flex items-center justify-center bg-white overflow-hidden hover:border-primary transition-colors"
                  >
                    <img
                      v-if="
                        teamImagePreview ||
                        (newMember.image && !newMember.image.startsWith('http'))
                      "
                      :src="teamImagePreview || newMember.image"
                      class="w-full h-full object-cover"
                    />
                    <div v-else class="text-center p-2 text-gray-400">
                      <svg
                        class="w-8 h-8 mx-auto mb-1"
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
                      <span class="text-xs">Foto</span>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      @change="handleTeamImageUpload"
                      class="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </div>

                  <!-- URL Preview -->
                  <div
                    v-if="teamUploadMode === 'url' && newMember.image"
                    class="mt-2 h-32 rounded-lg overflow-hidden border border-gray-200"
                  >
                    <img
                      :src="newMember.image"
                      class="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <!-- Inputs -->
                <div class="space-y-3">
                  <div>
                    <input
                      v-model="newMember.name"
                      type="text"
                      placeholder="Nama Lengkap"
                      class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>
                  <div>
                    <input
                      v-model="newMember.role"
                      type="text"
                      placeholder="Jabatan"
                      class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>
                  <div class="flex gap-2 justify-end">
                    <button
                      v-if="editingMemberIndex > -1"
                      @click="cancelEditTeam"
                      type="button"
                      class="px-3 py-1.5 text-xs font-medium text-gray-600 bg-white border border-gray-300 rounded hover:bg-gray-50"
                    >
                      Batal
                    </button>
                    <button
                      @click="addTeamMember"
                      type="button"
                      class="px-3 py-1.5 text-xs font-medium text-white bg-primary rounded hover:bg-primary/90"
                    >
                      {{ editingMemberIndex > -1 ? "Update" : "Tambah" }}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Team List -->
            <div class="space-y-3">
              <div
                v-for="(member, index) in profile.team"
                :key="index"
                class="flex items-center justify-between p-3 bg-white border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div class="flex items-center gap-3">
                  <div
                    class="w-10 h-10 rounded-full bg-gray-100 overflow-hidden shrink-0"
                  >
                    <img
                      v-if="member.image"
                      :src="member.image"
                      class="w-full h-full object-cover"
                    />
                    <div
                      v-else
                      class="w-full h-full flex items-center justify-center text-gray-400"
                    >
                      <svg
                        class="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h4 class="text-sm font-bold text-gray-800">
                      {{ member.name }}
                    </h4>
                    <p class="text-xs text-gray-500">{{ member.role }}</p>
                  </div>
                </div>
                <div class="flex items-center gap-2">
                  <button
                    @click="editTeamMember(index)"
                    type="button"
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
                    @click="removeTeamMember(index)"
                    type="button"
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
              <div
                v-if="profile.team.length === 0"
                class="text-center py-4 text-gray-500 text-sm"
              >
                Belum ada anggota tim. Tambahkan di atas.
              </div>
            </div>
          </div>

          <!-- Quick Links or Info -->
          <div class="bg-blue-50 rounded-xl p-6 border border-blue-100">
            <h4 class="text-blue-800 font-bold mb-2">Info Profile</h4>
            <p class="text-blue-600 text-sm">
              Informasi ini akan ditampilkan di seluruh website. Pastikan data
              selalu up-to-date.
            </p>
          </div>
        </div>

        <!-- Right Column: Forms -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Company Info -->
          <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 class="text-lg font-bold text-gray-800 mb-6 border-b pb-4">
              Informasi Perusahaan
            </h2>
            <form @submit.prevent="saveProfile" class="space-y-4">
              <div class="grid grid-cols-1 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2"
                    >Tagline (Judul Header)</label
                  >
                  <input
                    v-model="profile.tagline"
                    type="text"
                    required
                    class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-gray-50 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Deskripsi</label
                >
                <div
                  class="border border-gray-200 rounded-lg overflow-hidden bg-white focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all"
                >
                  <!-- Toolbar -->
                  <div
                    class="flex items-center gap-1 p-2 border-b border-gray-100 bg-gray-50"
                  >
                    <button
                      type="button"
                      @click="formatDoc('bold')"
                      class="p-1.5 rounded hover:bg-gray-200 text-gray-600 transition-colors"
                      title="Bold"
                    >
                      <Bold class="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      @click="formatDoc('italic')"
                      class="p-1.5 rounded hover:bg-gray-200 text-gray-600 transition-colors"
                      title="Italic"
                    >
                      <Italic class="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      @click="formatDoc('underline')"
                      class="p-1.5 rounded hover:bg-gray-200 text-gray-600 transition-colors"
                      title="Underline"
                    >
                      <Underline class="w-4 h-4" />
                    </button>
                  </div>
                  <!-- Editor -->
                  <div
                    ref="descriptionEditor"
                    contenteditable="true"
                    class="w-full px-4 py-3 min-h-[120px] outline-none text-gray-700 prose prose-sm max-w-none"
                    @input="onDescriptionInput"
                  ></div>
                </div>
              </div>

              <!-- Profile Page Content -->
              <div class="border-t pt-4 mt-4">
                <h3 class="text-md font-bold text-gray-800 mb-4">
                  Konten Halaman Profil
                </h3>

                <!-- Visi -->
                <div class="mb-4">
                  <label class="block text-sm font-medium text-gray-700 mb-2"
                    >Visi</label
                  >
                  <textarea
                    v-model="profile.visi"
                    rows="2"
                    class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-gray-50 focus:bg-white"
                    placeholder="Visi perusahaan..."
                  ></textarea>
                </div>

                <!-- Misi -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2"
                    >Misi (Pisahkan dengan baris baru)</label
                  >
                  <textarea
                    v-model="misiText"
                    rows="4"
                    class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-gray-50 focus:bg-white"
                    placeholder="Misi 1&#10;Misi 2&#10;Misi 3"
                  ></textarea>
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2"
                    >Email</label
                  >
                  <input
                    v-model="profile.email"
                    type="email"
                    required
                    class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-gray-50 focus:bg-white"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2"
                    >Telepon</label
                  >
                  <input
                    v-model="profile.phone"
                    type="tel"
                    required
                    class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-gray-50 focus:bg-white"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2"
                    >WhatsApp</label
                  >
                  <input
                    v-model="profile.whatsapp"
                    type="tel"
                    required
                    class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-gray-50 focus:bg-white"
                  />
                </div>
              </div>
            </form>
          </div>

          <!-- Social Media -->
          <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 class="text-lg font-bold text-gray-800 mb-6 border-b pb-4">
              Media Sosial
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Facebook</label
                >
                <input
                  v-model="profile.social.facebook"
                  type="url"
                  class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-gray-50 focus:bg-white"
                  placeholder="https://facebook.com/..."
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Instagram</label
                >
                <input
                  v-model="profile.social.instagram"
                  type="url"
                  class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-gray-50 focus:bg-white"
                  placeholder="https://instagram.com/..."
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >YouTube</label
                >
                <input
                  v-model="profile.social.youtube"
                  type="url"
                  class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-gray-50 focus:bg-white"
                  placeholder="https://youtube.com/..."
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >TikTok</label
                >
                <input
                  v-model="profile.social.tiktok"
                  type="url"
                  class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-gray-50 focus:bg-white"
                  placeholder="https://tiktok.com/..."
                />
              </div>
            </div>
          </div>

          <!-- Success Message Toast -->
          <div
            v-if="showSuccess"
            class="fixed top-24 right-6 z-50 p-4 bg-green-100 border border-green-200 text-green-800 rounded-xl shadow-lg flex items-center gap-3 transition-all duration-300 transform translate-y-0 opacity-100"
          >
            <div class="bg-green-200 p-2 rounded-full">
              <svg
                class="w-6 h-6 text-green-700"
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
            </div>
            <div>
              <h4 class="font-bold text-sm">Berhasil Disimpan!</h4>
              <p class="text-xs text-green-700">
                Perubahan profil telah berhasil diperbarui.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import AdminHeader from "@/components/admin/AdminHeader.vue";
import { Bold, Italic, Underline } from "lucide-vue-next";
import { doc, getDoc, setDoc } from "firebase/firestore";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { db, storage } from "@/firebase/config";

const loading = ref(true);
const saving = ref(false);
const showSuccess = ref(false);
const logoFile = ref(null);
const logoPreview = ref(null);
const aboutImageFile = ref(null);
const aboutImagePreview = ref(null);
const aboutUploadMode = ref("base64");
const misiText = ref("");
const descriptionEditor = ref(null);

// Team Management Refs
const teamImageFile = ref(null);
const teamImagePreview = ref(null);
const teamUploadMode = ref("base64");
const editingMemberIndex = ref(-1);
const newMember = ref({
  name: "",
  role: "",
  image: "",
});

const profile = ref({
  tagline: "Mewujudkan Rumah Impian Tanpa Riba",
  description: "",
  email: "",
  phone: "",
  whatsapp: "",
  logo: "",
  aboutImage: "",
  visi: "",
  misi: [],
  social: {
    facebook: "",
    instagram: "",
    youtube: "",
    tiktok: "",
  },
  team: [], // Array to store team members
});

const loadProfile = async () => {
  try {
    const docRef = doc(db, "settings", "profile");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      profile.value = {
        ...profile.value,
        ...data,
        team: data.team || [], // Ensure team array exists
        misi: data.misi || [],
      };
      misiText.value = profile.value.misi.join("\n");
      // Set editor content
      if (descriptionEditor.value) {
        descriptionEditor.value.innerHTML = profile.value.description || "";
      }
    }
  } catch (error) {
    console.error("Error loading profile:", error);
  } finally {
    loading.value = false;
  }
};

const handleLogoUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    if (file.size > 10 * 1024 * 1024) {
      alert("Ukuran file terlalu besar. Maksimal 10MB");
      return;
    }
    logoFile.value = file;
    logoPreview.value = URL.createObjectURL(file);
  }
};

const handleTeamImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    if (file.size > 10 * 1024 * 1024) {
      alert("Ukuran file terlalu besar. Maksimal 10MB");
      return;
    }
    teamImageFile.value = file;

    if (teamUploadMode.value === "base64") {
      const reader = new FileReader();
      reader.onload = (e) => {
        teamImagePreview.value = e.target.result;
      };
      reader.readAsDataURL(file);
    } else {
      teamImagePreview.value = URL.createObjectURL(file);
    }
  }
};

const formatDoc = (cmd, value = null) => {
  if (value) {
    document.execCommand(cmd, false, value);
  } else {
    document.execCommand(cmd);
  }
};

const onDescriptionInput = () => {
  if (descriptionEditor.value) {
    profile.value.description = descriptionEditor.value.innerHTML;
  }
};

const handleAboutImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    if (file.size > 10 * 1024 * 1024) {
      alert("Ukuran file terlalu besar. Maksimal 10MB");
      return;
    }
    aboutImageFile.value = file;

    if (aboutUploadMode.value === "base64") {
      const reader = new FileReader();
      reader.onload = (e) => {
        aboutImagePreview.value = e.target.result;
      };
      reader.readAsDataURL(file);
    } else {
      aboutImagePreview.value = URL.createObjectURL(file);
    }
  }
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

const uploadFile = async (file, path) => {
  if (!file) return null;
  const timestamp = Date.now();
  const fileName = `${path}/${timestamp}_${file.name}`;
  const imageRef = storageRef(storage, fileName);
  await uploadBytes(imageRef, file);
  return await getDownloadURL(imageRef);
};

const addTeamMember = async () => {
  if (!newMember.value.name || !newMember.value.role) {
    alert("Nama dan Jabatan wajib diisi!");
    return;
  }

  try {
    let imageUrl = newMember.value.image;

    if (teamUploadMode.value === "url") {
      // imageUrl is already bound to newMember.image if input is used
      // But we need to make sure we use the input value if provided
      // Actually, let's assume the user inputs directly into newMember.image for URL mode
    } else if (teamUploadMode.value === "base64") {
      if (teamImageFile.value) {
        try {
          imageUrl = await compressImage(teamImageFile.value);
        } catch (error) {
          console.error("Error compressing team image:", error);
          alert("Gagal memproses gambar. Silakan coba lagi.");
          return;
        }
      }
    } else {
      // Storage mode
      if (teamImageFile.value) {
        imageUrl = await uploadFile(teamImageFile.value, "team");
      }
    }

    // Fallback placeholder if no image
    if (!imageUrl) {
      imageUrl = "/placeholder.jpeg";
    }

    const memberData = {
      name: newMember.value.name,
      role: newMember.value.role,
      image: imageUrl,
    };

    if (editingMemberIndex.value > -1) {
      profile.value.team[editingMemberIndex.value] = memberData;
    } else {
      profile.value.team.push(memberData);
    }

    // Reset form
    newMember.value = { name: "", role: "", image: "" };
    teamImageFile.value = null;
    teamImagePreview.value = null;

    const action = editingMemberIndex.value > -1 ? "diperbarui" : "ditambahkan";
    editingMemberIndex.value = -1;
    teamUploadMode.value = "storage"; // Reset mode

    alert(
      `Anggota tim berhasil ${action}. Jangan lupa klik 'Save Changes' di pojok kanan atas untuk menyimpan perubahan.`
    );
  } catch (error) {
    console.error("Error adding team member:", error);
    alert("Gagal menyimpan data tim.");
  }
};

const editTeamMember = (index) => {
  const member = profile.value.team[index];
  newMember.value = { ...member };
  editingMemberIndex.value = index;
  teamImagePreview.value = member.image;

  // Scroll to form (optional, simplified for now)
};

const removeTeamMember = (index) => {
  if (confirm("Apakah Anda yakin ingin menghapus anggota tim ini?")) {
    profile.value.team.splice(index, 1);
  }
};

const cancelEditTeam = () => {
  newMember.value = { name: "", role: "", image: "" };
  teamImageFile.value = null;
  teamImagePreview.value = null;
  editingMemberIndex.value = -1;
};

const saveProfile = async () => {
  saving.value = true;
  showSuccess.value = false;

  try {
    let logoUrl = profile.value.logo;
    if (logoFile.value) {
      logoUrl = await uploadFile(logoFile.value, "logo");
    }

    let aboutImageUrl = profile.value.aboutImage;

    if (aboutUploadMode.value === "url") {
      // URL is already bound
    } else if (aboutUploadMode.value === "base64") {
      if (aboutImageFile.value) {
        try {
          aboutImageUrl = await compressImage(aboutImageFile.value);
        } catch (error) {
          console.error("Error compressing about image:", error);
          alert("Gagal memproses gambar. Silakan coba lagi.");
          saving.value = false;
          return;
        }
      }
    } else {
      // Storage
      if (aboutImageFile.value) {
        aboutImageUrl = await uploadFile(aboutImageFile.value, "about");
      }
    }

    const profileData = {
      ...profile.value,
      logo: logoUrl,
      aboutImage: aboutImageUrl,
      misi: misiText.value.split("\n").filter((line) => line.trim() !== ""),
      updatedAt: new Date().toISOString(),
    };

    const docRef = doc(db, "settings", "profile");
    await setDoc(docRef, profileData);

    showSuccess.value = true;
    setTimeout(() => {
      showSuccess.value = false;
    }, 3000);
  } catch (error) {
    console.error("Error saving profile:", error);
    alert("Gagal menyimpan profil. Silakan coba lagi.");
  } finally {
    saving.value = false;
  }
};

onMounted(() => {
  loadProfile();
});
</script>

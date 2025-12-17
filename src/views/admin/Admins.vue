<template>
  <div class="w-full px-6 py-8">
    <AdminHeader
      title="Kelola Admin"
      subtitle="Settings/Admin Management"
      :searchPlaceholder="null"
    >
      <template #actions>
        <button
          @click="openAddDialog"
          class="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm flex items-center gap-2"
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
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            ></path>
          </svg>
          Tambah Admin
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

    <!-- Admin List -->
    <div v-else class="bg-white rounded-xl shadow-sm border border-gray-100">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50 border-b border-gray-200">
            <tr>
              <th
                class="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider"
              >
                Admin
              </th>
              <th
                class="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider"
              >
                Email
              </th>
              <th
                class="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider"
              >
                Role
              </th>
              <th
                class="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                class="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider"
              >
                Dibuat
              </th>
              <th
                class="px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase tracking-wider"
              >
                Aksi
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr
              v-for="admin in admins"
              :key="admin.id"
              class="hover:bg-gray-50 transition-colors"
            >
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div
                    class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold"
                  >
                    {{ getInitials(admin.name) }}
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-800">
                      {{ admin.name }}
                    </p>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4">
                <p class="text-sm text-gray-600">{{ admin.email }}</p>
              </td>
              <td class="px-6 py-4">
                <span
                  :class="[
                    'px-2 py-1 text-xs font-medium rounded-full',
                    admin.role === 'super_admin'
                      ? 'bg-purple-100 text-purple-700'
                      : 'bg-blue-100 text-blue-700',
                  ]"
                >
                  {{ admin.role === "super_admin" ? "Super Admin" : "Admin" }}
                </span>
              </td>
              <td class="px-6 py-4">
                <span
                  :class="[
                    'px-2 py-1 text-xs font-medium rounded-full',
                    admin.status === 'active'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700',
                  ]"
                >
                  {{ admin.status === "active" ? "Aktif" : "Nonaktif" }}
                </span>
              </td>
              <td class="px-6 py-4">
                <p class="text-sm text-gray-600">
                  {{ formatDate(admin.createdAt) }}
                </p>
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center justify-end gap-2">
                  <button
                    @click="editAdmin(admin)"
                    class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Edit"
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
                    @click="openResetPasswordDialog(admin)"
                    class="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                    title="Reset Password"
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
                        d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                      ></path>
                    </svg>
                  </button>
                  <button
                    v-if="admin.role !== 'super_admin'"
                    @click="deleteAdmin(admin)"
                    class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Hapus"
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
              </td>
            </tr>
          </tbody>
        </table>

        <div v-if="admins.length === 0" class="text-center py-12 text-gray-500">
          <p>Belum ada data admin</p>
        </div>
      </div>
    </div>

    <!-- Add/Edit Dialog -->
    <div
      v-if="showDialog"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      @click.self="closeDialog"
    >
      <div
        class="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
      >
        <div class="p-6 border-b border-gray-100">
          <h3 class="text-xl font-bold text-gray-800">
            {{ editingAdmin ? "Edit Admin" : "Tambah Admin Baru" }}
          </h3>
        </div>

        <form @submit.prevent="saveAdmin" class="p-6 space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Nama Lengkap</label
            >
            <input
              v-model="formData.name"
              type="text"
              required
              class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
              placeholder="Masukkan nama lengkap"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Email</label
            >
            <input
              v-model="formData.email"
              type="email"
              required
              :disabled="editingAdmin !== null"
              class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:bg-gray-100"
              placeholder="admin@example.com"
            />
            <p v-if="editingAdmin" class="text-xs text-gray-500 mt-1">
              Email tidak dapat diubah
            </p>
          </div>

          <div v-if="!editingAdmin">
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Password</label
            >
            <input
              v-model="formData.password"
              type="password"
              :required="!editingAdmin"
              class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
              placeholder="Minimal 6 karakter"
              minlength="6"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Role</label
            >
            <select
              v-model="formData.role"
              required
              class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
            >
              <option value="admin">Admin</option>
              <option value="super_admin">Super Admin</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Status</label
            >
            <select
              v-model="formData.status"
              required
              class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
            >
              <option value="active">Aktif</option>
              <option value="inactive">Nonaktif</option>
            </select>
          </div>

          <div class="flex gap-3 pt-4">
            <button
              type="button"
              @click="closeDialog"
              class="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              :disabled="saving"
              class="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {{ saving ? "Menyimpan..." : "Simpan" }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Reset Password Dialog -->
    <div
      v-if="showResetPasswordDialog"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      @click.self="closeResetPasswordDialog"
    >
      <div
        class="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
      >
        <div class="p-6 border-b border-gray-100">
          <h3 class="text-xl font-bold text-gray-800">Ganti Password</h3>
          <p class="text-sm text-gray-600 mt-1">
            Ganti password untuk:
            <strong>{{ resetPasswordAdmin?.name }}</strong>
          </p>
        </div>

        <form @submit.prevent="resetPassword" class="p-6 space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Password Lama</label
            >
            <div class="relative">
              <input
                v-model="resetPasswordData.oldPassword"
                :type="showOldPassword ? 'text' : 'password'"
                required
                class="w-full px-4 py-2 pr-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="Masukkan password lama"
              />
              <button
                type="button"
                @click="showOldPassword = !showOldPassword"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <svg
                  v-if="!showOldPassword"
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  ></path>
                </svg>
                <svg
                  v-else
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                  ></path>
                </svg>
              </button>
            </div>
            <p class="text-xs text-gray-500 mt-1">
              Diperlukan untuk verifikasi keamanan
            </p>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Password Baru</label
            >
            <div class="relative">
              <input
                v-model="resetPasswordData.newPassword"
                :type="showNewPassword ? 'text' : 'password'"
                required
                class="w-full px-4 py-2 pr-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="Minimal 6 karakter"
                minlength="6"
              />
              <button
                type="button"
                @click="showNewPassword = !showNewPassword"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <svg
                  v-if="!showNewPassword"
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  ></path>
                </svg>
                <svg
                  v-else
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                  ></path>
                </svg>
              </button>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Konfirmasi Password Baru</label
            >
            <div class="relative">
              <input
                v-model="resetPasswordData.confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                required
                class="w-full px-4 py-2 pr-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="Ketik ulang password baru"
                minlength="6"
              />
              <button
                type="button"
                @click="showConfirmPassword = !showConfirmPassword"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <svg
                  v-if="!showConfirmPassword"
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  ></path>
                </svg>
                <svg
                  v-else
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                  ></path>
                </svg>
              </button>
            </div>
          </div>

          <div
            v-if="
              resetPasswordData.newPassword &&
              resetPasswordData.confirmPassword &&
              resetPasswordData.newPassword !==
                resetPasswordData.confirmPassword
            "
            class="text-red-600 text-sm flex items-center gap-2"
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
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            Password baru tidak cocok
          </div>

          <div
            v-if="
              resetPasswordData.newPassword &&
              resetPasswordData.confirmPassword &&
              resetPasswordData.newPassword ===
                resetPasswordData.confirmPassword
            "
            class="text-green-600 text-sm flex items-center gap-2"
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
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
            Password cocok
          </div>

          <div class="flex gap-3 pt-4">
            <button
              type="button"
              @click="closeResetPasswordDialog"
              class="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              :disabled="
                saving ||
                !resetPasswordData.oldPassword ||
                resetPasswordData.newPassword !==
                  resetPasswordData.confirmPassword
              "
              class="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ saving ? "Mengubah..." : "Ganti Password" }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Success Toast -->
    <div
      v-if="showSuccess"
      class="fixed top-24 right-6 z-50 p-4 bg-green-100 border border-green-200 text-green-800 rounded-xl shadow-lg flex items-center gap-3"
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
        <h4 class="font-bold text-sm">Berhasil!</h4>
        <p class="text-xs text-green-700">{{ successMessage }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import AdminHeader from "@/components/admin/AdminHeader.vue";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { db, auth } from "@/firebase/config";

const loading = ref(true);
const saving = ref(false);
const showDialog = ref(false);
const showResetPasswordDialog = ref(false);
const showOldPassword = ref(false);
const showNewPassword = ref(false);
const showConfirmPassword = ref(false);
const showSuccess = ref(false);
const successMessage = ref("");
const admins = ref([]);
const editingAdmin = ref(null);
const resetPasswordAdmin = ref(null);

const formData = ref({
  name: "",
  email: "",
  password: "",
  role: "admin",
  status: "active",
});

const resetPasswordData = ref({
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
});

const loadAdmins = async () => {
  try {
    loading.value = true;
    const q = query(collection(db, "admins"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);

    admins.value = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error loading admins:", error);
    alert("Gagal memuat data admin");
  } finally {
    loading.value = false;
  }
};

const openAddDialog = () => {
  editingAdmin.value = null;
  formData.value = {
    name: "",
    email: "",
    password: "",
    role: "admin",
    status: "active",
  };
  showDialog.value = true;
};

const editAdmin = (admin) => {
  editingAdmin.value = admin;
  formData.value = {
    name: admin.name,
    email: admin.email,
    password: "",
    role: admin.role,
    status: admin.status,
  };
  showDialog.value = true;
};

const closeDialog = () => {
  showDialog.value = false;
  editingAdmin.value = null;
  formData.value = {
    name: "",
    email: "",
    password: "",
    role: "admin",
    status: "active",
  };
};

const openResetPasswordDialog = (admin) => {
  resetPasswordAdmin.value = admin;
  resetPasswordData.value = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };
  showResetPasswordDialog.value = true;
};

const closeResetPasswordDialog = () => {
  showResetPasswordDialog.value = false;
  resetPasswordAdmin.value = null;
  resetPasswordData.value = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };
};

const resetPassword = async () => {
  if (
    resetPasswordData.value.newPassword !==
    resetPasswordData.value.confirmPassword
  ) {
    alert("Password baru tidak cocok!");
    return;
  }

  if (
    !confirm(
      `Apakah Anda yakin ingin mengganti password untuk ${resetPasswordAdmin.value.name}?`
    )
  ) {
    return;
  }

  try {
    saving.value = true;

    // Import reauthentication functions
    const { EmailAuthProvider, reauthenticateWithCredential, updatePassword } =
      await import("firebase/auth");

    const user = auth.currentUser;

    if (!user) {
      throw new Error("User tidak terautentikasi");
    }

    // Check if trying to change own password or another admin's
    if (user.email === resetPasswordAdmin.value.email) {
      // Changing own password - need to reauthenticate first
      const credential = EmailAuthProvider.credential(
        user.email,
        resetPasswordData.value.oldPassword
      );

      // Reauthenticate
      await reauthenticateWithCredential(user, credential);

      // Update password
      await updatePassword(user, resetPasswordData.value.newPassword);

      successMessage.value = "Password berhasil diubah";
    } else {
      // Trying to change another admin's password
      // This requires Firebase Admin SDK or Cloud Functions
      // For now, send password reset email instead
      const { sendPasswordResetEmail } = await import("firebase/auth");
      await sendPasswordResetEmail(auth, resetPasswordAdmin.value.email);

      successMessage.value = `Email reset password telah dikirim ke ${resetPasswordAdmin.value.email}`;
    }

    showSuccess.value = true;
    setTimeout(() => {
      showSuccess.value = false;
    }, 5000);

    closeResetPasswordDialog();
  } catch (error) {
    console.error("Error resetting password:", error);

    if (error.code === "auth/wrong-password") {
      alert("Password lama salah!");
    } else if (error.code === "auth/too-many-requests") {
      alert("Terlalu banyak percobaan. Coba lagi nanti.");
    } else {
      alert("Gagal mengubah password: " + error.message);
    }
  } finally {
    saving.value = false;
  }
};

const saveAdmin = async () => {
  try {
    saving.value = true;

    if (editingAdmin.value) {
      // Update existing admin
      const adminRef = doc(db, "admins", editingAdmin.value.id);
      await updateDoc(adminRef, {
        name: formData.value.name,
        role: formData.value.role,
        status: formData.value.status,
        updatedAt: Timestamp.now(),
      });
      successMessage.value = "Data admin berhasil diperbarui";
    } else {
      // Create new admin in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.value.email,
        formData.value.password
      );

      // Add admin to Firestore
      await addDoc(collection(db, "admins"), {
        uid: userCredential.user.uid,
        name: formData.value.name,
        email: formData.value.email,
        role: formData.value.role,
        status: formData.value.status,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });

      successMessage.value = "Admin baru berhasil ditambahkan";
    }

    showSuccess.value = true;
    setTimeout(() => {
      showSuccess.value = false;
    }, 3000);

    closeDialog();
    await loadAdmins();
  } catch (error) {
    console.error("Error saving admin:", error);
    if (error.code === "auth/email-already-in-use") {
      alert("Email sudah digunakan");
    } else {
      alert("Gagal menyimpan data admin: " + error.message);
    }
  } finally {
    saving.value = false;
  }
};

const deleteAdmin = async (admin) => {
  if (
    !confirm(
      `Apakah Anda yakin ingin menghapus admin "${admin.name}"?\n\nCatatan: Akun Firebase Auth tidak akan dihapus secara otomatis.`
    )
  ) {
    return;
  }

  try {
    await deleteDoc(doc(db, "admins", admin.id));
    successMessage.value = "Admin berhasil dihapus";
    showSuccess.value = true;
    setTimeout(() => {
      showSuccess.value = false;
    }, 3000);
    await loadAdmins();
  } catch (error) {
    console.error("Error deleting admin:", error);
    alert("Gagal menghapus admin");
  }
};

const getInitials = (name) => {
  if (!name) return "?";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

const formatDate = (timestamp) => {
  if (!timestamp) return "-";
  const date =
    timestamp instanceof Timestamp ? timestamp.toDate() : new Date(timestamp);
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

onMounted(() => {
  loadAdmins();
});
</script>

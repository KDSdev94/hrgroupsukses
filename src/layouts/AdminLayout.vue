<template>
  <div class="flex h-screen bg-background overflow-hidden">
    <!-- Mobile Menu Button -->
    <button
      @click="toggleSidebar"
      class="fixed top-4 left-4 z-50 lg:hidden bg-white p-2 rounded-lg shadow-lg"
    >
      <svg
        class="w-6 h-6 text-gray-700"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          v-if="!sidebarOpen"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16M4 12h16M4 18h16"
        ></path>
        <path
          v-else
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M6 18L18 6M6 6l12 12"
        ></path>
      </svg>
    </button>

    <!-- Overlay for mobile -->
    <div
      v-if="sidebarOpen"
      @click="closeSidebar"
      class="fixed inset-0 bg-black/50 z-30 lg:hidden"
    ></div>

    <!-- Sidebar -->
    <aside
      :class="[
        'w-64 bg-white shadow-md flex flex-col h-full z-40 transition-transform duration-300',
        'fixed lg:fixed',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
      ]"
    >
      <div class="p-6 flex items-center justify-center border-b">
        <img
          src="/header.webp"
          alt="HR Group"
          class="h-12 w-auto object-contain"
        />
      </div>

      <nav class="flex-1 overflow-y-auto py-4">
        <ul class="space-y-1 px-3">
          <li>
            <router-link
              to="/admin/dashboard"
              @click="closeSidebar"
              class="flex items-center px-4 py-3 text-gray-700 hover:bg-primary/10 hover:text-primary rounded-lg transition-colors"
              active-class="bg-primary/10 text-primary font-medium"
            >
              <svg
                class="w-5 h-5 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                ></path>
              </svg>
              Dashboard
            </router-link>
          </li>

          <li
            class="pt-4 pb-2 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider"
          >
            Manajemen Konten
          </li>

          <li>
            <router-link
              to="/admin/statistics"
              @click="closeSidebar"
              class="flex items-center px-4 py-3 text-gray-700 hover:bg-primary/10 hover:text-primary rounded-lg transition-colors"
              active-class="bg-primary/10 text-primary font-medium"
            >
              <svg
                class="w-5 h-5 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                ></path>
              </svg>
              Statistik
            </router-link>
          </li>

          <li>
            <router-link
              to="/admin/promotions"
              @click="closeSidebar"
              class="flex items-center px-4 py-3 text-gray-700 hover:bg-primary/10 hover:text-primary rounded-lg transition-colors"
              active-class="bg-primary/10 text-primary font-medium"
            >
              <svg
                class="w-5 h-5 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                ></path>
              </svg>
              Promo
            </router-link>
          </li>

          <li>
            <router-link
              to="/admin/projects"
              @click="closeSidebar"
              class="flex items-center px-4 py-3 text-gray-700 hover:bg-primary/10 hover:text-primary rounded-lg transition-colors"
              active-class="bg-primary/10 text-primary font-medium"
            >
              <svg
                class="w-5 h-5 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                ></path>
              </svg>
              Proyek
            </router-link>
          </li>

          <li>
            <router-link
              to="/admin/articles"
              @click="closeSidebar"
              class="flex items-center px-4 py-3 text-gray-700 hover:bg-primary/10 hover:text-primary rounded-lg transition-colors"
              active-class="bg-primary/10 text-primary font-medium"
            >
              <svg
                class="w-5 h-5 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                ></path>
              </svg>
              Artikel
            </router-link>
          </li>

          <li
            class="pt-4 pb-2 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider"
          >
            Lainnya
          </li>

          <li>
            <router-link
              to="/admin/consultations"
              @click="closeSidebar"
              class="flex items-center px-4 py-3 text-gray-700 hover:bg-primary/10 hover:text-primary rounded-lg transition-colors"
              active-class="bg-primary/10 text-primary font-medium"
            >
              <svg
                class="w-5 h-5 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                ></path>
              </svg>
              Konsultasi
            </router-link>
          </li>

          <li>
            <router-link
              to="/admin/profile"
              @click="closeSidebar"
              class="flex items-center px-4 py-3 text-gray-700 hover:bg-primary/10 hover:text-primary rounded-lg transition-colors"
              active-class="bg-primary/10 text-primary font-medium"
            >
              <svg
                class="w-5 h-5 mr-3"
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
              Profil
            </router-link>
          </li>

          <li>
            <router-link
              to="/admin/admins"
              @click="closeSidebar"
              class="flex items-center px-4 py-3 text-gray-700 hover:bg-primary/10 hover:text-primary rounded-lg transition-colors"
              active-class="bg-primary/10 text-primary font-medium"
            >
              <svg
                class="w-5 h-5 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                ></path>
              </svg>
              Kelola Admin
            </router-link>
          </li>
        </ul>
      </nav>

      <!-- User Info Section -->
      <div v-if="currentAdmin" class="px-4 py-3 border-t bg-gray-50">
        <div class="flex items-center gap-3 mb-3">
          <div
            class="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold shrink-0"
          >
            {{ getInitials(currentAdmin.name) }}
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-gray-800 truncate">
              {{ currentAdmin.name }}
            </p>
            <p class="text-xs text-gray-500 truncate">
              {{ currentAdmin.email }}
            </p>
          </div>
        </div>
      </div>

      <div class="p-4 border-t">
        <button
          @click="handleLogout"
          class="flex items-center w-full px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <svg
            class="w-5 h-5 mr-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            ></path>
          </svg>
          Logout
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 lg:ml-64 overflow-y-auto">
      <div class="pt-16 lg:pt-0">
        <router-view />
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "@/firebase/config";

const router = useRouter();
const currentAdmin = ref(null);
const sidebarOpen = ref(false);

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value;
};

const closeSidebar = () => {
  sidebarOpen.value = false;
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

const loadCurrentAdmin = async (user) => {
  if (!user) return;

  try {
    const q = query(collection(db, "admins"), where("uid", "==", user.uid));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      const adminData = snapshot.docs[0].data();
      currentAdmin.value = {
        name: adminData.name || user.email,
        email: adminData.email || user.email,
        role: adminData.role || "admin",
      };
    } else {
      // Fallback to auth user data
      currentAdmin.value = {
        name: user.displayName || user.email,
        email: user.email,
        role: "admin",
      };
    }
  } catch (error) {
    console.error("Error loading admin data:", error);
    currentAdmin.value = {
      name: user.displayName || user.email,
      email: user.email,
      role: "admin",
    };
  }
};

const handleLogout = async () => {
  try {
    await signOut(auth);
    router.push("/admin/login");
  } catch (error) {
    console.error("Logout error:", error);
  }
};

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      loadCurrentAdmin(user);
    }
  });
});
</script>

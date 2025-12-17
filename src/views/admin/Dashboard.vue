<template>
  <div class="w-full px-6 py-8 space-y-6">
    <!-- Header -->
    <div
      class="flex flex-col md:flex-row md:items-center justify-between gap-4"
    >
      <div>
        <h2 class="text-2xl font-bold text-gray-800">Dashboard Analisis</h2>
        <p class="text-gray-500 text-sm">
          Ringkasan analisis data dari website HR Group
        </p>
      </div>

      <!-- Sync Status (shows temporarily after sync) -->
      <div
        v-if="showSyncMessage"
        class="px-4 py-2 bg-green-100 border border-green-200 text-green-800 rounded-lg text-sm flex items-center gap-2"
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
        Data admin berhasil disinkronkan
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <!-- Total Consultations -->
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div class="flex justify-between items-start mb-4">
          <div>
            <p class="text-gray-500 text-sm font-medium">Total Konsultasi</p>
            <h3 class="text-2xl font-bold text-gray-800 mt-1">
              {{ consultationsCount }}
            </h3>
          </div>
          <span
            v-if="consultationsGrowth !== null"
            :class="[
              'text-xs font-medium px-2 py-1 rounded-full flex items-center',
              consultationsGrowth >= 0
                ? 'bg-green-100 text-green-600'
                : 'bg-red-100 text-red-600',
            ]"
          >
            <svg
              class="w-3 h-3 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                v-if="consultationsGrowth >= 0"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              ></path>
              <path
                v-else
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              ></path>
            </svg>
            {{ Math.abs(consultationsGrowth).toFixed(1) }}%
          </span>
        </div>
        <p class="text-gray-400 text-xs">Permintaan konsultasi</p>
      </div>

      <!-- Total Promotions -->
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div class="flex justify-between items-start mb-4">
          <div>
            <p class="text-gray-500 text-sm font-medium">Total Promo</p>
            <h3 class="text-2xl font-bold text-gray-800 mt-1">
              {{ promotionsCount }}
            </h3>
          </div>
          <span
            v-if="promotionsGrowth !== null"
            :class="[
              'text-xs font-medium px-2 py-1 rounded-full flex items-center',
              promotionsGrowth >= 0
                ? 'bg-green-100 text-green-600'
                : 'bg-red-100 text-red-600',
            ]"
          >
            <svg
              class="w-3 h-3 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                v-if="promotionsGrowth >= 0"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              ></path>
              <path
                v-else
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              ></path>
            </svg>
            {{ Math.abs(promotionsGrowth).toFixed(1) }}%
          </span>
        </div>
        <p class="text-gray-400 text-xs">Promo aktif</p>
      </div>

      <!-- Total Projects -->
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div class="flex justify-between items-start mb-4">
          <div>
            <p class="text-gray-500 text-sm font-medium">Total Proyek</p>
            <h3 class="text-2xl font-bold text-gray-800 mt-1">
              {{ projectsCount }}
            </h3>
          </div>
          <span
            v-if="projectsGrowth !== null"
            :class="[
              'text-xs font-medium px-2 py-1 rounded-full flex items-center',
              projectsGrowth >= 0
                ? 'bg-green-100 text-green-600'
                : 'bg-red-100 text-red-600',
            ]"
          >
            <svg
              class="w-3 h-3 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                v-if="projectsGrowth >= 0"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              ></path>
              <path
                v-else
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              ></path>
            </svg>
            {{ Math.abs(projectsGrowth).toFixed(1) }}%
          </span>
        </div>
        <p class="text-gray-400 text-xs">Proyek aktif</p>
      </div>

      <!-- Total Articles -->
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div class="flex justify-between items-start mb-4">
          <div>
            <p class="text-gray-500 text-sm font-medium">Total Artikel</p>
            <h3 class="text-2xl font-bold text-gray-800 mt-1">
              {{ articlesCount }}
            </h3>
          </div>
          <span
            v-if="articlesGrowth !== null"
            :class="[
              'text-xs font-medium px-2 py-1 rounded-full flex items-center',
              articlesGrowth >= 0
                ? 'bg-green-100 text-green-600'
                : 'bg-red-100 text-red-600',
            ]"
          >
            <svg
              class="w-3 h-3 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                v-if="articlesGrowth >= 0"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              ></path>
              <path
                v-else
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              ></path>
            </svg>
            {{ Math.abs(articlesGrowth).toFixed(1) }}%
          </span>
        </div>
        <p class="text-gray-400 text-xs">Artikel dipublikasikan</p>
      </div>
    </div>

    <!-- Charts Section -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Visitor Statistics (Main Chart) -->
      <div
        class="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100"
      >
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-lg font-bold text-gray-800">Statistik Pengunjung</h3>
          <select
            v-model="chartPeriod"
            @change="fetchVisitorChartData"
            class="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-primary focus:border-primary block p-2"
          >
            <option value="daily">Hari Ini</option>
            <option value="weekly">Minggu Ini</option>
            <option value="monthly">Bulan Ini</option>
          </select>
        </div>

        <!-- Chart Area -->
        <div
          v-if="visitorChartData.length > 0"
          class="h-64 w-full flex items-end justify-between space-x-2 px-4"
        >
          <div
            v-for="(day, index) in visitorChartData"
            :key="index"
            class="flex-1 flex flex-col items-center"
          >
            <div
              :class="[
                'w-full rounded-t hover:bg-primary/30 transition-all relative group cursor-pointer',
                index === visitorChartData.length - 1
                  ? 'bg-primary/10'
                  : 'bg-primary/5',
              ]"
              :style="{ height: day.percentage + '%' }"
            >
              <div
                :class="[
                  'absolute -top-8 left-1/2 transform -translate-x-1/2 text-white text-xs py-1 px-2 rounded transition-opacity',
                  index === visitorChartData.length - 1
                    ? 'bg-primary opacity-100 font-bold'
                    : 'bg-gray-800 opacity-0 group-hover:opacity-100',
                ]"
              >
                {{ day.count }}
              </div>
            </div>
          </div>
        </div>
        <div
          v-else
          class="h-64 flex items-center justify-center text-gray-400 text-sm"
        >
          <div class="text-center">
            <svg
              class="w-12 h-12 mx-auto mb-2 text-gray-300"
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
            <p>Belum ada data pengunjung</p>
            <p class="text-xs mt-1">
              Aktifkan tracking untuk melihat statistik
            </p>
          </div>
        </div>
        <div
          v-if="visitorChartData.length > 0"
          class="flex justify-between mt-4 text-xs text-gray-400 px-4"
        >
          <span
            v-for="(day, index) in visitorChartData"
            :key="index"
            class="text-center"
            >{{ day.label }}</span
          >
        </div>
      </div>

      <!-- Device Category -->
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 class="text-lg font-bold text-gray-800 mb-6">Perangkat</h3>
        <div class="space-y-6">
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <div
                class="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 mr-4"
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
                    d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                  ></path>
                </svg>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-800">Mobile</p>
                <p class="text-xs text-gray-500">Android & iOS</p>
              </div>
            </div>
            <span class="text-sm font-bold text-gray-800"
              >{{ deviceStats.mobile }}%</span
            >
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <div
                class="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600 mr-4"
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
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  ></path>
                </svg>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-800">Desktop</p>
                <p class="text-xs text-gray-500">Windows & Mac</p>
              </div>
            </div>
            <span class="text-sm font-bold text-gray-800"
              >{{ deviceStats.desktop }}%</span
            >
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <div
                class="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600 mr-4"
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
                    d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                  ></path>
                </svg>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-800">Tablet</p>
                <p class="text-xs text-gray-500">iPad & Android</p>
              </div>
            </div>
            <span class="text-sm font-bold text-gray-800"
              >{{ deviceStats.tablet }}%</span
            >
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Activity & Locations -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Recent Activity -->
      <div
        class="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100"
      >
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-lg font-bold text-gray-800">Aktivitas Terbaru</h3>
          <button class="text-sm text-primary hover:underline">
            Lihat Semua
          </button>
        </div>

        <div class="space-y-4">
          <div
            v-if="recentActivities.length === 0"
            class="text-center py-8 text-gray-500"
          >
            <p class="text-sm">Belum ada aktivitas terbaru</p>
          </div>
          <div
            v-for="(activity, index) in recentActivities"
            :key="index"
            class="flex items-start pb-4 border-b border-gray-50 last:border-0 last:pb-0"
          >
            <div
              :class="[
                'w-10 h-10 rounded-full flex items-center justify-center mr-4 shrink-0',
                activity.type === 'project'
                  ? 'bg-green-100 text-green-600'
                  : activity.type === 'article'
                  ? 'bg-blue-100 text-blue-600'
                  : activity.type === 'promotion'
                  ? 'bg-yellow-100 text-yellow-600'
                  : 'bg-purple-100 text-purple-600',
              ]"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  v-if="activity.action === 'created'"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                ></path>
                <path
                  v-else-if="activity.action === 'updated'"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                ></path>
                <path
                  v-else
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                ></path>
              </svg>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-800">
                {{ activity.title }}
              </p>
              <p class="text-xs text-gray-500 mt-1">
                {{ activity.description }}
              </p>
              <p class="text-xs text-gray-400 mt-2">{{ activity.time }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Top Locations -->
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 class="text-lg font-bold text-gray-800 mb-6">Lokasi Pengunjung</h3>
        <div class="space-y-4">
          <div
            v-for="(location, index) in topLocations"
            :key="index"
            class="space-y-2"
          >
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <span class="text-xl mr-3">{{ location.flag }}</span>
                <span class="text-sm font-medium text-gray-700">{{
                  location.country
                }}</span>
              </div>
              <span class="text-sm font-bold text-gray-800"
                >{{ location.percentage }}%</span
              >
            </div>
            <div class="w-full bg-gray-100 rounded-full h-2">
              <div
                class="bg-primary h-2 rounded-full"
                :style="{ width: location.percentage + '%' }"
              ></div>
            </div>
          </div>

          <div
            v-if="topLocations.length === 0"
            class="text-center py-4 text-gray-500 text-sm"
          >
            Belum ada data lokasi pengunjung
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import {
  collection,
  getDocs,
  addDoc,
  query,
  orderBy,
  limit,
  where,
  Timestamp,
} from "firebase/firestore";
import { db, auth } from "@/firebase/config";

const consultationsCount = ref(0);
const consultationsGrowth = ref(null);
const promotionsCount = ref(0);
const promotionsGrowth = ref(null);
const projectsCount = ref(0);
const projectsGrowth = ref(null);
const articlesCount = ref(0);
const articlesGrowth = ref(null);
const recentActivities = ref([]);
const deviceStats = ref({
  mobile: 0,
  desktop: 0,
  tablet: 0,
});
const topLocations = ref([]);
const showSyncMessage = ref(false);
const visitorChartData = ref([]);
const chartPeriod = ref("weekly"); // default to weekly

const countryFlags = {
  ID: "🇮🇩",
  MY: "🇲🇾",
  SG: "🇸🇬",
  US: "🇺🇸",
  GB: "🇬🇧",
  AU: "🇦🇺",
  JP: "🇯🇵",
  CN: "🇨🇳",
  IN: "🇮🇳",
  TH: "🇹🇭",
  PH: "🇵🇭",
  VN: "🇻🇳",
};

const ensureCurrentAdminInFirestore = async () => {
  try {
    const user = auth.currentUser;
    if (!user) return;

    const q = query(collection(db, "admins"), where("uid", "==", user.uid));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      // Admin doesn't exist, create one
      await addDoc(collection(db, "admins"), {
        uid: user.uid,
        name: user.displayName || user.email.split("@")[0],
        email: user.email,
        role: "super_admin",
        status: "active",
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });

      // Show success message
      showSyncMessage.value = true;
      setTimeout(() => {
        showSyncMessage.value = false;
      }, 5000);

      console.log("✅ Admin added to Firestore:", user.email);
    }
  } catch (error) {
    console.error("Error ensuring admin in Firestore:", error);
  }
};

// Helper function to calculate growth percentage
const calculateGrowth = (current, previous) => {
  if (previous === 0) return current > 0 ? 100 : 0;
  return ((current - previous) / previous) * 100;
};

// Helper function to get relative time
const getRelativeTime = (timestamp) => {
  if (!timestamp) return "Baru saja";

  const now = new Date();
  const date =
    timestamp instanceof Timestamp ? timestamp.toDate() : new Date(timestamp);
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Baru saja";
  if (diffMins < 60) return `${diffMins} menit yang lalu`;
  if (diffHours < 24) return `${diffHours} jam yang lalu`;
  if (diffDays === 1) return "Kemarin";
  if (diffDays < 7) return `${diffDays} hari yang lalu`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} minggu yang lalu`;
  return `${Math.floor(diffDays / 30)} bulan yang lalu`;
};

// Fetch consultations data
const fetchConsultations = async () => {
  try {
    const consultationsSnapshot = await getDocs(
      collection(db, "consultations")
    );
    consultationsCount.value = consultationsSnapshot.size;

    // Calculate growth (last 30 days vs previous 30 days)
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const sixtyDaysAgo = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);

    const recentQuery = query(
      collection(db, "consultations"),
      where("createdAt", ">=", Timestamp.fromDate(thirtyDaysAgo))
    );
    const previousQuery = query(
      collection(db, "consultations"),
      where("createdAt", ">=", Timestamp.fromDate(sixtyDaysAgo)),
      where("createdAt", "<", Timestamp.fromDate(thirtyDaysAgo))
    );

    const recentSnapshot = await getDocs(recentQuery);
    const previousSnapshot = await getDocs(previousQuery);

    consultationsGrowth.value = calculateGrowth(
      recentSnapshot.size,
      previousSnapshot.size
    );
  } catch (error) {
    console.error("Error fetching consultations:", error);
  }
};

// Fetch promotions data
const fetchPromotions = async () => {
  try {
    const promotionsSnapshot = await getDocs(collection(db, "promotions"));
    promotionsCount.value = promotionsSnapshot.size;

    // Calculate growth
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const sixtyDaysAgo = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);

    const recentQuery = query(
      collection(db, "promotions"),
      where("createdAt", ">=", Timestamp.fromDate(thirtyDaysAgo))
    );
    const previousQuery = query(
      collection(db, "promotions"),
      where("createdAt", ">=", Timestamp.fromDate(sixtyDaysAgo)),
      where("createdAt", "<", Timestamp.fromDate(thirtyDaysAgo))
    );

    const recentSnapshot = await getDocs(recentQuery);
    const previousSnapshot = await getDocs(previousQuery);

    promotionsGrowth.value = calculateGrowth(
      recentSnapshot.size,
      previousSnapshot.size
    );
  } catch (error) {
    console.error("Error fetching promotions:", error);
  }
};

// Fetch projects data
const fetchProjects = async () => {
  try {
    const projectsSnapshot = await getDocs(collection(db, "projects"));
    projectsCount.value = projectsSnapshot.size;

    // Calculate growth
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const sixtyDaysAgo = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);

    const recentQuery = query(
      collection(db, "projects"),
      where("createdAt", ">=", Timestamp.fromDate(thirtyDaysAgo))
    );
    const previousQuery = query(
      collection(db, "projects"),
      where("createdAt", ">=", Timestamp.fromDate(sixtyDaysAgo)),
      where("createdAt", "<", Timestamp.fromDate(thirtyDaysAgo))
    );

    const recentSnapshot = await getDocs(recentQuery);
    const previousSnapshot = await getDocs(previousQuery);

    projectsGrowth.value = calculateGrowth(
      recentSnapshot.size,
      previousSnapshot.size
    );
  } catch (error) {
    console.error("Error fetching projects:", error);
  }
};

// Fetch articles data
const fetchArticles = async () => {
  try {
    const articlesSnapshot = await getDocs(collection(db, "articles"));
    articlesCount.value = articlesSnapshot.size;

    // Calculate growth
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const sixtyDaysAgo = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);

    const recentQuery = query(
      collection(db, "articles"),
      where("createdAt", ">=", Timestamp.fromDate(thirtyDaysAgo))
    );
    const previousQuery = query(
      collection(db, "articles"),
      where("createdAt", ">=", Timestamp.fromDate(sixtyDaysAgo)),
      where("createdAt", "<", Timestamp.fromDate(thirtyDaysAgo))
    );

    const recentSnapshot = await getDocs(recentQuery);
    const previousSnapshot = await getDocs(previousQuery);

    articlesGrowth.value = calculateGrowth(
      recentSnapshot.size,
      previousSnapshot.size
    );
  } catch (error) {
    console.error("Error fetching articles:", error);
  }
};

// Fetch recent activities
const fetchRecentActivities = async () => {
  try {
    const activities = [];

    // Fetch recent projects
    const projectsQuery = query(
      collection(db, "projects"),
      orderBy("createdAt", "desc"),
      limit(3)
    );
    const projectsSnapshot = await getDocs(projectsQuery);
    projectsSnapshot.forEach((doc) => {
      const data = doc.data();
      activities.push({
        type: "project",
        action: "created",
        title: "Proyek Baru Ditambahkan",
        description: `Admin menambahkan proyek "${data.title}" ke database.`,
        time: getRelativeTime(data.createdAt),
        timestamp: data.createdAt,
      });
    });

    // Fetch recent articles
    const articlesQuery = query(
      collection(db, "articles"),
      orderBy("createdAt", "desc"),
      limit(3)
    );
    const articlesSnapshot = await getDocs(articlesQuery);
    articlesSnapshot.forEach((doc) => {
      const data = doc.data();
      activities.push({
        type: "article",
        action: data.updatedAt ? "updated" : "created",
        title: data.updatedAt
          ? "Artikel Diperbarui"
          : "Artikel Baru Ditambahkan",
        description: `Admin ${
          data.updatedAt ? "memperbarui" : "menambahkan"
        } artikel "${data.title}".`,
        time: getRelativeTime(data.updatedAt || data.createdAt),
        timestamp: data.updatedAt || data.createdAt,
      });
    });

    // Fetch recent promotions
    const promotionsQuery = query(
      collection(db, "promotions"),
      orderBy("createdAt", "desc"),
      limit(3)
    );
    const promotionsSnapshot = await getDocs(promotionsQuery);
    promotionsSnapshot.forEach((doc) => {
      const data = doc.data();
      const now = new Date();
      const endDate = data.endDate
        ? data.endDate instanceof Timestamp
          ? data.endDate.toDate()
          : new Date(data.endDate)
        : null;

      const isExpired = endDate && endDate < now;

      activities.push({
        type: "promotion",
        action: isExpired ? "expired" : "created",
        title: isExpired ? "Promo Berakhir" : "Promo Baru Ditambahkan",
        description: isExpired
          ? `Promo "${data.title}" telah berakhir.`
          : `Admin menambahkan promo "${data.title}".`,
        time: getRelativeTime(isExpired ? data.endDate : data.createdAt),
        timestamp: isExpired ? data.endDate : data.createdAt,
      });
    });

    // Fetch recent consultations
    const consultationsQuery = query(
      collection(db, "consultations"),
      orderBy("createdAt", "desc"),
      limit(2)
    );
    const consultationsSnapshot = await getDocs(consultationsQuery);
    consultationsSnapshot.forEach((doc) => {
      const data = doc.data();
      activities.push({
        type: "consultation",
        action: "created",
        title: "Konsultasi Baru",
        description: `${data.name} mengajukan konsultasi untuk ${data.topic}.`,
        time: getRelativeTime(data.createdAt),
        timestamp: data.createdAt,
      });
    });

    // Sort by timestamp and limit to 10 most recent
    activities.sort((a, b) => {
      const timeA = a.timestamp
        ? a.timestamp instanceof Timestamp
          ? a.timestamp.toMillis()
          : new Date(a.timestamp).getTime()
        : 0;
      const timeB = b.timestamp
        ? b.timestamp instanceof Timestamp
          ? b.timestamp.toMillis()
          : new Date(b.timestamp).getTime()
        : 0;
      return timeB - timeA;
    });

    recentActivities.value = activities.slice(0, 10);
  } catch (error) {
    console.error("Error fetching recent activities:", error);
  }
};

// Fetch device statistics
const fetchDeviceStats = async () => {
  try {
    const visitorsSnapshot = await getDocs(collection(db, "visitors"));
    const total = visitorsSnapshot.size;

    if (total === 0) {
      deviceStats.value = { mobile: 0, desktop: 0, tablet: 0 };
      return;
    }

    let mobileCount = 0;
    let desktopCount = 0;
    let tabletCount = 0;

    visitorsSnapshot.forEach((doc) => {
      const data = doc.data();
      const deviceType = data.deviceType?.toLowerCase();

      if (deviceType === "mobile") mobileCount++;
      else if (deviceType === "desktop") desktopCount++;
      else if (deviceType === "tablet") tabletCount++;
    });

    deviceStats.value = {
      mobile: ((mobileCount / total) * 100).toFixed(1),
      desktop: ((desktopCount / total) * 100).toFixed(1),
      tablet: ((tabletCount / total) * 100).toFixed(1),
    };
  } catch (error) {
    console.error("Error fetching device stats:", error);
  }
};

// Fetch location statistics
const fetchLocationStats = async () => {
  try {
    const visitorsSnapshot = await getDocs(collection(db, "visitors"));
    const total = visitorsSnapshot.size;

    if (total === 0) {
      topLocations.value = [];
      return;
    }

    const locationCounts = {};

    visitorsSnapshot.forEach((doc) => {
      const data = doc.data();
      const country = data.location?.country || "Unknown";
      const countryCode = data.location?.countryCode || "XX";

      if (!locationCounts[countryCode]) {
        locationCounts[countryCode] = {
          country,
          countryCode,
          count: 0,
        };
      }
      locationCounts[countryCode].count++;
    });

    // Convert to array and sort by count
    const locationsArray = Object.values(locationCounts)
      .sort((a, b) => b.count - a.count)
      .slice(0, 5); // Top 5 locations

    topLocations.value = locationsArray.map((loc) => ({
      country: loc.country,
      flag: countryFlags[loc.countryCode] || "🌍",
      percentage: ((loc.count / total) * 100).toFixed(1),
    }));
  } catch (error) {
    console.error("Error fetching location stats:", error);
  }
};

// Fetch visitor chart data based on selected period
const fetchVisitorChartData = async () => {
  try {
    const visitorsSnapshot = await getDocs(collection(db, "visitors"));

    if (visitorsSnapshot.empty) {
      visitorChartData.value = [];
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let dataPoints = {};
    let daysToShow = 7;
    let labelFormat = "date"; // 'date', 'hour'

    // Configure based on period
    if (chartPeriod.value === "daily") {
      // Show hourly data for today (24 hours)
      daysToShow = 1;
      labelFormat = "hour";
      for (let i = 0; i < 24; i++) {
        dataPoints[i] = 0;
      }
    } else if (chartPeriod.value === "weekly") {
      // Show daily data for last 7 days
      daysToShow = 7;
      for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const dateKey = date.toISOString().split("T")[0];
        dataPoints[dateKey] = 0;
      }
    } else if (chartPeriod.value === "monthly") {
      // Show daily data for last 30 days
      daysToShow = 30;
      for (let i = 29; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const dateKey = date.toISOString().split("T")[0];
        dataPoints[dateKey] = 0;
      }
    }

    // Count visitors
    visitorsSnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.createdAt) {
        const date =
          data.createdAt instanceof Timestamp
            ? data.createdAt.toDate()
            : new Date(data.createdAt);

        if (chartPeriod.value === "daily") {
          // Group by hour for today
          const dateKey = date.toISOString().split("T")[0];
          const todayKey = today.toISOString().split("T")[0];
          if (dateKey === todayKey) {
            const hour = date.getHours();
            dataPoints[hour]++;
          }
        } else {
          // Group by date
          const dateKey = date.toISOString().split("T")[0];
          if (dataPoints.hasOwnProperty(dateKey)) {
            dataPoints[dateKey]++;
          }
        }
      }
    });

    // Convert to array and calculate percentages
    const counts = Object.values(dataPoints);
    const maxCount = Math.max(...counts, 1);

    if (chartPeriod.value === "daily") {
      // Hourly data
      visitorChartData.value = Object.entries(dataPoints).map(
        ([hour, count]) => ({
          date: hour,
          count,
          percentage: (count / maxCount) * 100,
          label: `${hour}:00`,
        })
      );
    } else {
      // Daily data
      visitorChartData.value = Object.entries(dataPoints).map(
        ([date, count]) => {
          const dateObj = new Date(date);
          const day = dateObj.getDate();
          const month = dateObj.getMonth() + 1;

          return {
            date,
            count,
            percentage: (count / maxCount) * 100,
            label: `${day}/${month}`,
          };
        }
      );
    }
  } catch (error) {
    console.error("Error fetching visitor chart data:", error);
  }
};

onMounted(async () => {
  // First, ensure current admin is in Firestore
  await ensureCurrentAdminInFirestore();

  // Then fetch all dashboard data
  await Promise.all([
    fetchConsultations(),
    fetchPromotions(),
    fetchProjects(),
    fetchArticles(),
    fetchRecentActivities(),
    fetchDeviceStats(),
    fetchLocationStats(),
    fetchVisitorChartData(),
  ]);
});
</script>

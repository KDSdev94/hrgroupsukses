<template>
  <section class="py-20 md:py-28 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold text-primary mb-4">
          KENAPA MEMILIH KITA?
        </h2>
        <p class="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
          Meningkatkan pengalaman pembelian rumah Anda dengan keahlian,
          integritas, dan layanan personal yang tak tertandingi
        </p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="(feature, index) in features"
          :key="index"
          class="bg-[#FFF5E6] hover:bg-[#FFE8CC] transition-colors duration-300 p-8 rounded-xl shadow-sm hover:shadow-md"
        >
          <div
            class="w-14 h-14 bg-white rounded-xl flex items-center justify-center mb-5 text-secondary shadow-sm"
          >
            <component :is="feature.icon" />
          </div>
          <h3
            class="text-lg font-bold text-primary mb-3 leading-tight"
            v-html="feature.title"
          ></h3>
          <p class="text-sm text-gray-600 leading-relaxed">
            {{ feature.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { h } from "vue";

const features = [
  {
    icon: () =>
      h(
        "svg",
        {
          class: "w-7 h-7",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
        },
        [
          h("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            "stroke-width": "2",
            d: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
          }),
        ]
      ),
    title: "Lingkungan Islami &<br />Nyaman",
    description:
      "Memberikan suasana hunian yang tenang dan Islami secara berkah dalam kehidupan sehari hari.",
  },
  {
    icon: () =>
      h(
        "svg",
        {
          class: "w-7 h-7",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
        },
        [
          h("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            "stroke-width": "2",
            d: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
          }),
        ]
      ),
    title: "Legalitas Aman &<br />Terpercaya",
    description:
      "Menjamin proses pembelian yang terlindungi dengan dokumen legal jelas dan dapat dipertanggungjawabkan.",
  },
  {
    icon: () =>
      h(
        "svg",
        {
          class: "w-7 h-7",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
        },
        [
          h("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            "stroke-width": "2",
            d: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
          }),
        ]
      ),
    title: "KPR Bank Syariah",
    description:
      "Solusi KPR berbasis prinsip syariah melalui BTN Syariah, BSI, Bank Jateng, dan Bank Mega Syariah.",
  },
  {
    icon: () =>
      h(
        "svg",
        {
          class: "w-7 h-7",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
        },
        [
          h("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            "stroke-width": "2",
            d: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
          }),
        ]
      ),
    title: "Free Biaya Akad",
    description:
      "Mengoptimalkan biaya biaya akad pada pembelian dengan fasilitas akad yang sudah tersedia",
  },
];
</script>

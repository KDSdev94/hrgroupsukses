<template>
  <div
    @click="$emit('detailClick')"
    class="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
  >
    <div class="relative h-64">
      <img :src="image" :alt="title" class="w-full h-full object-cover" />
    </div>
    <div class="p-6">
      <h3 class="text-xl font-bold text-primary mb-4 flex items-center">
        <MapPin class="w-5 h-5 mr-2 text-secondary" />
        {{ title }}
      </h3>
      <div class="space-y-2 mb-6">
        <p class="text-sm text-gray-600 flex items-center">
          <Bed class="w-4 h-4 mr-2 text-secondary" />
          {{ bedrooms }} Kamar Tidur
        </p>
        <p class="text-sm text-gray-600 flex items-center">
          <ShowerHead class="w-4 h-4 mr-2 text-secondary" />
          {{ bathrooms }} Kamar Mandi
        </p>
        <p class="text-sm text-gray-600 flex items-center">
          <Home class="w-4 h-4 mr-2 text-secondary" />
          {{ types && types.length ? types[0] : "-" }} m<sup>2</sup>
        </p>
      </div>
      <div
        class="flex items-center justify-between pt-4 border-t border-gray-200"
      >
        <span class="font-bold text-lg text-primary">Rp. {{ price }}</span>
        <button
          class="bg-primary text-white px-6 py-2 rounded-lg hover:bg-[#e08d19] text-sm font-semibold transition-colors shadow-md hover:shadow-lg"
        >
          Detail
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { MapPin, Bed, Ruler, ShowerHead, Home } from "lucide-vue-next";

defineProps({
  image: String,
  title: String,
  bedrooms: [String, Number],
  bathrooms: [String, Number],
  types: Array,
  price: String,
});

defineEmits(["detailClick"]);
</script>

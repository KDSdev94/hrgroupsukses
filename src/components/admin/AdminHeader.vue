<template>
  <div class="mb-8">
    <!-- Top Bar -->
    <div
      class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6"
    >
      <div>
        <h2 class="text-2xl font-bold text-gray-800">{{ title }}</h2>
        <p class="text-gray-500 text-sm">{{ subtitle }}</p>
      </div>

      <div v-if="searchPlaceholder" class="relative">
        <input
          type="text"
          :placeholder="searchPlaceholder"
          class="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 w-full md:w-64 bg-white"
          @input="$emit('search', $event.target.value)"
        />
        <svg
          class="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
    </div>

    <!-- Action Bar -->
    <div
      class="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4"
    >
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
          <!-- Placeholder Avatar -->
          <svg
            class="w-full h-full text-gray-400"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        </div>
        <div>
          <h3 class="text-sm font-bold text-gray-800">Admin User</h3>
          <p class="text-xs text-gray-500">HR Group Manager</p>
        </div>
      </div>

      <div class="flex items-center gap-3">
        <slot name="actions"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    default: "",
  },
  searchPlaceholder: {
    type: String,
    default: "Search...",
  },
});

defineEmits(["search"]);
</script>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
import FloatingButtons from "./components/FloatingButtons.vue";

const route = useRoute();
const isAdminRoute = computed(() => route.path.startsWith("/admin"));
</script>

<template>
  <div class="min-h-screen bg-background">
    <Navbar v-if="!isAdminRoute" />
    <router-view />
    <FloatingButtons v-if="!isAdminRoute" />
    <Footer v-if="!isAdminRoute" />
  </div>
</template>

<style scoped></style>

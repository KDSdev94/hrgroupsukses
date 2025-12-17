<template>
  <nav
    class="w-full py-4 px-6 md:px-12 flex items-center justify-between bg-background sticky top-0 z-50 shadow-sm"
  >
    <!-- Logo -->
    <div class="flex items-center">
      <router-link to="/">
        <img
          src="/header.webp"
          alt="HR Group"
          class="h-12 md:h-14 w-auto object-contain cursor-pointer"
        />
      </router-link>
    </div>

    <!-- Mobile Menu Button -->
    <button
      class="md:hidden text-primary p-2"
      @click="isMenuOpen = !isMenuOpen"
    >
      <svg
        class="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          v-if="isMenuOpen"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M6 18L18 6M6 6l12 12"
        />
        <path
          v-else
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    </button>

    <!-- Navigation Links - Desktop -->
    <div class="hidden md:flex items-center space-x-8">
      <router-link
        to="/"
        class="text-base font-semibold text-primary hover:text-secondary transition-colors"
      >
        Home
      </router-link>
      <router-link
        to="/profil"
        class="text-base font-semibold text-primary hover:text-secondary transition-colors"
      >
        Profile
      </router-link>
      <a
        href="/#projects"
        class="text-base font-semibold text-primary hover:text-secondary transition-colors"
      >
        Proyek Kami
      </a>
      <a
        href="/#contact"
        class="text-base font-semibold text-primary hover:text-secondary transition-colors"
      >
        Kontak
      </a>
    </div>

    <!-- Actions - Desktop -->
    <div class="hidden md:flex items-center space-x-4">
      <!-- Social Media Icons -->
      <a
        :href="socialLinks.facebook || 'https://facebook.com'"
        target="_blank"
        rel="noopener noreferrer"
        class="text-primary hover:text-secondary transition-colors"
      >
        <Facebook :size="20" />
      </a>
      <a
        :href="
          socialLinks.instagram || 'https://instagram.com/hrgroup.property'
        "
        target="_blank"
        rel="noopener noreferrer"
        class="text-primary hover:text-secondary transition-colors"
      >
        <Instagram :size="20" />
      </a>
      <a
        :href="socialLinks.tiktok || 'https://tiktok.com/@hrgrouppopertyy'"
        target="_blank"
        rel="noopener noreferrer"
        class="text-primary hover:text-secondary transition-colors"
      >
        <svg
          class="w-5 h-5"
          viewBox="0 0 24 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"
          />
        </svg>
      </a>
      <a
        :href="socialLinks.youtube || 'https://youtube.com'"
        target="_blank"
        rel="noopener noreferrer"
        class="text-primary hover:text-secondary transition-colors"
      >
        <Youtube :size="20" />
      </a>

      <!-- Sign Up Button & Profile Icon Removed -->
    </div>

    <!-- Mobile Menu -->
    <div
      v-if="isMenuOpen"
      class="absolute top-full left-0 right-0 bg-background shadow-lg md:hidden"
    >
      <div class="flex flex-col space-y-4 p-6">
        <router-link
          to="/"
          class="text-base font-semibold text-primary hover:text-secondary transition-colors"
          @click="isMenuOpen = false"
        >
          Home
        </router-link>
        <router-link
          to="/profil"
          class="text-base font-semibold text-primary hover:text-secondary transition-colors"
          @click="isMenuOpen = false"
        >
          Profile
        </router-link>
        <a
          href="/#projects"
          class="text-base font-semibold text-primary hover:text-secondary transition-colors"
          @click="isMenuOpen = false"
        >
          Proyek Kami
        </a>
        <a
          href="/#contact"
          class="text-base font-semibold text-primary hover:text-secondary transition-colors"
          @click="isMenuOpen = false"
        >
          Kontak
        </a>
        <div class="flex items-center space-x-4 pt-4 border-t border-gray-300">
          <a
            :href="socialLinks.facebook || 'https://facebook.com'"
            target="_blank"
            rel="noopener noreferrer"
            class="text-primary hover:text-secondary transition-colors"
          >
            <Facebook :size="20" />
          </a>
          <a
            :href="
              socialLinks.instagram || 'https://instagram.com/hrgroup.property'
            "
            target="_blank"
            rel="noopener noreferrer"
            class="text-primary hover:text-secondary transition-colors"
          >
            <Instagram :size="20" />
          </a>
          <a
            :href="socialLinks.youtube || 'https://youtube.com'"
            target="_blank"
            rel="noopener noreferrer"
            class="text-primary hover:text-secondary transition-colors"
          >
            <Youtube :size="20" />
          </a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { User, Facebook, Instagram, Youtube } from "lucide-vue-next";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/config";

const isMenuOpen = ref(false);
const socialLinks = ref({
  facebook: "",
  instagram: "",
  youtube: "",
  tiktok: "",
});

const fetchSocialLinks = async () => {
  try {
    const docRef = doc(db, "settings", "profile");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      if (data.social) {
        socialLinks.value = {
          ...socialLinks.value,
          ...data.social,
        };
      }
    }
  } catch (error) {
    console.error("Error fetching social links:", error);
  }
};

onMounted(() => {
  fetchSocialLinks();
});
</script>

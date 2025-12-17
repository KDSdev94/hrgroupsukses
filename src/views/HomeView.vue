<script setup>
import { ref } from "vue";
import Hero from "../components/Hero.vue";
import FloatingBenefitsCarousel from "../components/FloatingBenefitsCarousel.vue";
import AboutSection from "../components/sections/AboutSection.vue";
import FeaturesSection from "../components/sections/FeaturesSection.vue";
import PromoSection from "../components/sections/PromoSection.vue";
import ProjectsSection from "../components/sections/ProjectsSection.vue";
import ArticlesSection from "../components/sections/ArticlesSection.vue";
import ContactSection from "../components/sections/ContactSection.vue";
import ProjectDetailDialog from "../components/ProjectDetailDialog.vue";

const selectedProjectKey = ref(null);
const selectedProjectData = ref(null);

const handleProjectClick = (project) => {
  selectedProjectKey.value = project.key || project.id;
  selectedProjectData.value = project;
};

const closeDialog = () => {
  selectedProjectKey.value = null;
  selectedProjectData.value = null;
};
</script>

<template>
  <div>
    <div class="relative">
      <Hero />
      <FloatingBenefitsCarousel />
    </div>

    <AboutSection />
    <PromoSection />
    <FeaturesSection />
    <ProjectsSection @projectClick="handleProjectClick" />
    <ArticlesSection />
    <ContactSection />

    <ProjectDetailDialog
      v-if="selectedProjectData"
      :is-open="!!selectedProjectKey"
      :project="selectedProjectData"
      @close="closeDialog"
    />
  </div>
</template>

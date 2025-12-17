<template>
  <section id="projects" class="py-20 md:py-28 bg-background">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold text-primary mb-4">
          PROYEK KAMI
        </h2>
        <p
          class="text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed px-4"
        >
          HR GROUP menghadirkan hunian berkualitas berbasis syariah di berbagai
          lokasi strategis di Brebes. Berikut adalah proyek-proyek perumahan
          unggulan kami:
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <ProjectCard
          v-for="project in projectsData"
          :key="project.key"
          :image="project.image"
          :title="project.title"
          :bedrooms="project.bedrooms"
          :bathrooms="project.bathrooms"
          :types="project.types"
          :price="project.price"
          @detailClick="handleProjectClick(project)"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/config";
import ProjectCard from "../ProjectCard.vue";

const projectsData = ref([]);
const loading = ref(true);

const loadProjects = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "projects"));
    projectsData.value = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        ...data, // Spread all data
        id: doc.id, // Use id instead of key for consistency
        key: doc.id, // Keep key for backward compatibility if needed
        image:
          data.thumbnail ||
          (data.images && data.images[0]) ||
          "/placeholder.jpeg",
        title: data.title,
        bedrooms: data.bedrooms || "2",
        bathrooms: data.bathrooms || "1",
        types:
          data.types ||
          (data.landArea
            ? [`${data.buildingArea || "36"}/${data.landArea}`]
            : []),
        price: data.price || "Hubungi Kami",
      };
    });
  } catch (error) {
    console.error("Error loading projects:", error);
  } finally {
    loading.value = false;
  }
};

const emit = defineEmits(["projectClick"]);

const handleProjectClick = (project) => {
  emit("projectClick", project);
};

onMounted(() => {
  loadProjects();
});
</script>

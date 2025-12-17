<script setup>
import { ref, watch, computed, onMounted, onUnmounted } from "vue";
import {
  X,
  ChevronLeft,
  ChevronRight,
  BedDouble,
  Bath,
  Ruler,
  Home,
  MapPin,
  CheckCircle2,
  FileText,
} from "lucide-vue-next";

const props = defineProps({
  isOpen: Boolean,
  project: {
    type: Object,
    required: true,
    default: () => ({
      title: "",
      images: [],
      description: "",
      location: "",
      price: "",
      buildingArea: "",
      buildingArea: "",
      types: [],
      typesListStyle: "bullet",
      bedrooms: "",
      bathrooms: "",
      buildingSpecifications: "",
      buildingSpecificationsListStyle: "bullet",
      strategicLocation: "",
      strategicLocationListStyle: "bullet",
      facilities: "",
      facilitiesListStyle: "bullet",
      documentsWiraswasta: "",
      documentsWiraswastaListStyle: "bullet",
      documentsKaryawan: "",
      documentsKaryawanListStyle: "bullet",
    }),
  },
});

const emit = defineEmits(["close"]);

const currentImageIndex = ref(0);

// Reset image index when dialog opens
watch(
  () => props.isOpen,
  (newVal) => {
    if (newVal) {
      currentImageIndex.value = 0;
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }
);

const onClose = () => {
  emit("close");
};

const nextImage = () => {
  if (displayImages.value.length > 0) {
    currentImageIndex.value =
      (currentImageIndex.value + 1) % displayImages.value.length;
  }
};

const prevImage = () => {
  if (displayImages.value.length > 0) {
    currentImageIndex.value =
      currentImageIndex.value === 0
        ? displayImages.value.length - 1
        : currentImageIndex.value - 1;
  }
};

const displayImages = computed(() => {
  const images = [];

  // Add thumbnail if it exists
  if (props.project.thumbnail) {
    images.push(props.project.thumbnail);
  }

  // Add other images
  if (
    props.project.images &&
    Array.isArray(props.project.images) &&
    props.project.images.length > 0
  ) {
    // Filter out thumbnail if it's already in images to avoid duplicates
    const otherImages = props.project.images.filter(
      (img) => img !== props.project.thumbnail
    );
    images.push(...otherImages);
  }

  // Fallback to placeholder if no images
  if (images.length === 0) {
    return ["/placeholder.jpeg"];
  }

  return images;
});

// Swipe Support
const touchStartX = ref(0);
const touchEndX = ref(0);

const touchStart = (e) => {
  touchStartX.value = e.changedTouches[0].screenX;
};

const touchEnd = (e) => {
  touchEndX.value = e.changedTouches[0].screenX;
  handleSwipe();
};

const handleSwipe = () => {
  if (touchEndX.value < touchStartX.value - 50) {
    nextImage();
  }
  if (touchEndX.value > touchStartX.value + 50) {
    prevImage();
  }
};

// Keyboard Navigation
const handleKeydown = (e) => {
  if (!props.isOpen) return;

  if (e.key === "ArrowLeft") {
    prevImage();
  } else if (e.key === "ArrowRight") {
    nextImage();
  } else if (e.key === "Escape") {
    onClose();
  }
};

onMounted(() => {
  window.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeydown);
});

const getSymbol = (style) => {
  switch (style) {
    case "square":
      return "■";
    case "dash":
      return "-";
    case "check":
      return "✓";
    case "arrow":
      return "➢";
    default:
      return "•";
  }
};

const parseList = (text) => {
  if (!text) return [];
  if (Array.isArray(text)) return text;
  return String(text)
    .split("\n")
    .filter((line) => line.trim());
};

const formattedDescription = computed(() => {
  if (!props.project.description) return [];
  const desc = props.project.description;
  if (typeof desc !== "string")
    return [{ type: "text", content: String(desc) }];

  return desc.split("\n").map((line) => {
    const headerMatch = line.match(/^\*\*(.+):\*\*$/);
    if (headerMatch) {
      return { type: "header", content: headerMatch[1] + ":" };
    }
    if (line.trim()) {
      return { type: "text", content: line };
    }
    return { type: "break" };
  });
});
</script>

<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-9999 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
    @click="onClose"
  >
    <div
      class="relative bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl"
      @click.stop
    >
      <!-- Header -->
      <div class="flex items-center justify-between p-6 border-b bg-white z-10">
        <div>
          <h2 class="text-2xl font-bold text-gray-900">{{ project.title }}</h2>
          <p class="text-gray-500 text-sm mt-1 flex items-center gap-1">
            <MapPin class="w-4 h-4" /> {{ project.location }}
          </p>
        </div>
        <button
          @click="onClose"
          class="p-2 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Close"
        >
          <X class="w-6 h-6 text-gray-500" />
        </button>
      </div>

      <!-- Content -->
      <div class="flex-1 overflow-y-auto">
        <!-- Image Gallery -->
        <div
          class="relative w-full bg-gray-100 h-[300px] md:h-[450px] group"
          @touchstart="touchStart"
          @touchend="touchEnd"
        >
          <div
            v-if="displayImages && displayImages.length > 0"
            class="relative h-full w-full"
          >
            <img
              :src="displayImages[currentImageIndex]"
              :alt="`${project.title} - Image ${currentImageIndex + 1}`"
              class="w-full h-full object-contain bg-black/5 transition-opacity duration-300"
            />

            <!-- Navigation Buttons -->
            <template v-if="displayImages.length > 1">
              <button
                @click="prevImage"
                class="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all z-20 cursor-pointer hover:scale-110 opacity-0 group-hover:opacity-100 focus:opacity-100"
                aria-label="Previous image"
              >
                <ChevronLeft class="w-6 h-6 text-gray-900" />
              </button>
              <button
                @click="nextImage"
                class="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all z-20 cursor-pointer hover:scale-110 opacity-0 group-hover:opacity-100 focus:opacity-100"
                aria-label="Next image"
              >
                <ChevronRight class="w-6 h-6 text-gray-900" />
              </button>

              <!-- Image Indicators -->
              <div
                class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20 bg-black/30 px-3 py-1.5 rounded-full backdrop-blur-sm"
              >
                <button
                  v-for="(_, index) in displayImages"
                  :key="index"
                  @click="currentImageIndex = index"
                  class="h-2 rounded-full transition-all cursor-pointer"
                  :class="
                    index === currentImageIndex
                      ? 'w-6 bg-white'
                      : 'w-2 bg-white/50 hover:bg-white/80'
                  "
                  :aria-label="`Go to image ${index + 1}`"
                />
              </div>
            </template>
          </div>
          <div
            v-else
            class="w-full h-full flex items-center justify-center text-gray-400"
          >
            No images available
          </div>
        </div>

        <div class="p-6 md:p-8 space-y-8">
          <!-- Key Features / Stats -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div
              class="bg-primary/5 p-4 rounded-xl border border-primary/10 text-center"
            >
              <div class="text-primary font-bold text-lg mb-1">
                Rp. {{ project.price }}
              </div>
              <div class="text-xs text-gray-500 uppercase tracking-wider">
                Harga
              </div>
            </div>
            <div
              class="bg-gray-50 p-4 rounded-xl border border-gray-100 text-center flex flex-col items-center justify-center"
            >
              <Home class="w-5 h-5 text-gray-400 mb-1" />
              <div class="font-semibold text-gray-800 text-sm">
                {{
                  project.types && project.types.length ? project.types[0] : "-"
                }}
              </div>
              <div class="text-xs text-gray-500">Tipe Unit</div>
            </div>
            <div
              class="bg-gray-50 p-4 rounded-xl border border-gray-100 text-center flex flex-col items-center justify-center"
            >
              <BedDouble class="w-5 h-5 text-gray-400 mb-1" />
              <div class="font-semibold text-gray-800">
                {{ project.bedrooms }} Kamar
              </div>
              <div class="text-xs text-gray-500">Tidur</div>
            </div>
            <div
              class="bg-gray-50 p-4 rounded-xl border border-gray-100 text-center flex flex-col items-center justify-center"
            >
              <Bath class="w-5 h-5 text-gray-400 mb-1" />
              <div class="font-semibold text-gray-800">
                {{ project.bathrooms }} Kamar
              </div>
              <div class="text-xs text-gray-500">Mandi</div>
            </div>
          </div>

          <!-- Description (Full Width) -->
          <div v-if="project.description">
            <h3
              class="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2"
            >
              <FileText class="w-5 h-5 text-primary" /> Deskripsi
            </h3>
            <div class="text-gray-600 leading-relaxed text-sm space-y-2">
              <template v-for="(line, index) in formattedDescription">
                <h4
                  v-if="line.type === 'header'"
                  :key="index + 'h'"
                  class="text-base font-bold text-gray-900 mt-4 mb-2"
                >
                  {{ line.content }}
                </h4>
                <p v-else-if="line.type === 'text'" :key="index + 'p'">
                  {{ line.content }}
                </p>
                <br v-else :key="index + 'b'" />
              </template>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <!-- Left Column -->
            <div class="space-y-8">
              <!-- Tipe Unit -->
              <div v-if="project.types && project.types.length">
                <h3
                  class="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2"
                >
                  <Home class="w-5 h-5 text-primary" /> Tipe Unit
                </h3>
                <ul class="space-y-2">
                  <li
                    v-for="(item, idx) in parseList(project.types)"
                    :key="idx"
                    class="flex items-start gap-3 text-sm text-gray-600"
                  >
                    <span class="text-primary font-bold mt-0.5">{{
                      getSymbol(project.typesListStyle)
                    }}</span>
                    <span>{{ item }}m<sup>2</sup></span>
                  </li>
                </ul>
              </div>

              <!-- Building Specifications -->
              <div v-if="project.buildingSpecifications">
                <h3
                  class="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2"
                >
                  <Home class="w-5 h-5 text-primary" /> Spesifikasi Bangunan
                </h3>
                <ul class="space-y-2">
                  <li
                    v-for="(item, idx) in parseList(
                      project.buildingSpecifications
                    )"
                    :key="idx"
                    class="flex items-start gap-3 text-sm text-gray-600"
                  >
                    <span class="text-primary font-bold mt-0.5">{{
                      getSymbol(project.buildingSpecificationsListStyle)
                    }}</span>
                    <span>{{ item }}</span>
                  </li>
                </ul>
              </div>

              <!-- Facilities -->
              <div v-if="project.facilities">
                <h3
                  class="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2"
                >
                  <CheckCircle2 class="w-5 h-5 text-primary" /> Fasilitas
                </h3>
                <ul class="space-y-2">
                  <li
                    v-for="(item, idx) in parseList(project.facilities)"
                    :key="idx"
                    class="flex items-start gap-3 text-sm text-gray-600"
                  >
                    <span class="text-primary font-bold mt-0.5">{{
                      getSymbol(project.facilitiesListStyle)
                    }}</span>
                    <span>{{ item }}</span>
                  </li>
                </ul>
              </div>
            </div>

            <!-- Right Column -->
            <div class="space-y-8">
              <!-- Strategic Location -->
              <div v-if="project.strategicLocation">
                <h3
                  class="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2"
                >
                  <MapPin class="w-5 h-5 text-primary" /> Lokasi Strategis
                </h3>
                <ul class="space-y-2">
                  <li
                    v-for="(item, idx) in parseList(project.strategicLocation)"
                    :key="idx"
                    class="flex items-start gap-3 text-sm text-gray-600"
                  >
                    <span class="text-primary font-bold mt-0.5">{{
                      getSymbol(project.strategicLocationListStyle)
                    }}</span>
                    <span>{{ item }}</span>
                  </li>
                </ul>
              </div>

              <!-- Documents -->
              <div
                v-if="
                  (project.documentsGeneral &&
                    parseList(project.documentsGeneral).length > 0) ||
                  (project.documentsWiraswasta &&
                    parseList(project.documentsWiraswasta).length > 0) ||
                  (project.documentsKaryawan &&
                    parseList(project.documentsKaryawan).length > 0)
                "
              >
                <h3
                  class="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2"
                >
                  <FileText class="w-5 h-5 text-primary" /> Dokumen Persyaratan
                </h3>

                <div class="space-y-6">
                  <!-- General Documents -->
                  <div
                    v-if="
                      project.documentsGeneral &&
                      parseList(project.documentsGeneral).length > 0
                    "
                  >
                    <ul class="space-y-2">
                      <li
                        v-for="(item, idx) in parseList(
                          project.documentsGeneral
                        )"
                        :key="idx"
                        class="flex items-start gap-3 text-sm text-gray-600"
                      >
                        <span class="text-primary font-bold mt-0.5">{{
                          getSymbol(project.documentsGeneralListStyle)
                        }}</span>
                        <span>{{ item }}</span>
                      </li>
                    </ul>
                  </div>

                  <template v-else>
                    <div v-if="project.documentsWiraswasta">
                      <h4 class="font-semibold text-gray-800 mb-2 text-sm">
                        Wiraswasta
                      </h4>
                      <ul class="space-y-2">
                        <li
                          v-for="(item, idx) in parseList(
                            project.documentsWiraswasta
                          )"
                          :key="idx"
                          class="flex items-start gap-3 text-sm text-gray-600"
                        >
                          <span class="text-primary font-bold mt-0.5">{{
                            getSymbol(project.documentsWiraswastaListStyle)
                          }}</span>
                          <span>{{ item }}</span>
                        </li>
                      </ul>
                    </div>

                    <div v-if="project.documentsKaryawan">
                      <h4 class="font-semibold text-gray-800 mb-2 text-sm">
                        Karyawan
                      </h4>
                      <ul class="space-y-2">
                        <li
                          v-for="(item, idx) in parseList(
                            project.documentsKaryawan
                          )"
                          :key="idx"
                          class="flex items-start gap-3 text-sm text-gray-600"
                        >
                          <span class="text-primary font-bold mt-0.5">{{
                            getSymbol(project.documentsKaryawanListStyle)
                          }}</span>
                          <span>{{ item }}</span>
                        </li>
                      </ul>
                    </div>
                  </template>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer CTA -->
        <div class="p-6 border-t bg-gray-50 flex justify-end">
          <a
            :href="`https://wa.me/6281234567890?text=Halo, saya tertarik dengan proyek ${project.title}`"
            target="_blank"
            class="bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700 transition-colors flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"
              />
            </svg>
            Hubungi via WhatsApp
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

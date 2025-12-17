<template>
  <section
    class="relative min-h-[700px] md:min-h-[900px] overflow-hidden flex items-center"
    id="contact"
  >
    <!-- Background Image -->
    <div class="absolute inset-0">
      <img
        src="/HRGroup Image/background_contact.png"
        alt="Contact HR Group"
        class="w-full h-full object-cover"
      />
      <!-- Dark Overlay -->
      <div class="absolute inset-0 bg-black/40"></div>
    </div>

    <!-- Content -->
    <div
      class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 w-full"
    >
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        <!-- Left Side - Contact Info -->
        <div class="text-white space-y-6">
          <!-- Heading Text -->
          <div class="space-y-4">
            <h2 class="text-3xl md:text-5xl font-bold leading-tight">
              Butuh Konsultasi...?
            </h2>
            <h3 class="text-2xl md:text-3xl font-semibold">
              Silahkan Kontak Kami
            </h3>
            <p class="text-xl md:text-2xl font-medium text-gray-200">
              Kami Siap Membantu
            </p>
          </div>

          <!-- Contact Image -->
          <div class="flex items-center justify-center pt-4">
            <div class="relative w-full max-w-lg h-[300px] md:h-[350px]">
              <img
                src="/HRGroup Image/contact-removebg.png"
                alt="Contact Me"
                class="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>

        <!-- Right Side - Form Card -->
        <div
          class="bg-white/95 backdrop-blur-sm p-8 md:p-10 rounded-2xl shadow-2xl"
        >
          <h3 class="text-2xl md:text-3xl font-bold text-primary mb-6">
            Ada Pertanyaan..?
          </h3>
          <form class="space-y-5" @submit.prevent="handleSubmit">
            <div>
              <input
                v-model="form.name"
                type="text"
                id="name"
                required
                class="w-full px-4 py-3 border-0 bg-surface-alt rounded-lg focus:ring-2 focus:ring-secondary outline-none transition-all placeholder:text-gray-500"
                placeholder="Nama Lengkap"
              />
            </div>
            <div>
              <input
                v-model="form.email"
                type="email"
                id="email"
                required
                class="w-full px-4 py-3 border-0 bg-surface-alt rounded-lg focus:ring-2 focus:ring-secondary outline-none transition-all placeholder:text-gray-500"
                placeholder="Masukan email anda disini..."
              />
            </div>
            <div>
              <input
                v-model="form.phone"
                type="tel"
                id="phone"
                required
                class="w-full px-4 py-3 border-0 bg-surface-alt rounded-lg focus:ring-2 focus:ring-secondary outline-none transition-all placeholder:text-gray-500"
                placeholder="Nomor WhatsApp (contoh: 08123456789)"
              />
            </div>
            <div>
              <textarea
                v-model="form.message"
                id="message"
                rows="4"
                required
                class="w-full px-4 py-3 border-0 bg-surface-alt rounded-lg focus:ring-2 focus:ring-secondary outline-none resize-none transition-all placeholder:text-gray-500"
                placeholder="Pertanyaan Anda..."
              ></textarea>
            </div>

            <!-- Success Message -->
            <div
              v-if="showSuccess"
              class="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm"
            >
              ✓ Pesan Anda berhasil dikirim! Kami akan segera menghubungi Anda.
            </div>

            <!-- Error Message -->
            <div
              v-if="showError"
              class="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm"
            >
              ✗ Gagal mengirim pesan. Silakan coba lagi.
            </div>

            <button
              type="submit"
              :disabled="loading"
              class="w-full bg-primary text-white hover:bg-primary-light font-bold py-4 text-lg rounded-lg shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ loading ? "Mengirim..." : "Kirim" }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive, ref } from "vue";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/firebase/config";

const form = reactive({
  name: "",
  email: "",
  phone: "",
  message: "",
});

const loading = ref(false);
const showSuccess = ref(false);
const showError = ref(false);

const handleSubmit = async () => {
  loading.value = true;
  showSuccess.value = false;
  showError.value = false;

  try {
    await addDoc(collection(db, "consultations"), {
      name: form.name,
      email: form.email,
      phone: form.phone,
      message: form.message,
      status: "unread",
      createdAt: new Date().toISOString(),
    });

    // Reset form
    form.name = "";
    form.email = "";
    form.phone = "";
    form.message = "";

    // Show success message
    showSuccess.value = true;
    setTimeout(() => {
      showSuccess.value = false;
    }, 5000);
  } catch (error) {
    console.error("Error submitting form:", error);
    showError.value = true;
    setTimeout(() => {
      showError.value = false;
    }, 5000);
  } finally {
    loading.value = false;
  }
};
</script>

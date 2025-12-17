<template>
  <footer class="bg-primary text-white">
    <div class="max-w-7xl mx-auto px-6 lg:px-10 py-4 space-y-8">
      <!-- BARIS 1 (Logo + Deskripsi untuk mobile, 3 kolom untuk desktop) -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <!-- KIRI: Logo + Deskripsi (mobile: vertikal, desktop: hanya logo) -->
        <div>
          <!-- Logo yang lebih besar -->
          <div class="mb-5">
            <img
              src="/footer.webp"
              alt="HR Group"
              class="w-[350px] lg:w-[350px] h-auto object-contain"
            />
          </div>

          <!-- Deskripsi - tampil di mobile di bawah logo, hidden di desktop -->
          <div class="text-gray-300 leading-relaxed text-sm lg:hidden">
            HR GROUP adalah developer properti syariah yang menyediakan hunian
            nyaman, legalitas jelas, dan bebas riba di wilayah Brebes dan
            sekitarnya.
          </div>
        </div>

        <!-- TENGAH: Kontak -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Kontak</h3>

          <div class="space-y-3">
            <a
              href="tel:+6282327361091"
              class="flex items-center text-gray-300 hover:text-secondary transition-colors"
            >
              <Phone :size="20" class="mr-3" />
              <span class="text-sm">+62 823-2736-1091</span>
            </a>

            <a
              href="mailto:hrgroup.sukses22@gmail.com"
              class="flex items-center text-gray-300 hover:text-secondary transition-colors"
            >
              <Mail :size="20" class="mr-3" />
              <span class="text-sm">hrgroup.sukses22@gmail.com</span>
            </a>
          </div>
        </div>

        <!-- KANAN: Sosial Media -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Media Sosial</h3>

          <div class="space-y-3">
            <a
              href="https://instagram.com/hrgroup.property"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center text-gray-300 hover:text-secondary transition-colors"
            >
              <Instagram :size="20" class="mr-3" />
              <span class="text-sm">Instagram</span>
            </a>

            <a
              href="https://tiktok.com/@hrgrouppopertyy"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center text-gray-300 hover:text-secondary transition-colors"
            >
              <svg class="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"
                />
              </svg>
              <span class="text-sm">TikTok</span>
            </a>
          </div>
        </div>
      </div>

      <!-- BARIS 2 (deskripsi + alamat kiri, map kanan) - Desktop only untuk deskripsi -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <!-- Deskripsi + Alamat di kiri -->
        <div class="lg:col-span-1 space-y-6">
          <!-- Deskripsi - hanya tampil di desktop -->
          <div
            class="hidden lg:block text-gray-300 leading-relaxed text-sm md:text-base"
          >
            HR GROUP adalah developer properti syariah yang menyediakan hunian
            nyaman, legalitas jelas, dan bebas riba di wilayah Brebes dan
            sekitarnya.
          </div>

          <div>
            <h3 class="text-lg font-semibold mb-2">Alamat</h3>
            <p class="text-sm text-gray-300 leading-relaxed">
              Jalan Yos Sudarso km 3, Komplek Ruko Sapphire no 7,
              <br />
              Pasar Batang, Brebes – Jawa Tengah 52266
            </p>
          </div>
        </div>

        <!-- MAP di tengah + kanan -->
        <div class="lg:col-span-2">
          <div
            class="w-full h-64 lg:h-72 rounded-xl overflow-hidden border border-gray-600 shadow-lg"
          >
            <iframe
              src="https://maps.google.com/maps?q=Perumahan%20Griya%20Sakinah%202%20Brebes&t=&z=15&ie=UTF8&iwloc=&output=embed"
              class="w-full h-full"
              loading="lazy"
              allowfullscreen
              title="Lokasi Perumahan Griya Sakinah 2 Brebes"
            ></iframe>
          </div>
        </div>
      </div>

      <!-- Bottom -->
      <div class="border-t border-gray-700 pt-2 text-center mt-6">
        <p class="text-lg font-semibold text-white">
          Copyright © 2025 HR GROUP. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { Phone, Mail, Instagram } from "lucide-vue-next";
</script>

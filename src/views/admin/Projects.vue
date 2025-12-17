<template>
  <div>
    <div class="w-full px-6 py-8">
      <!-- Header (Changes based on view mode) -->
      <AdminHeader
        :title="
          showAddForm
            ? editingProject
              ? 'Edit Proyek'
              : 'Tambah Proyek'
            : 'Kelola Proyek'
        "
        :subtitle="
          showAddForm ? 'Projects/Edit Details' : 'Profile/All projects'
        "
        :searchPlaceholder="showAddForm ? null : 'Cari proyek...'"
        @search="handleSearch"
      >
        <template #actions>
          <div v-if="showAddForm" class="flex items-center gap-3">
            <button
              @click="closeForm"
              class="px-4 py-2 bg-white border border-gray-200 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm"
            >
              Cancel
            </button>
            <button
              @click="saveProject"
              :disabled="saving"
              class="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm disabled:opacity-50"
            >
              {{ saving ? "Saving..." : "Save Changes" }}
            </button>
          </div>
          <div v-else>
            <button
              @click="showAddForm = true"
              class="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm flex items-center"
            >
              <svg
                class="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 4v16m8-8H4"
                ></path>
              </svg>
              Tambah Proyek
            </button>
          </div>
        </template>
      </AdminHeader>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-12">
        <div
          class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"
        ></div>
        <p class="mt-4 text-gray-600">Memuat data...</p>
      </div>

      <!-- Main Content -->
      <div v-else>
        <!-- LIST VIEW -->
        <div
          v-if="!showAddForm"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <!-- Project Cards -->
          <div
            v-for="project in filteredProjects"
            :key="project.id"
            class="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative group"
          >
            <!-- Card Header -->
            <div class="flex items-start justify-between mb-4">
              <div class="flex items-center gap-4">
                <div
                  class="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden shrink-0"
                >
                  <img
                    :src="project.thumbnail || project.images[0]"
                    :alt="project.title"
                    class="w-full h-full object-cover"
                    @error="handleImageError"
                  />
                </div>
                <div>
                  <h3 class="text-base font-bold text-gray-800 leading-tight">
                    {{ project.title }}
                  </h3>
                  <p class="text-xs text-gray-500 mt-1">
                    {{ project.location }}
                  </p>
                </div>
              </div>

              <!-- Menu Button -->
              <div class="relative">
                <button class="text-gray-400 hover:text-gray-600">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M12 13a1 1 0 100-2 1 1 0 000 2zm0-5a1 1 0 100-2 1 1 0 000 2zm0 10a1 1 0 100-2 1 1 0 000 2z"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Description -->
            <p class="text-gray-500 text-sm mb-6 line-clamp-2">
              {{ project.description }}
            </p>

            <!-- Card Footer -->
            <div
              class="flex items-center justify-between pt-4 border-t border-gray-50"
            >
              <div class="flex flex-col">
                <span class="text-xs text-gray-400">Harga</span>
                <span class="text-sm font-semibold text-primary">{{
                  project.price
                }}</span>
              </div>
              <div class="flex flex-col items-end">
                <span class="text-xs text-gray-400">Update</span>
                <span class="text-xs text-gray-600">{{
                  formatDate(project.updatedAt || project.createdAt)
                }}</span>
              </div>
            </div>

            <!-- Hover Actions -->
            <div
              class="absolute top-4 right-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 rounded-lg p-1"
            >
              <button
                @click="editProject(project)"
                class="p-1 text-blue-600 hover:bg-blue-50 rounded"
              >
                <svg
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  ></path>
                </svg>
              </button>
              <button
                @click="deleteProject(project.id)"
                class="p-1 text-red-600 hover:bg-red-50 rounded"
              >
                <svg
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  ></path>
                </svg>
              </button>
            </div>
          </div>

          <!-- Add New Project Card -->
          <button
            @click="showAddForm = true"
            class="bg-white rounded-xl p-6 shadow-sm border-2 border-dashed border-gray-200 hover:border-primary hover:bg-primary/5 transition-all flex flex-col items-center justify-center min-h-[200px] group"
          >
            <div
              class="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-primary group-hover:text-white transition-colors mb-3"
            >
              <svg
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 4v16m8-8H4"
                ></path>
              </svg>
            </div>
            <span class="text-gray-500 font-medium group-hover:text-primary"
              >New project</span
            >
          </button>
        </div>

        <!-- EDIT/ADD VIEW (Full Page) -->
        <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Left Column: Main Form -->
          <div class="lg:col-span-2">
            <div
              class="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
            >
              <h3 class="text-lg font-bold text-gray-800 mb-6">
                Informasi Proyek
              </h3>

              <div class="space-y-6">
                <!-- Row 1 -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2"
                      >Nama Proyek</label
                    >
                    <input
                      v-model="formData.title"
                      type="text"
                      class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary bg-gray-50 focus:bg-white transition-all"
                      placeholder="Contoh: Trihans Village"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2"
                      >Lokasi</label
                    >
                    <input
                      v-model="formData.location"
                      type="text"
                      class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary bg-gray-50 focus:bg-white transition-all"
                      placeholder="Contoh: Tanjung, Brebes"
                    />
                  </div>
                </div>

                <!-- Row 2 -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2"
                      >Harga</label
                    >
                    <input
                      v-model="formData.price"
                      type="text"
                      class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary bg-gray-50 focus:bg-white transition-all"
                      placeholder="Contoh: Mulai dari 200 jutaan"
                    />
                  </div>
                  <div>
                    <div>
                      <div class="flex items-center justify-between mb-2">
                        <label class="block text-sm font-medium text-gray-700"
                          >Tipe Unit</label
                        >
                        <div class="flex gap-1">
                          <button
                            v-for="option in listStyleOptions"
                            :key="option.value"
                            @click="changeListStyle('types', option.value)"
                            :class="[
                              'w-8 h-8 flex items-center justify-center rounded border text-lg leading-none transition-colors',
                              formData.typesListStyle === option.value
                                ? 'bg-primary text-white border-primary'
                                : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50',
                            ]"
                            :title="option.value"
                            type="button"
                          >
                            {{ option.icon }}
                          </button>
                        </div>
                      </div>
                      <textarea
                        v-model="typesText"
                        @keydown="handleListKeydown($event, 'types')"
                        @paste="handleListPaste($event, 'types')"
                        rows="4"
                        class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary bg-gray-50 focus:bg-white transition-all"
                        placeholder="Pisahkan dengan enter&#10;Contoh:&#10;• 36/72&#10;• 45/90"
                      ></textarea>
                    </div>
                  </div>
                </div>

                <!-- Row 3 -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2"
                      >Kamar Tidur</label
                    >
                    <input
                      v-model="formData.bedrooms"
                      type="text"
                      class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary bg-gray-50 focus:bg-white transition-all"
                      placeholder="Contoh: 2"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2"
                      >Kamar Mandi</label
                    >
                    <input
                      v-model="formData.bathrooms"
                      type="text"
                      class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary bg-gray-50 focus:bg-white transition-all"
                      placeholder="Contoh: 1"
                    />
                  </div>
                </div>

                <!-- Description -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2"
                    >Deskripsi</label
                  >
                  <textarea
                    v-model="formData.description"
                    rows="4"
                    class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary bg-gray-50 focus:bg-white transition-all"
                    placeholder="Deskripsi lengkap proyek..."
                  ></textarea>
                </div>

                <!-- Text Areas for Lists with Style Selector ---->
                <div class="space-y-6">
                  <!-- Spesifikasi Bangunan -->
                  <div>
                    <div class="flex items-center justify-between mb-2">
                      <label class="block text-sm font-medium text-gray-700"
                        >Spesifikasi Bangunan</label
                      >
                      <div class="flex gap-1">
                        <button
                          v-for="option in listStyleOptions"
                          :key="option.value"
                          @click="
                            changeListStyle(
                              'buildingSpecifications',
                              option.value
                            )
                          "
                          :class="[
                            'w-8 h-8 flex items-center justify-center rounded border text-lg leading-none transition-colors',
                            formData.buildingSpecificationsListStyle ===
                            option.value
                              ? 'bg-primary text-white border-primary'
                              : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50',
                          ]"
                          :title="option.value"
                          type="button"
                        >
                          {{ option.icon }}
                        </button>
                      </div>
                    </div>
                    <textarea
                      v-model="buildingSpecificationsText"
                      @keydown="
                        handleListKeydown($event, 'buildingSpecifications')
                      "
                      @paste="handleListPaste($event, 'buildingSpecifications')"
                      rows="4"
                      class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary bg-gray-50 focus:bg-white transition-all"
                      placeholder="Pisahkan dengan enter&#10;Contoh:&#10;• Pondasi Batu Kali&#10;• Rangka Atap Baja Ringan"
                    ></textarea>
                  </div>

                  <!-- Lokasi Strategis -->
                  <div>
                    <div class="flex items-center justify-between mb-2">
                      <label class="block text-sm font-medium text-gray-700"
                        >Lokasi Strategis</label
                      >
                      <div class="flex gap-1">
                        <button
                          v-for="option in listStyleOptions"
                          :key="option.value"
                          @click="
                            changeListStyle('strategicLocation', option.value)
                          "
                          :class="[
                            'w-8 h-8 flex items-center justify-center rounded border text-lg leading-none transition-colors',
                            formData.strategicLocationListStyle === option.value
                              ? 'bg-primary text-white border-primary'
                              : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50',
                          ]"
                          :title="option.value"
                          type="button"
                        >
                          {{ option.icon }}
                        </button>
                      </div>
                    </div>
                    <textarea
                      v-model="strategicLocationText"
                      @keydown="handleListKeydown($event, 'strategicLocation')"
                      @paste="handleListPaste($event, 'strategicLocation')"
                      rows="4"
                      class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary bg-gray-50 focus:bg-white transition-all"
                      placeholder="Pisahkan dengan enter&#10;Contoh:&#10;• 1 Menit Kecamatan Tanjung&#10;• 3 Menit Pasar Tanjung&#10;• 5 Menit Samsat Tanjung"
                    ></textarea>
                  </div>

                  <!-- Fasilitas -->
                  <div>
                    <div class="flex items-center justify-between mb-2">
                      <label class="block text-sm font-medium text-gray-700"
                        >Fasilitas</label
                      >
                      <div class="flex gap-1">
                        <button
                          v-for="option in listStyleOptions"
                          :key="option.value"
                          @click="changeListStyle('facilities', option.value)"
                          :class="[
                            'w-8 h-8 flex items-center justify-center rounded border text-lg leading-none transition-colors',
                            formData.facilitiesListStyle === option.value
                              ? 'bg-primary text-white border-primary'
                              : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50',
                          ]"
                          :title="option.value"
                          type="button"
                        >
                          {{ option.icon }}
                        </button>
                      </div>
                    </div>
                    <textarea
                      v-model="facilitiesText"
                      @keydown="handleListKeydown($event, 'facilities')"
                      @paste="handleListPaste($event, 'facilities')"
                      rows="4"
                      class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary bg-gray-50 focus:bg-white transition-all"
                      placeholder="Pisahkan dengan enter&#10;Contoh:&#10;• Masjid&#10;• Taman Bermain&#10;• Security 24 Jam"
                    ></textarea>
                  </div>
                </div>

                <!-- Document Requirements with Style Selector -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div class="flex items-center justify-between mb-2">
                      <label class="block text-sm font-medium text-gray-700"
                        >Dokumen Persyaratan Wiraswasta</label
                      >
                      <div class="flex gap-1">
                        <button
                          v-for="option in listStyleOptions"
                          :key="option.value"
                          @click="
                            changeListStyle('documentsWiraswasta', option.value)
                          "
                          :class="[
                            'w-8 h-8 flex items-center justify-center rounded border text-lg leading-none transition-colors',
                            formData.documentsWiraswastaListStyle ===
                            option.value
                              ? 'bg-primary text-white border-primary'
                              : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50',
                          ]"
                          :title="option.value"
                          type="button"
                        >
                          {{ option.icon }}
                        </button>
                      </div>
                    </div>
                    <textarea
                      v-model="documentsWiraswastaText"
                      @keydown="
                        handleListKeydown($event, 'documentsWiraswasta')
                      "
                      @paste="handleListPaste($event, 'documentsWiraswasta')"
                      rows="4"
                      class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary bg-gray-50 focus:bg-white transition-all"
                      placeholder="Contoh:&#10;• KTP&#10;• KK&#10;• NPWP&#10;• Rekening Koran 3 bulan terakhir"
                    ></textarea>
                  </div>
                  <div>
                    <div class="flex items-center justify-between mb-2">
                      <label class="block text-sm font-medium text-gray-700"
                        >Dokumen Persyaratan Karyawan</label
                      >
                      <div class="flex gap-1">
                        <button
                          v-for="option in listStyleOptions"
                          :key="option.value"
                          @click="
                            changeListStyle('documentsKaryawan', option.value)
                          "
                          :class="[
                            'w-8 h-8 flex items-center justify-center rounded border text-lg leading-none transition-colors',
                            formData.documentsKaryawanListStyle === option.value
                              ? 'bg-primary text-white border-primary'
                              : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50',
                          ]"
                          :title="option.value"
                          type="button"
                        >
                          {{ option.icon }}
                        </button>
                      </div>
                    </div>
                    <textarea
                      v-model="documentsKaryawanText"
                      @keydown="handleListKeydown($event, 'documentsKaryawan')"
                      @paste="handleListPaste($event, 'documentsKaryawan')"
                      rows="4"
                      class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary bg-gray-50 focus:bg-white transition-all"
                      placeholder="Contoh:&#10;• KTP&#10;• KK&#10;• NPWP&#10;• Slip Gaji 3 bulan terakhir&#10;• SK Pengangkatan"
                    ></textarea>
                  </div>
                </div>
              </div>
              <!-- General Documents -->
              <div class="mt-6">
                <div class="flex items-center justify-between mb-2">
                  <label class="block text-sm font-medium text-gray-700"
                    >Dokumen Persyaratan Umum (Opsional)</label
                  >
                  <div class="flex gap-1">
                    <button
                      v-for="option in listStyleOptions"
                      :key="option.value"
                      @click="changeListStyle('documentsGeneral', option.value)"
                      :class="[
                        'w-8 h-8 flex items-center justify-center rounded border text-lg leading-none transition-colors',
                        formData.documentsGeneralListStyle === option.value
                          ? 'bg-primary text-white border-primary'
                          : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50',
                      ]"
                      :title="option.value"
                      type="button"
                    >
                      {{ option.icon }}
                    </button>
                  </div>
                </div>
                <textarea
                  v-model="documentsGeneralText"
                  @keydown="handleListKeydown($event, 'documentsGeneral')"
                  @paste="handleListPaste($event, 'documentsGeneral')"
                  rows="4"
                  class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary bg-gray-50 focus:bg-white transition-all"
                  placeholder="Contoh:&#10;• KTP&#10;• KK&#10;• NPWP"
                ></textarea>
                <p class="text-xs text-gray-500 mt-1">
                  Isi ini jika persyaratan berlaku umum (tidak dipisah
                  Wiraswasta/Karyawan)
                </p>
              </div>
            </div>
          </div>

          <!-- Right Column: Images -->
          <div class="lg:col-span-1 space-y-6">
            <!-- Thumbnail Card -->
            <div
              class="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
            >
              <h3 class="text-lg font-bold text-gray-800 mb-4">
                Thumbnail Proyek
              </h3>

              <!-- Upload Method Selector -->
              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Metode Upload Gambar</label
                >
                <select
                  v-model="thumbnailUploadMode"
                  class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  <option value="base64">Base64 (Default)</option>
                  <option value="storage">Firebase Storage</option>
                  <option value="url">URL Eksternal</option>
                </select>
              </div>

              <!-- URL Input -->
              <div v-if="thumbnailUploadMode === 'url'" class="mb-4">
                <input
                  v-model="formData.thumbnail"
                  type="url"
                  class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <!-- File Input Area -->
              <div
                v-if="thumbnailUploadMode !== 'url'"
                class="border-2 border-dashed border-gray-200 rounded-xl p-4 text-center hover:border-primary/50 transition-colors relative"
              >
                <input
                  type="file"
                  accept="image/*"
                  @change="handleThumbnailUpload"
                  class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div
                  v-if="
                    thumbnailPreview ||
                    (formData.thumbnail &&
                      !formData.thumbnail.startsWith('http'))
                  "
                  class="relative z-0"
                >
                  <img
                    :src="thumbnailPreview || formData.thumbnail"
                    class="w-full h-48 object-cover rounded-lg mx-auto"
                    alt="Thumbnail"
                  />
                  <p class="text-xs text-gray-500 mt-2">Klik untuk mengganti</p>
                </div>
                <div v-else class="py-8">
                  <div
                    class="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-3"
                  >
                    <svg
                      class="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      ></path>
                    </svg>
                  </div>
                  <p class="text-sm font-medium text-gray-700">
                    Upload Thumbnail
                  </p>
                  <p class="text-xs text-gray-400 mt-1">
                    SVG, PNG, JPG or GIF (max. 800x400px)
                  </p>
                </div>
              </div>

              <!-- Preview for URL mode -->
              <div
                v-if="thumbnailUploadMode === 'url' && formData.thumbnail"
                class="mt-4"
              >
                <img
                  :src="formData.thumbnail"
                  class="w-full h-48 object-cover rounded-lg mx-auto"
                  alt="Thumbnail Preview"
                  @error="handleImageError"
                />
              </div>
            </div>

            <!-- Gallery Card -->
            <div
              class="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
            >
              <h3 class="text-lg font-bold text-gray-800 mb-4">Galeri Foto</h3>

              <!-- Upload Method Selector -->
              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Metode Upload Gambar</label
                >
                <select
                  v-model="galleryUploadMode"
                  class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  <option value="base64">Base64 (Default)</option>
                  <option value="storage">Firebase Storage</option>
                  <option value="url">URL Eksternal</option>
                </select>
              </div>

              <!-- URL Input -->
              <div v-if="galleryUploadMode === 'url'" class="mb-4 flex gap-2">
                <input
                  v-model="newGalleryUrl"
                  type="url"
                  class="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="https://example.com/image.jpg"
                  @keyup.enter="addGalleryUrl"
                />
                <button
                  @click="addGalleryUrl"
                  class="px-3 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90"
                  type="button"
                >
                  Add
                </button>
              </div>

              <div class="grid grid-cols-2 gap-2 mb-4">
                <div
                  v-for="(img, index) in formData.images"
                  :key="'existing-' + index"
                  class="relative group aspect-square"
                >
                  <img
                    :src="img"
                    class="w-full h-full object-cover rounded-lg"
                  />
                  <button
                    @click="removeGalleryImage(index)"
                    class="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                    title="Hapus"
                  >
                    <svg
                      class="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
                  </button>
                  <!-- Reorder Buttons -->
                  <div
                    class="absolute bottom-1 left-1 right-1 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <button
                      v-if="index > 0"
                      @click.stop="moveExistingImage(index, -1)"
                      class="bg-black/50 text-white rounded p-1 hover:bg-black/70"
                      title="Geser Kiri"
                    >
                      <svg
                        class="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M15 19l-7-7 7-7"
                        ></path>
                      </svg>
                    </button>
                    <div v-else></div>
                    <button
                      v-if="index < formData.images.length - 1"
                      @click.stop="moveExistingImage(index, 1)"
                      class="bg-black/50 text-white rounded p-1 hover:bg-black/70"
                      title="Geser Kanan"
                    >
                      <svg
                        class="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M9 5l7 7-7 7"
                        ></path>
                      </svg>
                    </button>
                  </div>
                </div>
                <div
                  v-for="(preview, index) in imagePreviews"
                  :key="'preview-' + index"
                  class="relative group aspect-square"
                >
                  <img
                    :src="preview"
                    class="w-full h-full object-cover rounded-lg"
                  />
                  <button
                    @click="removePendingImage(index)"
                    class="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                    title="Hapus"
                  >
                    <svg
                      class="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
                  </button>
                  <!-- Reorder Buttons -->
                  <div
                    class="absolute bottom-1 left-1 right-1 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <button
                      v-if="index > 0"
                      @click.stop="moveNewImage(index, -1)"
                      class="bg-black/50 text-white rounded p-1 hover:bg-black/70"
                      title="Geser Kiri"
                    >
                      <svg
                        class="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M15 19l-7-7 7-7"
                        ></path>
                      </svg>
                    </button>
                    <div v-else></div>
                    <button
                      v-if="index < imagePreviews.length - 1"
                      @click.stop="moveNewImage(index, 1)"
                      class="bg-black/50 text-white rounded p-1 hover:bg-black/70"
                      title="Geser Kanan"
                    >
                      <svg
                        class="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M9 5l7 7-7 7"
                        ></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <div
                v-if="galleryUploadMode !== 'url'"
                class="border-2 border-dashed border-gray-200 rounded-xl p-4 text-center hover:border-primary/50 transition-colors relative"
              >
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  @change="handleImagesUpload"
                  class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <p class="text-sm text-primary font-medium">+ Tambah Foto</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, nextTick } from "vue";
import AdminHeader from "@/components/admin/AdminHeader.vue";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { db, storage } from "@/firebase/config";

const loading = ref(true);
const saving = ref(false);
const showAddForm = ref(false);
const editingProject = ref(null);
const projects = ref([]);
const imageFiles = ref([]);
const imagePreviews = ref([]);
const thumbnailFile = ref(null);
const thumbnailPreview = ref(null);
const searchQuery = ref("");

// List Style Configuration
const listStyleOptions = [
  { icon: "•", value: "bullet" },
  { icon: "■", value: "square" },
  { icon: "-", value: "dash" },
  { icon: "✓", value: "check" },
  { icon: "➢", value: "arrow" },
];

const getSymbol = (style) => {
  const option = listStyleOptions.find((o) => o.value === style);
  return option ? option.icon : "•";
};

const escapeRegExp = (string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

// Strip any known symbols from the start of lines
const stripListSymbols = (text) => {
  if (!text) return "";
  const symbols = listStyleOptions.map((o) => escapeRegExp(o.icon)).join("|");
  const regex = new RegExp(`^\\s*(${symbols})\\s+`, "gm");
  return text.replace(regex, "");
};

// Format text with the specific symbol
const formatListText = (text, style) => {
  if (!text) return "";
  const symbol = getSymbol(style);
  const cleanText = stripListSymbols(text);
  return cleanText
    .split("\n")
    .map((line) => {
      const trimmed = line.trim();
      return trimmed ? `${symbol} ${trimmed}` : line;
    })
    .join("\n");
};

const filteredProjects = computed(() => {
  if (!searchQuery.value) return projects.value;
  const query = searchQuery.value.toLowerCase();
  return projects.value.filter(
    (project) =>
      project.title.toLowerCase().includes(query) ||
      project.location.toLowerCase().includes(query)
  );
});

const handleSearch = (query) => {
  searchQuery.value = query;
};

const formatDate = (dateString) => {
  if (!dateString) return "-";
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const thumbnailUploadMode = ref("base64");
const galleryUploadMode = ref("base64");
const newGalleryUrl = ref("");

const formData = ref({
  title: "",
  location: "",
  description: "",
  price: "",
  bedrooms: "",
  bathrooms: "",
  buildingArea: "",
  types: [],
  typesListStyle: "bullet",
  buildingSpecifications: [],
  buildingSpecificationsListStyle: "bullet",
  strategicLocation: [],
  strategicLocationListStyle: "bullet",
  facilities: [],
  facilitiesListStyle: "bullet",
  documentsWiraswasta: [],
  documentsWiraswastaListStyle: "bullet",
  documentsKaryawan: [],
  documentsKaryawanListStyle: "bullet",
  documentsGeneral: [],
  documentsGeneralListStyle: "bullet",
  thumbnail: "",
  images: [],
});

const buildingSpecificationsText = ref("");
const typesText = ref("");
const strategicLocationText = ref("");
const facilitiesText = ref("");
const documentsWiraswastaText = ref("");
const documentsKaryawanText = ref("");
const documentsGeneralText = ref("");

// Handle List Style Change
const changeListStyle = (field, newStyle) => {
  formData.value[`${field}ListStyle`] = newStyle;

  // Update the corresponding text field
  const textMap = {
    buildingSpecifications: buildingSpecificationsText,
    types: typesText,
    strategicLocation: strategicLocationText,
    facilities: facilitiesText,
    documentsWiraswasta: documentsWiraswastaText,
    documentsKaryawan: documentsKaryawanText,
  };

  if (textMap[field]) {
    textMap[field].value = formatListText(textMap[field].value, newStyle);
  }
};

// Handle Enter key in list textareas
const handleListKeydown = (e, fieldName) => {
  if (e.key === "Enter") {
    e.preventDefault();
    const style = formData.value[`${fieldName}ListStyle`] || "bullet";
    const symbol = getSymbol(style);

    const textarea = e.target;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    const textMap = {
      buildingSpecifications: buildingSpecificationsText,
      types: typesText,
      strategicLocation: strategicLocationText,
      facilities: facilitiesText,
      documentsWiraswasta: documentsWiraswastaText,
      documentsKaryawan: documentsKaryawanText,
      documentsGeneral: documentsGeneralText,
    };

    const textRef = textMap[fieldName];
    const text = textRef.value;
    const before = text.substring(0, start);
    const after = text.substring(end);

    // Add newline and symbol
    const insertion = `\n${symbol} `;
    textRef.value = before + insertion + after;

    nextTick(() => {
      textarea.selectionStart = textarea.selectionEnd =
        start + insertion.length;
      textarea.focus();
    });
  }
};

// Handle Paste in list textareas
const handleListPaste = (e, fieldName) => {
  e.preventDefault();
  const pastedText = (e.clipboardData || window.clipboardData).getData("text");
  const style = formData.value[`${fieldName}ListStyle`] || "bullet";
  const symbol = getSymbol(style);

  // Format pasted text
  const formattedPaste = pastedText
    .split("\n")
    .map((line) => {
      const trimmed = line.trim();
      // Don't add symbol if line is empty
      if (!trimmed) return "";
      // Check if line already has a symbol
      const hasSymbol = listStyleOptions.some((opt) =>
        trimmed.startsWith(opt.icon)
      );
      return hasSymbol ? trimmed : `${symbol} ${trimmed}`;
    })
    .join("\n");

  const textarea = e.target;
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;

  const textMap = {
    buildingSpecifications: buildingSpecificationsText,
    types: typesText,
    strategicLocation: strategicLocationText,
    facilities: facilitiesText,
    documentsWiraswasta: documentsWiraswastaText,
    documentsKaryawan: documentsKaryawanText,
    documentsGeneral: documentsGeneralText,
  };

  const textRef = textMap[fieldName];
  const text = textRef.value;

  textRef.value =
    text.substring(0, start) + formattedPaste + text.substring(end);

  nextTick(() => {
    textarea.selectionStart = textarea.selectionEnd =
      start + formattedPaste.length;
  });
};

const loadProjects = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "projects"));
    projects.value = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error loading projects:", error);
  } finally {
    loading.value = false;
  }
};

const handleImageError = (e) => {
  e.target.src = "https://via.placeholder.com/400x300?text=Image+Error";
};

const addGalleryUrl = () => {
  if (newGalleryUrl.value) {
    formData.value.images.push(newGalleryUrl.value);
    newGalleryUrl.value = "";
  }
};

const removeGalleryImage = (index) => {
  formData.value.images.splice(index, 1);
};

const handleImagesUpload = (event) => {
  const files = Array.from(event.target.files);

  for (const file of files) {
    if (file.size > 10 * 1024 * 1024) {
      alert("Ukuran file terlalu besar. Maksimal 10MB per file");
      return;
    }
  }

  // Append new files to existing pending files
  imageFiles.value = [...imageFiles.value, ...files];

  if (galleryUploadMode.value === "base64") {
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        imagePreviews.value.push(e.target.result);
      };
      reader.readAsDataURL(file);
    });
  } else {
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    imagePreviews.value = [...imagePreviews.value, ...newPreviews];
  }
};

const removePendingImage = (index) => {
  imageFiles.value.splice(index, 1);
  imagePreviews.value.splice(index, 1);
};

const moveExistingImage = (index, direction) => {
  const newIndex = index + direction;
  if (newIndex >= 0 && newIndex < formData.value.images.length) {
    const temp = formData.value.images[index];
    formData.value.images[index] = formData.value.images[newIndex];
    formData.value.images[newIndex] = temp;
  }
};

const moveNewImage = (index, direction) => {
  const newIndex = index + direction;
  if (newIndex >= 0 && newIndex < imagePreviews.value.length) {
    // Swap previews
    const tempPreview = imagePreviews.value[index];
    imagePreviews.value[index] = imagePreviews.value[newIndex];
    imagePreviews.value[newIndex] = tempPreview;

    // Swap files
    const tempFile = imageFiles.value[index];
    imageFiles.value[index] = imageFiles.value[newIndex];
    imageFiles.value[newIndex] = tempFile;
  }
};

const handleThumbnailUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    if (file.size > 10 * 1024 * 1024) {
      alert("Ukuran file terlalu besar. Maksimal 10MB");
      return;
    }
    thumbnailFile.value = file;

    if (thumbnailUploadMode.value === "base64") {
      const reader = new FileReader();
      reader.onload = (e) => {
        thumbnailPreview.value = e.target.result;
      };
      reader.readAsDataURL(file);
    } else {
      thumbnailPreview.value = URL.createObjectURL(file);
    }
  }
};

const compressImage = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        // Max dimensions to ensure reasonable size
        const MAX_WIDTH = 1024;
        const MAX_HEIGHT = 1024;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        // Initial compression
        let quality = 0.7;
        let dataUrl = canvas.toDataURL("image/jpeg", quality);

        // If still too large (> 900KB for Firestore safety), reduce quality and/or size
        while (dataUrl.length > 900 * 1024 && quality > 0.1) {
          quality -= 0.1;
          dataUrl = canvas.toDataURL("image/jpeg", quality);
        }

        resolve(dataUrl);
      };
      img.onerror = (error) => reject(error);
    };
    reader.onerror = (error) => reject(error);
  });
};

const uploadThumbnail = async () => {
  if (thumbnailUploadMode.value === "url") return formData.value.thumbnail;

  if (thumbnailUploadMode.value === "base64") {
    if (thumbnailFile.value) {
      try {
        const compressedBase64 = await compressImage(thumbnailFile.value);
        return compressedBase64;
      } catch (error) {
        console.error("Error compressing thumbnail:", error);
        alert("Gagal memproses thumbnail. Silakan coba lagi.");
        throw error;
      }
    }
    return formData.value.thumbnail;
  }

  if (!thumbnailFile.value) return formData.value.thumbnail;

  const timestamp = Date.now();
  const fileName = `projects/thumbnails/${timestamp}_${thumbnailFile.value.name}`;
  const imageRef = storageRef(storage, fileName);

  await uploadBytes(imageRef, thumbnailFile.value);
  return await getDownloadURL(imageRef);
};

const uploadImages = async () => {
  let newImages = [];

  if (galleryUploadMode.value === "base64" && imageFiles.value.length > 0) {
    const base64Promises = imageFiles.value.map((file) => {
      return compressImage(file);
    });
    newImages = await Promise.all(base64Promises);
  } else if (
    galleryUploadMode.value === "storage" &&
    imageFiles.value.length > 0
  ) {
    const uploadPromises = imageFiles.value.map(async (file) => {
      const timestamp = Date.now();
      const fileName = `projects/${timestamp}_${file.name}`;
      const imageRef = storageRef(storage, fileName);

      await uploadBytes(imageRef, file);
      return await getDownloadURL(imageRef);
    });
    newImages = await Promise.all(uploadPromises);
  }

  return [...formData.value.images, ...newImages];
};

const saveProject = async () => {
  saving.value = true;

  try {
    let thumbnail = await uploadThumbnail();
    if (!thumbnail) {
      thumbnail = "/placeholder.jpeg";
    }

    const images = await uploadImages();

    // Helper to process list text: strip symbols, split by newline, filter empty
    const processListText = (text) => {
      return stripListSymbols(text)
        .split("\n")
        .map((s) => s.trim())
        .filter((s) => s);
    };

    const projectData = {
      ...formData.value,
      thumbnail,
      images,
      images,
      types: processListText(typesText.value),
      buildingSpecifications: processListText(buildingSpecificationsText.value),
      strategicLocation: processListText(strategicLocationText.value),
      facilities: processListText(facilitiesText.value),
      documentsWiraswasta: processListText(documentsWiraswastaText.value),
      documentsKaryawan: processListText(documentsKaryawanText.value),
      documentsGeneral: processListText(documentsGeneralText.value),
      updatedAt: new Date().toISOString(),
    };

    if (editingProject.value) {
      await updateDoc(
        doc(db, "projects", editingProject.value.id),
        projectData
      );
    } else {
      projectData.createdAt = new Date().toISOString();
      await addDoc(collection(db, "projects"), projectData);
    }

    await loadProjects();
    closeForm();
  } catch (error) {
    console.error("Error saving project:", error);
    alert("Gagal menyimpan proyek. Silakan coba lagi.");
  } finally {
    saving.value = false;
  }
};

const editProject = (project) => {
  editingProject.value = project;
  formData.value = {
    ...project,
    images: project.images || [],
    // Ensure defaults if missing
    typesListStyle: project.typesListStyle || "bullet",
    buildingSpecificationsListStyle:
      project.buildingSpecificationsListStyle || "bullet",
    strategicLocationListStyle: project.strategicLocationListStyle || "bullet",
    facilitiesListStyle: project.facilitiesListStyle || "bullet",
    documentsWiraswastaListStyle:
      project.documentsWiraswastaListStyle || "bullet",
    documentsKaryawanListStyle: project.documentsKaryawanListStyle || "bullet",
    documentsGeneralListStyle: project.documentsGeneralListStyle || "bullet",
  };

  // Helper to join array into text with symbols
  const joinWithSymbol = (arr, style) => {
    if (!arr || !Array.isArray(arr)) return "";
    const symbol = getSymbol(style || "bullet");
    return arr.map((item) => `${symbol} ${item}`).join("\n");
  };

  buildingSpecificationsText.value = joinWithSymbol(
    project.buildingSpecifications,
    formData.value.buildingSpecificationsListStyle
  );
  typesText.value = joinWithSymbol(
    project.types,
    formData.value.typesListStyle
  );
  strategicLocationText.value = joinWithSymbol(
    project.strategicLocation,
    formData.value.strategicLocationListStyle
  );
  facilitiesText.value = joinWithSymbol(
    project.facilities,
    formData.value.facilitiesListStyle
  );
  documentsWiraswastaText.value = joinWithSymbol(
    project.documentsWiraswasta,
    formData.value.documentsWiraswastaListStyle
  );
  documentsKaryawanText.value = joinWithSymbol(
    project.documentsKaryawan,
    formData.value.documentsKaryawanListStyle
  );
  documentsGeneralText.value = joinWithSymbol(
    project.documentsGeneral,
    formData.value.documentsGeneralListStyle
  );

  imagePreviews.value = [];
  thumbnailPreview.value = null;
  showAddForm.value = true;
};

const deleteProject = async (id) => {
  if (!confirm("Yakin ingin menghapus proyek ini?")) return;

  try {
    await deleteDoc(doc(db, "projects", id));
    await loadProjects();
  } catch (error) {
    console.error("Error deleting project:", error);
    alert("Gagal menghapus proyek. Silakan coba lagi.");
  }
};

const closeForm = () => {
  showAddForm.value = false;
  editingProject.value = null;
  formData.value = {
    title: "",
    location: "",
    description: "",
    price: "",
    bedrooms: "",
    bathrooms: "",
    buildingArea: "",
    types: [],
    typesListStyle: "bullet",
    buildingSpecifications: [],
    buildingSpecificationsListStyle: "bullet",
    strategicLocation: [],
    strategicLocationListStyle: "bullet",
    facilities: [],
    facilitiesListStyle: "bullet",
    documentsWiraswasta: [],
    documentsWiraswastaListStyle: "bullet",
    documentsKaryawan: [],
    documentsKaryawanListStyle: "bullet",
    documentsGeneral: [],
    documentsGeneralListStyle: "bullet",
    thumbnail: "",
    images: [],
  };
  buildingSpecificationsText.value = "";
  typesText.value = "";
  strategicLocationText.value = "";
  facilitiesText.value = "";
  documentsWiraswastaText.value = "";
  documentsKaryawanText.value = "";
  documentsGeneralText.value = "";
  imageFiles.value = [];
  imagePreviews.value = [];
  thumbnailFile.value = null;
  thumbnailPreview.value = null;
  thumbnailUploadMode.value = "storage";
  galleryUploadMode.value = "storage";
  newGalleryUrl.value = "";
};

onMounted(() => {
  loadProjects();
});
</script>

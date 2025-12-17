# Migrasi dari Next.js ke Vue.js - HR Group Website

## Status Migrasi

✅ **Selesai Dimigrasikan:**

### Komponen Utama

1. **Navbar.vue** - Navigasi dengan menu mobile responsive
2. **Hero.vue** - Hero section dengan background image dan curved overlay
3. **FloatingBenefitsCarousel.vue** - Carousel benefits dengan auto-scroll
4. **Footer.vue** - Footer dengan kontak, sosial media, dan map

### Sections

1. **AboutSection.vue** - Section tentang HR Group dengan statistik
2. **FeaturesSection.vue** - Fitur-fitur unggulan (4 cards)
3. **ContactSection.vue** - Form kontak dengan background image
4. **ProjectsSection.vue** - Section proyek (placeholder)
5. **PromoSection.vue** - Section promo (placeholder)
6. **ArticlesSection.vue** - Section artikel (placeholder)

### Setup & Konfigurasi

- ✅ Tailwind CSS dikonfigurasi dengan custom colors
- ✅ Lucide Vue Next untuk icons
- ✅ PostCSS setup
- ✅ Assets (images) sudah dicopy dari project Next.js

## Teknologi yang Digunakan

- **Vue 3** dengan Composition API (`<script setup>`)
- **Vite** sebagai build tool
- **Tailwind CSS** untuk styling
- **Lucide Vue Next** untuk icons

## Cara Menjalankan

```bash
cd hrgroupsukses
bun install  # atau npm install
bun run dev  # atau npm run dev
```

## Yang Perlu Dilengkapi

### 1. ProjectsSection

- Tambahkan data projects
- Buat komponen ProjectCard
- Implementasi ProjectDetailDialog

### 2. PromoSection

- Implementasi tampilan promo
- Tambahkan data promo dari Firebase/API

### 3. ArticlesSection

- Implementasi tampilan artikel
- Tambahkan data artikel dari Firebase/API

### 4. Routing

Jika perlu halaman Profile (`/profil`), install Vue Router:

```bash
bun add vue-router
```

### 5. State Management (Optional)

Jika perlu state management, install Pinia:

```bash
bun add pinia
```

## Perbedaan Utama Next.js vs Vue

### Next.js (React)

```jsx
"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export function Component() {
  const [state, setState] = useState(false);
  return <div>...</div>;
}
```

### Vue 3

```vue
<template>
  <div>...</div>
</template>

<script setup>
import { ref } from "vue";

const state = ref(false);
</script>
```

## Custom Colors (Tailwind)

```javascript
colors: {
  primary: {
    DEFAULT: '#3E2E27',
    dark: '#2A1E19',
  },
  secondary: {
    DEFAULT: '#F99D1C',
    dark: '#e0890b',
  },
  background: '#EDE8E3',
}
```

## Struktur Folder

```
hrgroupsukses/
├── public/              # Assets (images, etc)
├── src/
│   ├── assets/
│   │   └── main.css    # Tailwind imports
│   ├── components/
│   │   ├── Navbar.vue
│   │   ├── Hero.vue
│   │   ├── FloatingBenefitsCarousel.vue
│   │   ├── Footer.vue
│   │   └── sections/
│   │       ├── AboutSection.vue
│   │       ├── FeaturesSection.vue
│   │       ├── ContactSection.vue
│   │       ├── ProjectsSection.vue
│   │       ├── PromoSection.vue
│   │       └── ArticlesSection.vue
│   ├── App.vue         # Main app component
│   └── main.js         # Entry point
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

## Next Steps

1. ✅ Lengkapi ProjectsSection dengan data dan komponen
2. ✅ Lengkapi PromoSection dengan konten
3. ✅ Lengkapi ArticlesSection dengan konten
4. ✅ Setup Vue Router untuk halaman Profile
5. ✅ Integrasikan dengan Firebase (jika diperlukan)
6. ✅ Testing responsiveness di berbagai device
7. ✅ Optimasi performa dan SEO

## Catatan

- Semua komponen menggunakan Composition API dengan `<script setup>`
- Styling menggunakan Tailwind CSS utility classes
- Icons menggunakan Lucide Vue Next
- Images disimpan di folder `public/`

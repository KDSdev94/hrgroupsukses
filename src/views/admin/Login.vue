<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Admin Login
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Masuk untuk mengelola website HR Group
        </p>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="email-address" class="sr-only">Email address</label>
            <input
              id="email-address"
              name="email"
              type="email"
              autocomplete="email"
              required
              v-model="email"
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-secondary focus:border-secondary focus:z-10 sm:text-sm"
              placeholder="Email address"
            />
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              v-model="password"
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-secondary focus:border-secondary focus:z-10 sm:text-sm"
              placeholder="Password"
            />
          </div>
        </div>

        <div v-if="error" class="text-red-500 text-sm text-center">
          {{ error }}
        </div>

        <div>
          <button
            type="submit"
            :disabled="loading"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <!-- Lock Icon -->
              <svg
                class="h-5 w-5 text-secondary group-hover:text-secondary-light"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
            {{ loading ? "Signing in..." : "Sign in" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  Timestamp,
} from "firebase/firestore";
import { auth, db } from "@/firebase/config";

const email = ref("");
const password = ref("");
const error = ref("");
const loading = ref(false);
const router = useRouter();

// Check if admin exists in Firestore, if not create one
const ensureAdminInFirestore = async (user) => {
  try {
    const q = query(collection(db, "admins"), where("uid", "==", user.uid));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      // Admin doesn't exist in Firestore, create one
      await addDoc(collection(db, "admins"), {
        uid: user.uid,
        name: user.displayName || user.email.split("@")[0],
        email: user.email,
        role: "super_admin", // Default to super_admin for existing users
        status: "active",
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });
      console.log("Admin added to Firestore:", user.email);
    }
  } catch (error) {
    console.error("Error ensuring admin in Firestore:", error);
  }
};

const handleLogin = async () => {
  loading.value = true;
  error.value = "";

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email.value,
      password.value
    );

    // Ensure admin exists in Firestore
    await ensureAdminInFirestore(userCredential.user);

    router.push("/admin/dashboard");
  } catch (err) {
    console.error(err);
    switch (err.code) {
      case "auth/invalid-email":
        error.value = "Email tidak valid.";
        break;
      case "auth/user-disabled":
        error.value = "Pengguna ini telah dinonaktifkan.";
        break;
      case "auth/user-not-found":
        error.value = "Pengguna tidak ditemukan.";
        break;
      case "auth/wrong-password":
        error.value = "Password salah.";
        break;
      default:
        error.value = "Gagal masuk. Periksa koneksi atau coba lagi.";
    }
  } finally {
    loading.value = false;
  }
};
</script>

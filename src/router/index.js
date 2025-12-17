import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ProfileView from "../views/ProfileView.vue";
import ArticleDetailView from "../views/ArticleDetailView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/profil",
      name: "profile",
      component: ProfileView,
    },
    {
      path: "/artikel/:slug",
      name: "article-detail",
      component: ArticleDetailView,
    },
    {
      path: "/admin/login",
      name: "admin-login",
      component: () => import("../views/admin/Login.vue"),
    },
    {
      path: "/admin",
      component: () => import("../layouts/AdminLayout.vue"),
      meta: { requiresAuth: true },
      children: [
        {
          path: "dashboard",
          name: "admin-dashboard",
          component: () => import("../views/admin/Dashboard.vue"),
        },
        {
          path: "statistics",
          name: "admin-statistics",
          component: () => import("../views/admin/Statistics.vue"),
        },
        {
          path: "promotions",
          name: "admin-promotions",
          component: () => import("../views/admin/Promotions.vue"),
        },
        {
          path: "projects",
          name: "admin-projects",
          component: () => import("../views/admin/Projects.vue"),
        },
        {
          path: "articles",
          name: "admin-articles",
          component: () => import("../views/admin/Articles.vue"),
        },
        {
          path: "consultations",
          name: "admin-consultations",
          component: () => import("../views/admin/Consultations.vue"),
        },
        {
          path: "profile",
          name: "admin-profile",
          component: () => import("../views/admin/Profile.vue"),
        },
        {
          path: "admins",
          name: "admin-admins",
          component: () => import("../views/admin/Admins.vue"),
        },
      ],
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: "smooth",
      };
    }
    return { top: 0 };
  },
});

import { auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      auth,
      (user) => {
        removeListener();
        resolve(user);
      },
      reject
    );
  });
};

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  if (requiresAuth) {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      next("/admin/login");
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;

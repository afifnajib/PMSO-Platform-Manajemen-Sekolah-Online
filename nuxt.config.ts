// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  typescript: {
    strict: true,
    typeCheck: true,
  },
  components: {
    dirs: [
      "~/components", // Direktori default untuk komponen
      "~/layouts", // Tambahkan direktori layouts
    ],
  },
  app: {
    head: {
      title: "PMSO | Platform  Manajemen Sekolah Online",
      link: [
        {
          id: "theme-css",
          rel: "stylesheet",
          type: "text/css",
          href: "/themes/aura-light-indigo/theme.css",
        },
      ],
    },
  },
  modules: ["nuxt-primevue", "nuxt-gtag"],
  gtag: {
    id: "GTM-WBJLH3QD",
  },
  primevue: {
    options: { ripple: true },
    components: {
      exclude: ["Editor"],
    },
  },
  css: [
    "primeicons/primeicons.css",
    "primeflex/primeflex.scss",
    "primevue/resources/primevue.min.css",
    "@/assets/styles.scss",
  ],
});

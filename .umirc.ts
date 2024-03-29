import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    { path: "/", component: "index" },
    { path: "/docs", component: "docs" },
    { path: "/simple", component: "@/pages/simple" },
    { path: "/rotate", component: "@/pages/rotate" },
    { path: "/webgl", component: "@/pages/webgl" },
  ],
  npmClient: 'npm',
});

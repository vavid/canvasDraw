import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    { path: "/", component: "index" },
    { path: "/docs", component: "docs" },
    { path: "/simple", component: "@/pages/simple" },
    { path: "/baymax", component: "@/pages/baymax" },
    { path: "/catEar", component: "@/pages/catEar" },
    { path: "/rotate", component: "@/pages/rotate" },
    { path: "/webgl", component: "@/pages/webgl",
      routes: [
        {path: 'stars', component: '@/pages/webgl/stars'},
        {path: 'shapes', component: '@/pages/webgl/shapes'},
        {path: 'polygon', component: '@/pages/webgl/polygon'},
        {path: 'aline', component: '@/pages/webgl/aline'},
    ]},
  ],
  npmClient: 'npm',
});

import { defineConfig } from "vite";

export default defineConfig(({ command }) => ({
	base: command === "serve" ? "/" : "/alexander-johansson-portfolio-2026/",
}));

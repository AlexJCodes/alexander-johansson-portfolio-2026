import { defineConfig } from "vite";

const productionBase = "/alexander-johansson-portfolio-2026/";

export default defineConfig(({ command, isPreview }) => ({
	base: command === "serve" && isPreview !== true ? "/" : productionBase,
}));

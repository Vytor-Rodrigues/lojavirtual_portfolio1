import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

const githubRepository = process.env.GITHUB_REPOSITORY;
const repositoryName = githubRepository?.includes("/") ? githubRepository.split("/")[1] : undefined;
const isGitHubPagesBuild = process.env.GITHUB_ACTIONS === "true" && typeof repositoryName === "string" && repositoryName.length > 0;

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: mode === "production" && isGitHubPagesBuild ? `/${repositoryName}/` : "/",
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime", "@tanstack/react-query", "@tanstack/query-core"],
  },
}));

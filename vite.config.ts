import { existsSync } from "node:fs";
import { Readable } from "node:stream";
import { defineConfig, type Plugin } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { nitro } from "nitro/vite";

// Local database settings come from .env (see .env.example).
if (existsSync(".env")) process.loadEnvFile(".env");

// Serves /api/ in the dev server with the same handler that production uses.
function apiMiddlewarePlugin(): Plugin {
  return {
    name: "api-middleware-plugin",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith("/api/")) return next();
        try {
          const headers = new Headers();
          for (const [name, value] of Object.entries(req.headers)) {
            if (value !== undefined && !name.startsWith(":")) {
              headers.set(name, Array.isArray(value) ? value.join(", ") : value);
            }
          }
          const init: RequestInit & { duplex?: "half" } = { method: req.method ?? "GET", headers };
          if (req.method !== "GET" && req.method !== "HEAD") {
            init.body = Readable.toWeb(req) as ReadableStream;
            init.duplex = "half";
          }
          const origin = `http://${req.headers.host || "localhost:8080"}`;
          const request = new Request(new URL(req.url, origin), init);
          const { handleApiRequest } = await import("./src/lib/api-handler.ts");
          const clientIp = req.socket.remoteAddress ?? "unknown";
          const response = await handleApiRequest(request, clientIp);
          res.statusCode = response.status;
          response.headers.forEach((value, name) => res.setHeader(name, value));
          res.end(await response.text());
        } catch (error) {
          console.error("API Error:", error);
          res.statusCode = 500;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ success: false, error: "Something went wrong." }));
        }
      });
    },
  };
}

export default defineConfig({
  server: {
    port: 8080,
  },
  plugins: [
    apiMiddlewarePlugin(),
    tailwindcss(),
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    tanstackStart({
      server: { entry: "server" },
    }),
    viteReact(),
    nitro({
      defaultPreset: "cloudflare-module",
    }),
  ],
});

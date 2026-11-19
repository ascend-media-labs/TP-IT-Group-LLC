import { defineConfig, type Plugin } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { nitro } from "nitro/vite";

function apiMiddlewarePlugin(): Plugin {
  return {
    name: "api-middleware-plugin",
    configureServer(server) {
      server.middlewares.use(async (req: any, res: any, next: any) => {
        const url = new URL(req.url, `http://${req.headers.host || 'localhost:8080'}`);
        if (url.pathname.startsWith('/api/')) {
          let body = null;
          if (req.method === 'POST' || req.method === 'PUT' || req.method === 'DELETE') {
            const buffers = [];
            for await (const chunk of req) {
              buffers.push(chunk);
            }
            const data = Buffer.concat(buffers).toString();
            try {
              body = data ? JSON.parse(data) : {};
            } catch {
              body = {};
            }
          }
          try {
            const { handleApiRoute } = await import('./src/lib/api-handler.ts');
            const result = await handleApiRoute(url.pathname, req.method || 'GET', body);
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = result.status;
            res.end(JSON.stringify(result.data));
            return;
          } catch (err: any) {
            console.error('API Error:', err);
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 500;
            res.end(JSON.stringify({ success: false, error: err.message }));
            return;
          }
        }
        next();
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

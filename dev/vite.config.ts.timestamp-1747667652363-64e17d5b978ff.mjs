// dev/vite.config.ts
import { defineConfig } from "file:///Z:/2025/Projects/Libraries/solid-posthog/node_modules/vite/dist/node/index.js";
import path from "node:path";
import solidPlugin from "file:///Z:/2025/Projects/Libraries/solid-posthog/node_modules/vite-plugin-solid/dist/esm/index.mjs";
var __vite_injected_original_dirname = "Z:\\2025\\Projects\\Libraries\\solid-posthog\\dev";
var vite_config_default = defineConfig({
  resolve: {
    alias: {
      src: path.resolve(__vite_injected_original_dirname, "../src")
    }
  },
  plugins: [
    solidPlugin(),
    {
      name: "Reaplace env variables",
      transform(code, id) {
        if (id.includes("node_modules")) {
          return code;
        }
        return code.replace(/process\.env\.SSR/g, "false").replace(/process\.env\.DEV/g, "true").replace(/process\.env\.PROD/g, "false").replace(/process\.env\.NODE_ENV/g, '"development"').replace(/import\.meta\.env\.SSR/g, "false").replace(/import\.meta\.env\.DEV/g, "true").replace(/import\.meta\.env\.PROD/g, "false").replace(/import\.meta\.env\.NODE_ENV/g, '"development"');
      }
    }
  ],
  server: {
    port: 3e3
  },
  build: {
    target: "esnext"
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZGV2L3ZpdGUuY29uZmlnLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiWjpcXFxcMjAyNVxcXFxQcm9qZWN0c1xcXFxMaWJyYXJpZXNcXFxcc29saWQtcG9zdGhvZ1xcXFxkZXZcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIlo6XFxcXDIwMjVcXFxcUHJvamVjdHNcXFxcTGlicmFyaWVzXFxcXHNvbGlkLXBvc3Rob2dcXFxcZGV2XFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9aOi8yMDI1L1Byb2plY3RzL0xpYnJhcmllcy9zb2xpZC1wb3N0aG9nL2Rldi92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgcGF0aCBmcm9tICdub2RlOnBhdGgnXG5pbXBvcnQgc29saWRQbHVnaW4gZnJvbSAndml0ZS1wbHVnaW4tc29saWQnXG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgc3JjOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi4vc3JjJyksXG4gICAgfSxcbiAgfSxcbiAgcGx1Z2luczogW1xuICAgIHNvbGlkUGx1Z2luKCksXG4gICAge1xuICAgICAgbmFtZTogJ1JlYXBsYWNlIGVudiB2YXJpYWJsZXMnLFxuICAgICAgdHJhbnNmb3JtKGNvZGUsIGlkKSB7XG4gICAgICAgIGlmIChpZC5pbmNsdWRlcygnbm9kZV9tb2R1bGVzJykpIHtcbiAgICAgICAgICByZXR1cm4gY29kZVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb2RlXG4gICAgICAgICAgLnJlcGxhY2UoL3Byb2Nlc3NcXC5lbnZcXC5TU1IvZywgJ2ZhbHNlJylcbiAgICAgICAgICAucmVwbGFjZSgvcHJvY2Vzc1xcLmVudlxcLkRFVi9nLCAndHJ1ZScpXG4gICAgICAgICAgLnJlcGxhY2UoL3Byb2Nlc3NcXC5lbnZcXC5QUk9EL2csICdmYWxzZScpXG4gICAgICAgICAgLnJlcGxhY2UoL3Byb2Nlc3NcXC5lbnZcXC5OT0RFX0VOVi9nLCAnXCJkZXZlbG9wbWVudFwiJylcbiAgICAgICAgICAucmVwbGFjZSgvaW1wb3J0XFwubWV0YVxcLmVudlxcLlNTUi9nLCAnZmFsc2UnKVxuICAgICAgICAgIC5yZXBsYWNlKC9pbXBvcnRcXC5tZXRhXFwuZW52XFwuREVWL2csICd0cnVlJylcbiAgICAgICAgICAucmVwbGFjZSgvaW1wb3J0XFwubWV0YVxcLmVudlxcLlBST0QvZywgJ2ZhbHNlJylcbiAgICAgICAgICAucmVwbGFjZSgvaW1wb3J0XFwubWV0YVxcLmVudlxcLk5PREVfRU5WL2csICdcImRldmVsb3BtZW50XCInKVxuICAgICAgfSxcbiAgICB9LFxuICBdLFxuICBzZXJ2ZXI6IHtcbiAgICBwb3J0OiAzMDAwLFxuICB9LFxuICBidWlsZDoge1xuICAgIHRhcmdldDogJ2VzbmV4dCcsXG4gIH0sXG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFrVSxTQUFTLG9CQUFvQjtBQUMvVixPQUFPLFVBQVU7QUFDakIsT0FBTyxpQkFBaUI7QUFGeEIsSUFBTSxtQ0FBbUM7QUFJekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxLQUFLLFFBQVEsa0NBQVcsUUFBUTtBQUFBLElBQ3ZDO0FBQUEsRUFDRjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsWUFBWTtBQUFBLElBQ1o7QUFBQSxNQUNFLE1BQU07QUFBQSxNQUNOLFVBQVUsTUFBTSxJQUFJO0FBQ2xCLFlBQUksR0FBRyxTQUFTLGNBQWMsR0FBRztBQUMvQixpQkFBTztBQUFBLFFBQ1Q7QUFDQSxlQUFPLEtBQ0osUUFBUSxzQkFBc0IsT0FBTyxFQUNyQyxRQUFRLHNCQUFzQixNQUFNLEVBQ3BDLFFBQVEsdUJBQXVCLE9BQU8sRUFDdEMsUUFBUSwyQkFBMkIsZUFBZSxFQUNsRCxRQUFRLDJCQUEyQixPQUFPLEVBQzFDLFFBQVEsMkJBQTJCLE1BQU0sRUFDekMsUUFBUSw0QkFBNEIsT0FBTyxFQUMzQyxRQUFRLGdDQUFnQyxlQUFlO0FBQUEsTUFDNUQ7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLEVBQ1I7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLFFBQVE7QUFBQSxFQUNWO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K

import { defineConfig, splitVendorChunkPlugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import mkcert from "vite-plugin-mkcert";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), splitVendorChunkPlugin(), mkcert()],
	envPrefix: "REACT_APP_",
	server: {
		host: true,
		port: 5173,
		strictPort: true,
		https: true,
	},
	build: {
		outDir: "../API/wwwroot",
		emptyOutDir: true,
	},
});

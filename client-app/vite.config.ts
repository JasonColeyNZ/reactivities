import { defineConfig, splitVendorChunkPlugin } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), splitVendorChunkPlugin()],
	envPrefix: "REACT_APP_",
	server: {
		host: true,
		port: 5173,
		strictPort: true,
	},
	build: {
		outDir: "../API/wwwroot",
	},
});

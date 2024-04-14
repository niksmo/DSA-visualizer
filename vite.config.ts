import { defineConfig } from 'vite';
import 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
	plugins: [react()],
	server: {
		open: true,
		port: 3000
	},
	test: {
		environment: 'jsdom',
		setupFiles: './setup-tests.ts',
		css: false
	}
});

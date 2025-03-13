import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        outDir: 'dist',
    },
    server: {
        port: 4200,
        open: true,
    }
});

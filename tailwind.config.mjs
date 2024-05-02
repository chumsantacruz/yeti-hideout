/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        header: "var(--background-header)",
        dialog: "var(--background-dialog)",
        panel: "var(--background-panel)",
        tag: {
          default: "var(--background-tag)",
          selected: "var(--background-tag-selected)",
        },
        posts: "var(--background-posts)",
        arrow: "var(--arrow)",
      },
      gridTemplateColumns: {
        header: "2rem auto",
        "post-bottom": "max-content auto",
      },
      gridTemplateRows: {
        nav: "3.5rem auto",
        layout: "max-content 1fr max-content",
      },
      height: {
        120: "30rem",
      },
      rotate: {
        135: "135deg",
      },
    },
  },
  plugins: [],
};

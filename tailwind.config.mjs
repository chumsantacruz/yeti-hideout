/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
      gridTemplateColumns: {
        'header': '2rem auto',
      },
      gridTemplateRows: {
        'nav': '3.5rem auto',
        'layout': '1fr max-content'
      },
      height: {
        '120': '30rem'
      }
    },
	},
	plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
      gridTemplateColumns: {
        'header': '2rem auto',
        'post-bottom': 'max-content auto'
      },
      gridTemplateRows: {
        'nav': '3.5rem auto',
        'layout': 'max-content 1fr max-content'
      },
      height: {
        '120': '30rem'
      },
      rotate: {
        '135': '135deg'
      }
    },
	},
	plugins: [],
}

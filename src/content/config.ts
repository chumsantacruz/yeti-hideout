import {z, defineCollection} from 'astro:content'

const photoCollection = defineCollection({
  type: 'content',
  schema: z.object({
    img: z.string(),
    camera: z.string(),
    film: z.string()
  })
})

export const collections = {
  photos: photoCollection
}
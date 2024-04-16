import {z, defineCollection} from 'astro:content'

const photoCollection = defineCollection({
  type: 'content',
  schema: z.object({
    img: z.string(),
    camera: z.string(),
    film: z.string()
  })
})

const postCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    tag: z.array(z.string())
  })
})

export const collections = {
  photos: photoCollection,
  posts: postCollection
}
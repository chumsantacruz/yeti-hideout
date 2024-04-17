import { getCollection } from "astro:content";

export async function getAllPosts() {
  const allPosts = await getCollection("posts");
  return allPosts.sort((a, b) => {
    return a.data.pubDate < b.data.pubDate ? 1 : -1;
  });
}

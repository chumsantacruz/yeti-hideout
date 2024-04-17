import { getCollection } from "astro:content";

export async function getAllPhotos() {
  const allPhotos = await getCollection("photos");
  return allPhotos.sort(
    (a, b) =>
      Number(a.slug.replace("photo-", "")) -
      Number(b.slug.replace("photo-", ""))
  );
}

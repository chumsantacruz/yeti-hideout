export function sortPhotos(photos: {
  id: string;
  slug: string;
  body: string;
  collection: "photos";
  data: {
      img: string;
      camera: string;
      film: string;
  }}[]) {
  return photos.sort((a, b) => {
    return Number(a.slug.replace("photo-", "")) - Number(b.slug.replace("photo-", ""));
  })
}
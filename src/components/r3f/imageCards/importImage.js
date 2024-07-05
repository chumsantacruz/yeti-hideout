const photosGlob = import.meta.glob("/src/images/photos/*.jpg", {
  import: "default",
});
const photosMeta = [];
for (const photo in photosGlob) {
  const result = photosGlob[photo]();
  result.then((value) => {
    photosMeta.push(value);
    photosMeta.sort((a, b) => {
      const numA = parseInt(a.src.match(/photo-(\d+)\.jpg/)[1]);
      const numB = parseInt(b.src.match(/photo-(\d+)\.jpg/)[1]);
      return numA - numB;
    });
  });
}

export { photosMeta };

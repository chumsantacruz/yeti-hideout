import { useState, useEffect, Suspense } from "react";

const regex = /photo-\d+/;

const RandomPhotos = () => {
  const [photos, setPhotos] = useState<ImageMetadata[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const imageFile = import.meta.glob<{ default: ImageMetadata }>(
      "/src/images/photos/*",
    );

    const data = Object.keys(imageFile).map((key) => {
      return imageFile[key]().then((data) => data.default);
    });

    Promise.all(data).then((data) => {
      const shuffled = data.sort(() => 0.5 - Math.random());
      setPhotos(shuffled.slice(0, 9));
    });

    setLoading(false);
  }, []);

  return (
    <>
      {loading ? (
        <>
          {[...Array(9)].map((_, index) => (
            <div
              key={index}
              className="animate-pulse aspect-square bg-gray-300"
            />
          ))}
        </>
      ) : (
        <>
          {photos.map((photo) => {
            const href = photo.src.match(regex)?.[0] || "";
            return (
              <a
                href={`/photos/${href}/`}
                key={photo.src}
                className="aspect-square block"
              >
                <img
                  src={photo.src}
                  className="h-full object-cover"
                  width={photo.width}
                  height={photo.height}
                />
              </a>
            );
          })}
        </>
      )}
    </>
  );
};

export default RandomPhotos;

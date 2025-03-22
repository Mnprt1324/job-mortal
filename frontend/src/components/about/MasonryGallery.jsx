const MasonryGallery = ({ images }) => {
  const imgArray = [
    "https://res.cloudinary.com/df3pscsym/image/upload/v1742013072/efe505xoxt83oxmh18qx.jpg",
    "https://res.cloudinary.com/df3pscsym/image/upload/v1742013145/sipka4e4fnqjaufxogcc.jpg",
    "https://res.cloudinary.com/df3pscsym/image/upload/v1742013223/urn8umazkpxuzxez28p4.jpg",
    "https://res.cloudinary.com/df3pscsym/image/upload/v1742013311/zyyctoq74r0wlsjbsyhe.jpg",
    "https://res.cloudinary.com/df3pscsym/image/upload/v1742013434/ziaqe8goalkrbinkmffw.jpg",
    "https://res.cloudinary.com/df3pscsym/image/upload/v1742013397/fhpmtb0fwyltmgcodggl.jpg"
  ];
  return (
    <div className="columns-2 sm:columns-3 md:columns-4 gap-4 p-4">
      {imgArray.map((img, index) => (
        <div key={index} className="mb-4 overflow-hidden rounded-xl shadow-md">
          <img
            src={img}
            alt={`Gallery image ${index + 1}`}
            className="w-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      ))}
    </div>
  );
};

export default MasonryGallery;

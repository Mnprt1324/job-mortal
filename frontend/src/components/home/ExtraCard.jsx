import { Card } from "./Card";

export const ExtraCard = () => {
  const cardData = [
    {
      imgUrl:
        "https://res.cloudinary.com/df3pscsym/image/upload/v1741688134/q8i50e8jeo7qpbvdjgnn.png",
      title: "Free Resume Assessments",
    },
    {
      imgUrl:
        "https://res.cloudinary.com/df3pscsym/image/upload/v1741688308/y0nbuimuipd5t0nwjlzh.png",
      title: "Job Fit Scoring",
    },
    {
      imgUrl:
        "https://res.cloudinary.com/df3pscsym/image/upload/v1741688614/ic8b6npifg7kdcuoqe2m.png",
      title: "Help Every Step of the Way",
    },
  ];

  return (
    <>
      <div className="flex flex-col justify-center items-center mb-6 text-center">
        <h4 className="text-2xl md:text-3xl font-medium">How It Works?</h4>
        <p className="text-gray-600">Job for anyone, anywhere</p>
      </div>

      <div className="grid px-3 md:grid-cols-3 place-items-center w-full pb-8 gap-6">
        {cardData.map((curr, index) => (
          <Card title={curr.title} key={index} imgUrl={curr.imgUrl} />
        ))}
      </div>
    </>
  );
};

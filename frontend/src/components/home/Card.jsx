export const Card = ({title,imgUrl}) => {
  return (
    <div className="flex flex-col max-w-96 items-center hover:shadow-2xl cursor-pointer min-w-70 max-h-96 py-16 px-6 gap-2.5">
      <div >
        <img src={imgUrl} alt="" />
      </div>
      <div className="flex flex-col items-center">
        <p className="font-medium text-xl">{title}</p>
        <div className="text-center">
          Employers on average spend 31 seconds scanning resumes to identify
          potential matches.
        </div>
      </div>
    </div>
  );
};

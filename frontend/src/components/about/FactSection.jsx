export const FactSection = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row justify-center gap-18  py-9 "> 
        <div >
          <h3 className="font-medium text-4xl text-center"  >4M</h3>
          <p className="text-center mt-2">4 million daily active users</p>
        </div>
        <div >
          <h3 className="font-medium text-4xl text-center" >12k</h3>
          <p className="text-center mt-2.5">Over 12k open job positions</p>
        </div>
        <div>
          <h3  className="font-medium text-4xl text-center" >20M</h3>
          <p className="text-center mt-2.5">Over 20 million stories shared
          </p>
        </div>
      </div>
    </>
  );
};

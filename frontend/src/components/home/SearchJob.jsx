import { useNavigate } from "react-router-dom";

export const Searchjob=()=>{
    const navigate=useNavigate();
    const handleOnClick=()=>{
      navigate("/findJob")
    }

    return<> <div className="bg-blue-100 h-[250px] flex justify-center items-center ">
    <div className="flex flex-col md:flex-row items-center justify-between md:w-[95%]">
<div className="flex flex-col justify-center items-center gap-3 ">
<h4  className="text-3xl font-medium ">Let employers find you</h4>
<p className="text-center">Advertise your jobs to millions of monthly users and search 15.8 million CVs in our database.</p>
</div>
<button className="p-2 bg-blue-600 text-white cursor-pointer mt-3" onClick={handleOnClick} >Search Job</button>
</div>
</div>
</>
}
import { useNavigate } from "react-router-dom"

export const ExtraSectionAbout =()=>{
    const navigate=useNavigate();
    const handleButtonClick=()=>{
        navigate("/findJob")
    }
return <div className="bg-blue-100  flex flex-col justify-center items-center py-20 px-5  gap-3.5 "> 
    <h4 className="text-2xl font-medium">Your Dream Jobs Are Waiting</h4>
    <p>Over 1 million interactions, 50,000 success stories Make yours now.</p>
    <div>
    <button className="p-2 bg-blue-600 text-white cursor-pointer mt-3" onClick={handleButtonClick} >Search Job</button>
    </div>
</div>
}
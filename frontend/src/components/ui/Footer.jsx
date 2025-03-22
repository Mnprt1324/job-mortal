import { FaFacebookSquare, FaInfinity, FaInstagramSquare, FaLinkedin } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="bg-slate-100  h-auto md:h-[17rem] w-100vh flex justify-center items-center flex-row">
      <div className="w-[90%] h-[100%] flex items-center  flex-col md:flex-row">
        <div className="w-3xs flex items-center flex-col justify-center">
            <div className="flex items-start m-2.5">
                 <FaInfinity className="text-blue-500 text-3xl cursor-pointer" /><p className="text-bold font-bold ml-1 text-2xl" > ZipJob</p>
            </div>
            <div className="text-sm text-slate-500 mt-4">
            ZipJob is a powerful job portal web app designed to bridge the gap between job seekers and recruiters. It offers an intuitive platform for discovering job opportunities, applying seamlessly, and managing applications efficiently.
            </div>
            <div className="flex text-blue-600 text-3xl justify-center items-center gap-10 mt-4 ">
            <FaInstagramSquare />
            <FaFacebookSquare />
            <FaLinkedin />
            </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4">
         <div className="w-48 p-1.5 flex justify-center items-center flex-col" >
           <div className="font-bold mb-3.5">Resources</div>
            <ul className="text-slate-500 text">
                <li className="hover:ml-1">About us</li>
                <li className="hover:ml-1">Our Team</li>
                <li className="hover:ml-1">Products</li>
                <li className="hover:ml-1">Contact</li>
            </ul>
         </div>
         <div className="w-48 p-1.5 flex justify-center items-center flex-col" >
           <div className="font-bold mb-3.5">Community</div>
            <ul className="text-slate-500 cursor-pointer">
                <li className="hover:ml-1">Feature</li>
                <li className="hover:ml-1">Pricing</li>
                <li className="hover:ml-1">Credit</li>
                <li className="hover:ml-1">FAQ</li>
            </ul>
         </div>
         <div className="w-48 p-1.5 flex justify-center items-center flex-col" >
           <div className="font-bold mb-3.5">Quick links</div>
            <ul className="text-slate-500 cursor-pointer">
                <li className="hover:ml-1">Feature</li>
                <li className="hover:ml-1">Pricing</li>
                <li className="hover:ml-1">Credit</li>
                <li className="hover:ml-1">FAQ</li>
            </ul>
         </div>
         <div className="w-48 p-1.5 flex justify-center items-center flex-col " >
           <div className="font-bold mb-3.5">More</div>
            <ul className="text-slate-500">
                <li className="hover:ml-1">Privacy</li>
                <li className="hover:ml-1">Term</li>
                <li className="hover:ml-1">Help</li>
                <li className="hover:ml-1">FAQ</li>
            </ul>
         </div>
        </div>
        <div className="w-auto h-[100%] flex justify-center items-center mb-2.5">
           <div className="flex">
           <FaInfinity className="text-blue-500 text-3xl cursor-pointer" /><p className="text-bold font-bold ml-1 text-2xl" > ZipJob</p>
           </div>
        </div>
      </div>
    </footer>
  );
};

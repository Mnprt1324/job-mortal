import { ExtraCard } from "../components/home/ExtraCard";
import { FeatureJob } from "../components/home/FeatureJob";
import { FilterJobSection } from "../components/home/FilterJobSection";
import { FrequentlyAsked } from "../components/home/FrequentlyAsked";
import { ImgSection } from "../components/home/ImgSection";
import { Searchjob } from "../components/home/SearchJob";
import { Outlet } from "react-router-dom";

export const Home = () => {
  return (
    <section className="h-auto">
      {/* Hero Image Section */}
      <ImgSection />

      {/* Extra Card Section */}
      <div>
      <FilterJobSection />
        <Outlet />
      </div>
      <ExtraCard />


      {/* Featured Jobs Section */}
      <FeatureJob />


        {/* FrequentlyAsked */}
          <FrequentlyAsked/>

      {/* Job Search Section */}
      <Searchjob />

      {/* Filter Job Section */}

      {/* Dynamic Job Listings (Popular, New, Old) */}
     
    </section>
  );
};

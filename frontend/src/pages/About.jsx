import AboutZipJob from "../components/about/AboutDes"
import { ExtraSectionAbout } from "../components/about/ExtraSectionAbout"
import { FactSection } from "../components/about/FactSection"
import MasonryGallery from "../components/about/MasonryGallery"
import { ExtraCard } from "../components/home/ExtraCard"


export const About=()=>{

    return <section>
       <MasonryGallery/>
        <FactSection/>
        <AboutZipJob/>
        <ExtraCard/>
        <ExtraSectionAbout/>
    </section>
}
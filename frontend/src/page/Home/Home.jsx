import Articles from "../../components/Articles/Articles";
import Header from "../../components/Header/Header";
import Hero from "../../components/Hero/Hero";
import Aboutme from './../../components/Aboutme/Aboutme';
import SkillsExperience from './../../components/SkillsExperience/SkillsExperience';
import Contacts from './../../components/Contacts/Contacts';


const Home = () => {
  return (
    <>
      <Header />
      <Hero />
      <Aboutme />
      <SkillsExperience />
      <Articles />
      <Contacts />
    </>
  )
}

export default Home;
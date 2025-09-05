import Articles from "../../components/Articles/Articles";
import Header from "../../components/Header/Header";
import Hero from "../../components/Hero/Hero";
import Aboutme from './../../components/Aboutme/Aboutme';
import SkillsExperience from './../../components/SkillsExperience/SkillsExperience';
import Contacts from './../../components/Contacts/Contacts';
import Education from './../../components/Education/Education';
import Project from "../../components/Projects/Projects";
import Books from '../../components/Books/Books';


const Home = () => {
  return (
    <>
      <Header />
      <Hero />
      <Aboutme />
      <Education />
      <SkillsExperience />
      <Project />
      <Articles />
      <Books />
      <Contacts />
    </>
  )
}

export default Home;
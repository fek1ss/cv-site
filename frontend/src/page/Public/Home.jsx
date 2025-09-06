import Articles from '../../components/features/Articles/Articles';
import Header from '../../components/layout/Header/Header';
import Hero from '../../components/features/Hero/Hero';
import Aboutme from '../../components/features/Aboutme/Aboutme';
import Project from '../../components/Projects/Projects';
import Books from '../../components/features/Books/Books';
import SkillsExperience from '../../components/features/SkillsExperience/SkillsExperience';
import Education from '../../components/features/Education/Education';
import Contacts from '../../components/layout/Contacts/Contacts';

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
  );
};

export default Home;

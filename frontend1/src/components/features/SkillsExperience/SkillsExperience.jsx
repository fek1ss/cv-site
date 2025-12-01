import styles from './styles.module.scss';
import Experience from './Experience/Experience';
import Skills from './Skills/Skills';


const SkillsExperience = () => {
  return (
    <section className={styles.container} id="skills">
      <Skills />
      <Experience />
    </section>
  );
};

export default SkillsExperience;

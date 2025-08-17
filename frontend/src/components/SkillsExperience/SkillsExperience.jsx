import styles from './styles.module.scss';
import Skills from './../Skills/Skills';
import Experience from './../Experience/Experience';

const SkillsExperience = () => {
  return (
    <section className={styles.container}>
      <Skills />
      <Experience />
    </section>
  )
}

export default SkillsExperience;
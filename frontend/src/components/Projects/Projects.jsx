import { useState } from 'react';
import styles from './styles.module.scss';
import ProjectCarousel from './../ProjectCarousel/ProjectCaroulsel';
import ProjectList from './../ProjectList/ProjectList';
import { motion } from 'framer-motion';


const Project = () => {
  const [carousel, setCarousel] = useState(true);

  return (
    <motion.section
      className={styles.project}
      initial={{ x: 200, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <h1>Projects</h1>
      <div className={styles.project__top}>
        <button
          className={styles.project__btn}
          onClick={() => setCarousel(prev => !prev)}
        >
          {carousel ? 'show as a carousel' : 'show as a list'}
        </button>
      </div>
      {carousel ? (
        <motion.div
          key="list"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        >
          <ProjectList />
        </motion.div>
      ) : (
        <motion.div
          key="carousel"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        >
          <ProjectCarousel />
        </motion.div>
      )}
    </motion.section>
  );
};

export default Project;

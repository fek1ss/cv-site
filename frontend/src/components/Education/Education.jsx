import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { getEducations } from '../../api/educationApi';
import { motion } from 'framer-motion';

const Education = () => {
  const [educations, setEducations] = useState([]);
  const degreeIcons = {
    'Bachelor’s': '/assets/GraduationСapB.png',
    'Master’s': '/assets/GraduationCapM.png',
    PhD: '/assets/GraduationCapP.png',
  };

  useEffect(() => {
    getEducations().then(data => setEducations(data));
  }, []);

  return (
    <motion.section
      id="education"
      className={styles.education}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <h1>Education:</h1>
      {/* New container for the timeline effect */}
      <div className={styles.education__items}>
        {educations.map(edu => (
          <div className={styles.education__item}>
            <img
              src={degreeIcons[edu.degreeShort]}
              alt="degree icon"
              className={styles.education__degreeIcon}
            />
            <div className={styles.education__data}>
              <h1 className={styles.education__degreeShort}>
                {edu.degreeShort}
              </h1>
              <p className={styles.education__degreeFull}>
                {edu.degreeFull}
              </p>
              <p className={styles.education__university}>
                {edu.university}
              </p>
              <p className={styles.education__date}>
                {edu.yearStart} - {edu.yearEnd}
              </p>
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
};

export default Education;

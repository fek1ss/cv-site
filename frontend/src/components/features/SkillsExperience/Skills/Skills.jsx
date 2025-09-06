import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { motion } from 'framer-motion';
import { getSkills } from '../../../../api/skillsApi';


const Skills = () => {
  const [skills, setSkills] = useState([]);

  useEffect(()=> {
    try{
      getSkills()
      .then(data => {
        setSkills(data)
      })
    } catch(err) {
      console.log(err)
    }
  })
  return (
    <motion.div className={styles.skills}
        initial={{ x: -150, opacity: 0 }}        
        whileInView={{ x: 0, opacity: 1 }}       
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.2 }}
      >
          
      <h1 className={styles.skills__title}>Skills</h1>
      <div className={styles.skills__items}>
        {skills.map(skill => (
          <div className={styles.skills__item} key={skill.id}>
            <div className={styles.skills__icon} key={skill.id}>
              <img src={skill.iconUrl} width={90} alt="icon"  />
            </div>
            <p>{skill.name}</p>
          </div>  
        ))}
      </div>
    </motion.div>
  )
}

export default Skills;
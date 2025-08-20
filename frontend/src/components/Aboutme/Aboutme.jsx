import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { getAbout } from '../../api/aboutApi';
import { motion } from 'framer-motion';

const Aboutme = () => {
  const [text, setText] = useState("");

  useEffect(()=> {
    try {
      getAbout()
      .then(data => setText(data[0].text))
    } catch(err) {
      console.log("Server error", err)
    }
  },[])
  return (
    <motion.section 
      className={styles.about} 
      id='about'
      initial={{ opacity: 0 }}                 
      whileInView={{ opacity: 1 }}             
      transition={{ duration: 1 }}            
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className={styles.about__info}>
        <h1 className={styles.about__title}>About me</h1>
        <p className={styles.about__text}>
          {text}
        </p>
      </div>
    </motion.section>
  )
}

export default Aboutme;
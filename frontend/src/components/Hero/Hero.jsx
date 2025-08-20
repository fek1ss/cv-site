import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { getHero } from '../../api/heroApi';
import { motion } from 'framer-motion';


const Hero = () => {
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  useEffect(()=> {
    try {
      getHero()
      .then(data => {
        setName(data[0].name)
        setImg(data[0].photoUrl)
        setText(data[0].summary)
      })
    }catch(err) {
      console.log(err)
    }
  },[])

  return (
    <section className={styles.hero}>
      <div className={styles.hero__wrapper}>
        <motion.img 
        alt="avatar img"
        initial={{ x: -200, opacity: 0 }}       
        animate={{ x: 0, opacity: 1 }}         
        transition={{ duration: 1, ease: "easeOut" }}
        src={img} 
        className={styles.hero__avatar}  />
        
        <motion.div 
        initial={{ x: 200, opacity: 0 }}       
        animate={{ x: 0, opacity: 1 }}         
        transition={{ duration: 1, ease: "easeOut" }}
        className={styles.hero__intro}
        >
          <h1 className={styles.hero__name}>{name}</h1>
          <p className={styles.hero__text}>
            {text}
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero;
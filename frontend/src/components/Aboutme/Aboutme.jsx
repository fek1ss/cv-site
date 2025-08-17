import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { getAbout } from '../../api/aboutApi';

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
    <section className={styles.about} id='about'>
      <div className={styles.about__info}>
        <h1 className={styles.about__title}>About me</h1>
        <p className={styles.about__text}>
          {text}
        </p>
      </div>
    </section>
  )
}

export default Aboutme;
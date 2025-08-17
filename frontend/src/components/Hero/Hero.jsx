import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { getHero } from '../../api/heroApi';

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
      <img src={img} alt="avatar img" className={styles.hero__avatar} />
      <div className={styles.hero__intro}>
        <h1 className={styles.hero__name}>{name}</h1>
        <p className={styles.hero__text}>
          {text}
        </p>
      </div>
    </section>
  )
}

export default Hero;
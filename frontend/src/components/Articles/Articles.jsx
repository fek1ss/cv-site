import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { getArticles } from '../../api/articles';

const Articles = () => {
  const [articles, setArticles] = useState([]);

  useEffect(()=> {
    getArticles()
      .then(data => setArticles(data))
  },[])

  return (
    <div className={styles.articles} id='articles'>
      <h1 style={{fontWeight:400}}>Articles</h1>
      {
        articles.map(art => (
          <div className={styles.articles__art} key={art.id}>
            <a href={art.link}  target="_blank">
              <h1 className={styles.articles__title}>
                {art.title} 
              </h1>
            </a>
          </div>
        ))
      }
    </div>
  )
}

export default Articles;
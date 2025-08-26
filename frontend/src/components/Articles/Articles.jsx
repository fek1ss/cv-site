import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { getArticles } from '../../api/articles';
import { motion } from 'framer-motion';

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [visibleCount, setVisibleCount] = useState(5);
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    getArticles().then(data => setArticles(data));
  }, []);

  const showMore = () => {
    setVisibleCount(prev => prev + 5);
    setFlag(prev => !prev);
  };

  const showLess = () => {
    setVisibleCount(prev => prev - 5);
    setFlag(prev => !prev);
  };

  return (
    <motion.div
      className={styles.articles}
      id="articles"
      initial={{ y: 200, opacity: 0 }} // снизу
      whileInView={{ y: 0, opacity: 1 }} // встает на место
      transition={{ duration: 0.8, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className={styles.articles__wrapper}>
        <h1 style={{ fontWeight: 400 }}>Articles</h1>
        {articles.slice(0, visibleCount).map(art => (
          <div className={styles.articles__art} key={art.id}>
            <a href={art.link} target="_blank">
              <h1 className={styles.articles__title}>{art.title}</h1>
            </a>
          </div>
        ))}
        {visibleCount < articles.length && (
          <p onClick={showMore} className={styles.articles__more}>
            show more
          </p>
        )}

        {flag && (
          <p onClick={showLess} className={styles.articles__more}>
            hide
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default Articles;

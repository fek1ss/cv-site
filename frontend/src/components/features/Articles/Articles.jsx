import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import {
  deleteArticle,
  getArticles,
  updateArticle,
} from '../../../api/articles';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { me } from '../../../api/userApi';
import { MdArrowBack } from 'react-icons/md';
import NewArticle from './NewArticle';


const Articles = ({ isAdmin = false }) => {
  const [articles, setArticles] = useState([]);
  const [visibleCount, setVisibleCount] = useState(5);
  const [flag, setFlag] = useState(false);
  const [message, setMessage] = useState({});
  const navigate = useNavigate();
  const [status, setStatus] = useState(false);

  useEffect(() => {
    if (isAdmin) {
      me()
        .then(() => setStatus(true))
        .catch(() => navigate('/login'));
    }

    loadArts();
  }, [navigate, isAdmin]);

  const loadArts = async () => {
    await getArticles().then(data => setArticles(data));
  };

  const showMore = () => {
    setVisibleCount(prev => prev + 5);
    setFlag(prev => !prev);
  };

  const showLess = () => {
    setVisibleCount(prev => prev - 5);
    setFlag(prev => !prev);
  };

  const handleUpdate = async (id, title, link) => {
    try {
      const data = await updateArticle(id, title, link);
      if (data) {
        setMessage(prev => ({
          ...prev,
          [id]: { text: 'Article updated', error: false },
        }));
      }
      setTimeout(() => {
        setMessage(prev => ({
          ...prev,
          [id]: { text: '', error: false },
        }));
      }, 1500);
    } catch (err) {
      console.log(err);
      setMessage(prev => ({
        ...prev,
        [id]: { text: 'Error updateding article', error: true },
      }));
    }
  };

  const handleDelete = async id => {
    try {
      const data = await deleteArticle(id);
      if (data.status === 200) {
        loadArts();
        setMessage(prev => ({
          ...prev,
          [id]: {
            text: data.message || 'successfully deleted',
            error: false,
          },
        }));

        setTimeout(() => {
          setMessage(prev => ({
            ...prev,
            [id]: { text: '', error: false },
          }));
        }, 1500);
      }
    } catch (err) {
      console.log(err);
      setMessage(prev => ({
        ...prev,
        [id]: { text: 'Error delete', error: true },
      }));
    }
  };

  if (isAdmin && !status) return <p>loading...</p>;

  return (
    <>
      {isAdmin ? (
        <div className="adm">
          <MdArrowBack
            className="back"
            onClick={() => navigate(-1)}
          />

          <div className={styles.articles_adm}>
            <div className={styles.articles__wrapper}>
              <h1 style={{ fontWeight: 400 }}>Articles</h1>
              {/* Создание новой статьи */}
              <NewArticle onLoad={() => loadArts()} />

              {articles.map((art, idx) => (
                <div
                  className={styles.articles_adm__artItem}
                  key={art.id}
                >
                  <div className={styles.articles_adm__fields}>
                    <label>
                      Title:
                      <input
                        className={styles.articles_adm__inp}
                        value={art.title}
                        onChange={e => {
                          const newArticles = [...articles];
                          newArticles[idx].title = e.target.value;
                          setArticles(newArticles);
                        }}
                      />
                    </label>
                    <label>
                      Link:
                      <input
                        className={styles.articles_adm__inp}
                        type="text"
                        value={art.link}
                        onChange={e => {
                          const newArticles = [...articles];
                          newArticles[idx].link = e.target.value;
                          setArticles(newArticles);
                        }}
                      />
                    </label>
                    {message[art.id] && (
                      <p
                        className={
                          message[art.id].error
                            ? 'error-message'
                            : 'success-message'
                        }
                      >
                        {message[art.id].text}
                      </p>
                    )}
                  </div>

                  <div className={styles.articles_adm__actions}>
                    <button
                      className="save-btn"
                      onClick={() =>
                        handleUpdate(art.id, art.title, art.link)
                      }
                    >
                      Update
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(art.id)}
                    >
                      delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
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
                <a href={art.articles__link} target="_blank">
                  <h1 className={styles.articles__title}>
                    {art.title}
                  </h1>
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
      )}
    </>
  );
};

export default Articles;

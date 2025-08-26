import { useEffect, useState } from 'react';
import styles from '../../components/Articles/styles.module.scss';
import {
  deleteArticle,
  getArticles,
  updateArticle,
} from '../../api/articles';
import { useNavigate } from 'react-router-dom';
import { MdArrowBack } from 'react-icons/md';
import NewArticle from './../../components/NewArticle/NewArticle';
import { me } from '../../api/userApi';

const ArticlesAdmin = () => {
  const [articles, setArticles] = useState([]);
  const [message, setMessage] = useState({});
  const navigate = useNavigate();
  const [status, setStatus] = useState(false);

  useEffect(() => {
    me()
      .then(() => setStatus(true))
      .catch(() => navigate('/login'));

    loadArts();
  }, [navigate]);

  const loadArts = async () => {
    await getArticles().then(data => setArticles(data));
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

  if (!status) return <p>loading...</p>

  return (
    <div className="adm">
      <MdArrowBack className="back" onClick={() => navigate(-1)} />

      <div className={styles.articles_adm}>
        <div className={styles.articles__wrapper}>
          <h1 style={{ fontWeight: 400 }}>Articles</h1>
          {/* Создание новой статьи */}
          <NewArticle onLoad={()=> loadArts()} />

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
  );
};

export default ArticlesAdmin;

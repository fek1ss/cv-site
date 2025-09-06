import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { useNavigate } from 'react-router-dom';
import { MdArrowBack } from 'react-icons/md';
import { motion } from 'framer-motion';
import { useMessage } from '../../../hooks/useMessage';
import { me } from '../../../api/userApi';
import { getHero, updateHero } from '../../../api/heroApi';

const Hero = ({ isAdmin = false }) => {
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [photo, setPhoto] = useState(null);
  const [img, setImg] = useState(null);
  const { message, showMessage } = useMessage();
  const navigate = useNavigate();
  const [status, setStatus] = useState(false);

  const handleFileChange = e => {
    setPhoto(e.target.files[0]);
  };

  useEffect(() => {
    if (isAdmin) {
      me()
        .then(() => setStatus(true))
        .catch(() => navigate('/login'));
    }

    getHero().then(data => {
      setName(data[0].name);
      setText(data[0].summary);
      setImg(data[0].photoUrl);
    });
  }, [navigate]);

  const handleUpdate = async e => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('summary', text);
      formData.append('photo', photo);
      const data = await updateHero(formData);
      if (data.message) {
        showMessage(data.message, false);
      }
    } catch (err) {
      showMessage(`something error: ${err}`, true);
    }
  };

  if (isAdmin && !status) return <p>loading...</p>;

  return (
    <>
      {isAdmin ? (
        // for Admin
        <div>
          <MdArrowBack
            className="back"
            onClick={() => navigate(-1)}
          />
          <form className={styles.hero_adm} onSubmit={handleUpdate}>
            <div className={styles.hero__wrapper}>
              <input
                type="file"
                className={styles.hero__photo}
                accept="image/*"
                onChange={handleFileChange}
              />
              <div className={styles.hero__intro_adm}>
                <input
                  type="text"
                  className="input"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
                <textarea
                  className="textarea"
                  value={text}
                  onChange={e => setText(e.target.value)}
                ></textarea>
                <div className={styles.hero_adm__actives}>
                  <button type="submit" className="save-btn">
                    Save
                  </button>
                  
                  {message && (
                    <p
                      className={
                        message.error
                          ? 'error-message'
                          : 'success-message'
                      }
                    >
                      {message?.text}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>
      ) : (
        // for Home
        <section className={styles.hero}>
          <div className={styles.hero__wrapper}>
            <motion.img
              alt="avatar img"
              initial={{ x: -200, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              src={img}
              className={styles.hero__avatar}
            />

            <motion.div
              initial={{ x: 200, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className={styles.hero__intro}
            >
              <h1 className={styles.hero__name}>{name}</h1>
              <p className={styles.hero__text}>{text}</p>
            </motion.div>
          </div>
        </section>
      )}
    </>
  );
};

export default Hero;

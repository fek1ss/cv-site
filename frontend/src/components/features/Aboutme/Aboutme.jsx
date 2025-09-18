  import { useEffect, useState } from 'react';
  import styles from './styles.module.scss';
  import { getAbout, updateAbout } from '../../../api/aboutApi';
  import { motion } from 'framer-motion';
  import { useNavigate } from 'react-router-dom';
  import { useMessage } from '../../../hooks/useMessage';
  import { me } from '../../../api/userApi';
  import { MdArrowBack } from 'react-icons/md';


  const Aboutme = ({ isAdmin = false }) => {
    const [text, setText] = useState('');
    const { message, showMessage } = useMessage();
    const navigate = useNavigate();
    const [status, setStatus] = useState(false);

    useEffect(() => {
      if (isAdmin) {
        me()
          .then(() => setStatus(true))
          .catch(() => navigate('/login'));
      }

      getAbout()
        .then(data => {
          setText(data[0].text);
        })
    }, [isAdmin, navigate]);


    const handleUpdate = async e => {
      e.preventDefault();

      try {
        const data = await updateAbout(text);
        if (data.message === 'About updated') {
          showMessage(data.message, false);
        }
      } catch (err) {
        showMessage('Error during the update', true);
      }
    };

    if (isAdmin && !status) return <p>loading...</p>;

    return (
      <>
        {isAdmin ? (
          <div className={styles.about__adminAbout}>
            <MdArrowBack
              className="back"
              onClick={() => navigate(-1)}
            />
            <form onSubmit={handleUpdate} className={styles.about}>
              <div className={styles.about__info}>
                <div className={styles.about__adm_title}>
                  <h1 className={styles.about__title}>About me</h1>
                </div>
                <textarea
                  name='about'
                  className="textarea"
                  value={text}
                  onChange={e => setText(e.target.value)}
                ></textarea>

                <div className={styles.about__actions}>
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
            </form>
          </div>
        ) : (
          <motion.section
            className={styles.about}
            id="about"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className={styles.about__info}>
              <h1 className={styles.about__title}>About me</h1>
              <p className={styles.about__text}>{text}</p>
            </div>
          </motion.section>
        )}
      </>
    );
  };

  export default Aboutme;

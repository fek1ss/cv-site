import { useEffect, useState } from 'react';
import { me } from '../../api/userApi';
import { useNavigate } from 'react-router-dom';
import styles from '../../components/Aboutme/styles.module.scss';
import { getAbout, updateAbout } from '../../api/aboutApi';
import { MdArrowBack } from 'react-icons/md';
import { useMessage } from '../../hooks/useMessage';

const AboutAdmin = () => {
  const [text, setText] = useState('');
  const { message, showMessage } = useMessage();
  const navigate = useNavigate();
  const [status, setStatus] = useState(false);

  useEffect(() => {
    me()
      .then(() => setStatus(true))
      .catch(() => navigate('/login'));

    getAbout()
      .then(data => {
        setText(data[0].text);
      })
      .catch(data => showMessage(data.message, true));
  }, [navigate, showMessage]);

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

  if (!status) return <p>loading...</p>;

  return (
    <div className={styles.about__adminAbout}>
      <MdArrowBack className="back" onClick={() => navigate(-1)} />
      <form onSubmit={handleUpdate} className={styles.about}>
        <div className={styles.about__info}>
          <div className={styles.about__adm_title}>
            <h1 className={styles.about__title}>About me</h1>
          </div>
          <textarea
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
                  message.error ? 'error-message' : 'success-message'
                }
              >
                {message?.text}
              </p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default AboutAdmin;

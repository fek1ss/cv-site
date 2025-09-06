import { useEffect, useState } from 'react';
import styles from '../../components/features/Hero/styles.module.scss';
import { getHero, updateHero } from '../../api/heroApi';
import { useNavigate } from 'react-router-dom';
import { me } from '../../api/userApi';
import { MdArrowBack } from 'react-icons/md';
import { useMessage } from '../../hooks/useMessage';

const HeroAdmin = () => {
  const [name, setName] = useState('');
  const [summary, setSummary] = useState('');
  const [photo, setPhoto] = useState(null);
  const { message, showMessage } = useMessage();
  const navigate = useNavigate();
  const [status, setStatus] = useState(false);

  const handleFileChange = e => {
    setPhoto(e.target.files[0]);
  };

  useEffect(() => {
    me()
      .then(() => setStatus(true))
      .catch(() => navigate('/login'));

    getHero().then(data => {
      setName(data[0].name);
      setSummary(data[0].summary);
    });
  }, []);

  const handleUpdate = async e => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('summary', summary);
      formData.append('photo', photo);
      const data = await updateHero(formData);
      if (data.message) {
        showMessage(data.message, false);
      }
    } catch (err) {
      showMessage(`something error: ${err}`, true);
    }
  };

  if (!status) return <p>loading...</p>;

  return (
    <>
      <MdArrowBack className="back" onClick={() => navigate(-1)} />
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
              value={summary}
              onChange={e => setSummary(e.target.value)}
            ></textarea>
          </div>
        </div>
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
      </form>
    </>
  );
};

export default HeroAdmin;

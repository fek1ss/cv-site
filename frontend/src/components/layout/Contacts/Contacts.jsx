import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import {
  deleteContact,
  getContacts,
  updateContact,
} from '../../../api/contactApi';
import { me } from '../../../api/userApi';
import { useNavigate } from 'react-router-dom';
import { MdArrowBack } from 'react-icons/md';
import NewContact from './NewContact';
import { useMessage } from '../../../hooks/useMessage';

const Contacts = ({ isAdmin = false }) => {
  const [status, setStatus] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [icon, setIcon] = useState(null);
  const navigate = useNavigate();
  const [message, setMessage] = useState({});

  useEffect(() => {
    if (isAdmin) {
      me()
        .then(() => setStatus(true))
        .catch(() => navigate('/login'));
    }

    loadCont();
  }, [navigate, isAdmin]);

  const loadCont = async () => {
    await getContacts().then(data => {
      setContacts(data);
    });
  };

  const handleUpdate = async (label, link, id) => {
    try {
      const data = await updateContact(label, link, icon, id);
      if (data.message === 'Contact updated') {
        loadCont();
        setMessage(prev => ({
          ...prev,
          [id]: { text: 'Updated success', error: false },
        }));
        setTimeout(() => {
          setMessage(prev => ({ ...prev, [id]: null }));
        }, 1500);
      }
    } catch (err) {
      setMessage(prev => ({
        ...prev,
        [id]: { text: 'Error updating', error: true },
      }));
    }
  };

  const handleDelete = async id => {
    try {
      const data = await deleteContact(id);
      if (data.status === 200) {
        loadCont();
        setMessage(prev => ({
          ...prev,
          [id]: { text: 'Updated success', error: false },
        }));
        setTimeout(() => {
          setMessage(prev => ({ ...prev, [data.id]: null }));
        }, 1500);
      }
    } catch (err) {
      setMessage(prev => ({
        ...prev,
        [id]: { text: 'Error updating', error: true },
      }));
    }
  };

  if (isAdmin && !status) return <p>...loading</p>;

  return (
    <>
      {isAdmin ? (
        <div className="adm">
          <div className={styles.contacts_adm} id="contacts">
            {/* back to admin  */}
            <MdArrowBack
              className="back"
              onClick={() => navigate(-1)}
            />

            <div className={styles.contacts_adm__wrapper}>
              <h1 className={styles.contacts__title}>Contacts</h1>

              {/* создание нового контакта  */}
              <NewContact onLoad={() => loadCont()} />

              {contacts.map((cont, idx) => (
                <div
                  key={cont.id}
                  className={styles.contacts_adm__itemAdm}
                >
                  <div className={styles.contacts_adm__fields}>
                    <img src={cont.iconUrl} alt="icon social media" />
                    <input
                      className={styles.conItem__inp_icon}
                      type="file"
                      onChange={e => setIcon(e.target.files[0])}
                    />
                    <label>
                      Label:
                      <input
                        className={styles.contacts_adm__inp}
                        id="label"
                        type="text"
                        value={cont.label}
                        onChange={e => {
                          const newContacts = [...contacts];
                          newContacts[idx].label = e.target.value;
                          setContacts(newContacts);
                        }}
                      />
                    </label>

                    <label htmlFor="link">
                      Link:
                      <input
                        className={styles.contacts_adm__inp}
                        type="text"
                        id="link"
                        value={cont.link}
                        onChange={e => {
                          const newContacts = [...contacts];
                          newContacts[idx].link = e.target.value;
                          setContacts(newContacts);
                        }}
                      />
                    </label>
                    {message[cont.id] && (
                      <p
                        className={
                          message[cont.id].error
                            ? 'error-message'
                            : 'success-message'
                        }
                      >
                        {message[cont.id].text}
                      </p>
                    )}
                  </div>
                  <div className={styles.contacts_adm__actions}>
                    <button
                      className="save-btn"
                      onClick={() =>
                        handleUpdate(cont.label, cont.link, cont.id)
                      }
                    >
                      update
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(cont.id)}
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
        <footer className={styles.contacts} id="contacts">
          <div className={styles.contacts__wrapper}>
            <h1 className={styles.contacts__title}>Contacts</h1>
            <div className={styles.contacts__socials}>
              {contacts.map(cont => (
                <li key={cont.id} className={styles.contacts__item}>
                  <img
                    src={cont.iconUrl}
                    alt="icon social media"
                    width={50}
                  />
                  <a
                    href={cont.link}
                    className={styles.contacts__label}
                  >
                    {cont.label}
                  </a>
                </li>
              ))}
            </div>
          </div>
        </footer>
      )}
    </>
  );
};

export default Contacts;

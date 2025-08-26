import { useEffect, useState } from 'react';
import {
  addContanct,
  deleteContact,
  getContacts,
  updateContact,
} from '../../api/contactApi';
import styles from '../../components/Contacts/styles.module.scss';
import { useNavigate } from 'react-router-dom';
import s from '../../components/NewContact/styles.module.scss';
import { MdArrowBack } from 'react-icons/md';
import { me } from '../../api/userApi';
import NewContact from './../../components/NewContact/NewContact';

const ContactsAdmin = () => {
  const [status, setStatus] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [icon, setIcon] = useState(null);

  const navigate = useNavigate();

  const loadCont = async () => {
    await getContacts().then(data => {
      setContacts(data);
    });
  };

  const handleUpdate = async (label, link, id) => {
    try {
      const data = await updateContact(label, link, icon, id);
      if (data.message === 'Contact updated') {
        console.log(data);
        loadCont();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async id => {
    try {
      const data = await deleteContact(id);
      if (data.status === 200) {
        loadCont();
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    me()
      .then(() => setStatus(true))
      .catch(() => navigate('/login'));

    loadCont();
  }, [navigate]);

  if (!status) return <p>...loading</p>;

  return (
    <div className="adm">
      <div className={styles.contacts_adm} id="contacts">
        {/* back to admin  */}
        <MdArrowBack className="back" onClick={() => navigate(-1)} />

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
                <img
                  src={cont.iconUrl}
                  alt="icon social media"
                />
                <input
                  className={s.conItem__inp_icon}
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
  );
};

export default ContactsAdmin;

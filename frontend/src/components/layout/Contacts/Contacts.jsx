import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { getContacts } from '../../../api/contactApi';

const Contacts = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    try {
      getContacts().then(data => setContacts(data));
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
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
              <a href={cont.link} className={styles.contacts__label}>
                {cont.label}
              </a>
            </li>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Contacts;

import { useState } from 'react';
import styles from './newcontact.module.scss';
import { addContanct } from '../../../api/contactApi';

const NewContact = ({ onLoad }) => {
  const [label, setLabel] = useState('');
  const [link, setLink] = useState('');
  const [icon, setIcon] = useState(null);

  const handleAddContact = async () => {
    try {
      const data = await addContanct(label, link, icon);
      if (data) {
        onLoad();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.conItem}>
      <label>
        Icon:
        <input
          className={styles.conItem__inp_icon}
          type="file"
          onChange={e => setIcon(e.target.files[0])}
        />
      </label>

      <label>
        Label:
        <input
          className={styles.conItem__inp}
          type="text"
          value={label}
          onChange={e => setLabel(e.target.value)}
        />
      </label>

      <label>
        Link:
        <input
          className={styles.conItem__inp}
          type="text"
          value={link}
          onChange={e => setLink(e.target.value)}
        />
      </label>

      <button
        type="button"
        className="save-btn"
        onClick={handleAddContact}
      >
        Add
      </button>
    </div>
  );
};

export default NewContact;

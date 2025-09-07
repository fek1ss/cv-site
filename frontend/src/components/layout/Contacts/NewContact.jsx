import { useState } from 'react';
import styles from './newcontact.module.scss';
import { addContanct } from '../../../api/contactApi';
import { useMessage } from '../../../hooks/useMessage';

const NewContact = ({ onLoad }) => {
  const [label, setLabel] = useState('');
  const [link, setLink] = useState('');
  const [icon, setIcon] = useState(null);
  const { message, showMessage } = useMessage();

  const handleAddContact = async () => {
    try {
      const data = await addContanct(label, link, icon);
      if (data) {
        onLoad();
        showMessage(data.message, false);
        setLabel('');
        setLink('')
      }
    } catch (err) {
      showMessage('Error during the update', true);
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
  );
};

export default NewContact;

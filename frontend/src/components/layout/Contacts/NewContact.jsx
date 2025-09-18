import { useState } from 'react';
import styles from '../../../styles/newFeature.module.scss';
import { addContanct } from '../../../api/contactApi';
import { useMessage } from '../../../hooks/useMessage';
import Input from '../../Input/Input';

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
        setLink('');
      }
    } catch (err) {
      showMessage('Error during the update', true);
    }
  };

  return (
    <div className={styles.newFeature}>
      <div className={styles.newFeature__wrapper}>
        <Input
          label="Icon: "
          type="file"
          onChange={setIcon}
          color="white"
        />
        <Input
          label="Label: "
          type="text"
          value={label}
          onChange={setLabel}
          color="white"
        />

        <Input
          label="Link: "
          type="text"
          value={link}
          onChange={setLink}
          color="white"
        />

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
    </div>
  );
};

export default NewContact;

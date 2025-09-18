import { useState } from 'react';
import Input from './../../Input/Input';
import { useMessage } from './../../../hooks/useMessage';
import { createBook } from '../../../api/bookApi';
import styles from '../../../styles/newFeature.module.scss';

const NewBook = ({ onSuccess }) => {
  const [titleBook, setTitleBook] = useState('');
  const [descriptionBook, setDescriptionBook] = useState('');
  const [linkBook, setLinkBook] = useState('');
  const [authorsBook, setAuthorsBook] = useState('');
  const { message, showMessage } = useMessage();

  const handleCreate = async () => {
    if (
      titleBook === '' ||
      descriptionBook === '' ||
      linkBook === '' ||
      authorsBook === ''
    ) {
      showMessage('fill in all fields', true);
      return;
    }

    try {
      const data = await createBook(
        titleBook,
        descriptionBook,
        linkBook,
        authorsBook,
      );

      if (data.id) {
        setTitleBook('');
        setDescriptionBook('');
        setLinkBook('');
        setAuthorsBook('');
        onSuccess();
        showMessage('Book added', false);
        console.log(data);
      }
    } catch (err) {
      showMessage(`${err}`);
    }
  };

  return (
    <div className={styles.newFeature}>
      <div className={styles.newFeature__wrapper}>
        <Input
          label="Title: "
          type="text"
          color="white"
          value={titleBook}
          onChange={setTitleBook}
        />
        <Input
          label="Description: "
          type="text"
          color="white"
          value={descriptionBook}
          onChange={setDescriptionBook}
        />
        <Input
          label="Authors: "
          type="text"
          color="white"
          value={authorsBook}
          onChange={setAuthorsBook}
        />
        <Input
          label="Link: "
          type="text"
          color="white"
          value={linkBook}
          onChange={setLinkBook}
        />
        <div className="actions">
          <button className="save-btn" onClick={handleCreate}>
            create
          </button>
        </div>
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

export default NewBook;

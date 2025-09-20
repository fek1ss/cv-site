import { useEffect, useState } from 'react';
import styles from './bookCard.module.scss';
import { deleteBook, updateBook } from '../../../api/bookApi';
import { useMessageId } from '../../../hooks/useMessageId';
import Input from './../../Input/Input';

const BookCard = ({ id, title, description, link, authors, onSuccess }) => {
  const [titleBook, setTitleBook] = useState(title);
  const [descriptionBook, setDescriptionBook] = useState(description);
  const [linkBook, setLinkBook] = useState(link);
  const [authorsBook, setAuthorsBook] = useState(authors);
  const { message, showMessage } = useMessageId();

  useEffect(() => {
    setTitleBook(title);
    setDescriptionBook(description);
    setLinkBook(link);
    setAuthorsBook(authors);
  }, [title, description, link, authors]);

  const handleUpdate = async () => {
    if (
      title === titleBook &&
      description === descriptionBook &&
      link === linkBook
    ) {
      showMessage('fill in all fields', true, id);
      return;
    }
    try {
      const data = await updateBook(
        id,
        titleBook,
        descriptionBook,
        linkBook,
        authorsBook,
      );
      if (data.message === 'Book updated') {
        showMessage(data.message, false, id);
        onSuccess();
      } else {
        showMessage("Сouldn't update the book", true, id);
      }
    } catch (err) {
      showMessage(`Error updating: ${err}`, true, id);
    }
  };

  const handleDelete = async () => {
    try {
      const data = await deleteBook(id);
      if(data.ok) {
        showMessage("Deleted", false, id)
      }
    } catch (err) {
      showMessage(`something went wrong... ${err}`, true, id);
    }
  };

  return (
    <div className={styles.bookCard}>
      <div className={styles.bookCard__container}>
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
        <div className={styles.bookCard__actions}>
          <button className="save-btn" onClick={handleUpdate}>
            update
          </button>
          <button className="delete-btn" onClick={handleDelete}>
            delete
          </button>
        </div>
        {message[id] && (
          <p
            className={
              message[id].error ? 'error-message' : 'success-message'
            }
          >
            {message[id].text}
          </p>
        )}
      </div>
    </div>
  );
};

export default BookCard;

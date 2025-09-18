import { useState } from 'react';
import { addArticle } from '../../../api/articles';
import styles from '../../../styles/newFeature.module.scss';
import { useMessage } from '../../../hooks/useMessage';
import Input from './../../Input/Input';

const NewArticle = ({ onLoad }) => {
  const { message, showMessage } = useMessage();
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');

  const handleAdd = async () => {
    if (title === '' || link === '') {
      showMessage('fill in all fields', true);
      return;
    }
    try {
      const data = await addArticle(title, link);
      if (data.articleId) {
        onLoad(prev => !prev);
        showMessage(data.message, false);
        setTitle('');
        setLink('');
      }
    } catch (err) {
      console.log(err);
      showMessage('Error when creating an article', true);
    }
  };

  return (
    <div className={styles.newFeature}>
      <div className={styles.newFeature__wrapper}>
        <Input
          label="Title: "
          type="text"
          value={title}
          onChange={setTitle}
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
          className="save-btn"
          type="button"
          onClick={handleAdd}
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

export default NewArticle;

import { useState } from 'react';
import { addArticle } from '../../api/articles';
import styles from './styles.module.scss';
import { useMessage } from '../../hooks/useMessage';

const NewArticle = ({onLoad}) => {
  const { message, showMessage } = useMessage();
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');

  const handleAdd = async() => {
    if(title === "" || link === "") {
      showMessage("fill in all fields", true)
      return
    }
    try {
      const data = await addArticle(title, link);
      if (data.articleId) {
        onLoad(prev => !prev);
        showMessage(data.message, false)
      }
    } catch (err) {
      console.log(err);
      showMessage("Error when creating an article", true)
    }
  };

  return (
    <div className={styles.newArt}>
      <label>
        Title:
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </label>
      <label>
        Link:
        <input
          type="text"
          value={link}
          onChange={e => setLink(e.target.value)}
        />
      </label>
      <button className='save-btn' type='button' onClick={handleAdd}>Add</button>

      {message && (
        <p
          className={
            message.error
              ? 'error-message'
              : 'success-message'
          }
        >
          {message?.text}
        </p>
      )}
    </div>
  );
};

export default NewArticle;

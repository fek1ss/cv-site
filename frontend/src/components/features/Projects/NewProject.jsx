import { createProject } from '../../../api/projectApi';
import { useMessage } from '../../../hooks/useMessage';
import styles from '../../../styles/newFeature.module.scss';
import Input from './../../Input/Input';
import { useState } from 'react';

const NewProject = ({ onSuccess }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [dateStart, setDateStart] = useState(null);
  const [dateEnd, setDateEnd] = useState(null);
  const [link, setLink] = useState('');
  const [img, setImg] = useState(null);
  const { message, showMessage } = useMessage();

  const handleCreate = async () => {

    try {
      const data = await createProject({
        name,
        description,
        dateStart,
        dateEnd,
        image: img,
        link,
      });

      if (data) {
        onSuccess();
        showMessage('Project added', false);
        setName('');
        setDescription('');
        setLink('');
        setImg(null);
        setDateStart(null);
        setDateEnd(null);
      }
    } catch (err) {
      showMessage(`Error: ${err}`, true);
    }
  };

  return (
    <div className={styles.newFeature}>
      <div className={styles.newFeature__wrapper}>
        <Input
          label="name: "
          value={name}
          onChange={setName}
          color="white"
          type="text"
        />
        <Input
          label="description: "
          value={description}
          onChange={setDescription}
          color="white"
          type="text"
        />
        <Input
          label="date start: "
          value={dateStart}
          onChange={setDateStart}
          color="white"
          type="date"
        />
        <Input
          label="date end: "
          value={dateEnd}
          onChange={setDateEnd}
          color="white"
          type="date"
        />
        <Input
          label="link: "
          value={link}
          onChange={setLink}
          color="white"
          type="text"
        />
        <Input
          label="image project: "
          onChange={setImg}
          color="white"
          type="file"
        />
        <button onClick={handleCreate} className="save-btn">
          Add new project
        </button>
        {
          <p
            className={`${message?.error ? 'error-message' : 'success-message'}`}
          >
            {message?.text}
          </p>
        }
      </div>
    </div>
  );
};

export default NewProject;

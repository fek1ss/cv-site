import { useEffect, useMemo, useState } from 'react';
import styles from './projectlist.module.scss';
import Input from './../../Input/Input';
import { useMessageId } from '../../../hooks/useMessageId';
import {
  deleteProject,
  updateProject,
} from '../../../api/projectApi';
import { normalizeDate } from '../../../utils/normalizeDate';

const ProjectCard = ({
  prj,
  name,
  description,
  dateStart,
  dateEnd,
  link,
  img,
  onSuccess,
}) => {
  const [namePrj, setNamePrj] = useState(name);
  const [desc, setDesc] = useState(description);
  const [start, setStart] = useState(dateStart);
  const [end, setEnd] = useState(dateEnd);
  const [linkPrj, setLinkPrj] = useState(link);
  const [image, setImage] = useState(null);
  const { message, showMessage } = useMessageId();

  useEffect(() => {
    setNamePrj(name);
    setDesc(description);
    setStart(dateStart);
    setEnd(dateEnd);
    setLinkPrj(link);
  }, [name, description, dateStart, dateEnd, link]);

  const handleUpdate = async () => {
    if (
      namePrj === name &&
      desc === description &&
      start === dateStart &&
      end === dateEnd
    ) {
      showMessage('Nothing changed', true, prj.id);
      return;
    }

    try {
      const data = await updateProject({
        id: prj.id,
        name: namePrj,
        description: desc,
        dateStart: normalizeDate(start),
        dateEnd: normalizeDate(end),
        image,
        link: linkPrj,
      });
      if (data) {
        showMessage('Updated', false, prj.id);
        onSuccess();
      }
    } catch (err) {
      showMessage(`${err}`, true, prj.id);
    }
  };

  const handleDelete = async id => {
    try {
      const data = await deleteProject(id);
      if (data.ok) {
        onSuccess();
      }
    } catch (err) {
      showMessage(`Error deleting education: ${err}`, true, id);
    }
  };

  return (
    <div className={styles.project__item}>
      <Input
        label="Name:"
        type="text"
        value={namePrj}
        onChange={setNamePrj}
        color="white"
      />
      <Input
        label="Description:"
        type="text"
        value={desc}
        onChange={setDesc}
        color="white"
      />
      <Input
        label="Date start:"
        type="date"
        value={normalizeDate(start)}
        onChange={setStart}
        color="white"
      />
      <Input
        label="Date end:"
        type="date"
        value={normalizeDate(end)}
        onChange={setEnd}
        color="white"
      />
      <Input
        label="Link:"
        type="text"
        value={linkPrj}
        onChange={setLinkPrj}
        color="white"
      />
      <div>
        <Input
          label="Image:"
          type="file"
          onChange={setImage}
          color="white"
        />
        <img src={img} alt="img" style={{ width: '200px' }} />
      </div>
      <div className={styles.project__actions}>
        <button className="delete-btn" onClick={()=> handleDelete(prj.id)}>Delete</button>
        <button className="save-btn" onClick={handleUpdate}>
          Update
        </button>
      </div>
      {message[prj.id] && (
        <p
          className={
            message[prj.id].error
              ? 'error-message'
              : 'success-message'
          }
        >
          {message[prj.id].text}
        </p>
      )}
    </div>
  );
};

export default ProjectCard;

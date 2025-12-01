import { useState, useEffect } from 'react';
import Input from './../../Input/Input';
import styles from './eduList.module.scss';
import {
  deleteEducation,
  updateEducation,
} from '../../../api/educationApi';
import { useMessageId } from '../../../hooks/useMessageId';

const EducationCard = ({
  isAdmin,
  education,
  degreeShort,
  degreeFull,
  university,
  yearStart,
  yearEnd,
  onSuccess
}) => {
  const [short, setShort] = useState(degreeShort);
  const [full, setFull] = useState(degreeFull);
  const [uni, setUni] = useState(university);
  const [start, setStart] = useState(yearStart);
  const [end, setEnd] = useState(yearEnd);
  const { message, showMessage } = useMessageId();

  useEffect(() => {
    setShort(degreeShort);
    setFull(degreeFull);
    setUni(university);
    setStart(yearStart);
    setEnd(yearEnd);
  }, [
    degreeShort,
    degreeFull,
    university,
    yearStart,
    yearEnd,
    education,
  ]);

  const handleUpdate = async () => {
    if (
      short === degreeShort &&
      full === degreeFull &&
      uni === university &&
      start === yearStart &&
      end === yearEnd
    ) {
      showMessage("Nothing changed", true, education.id)
      return
    }
      try {
        const data = await updateEducation({
          id: education.id,
          degreeShort: short,
          degreeFull: full,
          university: uni,
          yearStart: start,
          yearEnd: end,
        });
        if (data.message === 'Education updated')
          showMessage(data.message, false, education.id);
      } catch (err) {
        showMessage(`${err}`, true, education.id);
      }
  };

  const handleDelete = async id => {
    try {
      const data = await deleteEducation(id);
      if(data.ok) {
        onSuccess();
      }
    } catch (err) {
      showMessage(`Error deleting education: ${err}`, true, id)
    }
  };

  return (
    <div className={`${styles.eduList__item} ${isAdmin ? styles.eduList__itemAdm : ""}`}>
      <div className={styles.eduList__data}>
        <Input
          label="Short degree:"
          type="text"
          value={short}
          onChange={setShort}
          color="white"
        />
        <Input
          label="Full degree:"
          type="text"
          value={full}
          onChange={setFull}
          color="white"
        />
        <Input
          label="University:"
          type="text"
          value={uni}
          onChange={setUni}
          color="white"
        />
        <Input
          label="Year Start:"
          type="text"
          value={start}
          onChange={setStart}
          color="white"
        />
        <Input
          label="Year End:"
          type="text"
          value={end}
          onChange={setEnd}
          color="white"
        />
        {message[education.id] && (
          <p
            className={
              message[education.id].error
                ? 'error-message'
                : 'success-message'
            }
          >
            {message[education.id].text}
          </p>
        )}
      </div>
      <div className={styles.eduList__actions}>
        <button onClick={handleUpdate} className="save-btn">
          Edit
        </button>
        <button
          onClick={() => handleDelete(education.id)}
          className="delete-btn"
        >
          delete
        </button>
      </div>
    </div>
  );
};

export default EducationCard;

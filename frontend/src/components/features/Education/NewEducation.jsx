import styles from '../../../styles/newFeature.module.scss';
import Input from './../../Input/Input';
import { useState } from 'react';
import { createEducation } from '../../../api/educationApi';
import { useMessage } from './../../../hooks/useMessage';

const NewEducation = ({ onSuccess }) => {
  const [degreeShort, setDegreeShort] = useState('');
  const [degreeFull, setDegreeFull] = useState('');
  const [university, setUniversity] = useState('');
  const [yearStart, setYearStart] = useState(null);
  const [yearEnd, setYearEnd] = useState(null);
  const { message, showMessage } = useMessage();

  const handleCreate = async () => {
    if (
      degreeShort === '' ||
      degreeFull === '' ||
      university === '' ||
      yearStart === null ||
      yearEnd === null
    ) {
      showMessage('fill in all fields', true);
      return;
    }
    try {
      const data = await createEducation({
        degreeShort,
        degreeFull,
        university,
        yearStart,
        yearEnd,
      });
      if (data.id) {
        showMessage('Education added', false);
        onSuccess();
        setDegreeShort('');
        setDegreeFull('');
        setUniversity('');
        setYearEnd(null);
        setYearStart(null);
      }
    } catch (err) {
      showMessage(`${err}`, true);
    }
  };

  return (
    <div className={styles.newFeature}>
      <div className={styles.newFeature__wrapper}>
        <Input
          label="Degree (short version):"
          type="text"
          value={degreeShort}
          onChange={setDegreeShort}
          color="white"
        />
        <Input
          label="Full degree name:"
          type="text"
          value={degreeFull}
          onChange={setDegreeFull}
          color="white"
        />
        <Input
          label="University:"
          type="text"
          value={university}
          onChange={setUniversity}
          color="white"
        />
        <Input
          label="Year Start:"
          type="number"
          value={yearStart}
          onChange={setYearStart}
          color="white"
        />
        <Input
          label="Year End:"
          type="number"
          value={yearEnd}
          onChange={setYearEnd}
          color="white"
        />
        <button onClick={handleCreate} className="save-btn">
          Create
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

export default NewEducation;

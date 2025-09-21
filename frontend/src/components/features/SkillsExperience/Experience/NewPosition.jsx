import { useState } from 'react';
import styles from './newexp.module.scss';
import { createPosition } from '../../../../api/positionApi';
import { useMessage } from '../../../../hooks/useMessage';

const NewPosition = ({ companyId, onSuccess }) => {
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const { message, showMessage } = useMessage();

  const handleCreate = async e => {
    e.preventDefault();
    if (!title || !startDate) {
      showMessage('fill in all fields', true);
      return;
    }

    if (endDate && new Date(startDate) > new Date(endDate)) {
      showMessage('Start date cannot be later than end date', true);
      return;
    }

    try {
      const data = await createPosition({
        title,
        startDate,
        endDate,
        companyId,
      });
      if (data.message) {
        setTitle('');
        setStartDate('');
        setEndDate('');
        showMessage('created', false);
        onSuccess();
      }
    } catch (e) {
      showMessage('something wrong...');
    }
  };

  return (
    <div className={styles.newExp}>
      <h1 className={styles.newExp__title}>
        Specify the position in this company
      </h1>
      <form className={styles.newExp__container}>
        <label className={styles.newExp__label}>
          <p className={styles.newExp__labelName}>Position:</p>
          <input
            type="text"
            className={styles.newExp__name}
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </label>
        <label className={styles.newExp__label}>
          <p className={styles.newExp__labelName}>Start Date:</p>
          <input
            type="date"
            className={styles.newExp__name}
            value={startDate || ''}
            onChange={e => setStartDate(e.target.value)}
          />
        </label>
        <label
          className={`${styles.newExp__label} ${styles.newExp__end}`}
        >
          <label className={styles.newExp__label}>
            <p className={styles.newExp__labelName}>End Date:</p>
            <input
              type="date"
              className={styles.newExp__date}
              value={endDate ? endDate : ''}
              onChange={e => setEndDate(e.target.value)}
            />
          </label>
          <label className={styles.newExp__label}>
            <p className={styles.newExp__labelName}>present</p>
            <input
              type="checkbox"
              checked={endDate === null}
              onChange={e => {
                if (e.target.checked) {
                  setEndDate(null);
                } else {
                  setEndDate(new Date());
                }
              }}
            />
          </label>
        </label>

        <div className={styles.newExp__buttons}>
          <button onClick={handleCreate}>Submit</button>
        </div>
      </form>
      {
        <p
          className={`${message?.error ? 'error-message' : 'success-message'}`}
        >
          {message?.text}
        </p>
      }
    </div>
  );
};

export default NewPosition;

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
      }
    } catch (e) {
      showMessage('something wrong...');
    }
  };

  return (
    <div className={styles.newExp}>
      <h1>Specify the position in this company</h1>
      <form className={styles.newExp__container}>
        <label>
          Position
          <input
            type="text"
            className={styles.newExp__name}
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </label>
        <label>
          Start Date
          <input
            type="date"
            className={styles.newExp__name}
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
          />
        </label>
        <label>
          End Date
          <input
            type="date"
            className={styles.newExp__name}
            value={endDate ? endDate : ''}
            onChange={e => setEndDate(e.target.value)}
          />
          <label>
            <p>present</p>
            <input
              type="checkbox"
              checked={endDate === null}
              onClick={() => {
                setEndDate(null);
              }}
            />
          </label>
        </label>

        <div className={styles.newExp__buttons}>
          <button onClick={handleCreate}>Submit</button>
          {message?.text === '' &&
            !message?.error &&
            title === '' &&
            startDate === '' && (
              <button onClick={onSuccess}>Save</button>
            )}
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

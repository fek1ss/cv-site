import styles from './expmodal.module.scss';
import stylesModal from '../Skills/skillmodal.module.scss';
import { useEffect, useState } from 'react';
import {
  deleteCompany,
  updateCompany,
} from '../../../../api/experience';
import { updatePosition } from '../../../../api/positionApi';
import { normalizeDate } from '../../../../utils/normalizeDate';
import Input from './../../../Input/Input';
import BaseModal from '../../../BaseModal/BaseModal';

const ExperienceModal = ({ experience, onClose }) => {
  const [name, setName] = useState('');
  const [icon, setIcon] = useState(null);
  const [positions, setPositions] = useState([]);
  const [message, setMessage] = useState({});

  useEffect(() => {
    if (experience) {
      setName(experience.name);
      setPositions(experience.positions || []);
    }
  }, [experience]);

  const handleDelete = async id => {
    try {
      await deleteCompany(id);
      onClose();
    } catch (e) {
      console.log(e);
      alert('Something wrong');
    }
  };

  const handleUpdatePosition = async (pos, companyId) => {
    try {
      const res = await updatePosition({
        id: pos.id,
        title: pos.title,
        startDate: normalizeDate(pos.startDate),
        endDate: normalizeDate(pos.endDate),
        companyId,
      });
      if (res) {
        setMessage(prev => ({
          ...prev,
          [pos.id]: { text: 'Updated success', error: false },
        }));
        setTimeout(() => {
          setMessage(prev => ({ ...prev, [pos.id]: null }));
        }, 1500);
      }
    } catch (err) {
      setMessage(prev => ({
        ...prev,
        [pos.id]: { text: 'Error updating', error: true },
      }));
      setTimeout(() => {
        setMessage(prev => ({ ...prev, [pos.id]: null }));
      }, 1500);
    }
  };

  const handleUpdateCompany = async () => {
    if (name === experience.name) {
      setMessage(prev => ({
        ...prev,
        [experience.id]: {
          text: 'No changes in the name',
          error: true,
        },
      }));
      return;
    }

    try {
      const res = await updateCompany({
        name,
        icon,
        id: experience.id,
      });
      if (res) {
        setMessage(prev => ({
          ...prev,
          [experience.id]: { text: 'Company updated', error: false },
        }));
        setTimeout(() => {
          setMessage(prev => ({ ...prev, [experience.id]: null }));
        }, 1500);
      }
    } catch (err) {
      setMessage(prev => ({
        ...prev,
        [experience.id]: {
          text: 'Error updating company',
          error: true,
        },
      }));
      setTimeout(() => {
        setMessage(prev => ({ ...prev, [experience.id]: null }));
      }, 1500);
    }
  };

  return (
    <BaseModal
      title="Edit experience"
      onClose={onClose}
      footer={
        <>
          <button
            className="save-btn"
            type="button"
            onClick={handleUpdateCompany}
          >
            Update
          </button>
          <button
            className="delete-btn"
            type="button"
            onClick={() => handleDelete(experience.id)}
          >
            Delete
          </button>
        </>
      }
    >
      <Input
        label="Company"
        type="text"
        value={name}
        onChange={setName}
        color="white"
      />
      <Input label="Logo Company" type="file" onChange={setIcon} />

      {message[experience.id] && (
        <p
          className={
            message[experience.id].error
              ? 'error-message'
              : 'success-message'
          }
        >
          {message[experience.id].text}
        </p>
      )}

      {positions.map((pos, idx) => (
        <div key={pos.id} className={styles.positionItem}>
          <label className={styles.positionLabel}>
            Position
            <input
              className={styles.positionInp}
              type="text"
              value={pos.title}
              onChange={e => {
                const newPositions = [...positions];
                newPositions[idx].title = e.target.value;
                setPositions(newPositions);
              }}
            />
          </label>

          <label className={styles.positionLabel}>
            Start Date
            <input
              type="date"
              value={pos.startDate ? pos.startDate.split('T')[0] : ''}
              onChange={e => {
                const newPositions = [...positions];
                newPositions[idx].startDate = e.target.value;
                setPositions(newPositions);
              }}
            />
          </label>

          <label className={styles.positionLabel}>
            End Date
            <input
              type="date"
              value={pos.endDate ? pos.endDate.split('T')[0] : ''}
              onChange={e => {
                const newPositions = [...positions];
                newPositions[idx].endDate = e.target.value;
                setPositions(newPositions);
              }}
            />
          </label>
          <label className={styles.present}>
            Present
            <input
              type="checkbox"
              checked={pos.endDate === ''}
              onClick={() => {
                const newPositions = [...positions];
                newPositions[idx].endDate = '';
                setPositions(newPositions);
              }}
            />
          </label>

          <button
            type="button"
            className="save-btn"
            onClick={() => handleUpdatePosition(pos, experience.id)}
          >
            Update Position
          </button>

          {message[pos.id] && (
            <p
              className={
                message[pos.id].error
                  ? 'error-message'
                  : 'success-message'
              }
            >
              {message[pos.id].text}
            </p>
          )}
        </div>
      ))}
    </BaseModal>
  );
};

export default ExperienceModal;

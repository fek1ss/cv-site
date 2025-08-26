import styles from './styles.module.scss';
import stylesModal from '../SkillModal/styles.module.scss';
import { useEffect, useState } from 'react';
import { deleteCompany, updateCompany } from './../../api/experience';
import { updatePosition } from '../../api/positionApi';
import { normalizeDate } from '../../utils/normalizeDate';

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
      console.log(err);
      setMessage(prev => ({
        ...prev,
        [pos.id]: { text: 'Error updating', error: true },
      }));
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
      console.log(err);
      setMessage(prev => ({
        ...prev,
        [experience.id]: {
          text: 'Error updating company',
          error: true,
        },
      }));
    }
  };

  return (
    <div className={stylesModal.modalOverlay}>
      <div className={stylesModal.modal}>
        <button
          className={stylesModal.modal__closeBtn}
          onClick={onClose}
        >
          ×
        </button>
        <h2 className={stylesModal.modal__title}>Edit Experience</h2>
        <form action="">
          <label>
            Company
            <input
              className={stylesModal.modal__inp}
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </label>
          <label htmlFor="">
            Logo Compnay
            <input
              className={styles.modal__inp}
              type="file"
              onChange={e => setIcon(e.target.files[0])}
            />
            <img src={experience.logoUrl} alt="logo" width={50} />
          </label>

          <button
            className="save-btn"
            type="button"
            onClick={handleUpdateCompany}
          >
            Update
          </button>
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
              <div>
                <label>
                  Position
                  <input
                    type="text"
                    className={stylesModal.modal__inp}
                    value={pos.title}
                    onChange={e => {
                      const newPositions = [...positions];
                      newPositions[idx].title = e.target.value;
                      setPositions(newPositions);
                    }}
                  />
                </label>
                <label>
                  Start Date
                  <input
                    type="date"
                    className={stylesModal.modal__inp}
                    value={
                      pos.startDate ? pos.startDate.split('T')[0] : ''
                    }
                    onChange={e => {
                      const newPositions = [...positions];
                      newPositions[idx].startDate = e.target.value;
                      setPositions(newPositions);
                    }}
                  />
                </label>
                <label>
                  End Date:
                  <input
                    type="date"
                    className={stylesModal.modal__inp}
                    value={
                      pos.endDate ? pos.endDate.split('T')[0] : ''
                    }
                    onChange={e => {
                      const newPositions = [...positions];
                      newPositions[idx].endDate = e.target.value;
                      setPositions(newPositions);
                    }}
                  />
                  <label>
                    present
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
                </label>
              </div>
              <button
                type="button"
                className="save-btn"
                onClick={() =>
                  handleUpdatePosition(pos, experience.id)
                }
              >
                update
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
          <button
            className="delete-btn"
            type="button"
            onClick={() => handleDelete(experience.id)}
          >
            delete
          </button>
        </form>
      </div>
    </div>
  );
};

export default ExperienceModal;

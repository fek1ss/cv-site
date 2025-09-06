import { useState } from 'react';
import styles from './skillmodal.module.scss';
import { useMessage } from '../../../../hooks/useMessage';
import { updateSkills } from '../../../../api/skillsApi';

const SkillModal = ({
  skill,
  onClose,
  onUpdate,
  onDelete,
  onCreate,
}) => {
  const isEditing = skill.id;
  const [name, setName] = useState(skill.name || '');
  const [icon, setIcon] = useState(null);
  const { message, showMessage } = useMessage();

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const data = await updateSkills({id: skill.id, name, icon});
      if (data.error) {
        showMessage(data.error, true);
        return;
      }
      
      onClose();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = e => {
    e.preventDefault();
    onDelete(skill.id);
  };

  const handleCreate = e => {
    e.preventDefault();
    onCreate({ name, icon });
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <button className={styles.modal__closeBtn} onClick={onClose}>
          ×
        </button>

        <h2 className={styles.modal__title}>
          {isEditing ? 'Edit Skill' : 'Create Skill'}
        </h2>
        <form>
          <label>
            Name:
            <input
              className={styles.modal__inp}
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </label>

          <label>
            Icon:
            <input
              type="file"
              onChange={e => setIcon(e.target.files[0])}
            />
          </label>
          <p className="hint">The icon should be square.</p>
          <div className={styles.modalActions}>
            {isEditing ? (
              <>
                <button
                  onClick={handleDelete}
                  type="button"
                  className={styles.deleteBtn}
                >
                  Delete
                </button>
                <button onClick={handleUpdate} className="save-btn">
                  Save
                </button>
              </>
            ) : (
              <button
                onClick={handleCreate}
                type="button"
                className="save-btn"
              >
                Create
              </button>
            )}
          </div>
          {message && (
            <p
              className={
                message.error ? 'error-message' : 'success-message'
              }
            >
              {message?.text}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default SkillModal;

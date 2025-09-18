import { useState } from 'react';
import styles from './skillmodal.module.scss';
import { useMessage } from '../../../../hooks/useMessage';
import { updateSkills } from '../../../../api/skillsApi';
import Input from './../../../Input/Input';
import BaseModal from '../../../BaseModal/BaseModal';

const SkillModal = ({ skill, onClose, onDelete, onCreate }) => {
  const isEditing = skill.id;
  const [name, setName] = useState(skill.name || '');
  const [icon, setIcon] = useState(null);
  const { message, showMessage } = useMessage();

  const handleUpdate = async e => {
    e.preventDefault();
    try {
      const data = await updateSkills({ id: skill.id, name, icon });
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
    <BaseModal
      title={isEditing ? 'Edit Skill' : 'Create Skill'}
      onClose={onClose}
      onSubmit={isEditing ? handleUpdate : undefined}
      footer={
        isEditing ? (
          <>
            <button
              type="button"
              onClick={handleDelete}
              className={styles.deleteBtn}
            >
              Delete
            </button>
            <button type="submit" className="save-btn">
              Save
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={handleCreate}
            className="save-btn"
          >
            Create
          </button>
        )
      }
    >
      <Input
        label="Name"
        value={name}
        onChange={setName}
        type="text"
        color="#fff"
      />
      <Input label="Icon" onChange={setIcon} type="file" />
      <p className="hint">The icon should be square.</p>
      {message && (
        <p
          className={
            message.error ? 'error-message' : 'success-message'
          }
        >
          {message.text}
        </p>
      )}
    </BaseModal>
  );
};

export default SkillModal;

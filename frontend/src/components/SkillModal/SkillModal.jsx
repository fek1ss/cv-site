import { useState } from "react";
import styles from './styles.module.scss';

const SkillModal = ({skill, onClose, onUpdate, onDelete, onCreate}) => {
  const isEditing = skill.id;
  const [name, setName] = useState(skill.name || "");
  const [icon, setIcon] = useState(null);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({id: skill.id, name, icon})
  }

  const handleDelete = (e) => {
    e.preventDefault();
    onDelete(skill.id)
  }

  const handleCreate = (e) => {
    e.preventDefault();
    onCreate({name, icon});
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <button className={styles.modal__closeBtn} onClick={onClose}>×</button>
        
        <h2 className={styles.modal__title}>
          {isEditing? "Edit Skill":"Create Skill"}
        </h2>
        <form>
          <label>
            Name:
            <input 
              className={styles.modal__inp}
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
            />
          </label>

          <label>
            Icon:
            <input 
              type="file" 
              onChange={(e) => setIcon(e.target.files[0])} 
            />
          </label>

          <div className={styles.modalActions}>
            {
              isEditing ? (
                <>
                  <button onClick={handleDelete} type="button" className={styles.deleteBtn}>
                    Delete
                  </button> 
                  <button onClick={handleSubmit} className="save-btn">
                    Save
                  </button>
                </>
              ) : (
                <button onClick={handleCreate} type="button" className="save-btn">
                  Create
                </button>
              )
            }
          </div>
        </form>
      </div>
    </div>
  )
}

export default SkillModal;
import { useState } from "react";
import styles from './styles.module.scss';

const SkillModal = ({skill, onClose, onUpdate}) => {
  const [name, setName] = useState(skill.name);
  const [icon, setIcon] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({id: skill.id, name, icon})
  }


  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <button className={styles.modal__closeBtn} onClick={onClose}>×</button>
        
        <h2 className={styles.modal__title}>Edit Skill</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input 
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
            <button type="submit">Save</button>
            <button type="button" className={styles.deleteBtn}>
              Delete
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SkillModal;
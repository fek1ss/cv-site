import { useEffect } from "react";
import { useState } from "react";
import { addSkill, deleteSkill, getSkills, updateSkills } from "../../api/skillsApi";
import styles from '../../components/Skills/styles.module.scss';
import { useNavigate } from "react-router-dom";
import SkillModal from "../../components/SkillModal/SkillModal";

const SkillsAdmin = () => {
  const [skills, setSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState(null);
  const navigate = useNavigate();

  useEffect(()=> {
    loadSkills()
  },[])

  const loadSkills = async () => {
    try {
      const data = await getSkills();
      setSkills(data);
    } catch(err) {
      console.log(err)
    }
  }

  const handleDelete = async(id) => {
    try {
      await deleteSkill(id);
      setSelectedSkills(null);
      loadSkills();
    } catch (err) {
      console.log(err);
    }
  }

  const handleUpdate = async(formData) => {
    try {
      await updateSkills(formData);
      setSelectedSkills(null);
      loadSkills();
    } catch (err) {
      console.log(err)
    }
  }

  const handleCreate = async(formData) => {
    try {
      await addSkill(formData);
      setSelectedSkills(null);
      loadSkills();
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <>
      <p className="back" onClick={()=> navigate(-1)}>Back</p>
      <div className={styles.skills_adm}>
      <h1 className={styles.skills__title}>Skills</h1>
      <div className={styles.skills__items}>
        {skills.map(skill => (
          <div className={styles.skills__item_adm} key={skill.id} onClick={()=> setSelectedSkills(skill)}>
            <div className={styles.skills__icon_adm} key={skill.id}>
              <img src={skill.iconUrl} width={90} alt="icon"  />
            </div>
            <p>{skill.name}</p>
          </div>  
        ))}
        <button className={styles.skills_btn} onClick={()=> setSelectedSkills({})}>+</button>
      </div>
    </div>
    {
      selectedSkills && (
        <SkillModal 
        onUpdate={handleUpdate} 
        onClose={()=>setSelectedSkills(null)}  
        onDelete={handleDelete}
        onCreate={handleCreate}
        skill={selectedSkills}
        />
      )
    }
    </>
  )
}

export default SkillsAdmin;
import { useEffect } from 'react';
import { useState } from 'react';
import {
  addSkill,
  deleteSkill,
  getSkills,
  updateSkills,
} from '../../api/skillsApi';
import styles from '../../components/Skills/styles.module.scss';
import { useNavigate } from 'react-router-dom';
import SkillModal from '../../components/SkillModal/SkillModal';
import { MdArrowBack } from 'react-icons/md';
import { me } from '../../api/userApi';
import { useMessage } from '../../hooks/useMessage';

const SkillsAdmin = () => {
  const [skills, setSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState(null);
  const navigate = useNavigate();
  const [status, setStatus] = useState(false);
  const { message, showMessage } = useMessage();

  useEffect(() => {
    me()
      .then(() => setStatus(true))
      .catch(() => navigate('/login'));

    loadSkills();
  }, [navigate]);

  const loadSkills = async () => {
    try {
      const data = await getSkills();
      setSkills(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async id => {
    try {
      await deleteSkill(id);
      setSelectedSkills(null);
      loadSkills();
    } catch (err) {
      console.log(err);
    }
  };

  const handleCreate = async formData => {
    try {
      const data = await addSkill(formData);
      if (data.error) {
        showMessage(data.error, true);
        return;
      }

      showMessage(data.message, false);
      setSelectedSkills(null);
      loadSkills();
    } catch (err) {
      showMessage(`Error during the create ${err}`, true);
    }
  };

  if (!status) return <p>loading...</p>;

  return (
    <div className="adm">
      <MdArrowBack className="back" onClick={() => navigate(-1)} />
      <div className={styles.skills_adm}>
        <h1 className={styles.skills__title}>Skills</h1>
        <div className={styles.skills__items}>
          {skills.map(skill => (
            <div
              className={styles.skills__item_adm}
              key={skill.id}
              onClick={() => setSelectedSkills(skill)}
            >
              <div className={styles.skills__icon_adm} key={skill.id}>
                <img
                  src={skill.iconUrl}
                  className={styles.skills__img}
                  alt="icon"
                />
              </div>
              <p>{skill.name}</p>
            </div>
          ))}
          <div className={styles.skills__newSkill}>
            <button
              className={styles.skills_btn}
              onClick={() => setSelectedSkills({})}
            >
              +
            </button>
            <p>Add new skill</p>
          </div>
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
      </div>
      {selectedSkills && (
        <SkillModal
          onClose={() => setSelectedSkills(null)}
          onDelete={handleDelete}
          onCreate={handleCreate}
          skill={selectedSkills}
        />
      )}
    </div>
  );
};

export default SkillsAdmin;

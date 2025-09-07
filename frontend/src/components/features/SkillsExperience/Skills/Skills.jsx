import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { motion } from 'framer-motion';
import {
  addSkill,
  deleteSkill,
  getSkills,
} from '../../../../api/skillsApi';
import { useNavigate } from 'react-router-dom';
import { useMessage } from '../../../../hooks/useMessage';
import { me } from '../../../../api/userApi';
import { MdArrowBack } from 'react-icons/md';
import SkillModal from './SkillModal';


const Skills = ({ isAdmin = false }) => {
  const [skills, setSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState(null);
  const navigate = useNavigate();
  const [status, setStatus] = useState(false);
  const { message, showMessage } = useMessage();

  useEffect(() => {
    if (isAdmin) {
      me()
        .then(() => setStatus(true))
        .catch(() => navigate('/login'));
    }

    loadSkills();
  });

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

  if (isAdmin && !status) {
    if (!status) return <p>loading...</p>;
  }

  return (
    <>
      {isAdmin ? (
        <div className="adm">
          <MdArrowBack
            className="back"
            onClick={() => navigate(-1)}
          />
          <div className={styles.skills_adm}>
            <h1 className={styles.skills__title}>Skills</h1>
            <div className={styles.skills__items}>
              {skills.map(skill => (
                <div
                  className={styles.skills__item_adm}
                  key={skill.id}
                  onClick={() => setSelectedSkills(skill)}
                >
                  <div
                    className={styles.skills__icon_adm}
                    key={skill.id}
                  >
                    <img
                      src={skill.iconUrl}
                      className={styles.skills__img}
                      alt="icon"
                    />
                  </div>
                  <p className={styles.skills__name}>{skill.name}</p>
                </div>
              ))}
              <div className={styles.skills__newSkill}>
                <button
                  className={styles.skills_btn}
                  onClick={() => setSelectedSkills({})}
                >
                  +
                </button>
                <p className={styles.skills__name}>Add new skill</p>
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
      ) : (
        <motion.div
          className={styles.skills}
          initial={{ x: -150, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <h1 className={styles.skills__title}>Skills</h1>
          <div className={styles.skills__items}>
            {skills.map(skill => (
              <div className={styles.skills__item} key={skill.id}>
                <div className={styles.skills__icon} key={skill.id}>
                  <img src={skill.iconUrl} width={90} alt="icon" />
                </div>
                <p>{skill.name}</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Skills;

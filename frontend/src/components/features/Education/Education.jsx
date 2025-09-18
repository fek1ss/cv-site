import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { motion } from 'framer-motion';
import { getEducations } from './../../../api/educationApi';
import NewEducation from './NewEducation';
import EducationList from './EducationList';
import { MdArrowBack } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { me } from '../../../api/userApi';

const Education = ({ isAdmin = false }) => {
  const [educations, setEducations] = useState([]);
  const navigate = useNavigate();
  const [status, setStatus] = useState(false);

  useEffect(() => {
    if (isAdmin) {
      me()
        .then(() => setStatus(true))
        .catch(() => navigate('/login'));
    }
    loadEdu();
  }, [isAdmin, navigate]);

  const loadEdu = () => {
    getEducations().then(data => setEducations(data));
  };

  if (isAdmin && !status) return <p>loading...</p>;

  return (
    <>
      {isAdmin ? (
        <div className="adm">
          <MdArrowBack
            className="back"
            onClick={() => navigate(-1)}
          />
          <div className="wrapper">
            <h1 style={{ fontWeight: 400 }}>Education</h1>
            <NewEducation onSuccess={() => loadEdu()} />
            <EducationList
              isAdmin={true}
              educations={educations}
              onSuccess={() => loadEdu()}
            />
          </div>
        </div>
      ) : (
        <motion.section
          id="education"
          className={styles.education}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <h1>Education:</h1>
          <EducationList educations={educations} />
        </motion.section>
      )}
    </>
  );
};

export default Education;

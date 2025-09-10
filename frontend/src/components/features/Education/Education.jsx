import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { motion } from 'framer-motion';
import { getEducations } from './../../../api/educationApi';
import { useMessage } from '../../../hooks/useMessage';
import NewEducation from './NewEducation';
import EducationList from './EducationList';

const Education = ({ isAdmin = false }) => {
  const [educations, setEducations] = useState([]);
  const { message, showMessage } = useMessage();

  useEffect(() => {
    loadEdu();
  }, []);

  const loadEdu = () => {
    getEducations()
    .then(data => setEducations(data)
  );
  }

  // const handleUpdate = async (degreeShort, degreeFull, university, yearStart, yearEnd) => {
  //   try {
  //   } catch (err) {}
  // };

  return (
    <>
      {isAdmin ? (
        <div className="adm">
          <NewEducation onSuccess={()=>loadEdu()} />
          <EducationList isAdmin={true} educations={educations} onSuccess={()=>loadEdu()} />
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

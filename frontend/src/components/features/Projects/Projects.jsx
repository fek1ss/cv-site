import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import ProjectCarousel from './ProjectCaroulsel';
import ProjectList from './ProjectList';
import { motion } from 'framer-motion';
import NewProject from './NewProject';
import { useNavigate } from 'react-router-dom';
import { MdArrowBack } from 'react-icons/md';
import { getProject } from '../../../api/projectApi';
import { me } from '../../../api/userApi';
import { AnimatePresence } from 'framer-motion';

const Project = ({ isAdmin = false }) => {
  const [projects, setProjects] = useState([]);
  const [carousel, setCarousel] = useState(true);
  const navigate = useNavigate();
  const [status, setStatus] = useState(false);

  const prjLoad = () => {
    getProject().then(data => setProjects(data));
  };

  useEffect(() => {
    if (isAdmin) {
      me()
        .then(() => setStatus(true))
        .catch(() => navigate('/login'));
    }
    prjLoad();
  }, [isAdmin, navigate]);

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
            <h1 style={{ fontWeight: 400 }}>Projects</h1>
            <NewProject onSuccess={() => prjLoad()} />
            <div className={styles.list}>
              <ProjectList
                onSuccess={() => prjLoad()}
                projects={projects}
                isAdmin={true}
              />
            </div>
          </div>
        </div>
      ) : (
        <motion.section
          className={styles.project}
          initial={{ x: 200, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <h1>Projects</h1>
          <div className={styles.project__top}>
            <button
              className={styles.project__btn}
              onClick={() => setCarousel(prev => !prev)}
            >
              {carousel ? 'show as a carousel' : 'show as a list'}
            </button>
          </div>
          <AnimatePresence mode="wait">
            {carousel ? (
              <motion.div
                key="list"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
              >
                <ProjectList projects={projects} />
              </motion.div>
            ) : (
              <motion.div
                key="carousel"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
              >
                <ProjectCarousel />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.section>
      )}
    </>
  );
};

export default Project;

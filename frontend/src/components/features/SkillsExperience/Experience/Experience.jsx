import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { motion } from 'framer-motion';
import { getExperience } from '../../../../api/experience';
import { formatDateRange } from '../../../../utils/date';
import { me } from '../../../../api/userApi';
import { useNavigate } from 'react-router-dom';
import NewExperience from './NewExperience';
import NewPosition from './NewPosition';
import ExperienceModal from './ExperienceModal';
import { MdArrowBack } from 'react-icons/md';


const Experience = ({ isAdmin = false }) => {
  const [experiences, setExperiences] = useState([]);
  const [isCreate, setIsCreate] = useState(false);
  const [companyId, setCompanyId] = useState(null);
  const [selected, setSelected] = useState(false);
  const navigate = useNavigate();
  const [status, setStatus] = useState(false);

  useEffect(() => {
    if (isAdmin) {
      me()
        .then(() => setStatus(true))
        .catch(() => navigate('/login'));
    }

    loadExp();
  }, [navigate, isAdmin]);

  const loadExp = async () => {
    try {
      const data = await getExperience();
      setExperiences(data);
    } catch (err) {
      console.log('Error when receiving data');
    }
  };

  if (isAdmin) {
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
          <div className={styles.exps_adm}>
            <h1 style={{ fontWeight: 400 }}>Experience</h1>
            <div
              className={styles.exps_adm__create}
              onClick={() => setIsCreate(prev => !prev)}
            >
              {isCreate ? 'cancel' : 'add experience'}
            </div>

            {/* Создание компании  */}
            {isCreate && <NewExperience onCompanyId={setCompanyId} />}

            {/* Создание позиции к этой компании  */}
            {companyId && isCreate && (
              <NewPosition
                companyId={companyId}
                onSuccess={() => {
                  setIsCreate(false);
                  loadExp();
                }}
              />
            )}
            <div
              className={`${styles.exps__experiences} ${styles.exps_adm__cards}`}
            >
              {experiences.map(exp => (
                <div
                  className={`${styles.exps__exp_card} ${styles.exps_adm__card}`}
                  key={exp.id}
                >
                  {exp.positions.length === 1 ? (
                    <>
                      <div className={styles.exps__row}>
                        <img
                          src={exp.logoUrl}
                          alt="logo company"
                          width={70}
                        />
                        <div className={styles.exps__title}>
                          <h3>{exp.name}</h3>
                          <h3>{exp.positions[0].title}</h3>
                        </div>
                      </div>
                      <p className={styles.exps__date}>
                        Date:{' '}
                        {formatDateRange(
                          exp.positions[0].startDate,
                          exp.positions[0].endDate,
                        )}
                      </p>
                      <button
                        className="save-btn"
                        onClick={() => setSelected(exp)}
                      >
                        Edit
                      </button>
                    </>
                  ) : (
                    <>
                      <div className={styles.exps__row}>
                        <img
                          src={exp.logoUrl}
                          alt="logo company"
                          width={70}
                        />
                        <div className={styles.exps__title}>
                          <h3 className={styles.exps__name}>
                            {exp.name}
                          </h3>
                        </div>
                      </div>
                      {exp.positions.map(pos => (
                        <div
                          className={styles.exps__positions}
                          key={pos.id}
                        >
                          <h3 className={styles.exps__name}>
                            {pos.title}
                          </h3>
                          <p className={styles.exps__date}>
                            Date:{' '}
                            {formatDateRange(
                              pos.startDate,
                              pos.endDate,
                            )}
                          </p>
                        </div>
                      ))}
                      <button
                        className="save-btn"
                        onClick={() => setSelected(exp)}
                      >
                        Edit
                      </button>
                    </>
                  )}
                </div>
              ))}
            </div>
            {selected && (
              <ExperienceModal
                experience={selected}
                onClose={() => {
                  setSelected(null);
                  loadExp();
                }}
              />
            )}
          </div>
        </div>
      ) : (
        <motion.div
          className={styles.exps}
          initial={{ x: 200, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <h1 style={{ fontWeight: 400 }}>Experience</h1>
          <div className={styles.exps__experinces}>
            {experiences.map(exp => (
              <div className={styles.exps__exp_card} key={exp.id}>
                {exp.positions.length === 1 ? (
                  <>
                    <div className={styles.exps__row}>
                      <img
                        src={exp.logoUrl}
                        alt="logo company"
                        width={70}
                      />
                      <div className={styles.exps__title}>
                        <h3>{exp.name}</h3>
                        <h3>{exp.positions[0].title} </h3>
                      </div>
                    </div>
                    <p className={styles.exps__date}>
                      Date:{' '}
                      {formatDateRange(
                        exp.positions[0].startDate,
                        exp.positions[0].endDate,
                      )}
                    </p>
                  </>
                ) : (
                  <>
                    <div className={styles.exps__row}>
                      <img
                        src={exp.logoUrl}
                        alt="logo company"
                        width={70}
                      />
                      <div className={styles.exps__title}>
                        <h3 className={styles.exps__name}>
                          {exp.name}
                        </h3>
                      </div>
                    </div>
                    {exp.positions.map(pos => (
                      <div
                        className={styles.exps__positions}
                        key={pos.id}
                      >
                        <h3 className={styles.exps__name}>
                          {pos.title}
                        </h3>
                        <p className={styles.exps__date}>
                          Date:{' '}
                          {formatDateRange(
                            pos.startDate,
                            pos.endDate,
                          )}
                        </p>
                      </div>
                    ))}
                  </>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Experience;

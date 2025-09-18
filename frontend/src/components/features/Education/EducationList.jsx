import styles from './eduList.module.scss';
import EducationCard from './EducationCard';
import { degreeIcons } from '../../constants/degreeIcons';

const EducationList = ({ educations, isAdmin, onSuccess }) => {
  return (
    <div className={styles.eduList}>
      {isAdmin ? (
        // показывать для админа
        <>
          {educations.map(edu => (
            <EducationCard
              onSuccess={onSuccess}
              key={edu.id}
              education={edu}
              degreeShort={edu.degreeShort}
              degreeFull={edu.degreeFull}
              university={edu.university}
              yearStart={edu.yearStart}
              yearEnd={edu.yearEnd}
            />
          ))}
        </>
      ) : (
        // показывать на главной странице
        <>
          {educations.map(edu => (
            <div key={edu.id} className={styles.eduList__item}>
              <img
                src={degreeIcons[edu.degreeShort]}
                alt="degree icon"
                className={styles.eduList__degreeIcon}
              />
              <div className={styles.eduList__data}>
                <h1 className={styles.eduList__degreeShort}>
                  {edu.degreeShort}
                </h1>
                {/* ПК */}
                <p className={`${styles.eduList__eduPc}`}>{edu.degreeFull}</p>

                {/* Мобилки */}
                <div className={styles.eduList__eduMobile}>
                  {edu.degreeFull.split(',').map((value, idx) => (
                    <p
                      key={idx}
                      className={styles.eduList__degreeFull}
                    >
                      {value.trim()}
                    </p>
                  ))}
                </div>

                <p className={styles.eduList__university}>
                  {edu.university}
                </p>
                <p className={styles.eduList__date}>
                  {edu.yearStart} - {edu.yearEnd}
                </p>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default EducationList;

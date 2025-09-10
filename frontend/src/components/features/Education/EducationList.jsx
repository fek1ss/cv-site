import { useEffect, useState } from 'react';
import styles from './eduList.module.scss';
import Input from './../../Input/Input';
import EducationCard from './EducationCard';
import { degreeIcons } from '../../constants/degreeIcons';

const EducationList = ({ educations, onSuccess, isAdmin }) => {

  return (
    <div className={styles.eduList}>
      {isAdmin ? (
        // показывать для админа
        <>
          {educations.map(edu => (
            <EducationCard
              key={edu.id}
              education={edu}
              degreeIcons={edu.degreeShort}
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
            <div className={styles.eduList__item}>
              <img
                src={degreeIcons[edu.degreeShort]}
                alt="degree icon"
                className={styles.eduList__degreeIcon}
              />
              <div className={styles.eduList__data}>
                <h1 className={styles.eduList__degreeShort}>
                  {edu.degreeShort}
                </h1>
                <p className={styles.eduList__degreeFull}>
                  {edu.degreeFull}
                </p>
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

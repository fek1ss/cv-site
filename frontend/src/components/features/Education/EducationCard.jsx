import { useState, useEffect } from 'react';
import Input from './../../Input/Input';
import styles from './eduList.module.scss';
import { degreeIcons } from '../../constants/degreeIcons';
import { updateEducation } from '../../../api/educationApi';

const EducationCard = ({
  education,
  degreeShort,
  degreeFull,
  university,
  yearStart,
  yearEnd,
}) => {
  

  const [short, setShort] = useState(degreeShort);
  const [full, setFull] = useState(degreeFull);
  const [uni, setUni] = useState(university);
  const [start, setStart] = useState(yearStart);
  const [end, setEnd] = useState(yearEnd);

  useEffect(() => {
    setShort(degreeShort);
    setFull(degreeFull);
    setUni(university);
    setStart(yearStart);
    setEnd(yearEnd);
  }, [degreeShort, degreeFull, university, yearStart, yearEnd, education]);


  const handleUpdate = () => {
    try {
      updateEducation({
        id: education.id,
        degreeShort: short,
        degreeFull: full,
        university: uni,
        yearStart: start,
        yearEnd: end
      });
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className={styles.eduList__item}>
      <img
        src={degreeIcons[education.degreeShort]}
        alt="degree icon"
        className={styles.eduList__degreeIcon}
      />
      <div className={styles.eduList__data}>
        <Input
          label="Short degree:"
          type="text"
          value={short}
          onChange={setShort}
          color="white"
        />
        <Input
          label="Full degree:"
          type="text"
          value={full}
          onChange={setFull}
          color="white"
        />
        <Input
          label="University:"
          type="text"
          value={uni}
          onChange={setUni}
          color="white"
        />
        <Input
          label="Year Start:"
          type="text"
          value={start}
          onChange={setStart}
          color="white"
        />
        <Input
          label="Year End:"
          type="text"
          value={end}
          onChange={setEnd}
          color="white"
        />
      </div>
      <button
        onClick={handleUpdate}
        className="save-btn"
      >
        Edit
      </button>
    </div>
  );
};

export default EducationCard;

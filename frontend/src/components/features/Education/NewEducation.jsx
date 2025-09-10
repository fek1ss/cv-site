import styles from './newedu.module.scss';
import Input from './../../Input/Input';
import { useState } from 'react';

const NewEducation = ({ onSuccess }) => {
  const [degreeShort, setDegreeShort] = useState('');
  const [degreeFull, setDegreeFull] = useState('');
  const [university, setUniversity] = useState('');
  const [yearStart, setYearStart] = useState(null);
  const [yearEnd, setYearEnd] = useState(null);

  
  return (
    <div className={styles.newEdu}>
      <Input
        label="Degree (short version):"
        type="text"
        value={degreeShort}
        onChange={setDegreeShort}
        color='white'
      />
      <Input
        label="Full degree name:"
        type="text"
        value={degreeFull}
        onChange={setDegreeFull}
        color='white'
      />
      <Input
        label="University:"
        type="text"
        value={university}
        onChange={setUniversity}
        color='white'
      />
      <Input
        label="Year Start:"
        type="number"
        value={yearStart}
        onChange={setYearStart}
        color='white'
      />
      <Input
        label="Year End:"
        type="number"
        value={yearEnd}
        onChange={setYearEnd}
        color='white'
      />
    </div>
  );
};

export default NewEducation;

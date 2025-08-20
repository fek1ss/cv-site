import { useState } from 'react';
import styles from './styles.module.scss';
import {addCompany} from '../../api/experience';

const NewExperience = ({onCompanyId}) => {
  const [name, setName] = useState('');
  const [icon, setIcon] = useState(null);
  const [isCompanyId, setIsCompanyId] = useState(null); 


  const handleCreate = async(e) => {
    e.preventDefault();
    try {
      const data = await addCompany({name, icon});
      onCompanyId(data.companyId);
      setIsCompanyId(data.companyId);
    }catch (e) {
      console.log(e)
    }
  }

  return (
    <div className={styles.newExp}>
      <h1>Where did/do you work?</h1>
      <form onSubmit={handleCreate} className={styles.newExp__container}>
        <label>
          Name compnay:
          <input type="text" className={styles.newExp__name} onChange={e => setName(e.target.value)} />
        </label>
        <label htmlFor="">
          Logo company: (not necessary)
          <input type="file" onChange={e => setIcon(e.target.files[0])} />
        </label>
        {
          isCompanyId == null ? (
            <button type='submit'>continue</button>
          ) : (
            <p className='success-message'>the company is saved</p>
          )
        }
      </form>
    </div>
  )
}

export default NewExperience;
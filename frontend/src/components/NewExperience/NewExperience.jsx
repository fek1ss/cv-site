import { useState } from 'react';
import styles from './styles.module.scss';
import {addCompany, updateCompany} from '../../api/experience';

const NewExperience = ({onCompanyId}) => {
  const [name, setName] = useState('');
  const [icon, setIcon] = useState(null);
  const [isCompanyId, setIsCompanyId] = useState(null); 
  const [show, setShow] = useState(true);


  const handleCreate = async(e) => {
    e.preventDefault()
    try {
      const data = await addCompany({name, icon});
      onCompanyId(data.companyId);
      setIsCompanyId(data.companyId);
      setShow(prev => !prev)
    }catch (e) {
      console.log(e);
      alert("Не удалось создать компанию");
    }
  }

  const handleChange = async(e) => {
    e.preventDefault()
    try {
      const data = await updateCompany({name, icon, id: isCompanyId});
      if(data.message === 'Company updated') setShow(prev => !prev)
    } catch (e) {
      console.log(e)
    }
  }


  return (
    <div className={styles.newExp}>
      {
        show ? (
          <>
        <h1>Where did/do you work?</h1>
      <form className={styles.newExp__container}>
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
            <button onClick={handleCreate}>continue</button>
          ) : (
            <button onClick={handleChange}>save</button>
          )
        }
      </form>
      </>
        ) : (
          <button onClick={()=> setShow(prev => !prev)}>Change</button>
        )
      }
    </div>
  )
}

export default NewExperience;
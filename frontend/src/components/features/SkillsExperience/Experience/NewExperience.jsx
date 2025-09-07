import { useState } from 'react';
import styles from './newexp.module.scss';
import { addCompany, updateCompany } from '../../../../api/experience';
import Input from './../../../Input/Input';

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
        <Input label="Name company" type="text" value={name} onChange={setName} color='#04152D' />
        <Input label="Logo company: (not necessary)" onChange={setIcon} type='file' color='#04152D'  />
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
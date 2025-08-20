import { useEffect, useState } from 'react';
import styles from '../../components/Experience/styles.module.scss';
import { getExperience } from '../../api/experience';
import { formatDateRange } from '../../utils/date';
import NewExperience from './../../components/NewExperience/NewExperience';
import NewPosition from '../../components/NewExperience/NewPosition';

const ExperienceAdmin = () => {
  const [experiences, setExperiences] = useState([]);
  const [isCreate, setIsCreate] = useState(false);
  const [companyId, setCompanyId] = useState(null);
  
    useEffect(()=> {
      loadExp();
    },[])

    const loadExp = async() => {
      try {
        const data = await getExperience();
        setExperiences(data);
      } catch (err) {
        console.log("Error when receiving data")
      }
    }

    

  return (
    <div className={styles.exps_adm}>
      <h1 style={{fontWeight:400}}>Experience</h1>
      <div 
        className={styles.exps_adm__create} 
        onClick={()=>setIsCreate(prev => !prev)}
      >
        {isCreate ? "cancel":"add experience"}
      </div>
      
      {/* Создание компании  */}
      {
        isCreate  && (<NewExperience onCompanyId={setCompanyId} />)
      }

      {/* Создание позиции к этой компании  */}
      {
        companyId && (
          <NewPosition />
        )
      }
      <div className={`${styles.exps__experiences} ${styles.exps_adm__cards}`}>
        {experiences.map(exp => (
          <div className={`${styles.exps__exp_card} ${styles.exps_adm__card}`} key={exp.id}>
            {
              exp.positions.length === 1 ? (
                <>
                  <div className={styles.exps__row}>
                    <img src={exp.logoUrl} alt="logo company" width={70} />
                    <div className={styles.exps__title}>
                      <h3>{exp.name}</h3>
                      <h3>{exp.positions[0].title} </h3>
                    </div>
                  </div>
                  <p className={styles.exps__date}>
                    Date: {formatDateRange(exp.positions[0].startDate, exp.positions[0].endDate)}
                  </p>
                </>
              ) : (
                <>
                  <div className={styles.exps__row}>
                    <img src={exp.logoUrl} alt="logo company" width={70} />
                    <div className={styles.exps__title}>
                      <h3 className={styles.exps__name}>{exp.name}</h3>
                    </div>
                  </div>
                  {
                    exp.positions.map(pos => (
                      <div className={styles.exps__positions} key={pos.id}>
                        <h3 className={styles.exps__name}>{pos.title}</h3>
                        <p className={styles.exps__date}>
                          Date: {formatDateRange(pos.startDate, pos.endDate)}
                        </p>
                      </div>
                    ))
                  }
                </>
              )
            }
          </div>
        ))}
      </div>
    </div>
  )
}

export default ExperienceAdmin;
import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { getExperience } from '../../api/experience';
import { formatDateRange } from './../../utils/date';

const Experience = () => {
  const [experiences, setExperiences] = useState([]);

  useEffect(()=> {
    try {
      getExperience()
        .then(data => {
          setExperiences(data)
        })
        
    } catch(err) {
      console.log(err)
    }
  },[])

  return (
    <div className={styles.exps}>
      <h1 style={{fontWeight:400}}>Experience</h1>
      <div className={styles.exps__experinces}>
        {experiences.map(exp => (
          <div className={styles.exps__exp_card} key={exp.id}>
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

export default Experience;
import { useEffect, useState } from "react";
import { me } from "../../api/userApi";
import { useNavigate } from "react-router-dom";
import styles from '../../components/Aboutme/styles.module.scss';
import { getAbout, updateAbout } from "../../api/aboutApi";

const AboutAdmin = () => {
  const [text, setText] = useState("");
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const [status, setStatus] = useState(false);

  useEffect(()=> {
    me()
      .then(() => setStatus(true))
      .catch(()=> navigate('/login'));

    getAbout()
      .then(data => setText(data[0].text))
      .catch(data => setMessage(data))
  },[])

  const handleUpdate = async(e)=> {
    e.preventDefault();
    
    try {
      const data = await updateAbout(text);
      if(data) {
        setMessage(data.message)
        setTimeout(()=> {
          setMessage("")
        },1000)
      }
    } catch (err) {
      console.log("Err: ", err)
    }
  }

  if (!status) return <p>loading...</p>
  
  return (
    <div className={styles.about__adminAbout}>
      <p className='back' onClick={()=> navigate(-1)}> back </p>
      <form onSubmit={handleUpdate} className={styles.about}>
        <div className={styles.about__info}>
            <div className={styles.about__adm_title}>
              <h1 className={styles.about__title}>About me</h1> 
              <p className="success-message">{message}</p>
            </div>
            <textarea className="textarea" value={text} onChange={e => setText(e.target.value)}>
            </textarea>
            <button type="submit" className="save-btn">Save</button>
        </div>
        
      </form>
    </div>
  )
}

export default AboutAdmin;
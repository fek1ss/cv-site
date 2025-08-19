import styles from './styles.module.scss';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { me } from "../../api/userApi";
import { Link } from "react-router";

const Admin = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(()=> {
    me()
      .then(data => setUser(data))
      .catch(()=> navigate('/login'));
  },[])

  if (!user) return <p>loading...</p>

  return (
    <div className={styles.admin}>
      <h1>Welcome, {user.name}</h1>
      <h4>What do you want to edit?</h4>
      <nav className={styles.admin__nav}>
        <Link to='/admin/hero'> Hero</Link>
        <Link to='/admin/about'> About me</Link>
        <Link to='/admin/skills'> Skills</Link>
        <Link to='/admin/experience'> Experience</Link>
        <Link to='/admin/article'> Article</Link>
        <Link to='/admin/contacts'> Contacts</Link>
      </nav>
      <p className='back' style={{fontSize:'1rem'}} onClick={()=> navigate("/")}> back to Home </p>
    </div>
  )
}

export default Admin;
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { me } from "../../api/userApi";

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
    <div>
      <h1>Welcome, {user.name}</h1>
    </div>
  )
}

export default Admin;
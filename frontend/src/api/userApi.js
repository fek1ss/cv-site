const API_URL = import.meta.env.VITE_API_URL;

export const login = async({email, password}) => {
  try {
    const res = await fetch(`${API_URL}/api/users/login`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email,password})
    });
    
    if(!res.ok) throw new Error("Invalid email or password");

    const data = await res.json();
    localStorage.setItem("token", data.token)
    
    return data;
  } catch (err) {
    console.error("Login error:", err);
    throw err;
  }
}

export const me = async () => {
  const token = localStorage.getItem("token"); 
  if (!token) throw new Error("No token");

  const res = await fetch("http://localhost:5000/api/users/me", {
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Unauthorized");

  return res.json(); 
};

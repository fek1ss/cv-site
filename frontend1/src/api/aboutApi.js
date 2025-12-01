  const API_URL = import.meta.env.VITE_API_URL;

export const getAbout = async() => {
  const res = await fetch(`${API_URL}/api/about`);
  return res.json();
}

export const updateAbout = async(text) => {
  try {
    const res = await fetch(`${API_URL}/api/about/1`, {
      method: 'PUT',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({text})
    })

    if(!res.ok) throw new Error("Error during the update");
    
    const data = await res.json();
    return data
  } catch (err) {
    console.log(err)
  }
}
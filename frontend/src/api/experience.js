const API_URL = import.meta.env.VITE_API_URL;

export const getExperience = async() => {
  const res = await fetch(`${API_URL}/api/company`);
  return res.json()
}

export const addCompany = async({name, icon}) => {
  try {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("icon", icon);
    const res = await fetch(`${API_URL}/api/company`, {
      method: 'POST',
      body: formData
    })

    if (!res.ok) throw new Error("Something wrong....");
    const data = await res.json();
    return data;
  } catch(err) {
    console.log(err)
  }
}
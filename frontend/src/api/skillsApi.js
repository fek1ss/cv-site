const API_URL = import.meta.env.VITE_API_URL;

export const getSkills = async() => {
  const res = await fetch(`${API_URL}/api/skills`);
  return res.json();
}

export const updateSkills = async({id, name, icon}) => {
  try {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("icon", icon);
  
    const res = await fetch(`${API_URL}/api/skills/${id}`, {
      method: 'PATCH', 
      body: formData
    });

    if(!res.ok) throw new Error("Something wrong...");
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

export const deleteSkill = (id) => {
  return fetch(`${API_URL}/api/skills/${id}`, {
    method: 'DELETE'
  })
}

export const addSkill = async({name, icon}) => {
  try {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("icon", icon);

    const res = await fetch(`${API_URL}/api/skills`, {
    method: "POST",
    body: formData
  })

  if (!res.ok) throw new Error("Something wrong....");

  const data = await res.json();
  return data;
  } catch (err) {
    console.log(err)
  }
}
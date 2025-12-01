const API_URL = import.meta.env.VITE_API_URL;

export const getContacts = async() => {
  const res = await fetch(`${API_URL}/api/contact`);
  return res.json();
}

export const addContanct = async(label, link, icon) => {
  const formData = new FormData();
  formData.append("label", label);
  formData.append("link", link);
  if(icon) {
    formData.append("icon", icon)
  }

  const res = await fetch(`${API_URL}/api/contact`, {
    method: 'POST',
    body:formData
  })

  if(!res.ok) throw new Error("Something wrong..."); 
  const data = await res.json();
  return data;
}

export const updateContact = async(label, link, icon, id) => {
  const formData = new FormData();
  formData.append("label", label);
  formData.append("link", link);
  if(icon) {
    formData.append("icon", icon)
  }

  const res = await fetch(`${API_URL}/api/contact/${id}`, {
    method: 'PATCH',
    body: formData
  })

  if(!res.ok) throw new Error("Something wrong...");
  const data = await res.json();
  return data;
}

export const deleteContact = async(id) => {
  return await fetch(`${API_URL}/api/contact/${id}`, {
    method: 'DELETE'
  })
}
const API_URL = import.meta.env.VITE_API_URL;

export const getEducations = async() => {
  const res = await fetch(`${API_URL}/api/education`);
  return res.json();
}

export const createEducation = async({degreeShort, degreeFull, university, yearStart, yearEnd}) => {
  const res = await fetch(`${API_URL}/api/education`, {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({degreeShort, degreeFull, university, yearStart, yearEnd})
  })

  if(!res.ok) throw new Error("Error during the create");
    
  const data = await res.json();
  return data; 
}

export const updateEducation = async({id, degreeShort, degreeFull, university, yearStart, yearEnd}) => {
  const res = await fetch(`${API_URL}/api/education/${id}`, {
    method: 'PATCH',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({degreeShort, degreeFull, university, yearStart, yearEnd})
  })

  if(!res.ok) throw new Error("Error during the update1");
    
  const data = await res.json();
  return data;
}

export const deleteEducation = (id) => {
  return fetch(`${API_URL}/api/education/${id}`, {
    method: 'DELETE'
  })
} 

const API_URL = import.meta.env.VITE_API_URL;


export const createPosition = async({title, startDate, endDate, companyId}) => {
  const res = await fetch(`${API_URL}/api/position`, {
    method: "POST",
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({title, startDate, endDate, companyId})
  })

  if(!res.ok) throw new Error("Error during the update");
  const data = await res.json();
  return data
}

export const updatePosition = async ({id, title, startDate, endDate, companyId}) => {
  const res = await fetch(`${API_URL}/api/position/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({title, startDate, endDate, companyId}),
  });

  if (!res.ok) throw new Error("Error updating position");
  return res.json();
};
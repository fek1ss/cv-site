const API_URL = import.meta.env.VITE_API_URL;

export const getArticles = async() => {
  const res = await fetch(`${API_URL}/api/articles`);
  return res.json();
}

export const updateArticle = async(id, title, link) => {
  const res = await fetch(`${API_URL}/api/articles/${id}`, {
    method: 'PUT',
    headers: {'Content-Type':'application/json'},
    body:JSON.stringify({title, link})
  });

  if(!res.ok) throw new Error("Error during the update");
    
  const data = await res.json();
  return data
}

export const addArticle = async(title, link) => {
  const res = await fetch(`${API_URL}/api/articles`, {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body:JSON.stringify({title, link})
  });

  if(!res.ok) throw new Error("Error during the update");
    
  const data = await res.json();
  return data
}

export const deleteArticle = async(id) => {
  return await fetch(`${API_URL}/api/articles/${id}`, {
    method: 'DELETE'
  })
}
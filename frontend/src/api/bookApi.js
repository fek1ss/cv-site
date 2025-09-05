const API_URL = import.meta.env.VITE_API_URL;

export const getBooks = async() => {
  const res = await fetch(`${API_URL}/api/books`);
  return res.json();
}

export const createBook = async({title, description, link}) => {
  const formData = FormData();
  formData.append('title', title);
  formData.append('description', description);
  formData.append('link', link);

  const res = await fetch(`${API_URL}/api/books`, {
    method: 'POST',
    body: formData
  })

  if (!res.ok) throw new Error('Something wrong....');

  const data = await res.json();
  return data;
}

export const updateBook = async({id, title, description, link }) => {
  const formData = FormData();
  formData.append('title', title);
  formData.append('description', description);
  formData.append('link', link);

  const res = await fetch(`${API_URL}/api/books`, {
    method: 'PUT',
    body: formData
  })

  if (!res.ok) throw new Error('Something wrong....');

  const data = await res.json();
  return data;
};

export const deleteBook = (id) => {
  return fetch(`${API_URL}/api/books/${id}`, {
    method: 'DELETE'
  });
}
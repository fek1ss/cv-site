const API_URL = import.meta.env.VITE_API_URL;

export const getBooks = async() => {
  const res = await fetch(`${API_URL}/api/books`);
  return res.json();
}

export const createBook = async(title, description, link, author) => {
  const res = await fetch(`${API_URL}/api/books`, {
    method: 'POST',
    headers: {'Content-type':'application/json'},
    body: JSON.stringify({title, description, link, author})
  })

  if (!res.ok) throw new Error('Something wrong....');

  const data = await res.json();
  return data;
}

export const updateBook = async(id, title, description, link, author) => {
  const res = await fetch(`${API_URL}/api/books/${id}`, {
    method: 'PATCH',
    headers: {'Content-type':'application/json'},
    body: JSON.stringify({ title, description, link, author })
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
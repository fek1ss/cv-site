const API_URL = import.meta.env.VITE_API_URL;

export const getProject = async () => {
  const res = await fetch(`${API_URL}/api/projects`);
  return res.json();
};

export const createProject = async ({
  name,
  description,
  dateStart,
  dateEnd,
  imageUrl,
  link,
}) => {
  const formData = new FormData();
  formData.append('name', name);
  formData.append('description', description);
  formData.append('dateStart', dateStart);
  formData.append('dateEnd', dateEnd);
  formData.append('imageUrl', imageUrl);
  formData.append('link', link);

  const res = await fetch(`${API_URL}/api/projects`, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) throw new Error('Something wrong....');

  const data = await res.json();
  return data;
};

export const updateProject = async({
  id,
  name,
  description,
  dateStart,
  dateEnd,
  imageUrl,
  link,
}) => {
  const formData = FormData();
  formData.append('name', name);
  formData.append('description', description);
  formData.append('dateStart', dateStart);
  formData.append('dateEnd', dateEnd);
  formData.append('imageUrl', imageUrl);
  formData.append('link', link);

  const res = await fetch(`${API_URL}/api/projects/${id}`, {
    method: 'PATCH',
    body: formData
  })

  if (!res.ok) throw new Error('Something wrong....');

  const data = await res.json();
  return data;
}

export const deleteProject = (id) => {
  return fetch(`${API_URL}/api/projects/${id}`, {
    method: 'DELETE'
  })
}

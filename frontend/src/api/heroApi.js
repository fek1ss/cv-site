const API_URL = import.meta.env.VITE_API_URL;

export const getHero = async () => {
  const res = await fetch(`${API_URL}/api/hero`);
  return res.json();
};

export const updateHero = async (id, formData) => {
  try {
    const res = await fetch(`${API_URL}/api/hero/${id}`, {
      method: 'PATCH',
      body: formData,
    });
    console.log('Update hero url:', `${API_URL}/api/hero/${id}`);
    console.log('id:', id);

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || `Error ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    console.error('updateHero error:', err);
    return null;
  }
};

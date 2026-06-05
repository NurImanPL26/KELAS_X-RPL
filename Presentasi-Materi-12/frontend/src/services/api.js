// Helper untuk memanggil Backend API
const BASE_URL = 'http://localhost:5000/api';

async function request(method, path, body = null) {
  const options = {
    method,
    headers: { 'Content-Type': 'application/json' },
  };
  if (body) options.body = JSON.stringify(body);

  const res = await fetch(`${BASE_URL}${path}`, options);
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Request gagal');
  return data;
}

// ── Hero ───────────────────────────────────────────────────
export const heroApi = {
  get:    ()       => request('GET',  '/hero'),
  update: (data)   => request('PUT',  '/hero', data),
};

// ── About ──────────────────────────────────────────────────
export const aboutApi = {
  get:    ()       => request('GET',  '/about'),
  update: (data)   => request('PUT',  '/about', data),
};

// ── News ───────────────────────────────────────────────────
export const newsApi = {
  getAll: ()       => request('GET',    '/news'),
  create: (data)   => request('POST',   '/news', data),
  update: (id, d)  => request('PUT',    `/news/${id}`, d),
  delete: (id)     => request('DELETE', `/news/${id}`),
};

// ── Announcements ──────────────────────────────────────────
export const annApi = {
  getAll: ()       => request('GET',    '/announcements'),
  create: (data)   => request('POST',   '/announcements', data),
  update: (id, d)  => request('PUT',    `/announcements/${id}`, d),
  delete: (id)     => request('DELETE', `/announcements/${id}`),
};

// ── Majors ─────────────────────────────────────────────────
export const majorsApi = {
  getAll: ()       => request('GET',    '/majors'),
  create: (data)   => request('POST',   '/majors', data),
  update: (id, d)  => request('PUT',    `/majors/${id}`, d),
  delete: (id)     => request('DELETE', `/majors/${id}`),
};

// ── Gallery ────────────────────────────────────────────────
export const galleryApi = {
  getAll: ()       => request('GET',    '/gallery'),
  create: (data)   => request('POST',   '/gallery', data),
  delete: (id)     => request('DELETE', `/gallery/${id}`),
};

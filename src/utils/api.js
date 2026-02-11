const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000';

export async function apiFetch(path, opts = {}){
  const headers = opts.headers || {};
  if (opts.token) headers['Authorization'] = `Bearer ${opts.token}`;
  if (opts.body && !(opts.body instanceof FormData)){
    headers['Content-Type'] = 'application/json';
    opts.body = JSON.stringify(opts.body);
  }
  const res = await fetch(API_BASE + path, {...opts, headers});
  const text = await res.text();
  try { return JSON.parse(text); } catch(e){ return text; }
}

export default apiFetch;

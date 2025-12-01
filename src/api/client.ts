const API_URL = import.meta.env.VITE_API_URL 

/**
 * Función que se encarga de hacer fetch a la api dada la ruta y las opciones pasadas,
 * method, body y headers deben ser pasados desde los metodos
 */
export const apiFetch = async <T = any>(
  path: string,
  options: RequestInit = {}
): Promise<T> => {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => {});
    throw new Error(
      JSON.stringify({
        status: res.status,
        error: err,
        message: err.detail || "API error",
      })
    );
  }

  return res.json();
};

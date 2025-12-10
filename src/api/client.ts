const API_URL = import.meta.env.VITE_API_URL;

export class ApiError extends Error {
  status: number;
  detail: string;

  constructor(status: number, detail: string) {
    super(`API Error: ${status}`);
    this.status = status;
    this.detail = detail;
  }
}

/**
 * Función que se encarga de hacer fetch a la api dada la ruta y las opciones pasadas
 * (method, body y headers deben ser pasados desde los metodos)
 * @params path: string, options: RequestInit
 */
export const apiFetch = async <T>(
  path: string,
  options: RequestInit = {},
): Promise<T> => {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => {});
    throw new ApiError(res.status, err.detail); // err.detail es un json/objeto que contiene los detalles del error
  }

  return res.json();
};

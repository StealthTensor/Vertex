const API_BASE = process.env.NEXT_PUBLIC_URL || "";
const API_KEY = process.env.NEXT_PUBLIC_VALIDATION_KEY || "";

type Json = Record<string, any>;

type RequestOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: any;
  token?: string;
  headers?: Record<string, string>;
};

async function request<T = any>(path: string, opts: RequestOptions = {}): Promise<T> {
  const { method = "GET", body, token, headers = {} } = opts;
  const url = `${API_BASE}${path}`;

  const res = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { "X-CSRF-Token": token } : {}),
      ...headers,
    },
    ...(body !== undefined ? { body: typeof body === "string" ? body : JSON.stringify(body) } : {}),
  });

  const text = await res.text();
  let data: any = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }

  if (!res.ok) {
    const err: any = new Error(
      typeof data === "string" ? data : data?.error || data?.message || `HTTP ${res.status}`
    );
    (err.status = res.status), (err.data = data);
    throw err;
  }
  return data as T;
}

export const api = {
  login: async (params: { account: string; password: string; cdigest?: string; captcha?: string }) => {
    const res = await fetch(`${API_BASE}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": API_KEY, 
      },
      body: JSON.stringify(params),
    });

    const text = await res.text();
    let data: any = null;
    try {
      data = text ? JSON.parse(text) : null;
    } catch {
      data = text;
    }

    if (!res.ok && res.status !== 400 && res.status !== 403) {
      const err: any = new Error(
        typeof data === "string" ? data : data?.error || data?.message || `HTTP ${res.status}`
      );
      err.status = res.status;
      err.data = data;
      throw err;
    }

    return data as Json;
  },
  
  logout: (token: string) => request<Json>("/logout", { method: "DELETE", token }),
  attendance: (token: string) => request<Json>("/attendance", { token }),
  marks: (token: string) => request<Json>("/marks", { token }),
  timetable: (token: string) => request<Json>("/timetable", { token }),
  courses: (token: string) => request<Json>("/courses", { token }),
  user: (token: string) => request<Json>("/user", { token }),
  calendar: (token: string) => request<Json>("/calendar", { token }),
  get: (token: string) => request<Json>("/get", { token }),
};
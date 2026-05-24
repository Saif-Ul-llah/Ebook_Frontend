import { API_BASE_URL } from "./constants";
import type { ApiResponse, AuthTokens, Manuscript, ManuscriptPayload } from "./types";

type RequestOptions = {
  token?: string | null;
};

async function request<T>(
  path: string,
  init: RequestInit = {},
  options: RequestOptions = {}
) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(options.token ? { Authorization: `Bearer ${options.token}` } : {}),
      ...init.headers,
    },
  });

  const payload = (await response.json()) as ApiResponse<T>;

  if (!response.ok) {
    throw new Error(payload.message || "Request failed");
  }

  return payload;
}

export function login(email: string, password: string) {
  return request<AuthTokens>("/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export function register(input: {
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
}) {
  return request("/register", {
    method: "POST",
    body: JSON.stringify({ ...input, role: "CUSTOMER" }),
  });
}

export function forgotPassword(email: string) {
  return request("/forgot-password", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}

export function submitManuscript(payload: ManuscriptPayload, token?: string | null) {
  return request<Manuscript>(
    "/manuscripts",
    {
      method: "POST",
      body: JSON.stringify(payload),
    },
    { token }
  );
}

export function getMyManuscripts(token: string) {
  return request<Manuscript[]>("/my-manuscripts", {}, { token });
}

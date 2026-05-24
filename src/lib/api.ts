import { API_BASE_URL } from "./constants";
import type {
  AdminOverview,
  AdminUser,
  ApiResponse,
  AuthTokens,
  Manuscript,
  ManuscriptPayload,
} from "./types";

type RequestOptions = {
  token?: string | null;
};

async function request<T>(
  path: string,
  init: RequestInit = {},
  options: RequestOptions = {}
) {
  const isFormData = init.body instanceof FormData;
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
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
  const formData = new FormData();
  formData.append("fullName", payload.fullName);
  formData.append("lastName", payload.lastName ?? "");
  formData.append("email", payload.email);
  formData.append("phoneNumber", payload.phoneNumber);
  formData.append("serviceType", payload.serviceType);
  formData.append("projectTitle", payload.projectTitle);
  formData.append("genre", payload.genre);
  formData.append("message", payload.message ?? "");

  if (payload.manuscript) {
    formData.append("manuscript", payload.manuscript);
  }

  return request<Manuscript>(
    "/manuscripts",
    {
      method: "POST",
      body: formData,
      headers: {},
    },
    { token }
  );
}

export function getMyManuscripts(token: string) {
  return request<Manuscript[]>("/my-manuscripts", {}, { token });
}

export function claimMyManuscripts(token: string) {
  return request<Manuscript[]>(
    "/my-manuscripts/claim",
    {
      method: "POST",
      body: JSON.stringify({}),
    },
    { token }
  );
}

export function updateMyManuscript(
  token: string,
  manuscriptId: string,
  payload: ManuscriptPayload
) {
  return request<Manuscript>(
    `/my-manuscripts/${manuscriptId}`,
    {
      method: "PUT",
      body: JSON.stringify({
        fullName: payload.fullName,
        lastName: payload.lastName ?? "",
        email: payload.email,
        phoneNumber: payload.phoneNumber,
        serviceType: payload.serviceType,
        projectTitle: payload.projectTitle,
        genre: payload.genre,
        message: payload.message ?? "",
      }),
    },
    { token }
  );
}

export function getAdminOverview(token: string) {
  return request<AdminOverview>("/admin/overview", {}, { token });
}

export function getAdminManuscripts(token: string) {
  return request<Manuscript[]>("/admin/manuscripts", {}, { token });
}

export function getAdminUsers(token: string) {
  return request<AdminUser[]>("/admin/users", {}, { token });
}

export function updateAdminUserStatus(token: string, userId: string, isActive: boolean) {
  return request<AdminUser>(
    `/admin/users/${userId}/status`,
    {
      method: "PATCH",
      body: JSON.stringify({ isActive }),
    },
    { token }
  );
}

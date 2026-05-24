export type Service = {
  slug: string;
  title: string;
  kicker: string;
  description: string;
  features: string[];
};

export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

export type ApiResponse<T> = {
  status?: string;
  message: string;
  data: T;
};

export type ManuscriptPayload = {
  fullName: string;
  lastName?: string;
  email: string;
  phoneNumber: string;
  serviceType: string;
  projectTitle: string;
  genre: string;
  message?: string;
};

export type Manuscript = ManuscriptPayload & {
  id: string;
  status: "NEW" | "IN_REVIEW" | "CONTACTED" | "CLOSED";
  createdAt: string;
};

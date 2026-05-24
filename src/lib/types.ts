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
  user?: AuthUser;
};

export type AuthUser = {
  id: string;
  role: "ADMIN" | "SUB_ADMIN" | "DISTRIBUTOR" | "INSTALLER" | "CUSTOMER";
  fullName: string;
  email: string;
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
  manuscript?: File | null;
};

export type Manuscript = ManuscriptPayload & {
  id: string;
  status: "NEW" | "IN_REVIEW" | "CONTACTED" | "CLOSED";
  createdAt: string;
  fileKey?: string;
  fileName?: string;
  fileType?: string;
  fileSize?: number;
  fileUrl?: string;
};

export type AdminOverview = {
  totals: {
    users: number;
    manuscripts: number;
    todayManuscripts: number;
  };
  statuses: {
    new: number;
    inReview: number;
    contacted: number;
    closed: number;
  };
  serviceBreakdown: Array<{
    serviceType: string;
    count: number;
  }>;
  recentManuscripts: Manuscript[];
};

export interface LoginAttempt {
  id: number;
  email: string;
  userId: number | null;
  success: boolean;
  // 'user_not_found' | 'password_mismatch' | null(성공)
  failureReason: string | null;
  ip: string | null;
  country: string | null;
  city: string | null;
  userAgent: string | null;
  createdAt: string;
}

export interface LoginAttemptPage {
  items: LoginAttempt[];
  total: number;
  pageIndex: number;
  pageSize: number;
}

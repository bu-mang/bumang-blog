import { END_POINTS } from "@/constants/api/endpoints";
import ClientInstance from "@/services/lib/axios";
import { ContentViewPage, LoginAttemptPage } from "@/types/auditLog";

export const getLoginAttempts = async (
  pageIndex: number,
  pageSize: number,
): Promise<LoginAttemptPage> => {
  const res = await ClientInstance.get<LoginAttemptPage>(
    END_POINTS.GET_LOGIN_ATTEMPTS(pageIndex, pageSize),
  );
  return res.data;
};

export const getContentViews = async (
  pageIndex: number,
  pageSize: number,
): Promise<ContentViewPage> => {
  const res = await ClientInstance.get<ContentViewPage>(
    END_POINTS.GET_CONTENT_VIEWS(pageIndex, pageSize),
  );
  return res.data;
};

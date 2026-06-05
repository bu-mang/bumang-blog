import { END_POINTS } from "@/constants/api/endpoints";
import ClientInstance from "@/services/lib/axios";
import {
  CreateUserGroupDto,
  UpdateUserGroupDto,
  UserGroup,
} from "@/types/userGroup";

export const getUserGroups = async (): Promise<UserGroup[]> => {
  const res = await ClientInstance.get<UserGroup[]>(END_POINTS.GET_USER_GROUPS);
  return res.data;
};

export const createUserGroup = async (
  dto: CreateUserGroupDto,
): Promise<UserGroup> => {
  const res = await ClientInstance.post<UserGroup>(
    END_POINTS.POST_USER_GROUP,
    dto,
  );
  return res.data;
};

export const updateUserGroup = async (
  id: number,
  dto: UpdateUserGroupDto,
): Promise<UserGroup> => {
  const res = await ClientInstance.patch<UserGroup>(
    END_POINTS.PATCH_USER_GROUP(id),
    dto,
  );
  return res.data;
};

export const deleteUserGroup = async (id: number): Promise<void> => {
  await ClientInstance.delete(END_POINTS.DELETE_USER_GROUP(id));
};

export const addUserGroupMember = async (
  groupId: number,
  userId: number,
): Promise<void> => {
  await ClientInstance.post(END_POINTS.POST_USER_GROUP_MEMBER(groupId), {
    userId,
  });
};

export const removeUserGroupMember = async (
  groupId: number,
  userId: number,
): Promise<void> => {
  await ClientInstance.delete(
    END_POINTS.DELETE_USER_GROUP_MEMBER(groupId, userId),
  );
};

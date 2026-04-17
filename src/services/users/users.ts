import { apiClient } from "@/services/api";
import { User } from "@/types/auth";

export type UserPatch = Partial<
  Pick<User, "first_name" | "username" | "default_currency" | "timezone">
>;

export const usersService = {
  updateUser: async (id: number, patch: UserPatch): Promise<User> => {
    const response = await apiClient.patch(`/api/users/${id}/`, patch);
    return response.data;
  },
};

import { useMutation } from "@tanstack/react-query";
import { usersService, UserPatch } from "@/services/users/users";
import { useAuthStore } from "@/store/authStore";

export const useUpdateUser = () => {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: (patch: UserPatch) => {
      if (!user) {
        throw new Error("No authenticated user");
      }
      return usersService.updateUser(user.id, patch);
    },
    onSuccess: (updated) => {
      setUser(updated);
    },
  });
};

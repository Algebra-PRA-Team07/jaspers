import { useAuthUser, UserData } from "@/hooks/useAuthUser.ts";

export const useAuthUserUsklicnik = (): UserData => {
    const user = useAuthUser();

    return user!;
};

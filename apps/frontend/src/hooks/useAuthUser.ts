import { useMemo } from "react";

import { useAuthToken } from "@/hooks/useAuthToken.ts";

// TODO: types are a mess
export type UserData = {
    email: string;
    name: string;
    picture?: string;
};

export const useAuthUser = (): UserData | null => {
    const token = useAuthToken();

    return useMemo(() => {
        if (!token) return null;

        console.log(token);

        try {
            const split = token.split(".");

            if (split.length !== 3) return null;

            const data = JSON.parse(atob(split[1]));

            console.log(data);

            return data as UserData;
        } catch {
            // 💥
            return null;
        }
    }, [token]);
};

import { useMemo } from "react";

import { LOCALSTORAGE_AUTH_KEY } from "@/pages/Login.tsx";

export const useAuthToken = () => {
    return useMemo(() => {
        const token = localStorage.getItem(LOCALSTORAGE_AUTH_KEY);

        if (!token) return null;

        return token;
    }, []);
};

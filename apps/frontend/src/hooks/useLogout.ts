import { useCallback } from "react";
import { useNavigate } from "react-router";

import { LOCALSTORAGE_AUTH_KEY } from "@/pages/Login.tsx";

export const useLogout = () => {
    const navigate = useNavigate();

    return useCallback(() => {
        localStorage.removeItem(LOCALSTORAGE_AUTH_KEY);

        navigate("/auth/login");
    }, [navigate]);
};

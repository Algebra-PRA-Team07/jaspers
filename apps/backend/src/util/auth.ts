import jsonwebtoken from "jsonwebtoken";
import md5 from "md5";

import { Globals } from "../globals";
import { OidcTokenData } from "../oidc";

const TOKEN_DURATION = "7d";

export const generateJwt = (user_id: number, userData: OidcTokenData) => {
    return jsonwebtoken.sign({ user_id, ...userData }, Globals.jwtSecret, {
        expiresIn: TOKEN_DURATION,
    });
};

export const generateGravatarUrl = (email: string) => {
    return `https://www.gravatar.com/avatar/${md5(email.trim().toLowerCase())}?s=256`;
};

import jsonwebtoken, { JwtPayload } from "jsonwebtoken";
import md5 from "md5";
import { z } from "zod";

import { Globals } from "../globals";
import { OidcTokenData } from "./oidc";

const TOKEN_DURATION = "7d";

export const generateJwt = (user_id: number, userData: OidcTokenData) => {
    return jsonwebtoken.sign({ user_id, ...userData }, Globals.jwtSecret, {
        expiresIn: TOKEN_DURATION,
    });
};

const ValidJWTSchema = z.object({
    user_id: z.number(),
});

export const validateJwt = async (
    token: string,
): Promise<{
    tokenData: z.infer<typeof ValidJWTSchema>;
} | null> => {
    let jwt: string | JwtPayload;

    try {
        jwt = jsonwebtoken.verify(token, Globals.jwtSecret);
    } catch {
        return null;
    }

    const jwtData = await ValidJWTSchema.safeParseAsync(jwt);

    if (!jwtData.success) return null;

    return {
        tokenData: jwtData.data,
    };
};

export const generateGravatarUrl = (email: string) => {
    return `https://www.gravatar.com/avatar/${md5(email.trim().toLowerCase())}?s=256`;
};

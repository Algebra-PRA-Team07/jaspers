import axios from "axios";
import jsonwebtoken, { JwtPayload } from "jsonwebtoken";
import jwksClient, { JwksClient } from "jwks-rsa";
import { z } from "zod";

import { Globals } from "../globals";

type OidcConfiguration = {
    authorization_endpoint: string;
    token_endpoint: string;
    jwks_uri: string;
};

export let OidcConfiguration: OidcConfiguration;
let OidcJwks: JwksClient;

export const initOidc = async () => {
    OidcConfiguration = await axios
        .get<OidcConfiguration>(Globals.oidc.configurationUrl)
        .then((data) => data.data);

    OidcJwks = jwksClient({
        jwksUri: OidcConfiguration.jwks_uri,
    });
};

export const OidcIdTokenSchema = z.object({
    email: z.string(),
    name: z.string(),
    picture: z.string(),
});

export type OidcTokenData = z.infer<typeof OidcIdTokenSchema>;

type ExchangeResponse =
    | {
          success: false;
      }
    | {
          success: true;
          data: OidcTokenData;
          id_token: string;
      };

const validateJwksIdToken = async (token: string): Promise<JwtPayload | null> =>
    new Promise<JwtPayload | null>((resolve) =>
        jsonwebtoken.verify(
            token,
            async (header, callback) => {
                const key = await OidcJwks.getSigningKey(header.kid)
                    .then((it) => ({ success: true, data: it }) as const)
                    .catch((error) => ({ success: false, error: error as Error }) as const);

                if (!key.success) return callback(key.error);

                callback(
                    null,
                    "publicKey" in key.data ? key.data.publicKey : key.data.rsaPublicKey,
                );
            },
            (error, decoded) => {
                if (error !== null) return resolve(null);

                if (!decoded || typeof decoded === "string") return resolve(null);

                return resolve(decoded);
            },
        ),
    );

export const oidcExchangeAuthorizationToken = async (code: string): Promise<ExchangeResponse> => {
    const parameters = new URLSearchParams();

    parameters.set("grant_type", "authorization_code");
    parameters.set("client_id", Globals.oidc.clientId);
    parameters.set("client_secret", Globals.oidc.clientSecret);
    parameters.set("code", code);
    parameters.set("redirect_uri", Globals.oidc.redirectUri);

    const response = await axios
        .post<{ id_token: string }>(OidcConfiguration.token_endpoint, parameters, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        })
        .then((it) => it.data)
        .catch(() => null);

    if (!response) return { success: false };

    const { id_token } = response;

    const valid = await validateJwksIdToken(id_token);

    if (!valid) return { success: false };

    const payloadValid = await OidcIdTokenSchema.safeParseAsync(valid);

    if (!payloadValid.success) return { success: false };

    return { success: true, data: payloadValid.data, id_token };
};

export const oidcMakeAuthorizationUrl = () => {
    const base = OidcConfiguration.authorization_endpoint.split("?").at(0)!;

    const query = new URLSearchParams();

    query.set("response_type", "code");
    query.set("client_id", Globals.oidc.clientId);
    query.set("redirect_uri", Globals.oidc.redirectUri);
    query.set("scope", Globals.oidc.scopes.join(" "));

    return `${base}?${query.toString()}`;
};

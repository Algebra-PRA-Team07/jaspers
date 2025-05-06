import { Logger } from "./logging";

type GlobalsType = {
    port: number;
    databaseUrl: string;
    oidc: {
        configurationUrl: string;
        clientId: string;
        clientSecret: string;
        redirectUri: string;
        scopes: string[];
    };
};

const requireEnvironment = (key: string): string => {
    const value = process.env[key];

    if (!value) {
        Logger.panic(`Environment variable required: ${key}`);
    }

    return value!;
};

const defaultEnvironment = (key: string, value: string): string => {
    const environmentValue = process.env[key];

    if (!environmentValue) {
        Logger.env(`Variable not specified: ${key}, defaulting to ${value}'`);

        return value;
    }

    return environmentValue;
};

export const Globals: GlobalsType = {
    port: Number.parseInt(defaultEnvironment("PORT", "3000")),
    databaseUrl: requireEnvironment("DATABASE_URL"),
    oidc: {
        configurationUrl: requireEnvironment("OIDC_CONFIGURATION_URL"),
        clientId: requireEnvironment("OIDC_CLIENT_ID"),
        clientSecret: requireEnvironment("OIDC_CLIENT_SECRET"),
        redirectUri: requireEnvironment("OIDC_REDIRECT_URI"),
        scopes: requireEnvironment("OIDC_SCOPES").split(","),
    },
};

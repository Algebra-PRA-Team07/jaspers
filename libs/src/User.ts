export interface User {
    id: number;
    oidc_access_token: string | null;
    oidc_refresh_token: string | null;
}

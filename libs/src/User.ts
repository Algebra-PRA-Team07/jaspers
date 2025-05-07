// TODO: think about if models are necessary
export type User = {
    id: number;
    oidc_id_token: string;
    id_token_exp: string;
    email: string;
    name: string;
    picture_url: string;
};

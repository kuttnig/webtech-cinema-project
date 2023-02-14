// NOTE: normally we don't need to store the username -> inside the token (issuer property)

export interface Token {
    username: string;
    token: any;
}
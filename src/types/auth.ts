export interface IAuthOptions {
    [key: string]: unknown;
}

/** Data returned from an authentication flow (tokens, config) */
export interface IAuthResult {
    success: boolean;
    message?: string;
    accessToken?: string;
    refreshToken?: string;
}
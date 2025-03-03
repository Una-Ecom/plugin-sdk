/** Minimal set of data needed for authentication */
export interface AuthOptions {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
}

/** Data returned from an authentication flow (tokens, config) */
export interface AuthResult {
    accessToken?: string;
    refreshToken?: string;
}

export interface ProductData {
    id?: string;
    title: string;
    description?: string;
    price: number;
    images?: string[];
}

/** The core plugin interface that all vendor plugins must implement */
export interface VendorPlugin {
    pluginName: string;
    pluginVersion: string;
    pluginAuthor: string;
    pluginDescription: string;

    authenticate: (
        tenantId: string,
        pluginInstanceId: string,
        authOptions: AuthOptions
    ) => Promise<AuthResult>;

    fetchProducts?: (tenantId: string, pluginInstanceId: string) => Promise<ProductData[]>;
    createProduct?: (
        tenantId: string,
        pluginInstanceId: string,
        productData: ProductData
    ) => Promise<any>;
    updateProduct?: (
        tenantId: string,
        pluginInstanceId: string,
        vendorProductId: string,
        productData: ProductData
    ) => Promise<any>;
}

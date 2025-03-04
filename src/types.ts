

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

export interface PluginContext {
    /** Retrieve config for a given plugin instance. */
    getConfig(pluginInstanceId: string): Promise<Record<string, any>>;

    /** Store or update config for a given plugin instance. */
    setConfig(pluginInstanceId: string, config: Record<string, any>): Promise<void>;
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
        authOptions: AuthOptions,
        context: PluginContext
    ) => Promise<AuthResult>;

    fetchProducts?: (tenantId: string, pluginInstanceId: string, context: PluginContext) => Promise<ProductData[]>;
    createProduct?: (
        tenantId: string,
        pluginInstanceId: string,
        productData: ProductData,
        context: PluginContext
    ) => Promise<any>;
    updateProduct?: (
        tenantId: string,
        pluginInstanceId: string,
        vendorProductId: string,
        productData: ProductData,
        context: PluginContext
    ) => Promise<any>;
}

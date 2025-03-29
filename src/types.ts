import { JsonValue } from "@prisma/client/runtime/library";

export interface IAuthOptions {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
}

/** Data returned from an authentication flow (tokens, config) */
export interface IAuthResult {
    accessToken?: string;
    refreshToken?: string;
}

export interface IProductData {
    id?: string;
    title: string;
    description?: string;
    price: number;
    images?: string[];
}

export interface IPluginContext {
    /** Retrieve config for a given plugin instance. */
    getConfig(pluginInstanceId: string): Promise<JsonValue>;

    /** Store or update config for a given plugin instance. */
    setConfig(pluginInstanceId: string, config: JsonValue): Promise<void>;
}

export interface ICreateProductResult {
    productData: IProductData;
    success: boolean;
    error?: string;
}

export interface IUpdateProductResult {
    productData: IProductData;
    success: boolean;
    error?: string;
}

export enum FieldTypes {
    TEXT = "text",
    NUMBER = "number",
    BOOLEAN = "boolean",
}

export interface IPluginConfigField {
    label: string;
    type: FieldTypes;
    required: boolean;
    placeholder: string;
}

/** The core plugin interface that all vendor plugins must implement */
export interface IVendorPlugin {
    id: string;
    pluginName: string;
    pluginVersion: string;
    pluginAuthor: string;
    pluginDescription: string;
    brandColor?: string;
    logo?: string;
    configFields: IPluginConfigField[];

    authenticate: (
        tenantId: string,
        pluginInstanceId: string,
        authOptions: IAuthOptions,
        context: IPluginContext
    ) => Promise<IAuthResult>;

    fetchProducts?: (tenantId: string, pluginInstanceId: string, context: IPluginContext) => Promise<IProductData[]>;
    createProduct?: (
        tenantId: string,
        pluginInstanceId: string,
        productData: IProductData,
        context: IPluginContext
    ) => Promise<ICreateProductResult>;
    updateProduct?: (
        tenantId: string,
        pluginInstanceId: string,
        vendorProductId: string,
        productData: IProductData,
        context: IPluginContext
    ) => Promise<IUpdateProductResult>;
}

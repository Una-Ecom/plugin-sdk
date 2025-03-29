import { JsonValue } from "@prisma/client/runtime/library";
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

export interface ICreateProductData {
    id?: string;
    title: string;
    description?: string;
    price: number;
    sku?: string;
}

export interface IProductData {
    id?: string;
    variants?: IProductVariant[];
}

export interface IProductVariant {
    id?: string;
    title: string;
    price: number;
    sku?: string;
    images?: string[];
}

export interface IPluginContext {
    /** Retrieve config for a given plugin instance. */
    getConfig(pluginInstanceId: string): Promise<JsonValue>;
    /** Store or update config for a given plugin instance. */
    setConfig(pluginInstanceId: string, config: JsonValue): Promise<void>;
}

export interface ICreateProductResult {
    success: boolean;
    message?: string;
    productData: IProductData;
    error?: string;
}

export interface IUpdateProductResult {
    success: boolean;
    message?: string;
    productData: ICreateProductData;
    error?: string;
}

export declare enum FieldTypes {
    TEXT = "text",
    NUMBER = "number",
    BOOLEAN = "boolean"
}

export interface IPluginConfigField {
    key: string;
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
    authenticate: (tenantId: string, pluginInstanceId: string, authOptions: IAuthOptions, context: IPluginContext) => Promise<IAuthResult>;
    fetchProducts?: (tenantId: string, pluginInstanceId: string, context: IPluginContext) => Promise<IProductData[]>;
    createProduct?: (tenantId: string, pluginInstanceId: string, productData: ICreateProductData, context: IPluginContext) => Promise<ICreateProductResult>;
    updateProduct?: (tenantId: string, pluginInstanceId: string, vendorProductId: string, productData: ICreateProductData, context: IPluginContext) => Promise<IUpdateProductResult>;
}

import { JsonValue } from "@prisma/client/runtime/library";
import * as Auth from "./auth";
import * as Actions from "./actions";
import * as Product from "./product";

export interface IPluginBase {
    id: string;
    pluginName: string;
    pluginVersion: string;
    pluginAuthor: string;
    pluginDescription: string;
    brandColor?: string;
    logo?: string;
    configFields: IPluginConfigField[];
}

export interface IPluginConfigField {
    key: string;
    label: string;
    type: FieldTypes;
    required: boolean;
    placeholder: string;
}

export enum FieldTypes {
    TEXT = "text",
    NUMBER = "number",
    BOOLEAN = "boolean"
}

export interface IPluginContext {
    /** Retrieve config for a given plugin instance. */
    getConfig(pluginInstanceId: string): Promise<JsonValue>;
    /** Store or update config for a given plugin instance. */
    setConfig(pluginInstanceId: string, config: JsonValue): Promise<void>;
}

export interface IVendorPlugin {
    id: string;
    pluginName: string;
    pluginVersion: string;
    pluginAuthor: string;
    pluginDescription: string;
    brandColor?: string;
    logo?: string;
    configFields: IPluginConfigField[];
    authenticate: (tenantId: string, pluginInstanceId: string, authOptions: Auth.IAuthOptions, context: IPluginContext) => Promise<Auth.IAuthResult>;
    fetchProducts?: (tenantId: string, pluginInstanceId: string, context: IPluginContext) => Promise<Product.IProductData[]>;
    createProduct?: (tenantId: string, pluginInstanceId: string, productData: Actions.ICreateProductData, context: IPluginContext) => Promise<Actions.ICreateProductResult>;
    updateProduct?: (tenantId: string, pluginInstanceId: string, vendorProductId: string, productData: Actions.ICreateProductData, context: IPluginContext) => Promise<Actions.IUpdateProductResult>;
}
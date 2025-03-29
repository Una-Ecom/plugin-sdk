import * as Product from "./product";

export interface IActionsBase {
    id: string;
}

export interface ICreateProductData extends IActionsBase {
    title: string;
    description: string;
    price: number;
    sku: string;
}

type ProductUpdatableFields = {
    title?: string;
    description?: string;
    price?: number;
    sku?: string;
};

type AtLeastOne<T> = {
    [K in keyof T]: Required<Pick<T, K>> & Partial<Omit<T, K>>;
}[keyof T];

export type IUpdateProductData = IActionsBase & AtLeastOne<ProductUpdatableFields>;

export interface ICreateProductResult {
    success: boolean;
    message?: string;
    productData: Product.IProductData;
    error?: string;
}

export interface IUpdateProductResult {
    success: boolean;
    message?: string;
    productData: Product.IProductData;
    error?: string;
}

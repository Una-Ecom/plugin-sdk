export interface IProductBase {
    id: string;
}

export interface IProductData extends IProductBase {
    variants?: IProductVariant[];
}

export interface IProductVariant extends IProductBase {
    title: string;
    price: number;
    sku?: string;
    images?: string[];
}
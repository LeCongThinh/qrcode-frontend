export interface Product {
    id: string;
    name: string;
    slug: string;
    sku: string;
    price: number;
    description: string;
    image_url:string;
    qr_code_url:string;
    stock: number;
    created_at: string;
    updated_at: string;
}
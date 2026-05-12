export interface Product {
    id: string;
    name: string;
    slug: string;
    sku: string;
    price: number;
    status: 'active' | 'inactive';
    image: string;
}

export const MOCK_PRODUCTS: Product[] = [
    {
        id: '1',
        name: 'Máy in phun màu đa năng HP Smart Tank 670 Wifi (6UU48A)',
        slug: 'may-in-phun-mau-da-nang-hp-smart-tank-670-wifi-6uu48a',
        sku: 'HP-LJ-M404DN',
        price: 4120000,
        status: 'active',
        image: 'https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/5693/357979/hp-smart-tank-670-wifi-6uu48a-1-638966336689758176-750x500.jpg'
    },

    {
        id: '2',
        name: 'Máy in phun màu đa năng HP OfficeJet Pro 9730 Wifi (537P5C)',
        slug: 'may-in-phun-mau-dja-nang-hp-officejet-pro-9730-wifi-537p5c',
        sku: 'HP-OJ-PRO9730',
        price: 18500000,
        status: 'active',
        image: 'https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/5693/357981/hp-officejet-pro-9730-wifi-537p5c-trang-1-638966358781233759-750x500.jpg'
    },

    {
        id: '3',
        name: 'Máy in nhiệt SingPC Print-311',
        slug: 'may-in-nhiet-singpc-print-311',
        sku: 'SIGPC-T720AS',
        price: 1790000,
        status: 'inactive',
        image: 'https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/5693/343044/may-in-nhiet-singpc-print-311-den-1-638919919242706943-750x500.jpg'
    },

    {
        id: '4',
        name: 'Máy in laser trắng đen đa năng Brother DCP-B7620DW Wifi',
        slug: 'may-in-laser-trang-den-da-nang-brother-dcp-b7620dw-wifi',
        sku: 'BROTHER-T720DW',
        price: 5490000,
        status: 'inactive',
        image: 'https://cdn.tgdd.vn/Products/Images/5693/319472/laser-brother-dcpb7640dw-1-750x500.jpg'
    }
];
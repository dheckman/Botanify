import { Link } from '@remix-run/react';
import { useRouteData } from '~/hooks/useRouteData';

export type ProductsDataType = {
  body?: string;
  id: number;
  images: Array<ImageDataType>;
  price: number;
  product_type?: string;
  tags: string;
  thumbnail: ImageDataType;
  title: string;
  vendor?: string;
  quantity: number;
};

export type ImageDataType = {
  id: number;
  product_id: number;
  created_at: string;
  updated_at: string;
  alt?: string;
  width: number;
  height: number;
  src: string;
  variant_ids: Array<number>;
};

export type AllProductsDataType = {
  products: Array<ProductsDataType>;
  recommendations: Array<ProductsDataType>;
};

export default function ProductCatalog() {
  const data = useRouteData<AllProductsDataType>('root');
  const products = data?.products;

  return (
    <>
      <div className="grid grid-cols-2 justify-center justify-items-center gap-4 py-8 sm:grid-cols-1 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
        {products?.map((product: ProductsDataType) => (
          <Link prefetch="intent" key={product.id} to={`products/${product.id}`}>
            <div className="border-slate-400/25 max-w-[260px] rounded-md border shadow-sm">
              <img
                alt={product.thumbnail.alt || `image of ${product.title}`}
                className="h-[258px] w-[260px] rounded-md rounded-b-none"
                src={product.images[0].src || product.thumbnail.src}
              />
              <p className="bg-white py-6 px-4 max-h-16 truncate rounded-md rounded-t-none text-center">
                {product.title}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

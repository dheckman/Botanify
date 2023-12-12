import { useOutletContext, useParams } from '@remix-run/react';
import { useRouteData } from '~/hooks/useRouteData';
import { AllProductsDataType, ProductsDataType } from './_index';
import useLocalStorageState from 'use-local-storage-state';
import { handleUpdateCart } from '~/helpers/handleUpdateCart';

export type OutletContextType = {
  isCartOpen: boolean;
  setIsCartOpen: (isCartOpen: boolean) => void;
};

export type Product = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  image?: string;
  quantity?: number;
  kitQuantity: number;
  prunersInCart: boolean;
  treeCount: number;
};

export interface CartProps {
  [productId: string]: Product;
}

export default function ProductPage() {
  const { setIsCartOpen } = useOutletContext<OutletContextType>();
  const [cart, setCart] = useLocalStorageState<CartProps>('cart', {});

  const params = useParams();
  const productId = params.productId && parseInt(params.productId);
  const data = useRouteData<AllProductsDataType>('root');
  const products = data?.products;
  const product = products?.find((x) => x.id === productId);

  const handleAddToCart = (product: ProductsDataType) => {
    setIsCartOpen(true);
    handleUpdateCart(product, 'increaseCount', setCart);
  };

  if (!product) {
    return <div id="loading">Loading...</div>;
  }

  return (
    <>
      <article className="flex flex-col justify-center gap-6 rounded-md py-8 lg:flex-row">
        <img
          alt={product.title}
          className="h-full w-full max-w-none rounded-md object-cover lg:max-w-xl"
          loading="lazy"
          src={product?.images[0].src}
        />
        <section className="h-fit max-w-none rounded-md bg-white p-4 lg:max-w-sm">
          <h2 className="text-4xl ">{product.title}</h2>
          <h3 className="my-4">About</h3>
          <p>{product.body}</p>
          <button
            onClick={() => handleAddToCart(product)}
            className="mt-4 w-full rounded-lg bg-button-red p-2 text-2xl text-white">
            Add to Cart
          </button>
        </section>
      </article>
    </>
  );
}

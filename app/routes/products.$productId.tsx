import { useOutletContext, useParams } from '@remix-run/react';
import { useRouteData } from '~/hooks/useRouteData';
import { AllProductsDataType, ProductsDataType } from './_index';
import useLocalStorageState from 'use-local-storage-state';

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
    setCart((prevCart) => {
      let updatedCart = { ...prevCart };
      if (updatedCart[product.id]) {
        updatedCart[product.id] = {
          ...updatedCart[product.id],
          quantity: updatedCart[product.id].quantity + 1
        };
      } else {
        product.quantity = 1;
        updatedCart = {
          ...updatedCart,
          [product.id]: product
        };
      }
      return updatedCart;
    });
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
        <section className="bg-white p-4 h-fit max-w-none rounded-md lg:max-w-sm">
          <h2 className="text-4xl ">{product.title}</h2>
          <h3 className="my-4">About</h3>
          <p>{product.body}</p>
          <button
            onClick={() => handleAddToCart(product)}
            className="bg-button-red p-2 text-white mt-4 w-full rounded-lg text-2xl">
            Add to Cart
          </button>
        </section>
      </article>
    </>
  );
}

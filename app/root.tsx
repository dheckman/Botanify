import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from '@remix-run/react';
import { json, type LinksFunction, MetaFunction } from '@remix-run/node';
import stylesheet from '~/tailwind.css';
import fgtLogo from './assets/fgt-logo.svg';
import cartDesktop from './assets/cart-desktop.svg';
import { useEffect, useState } from 'react';
import Cart from './components/cart';
import useLocalStorageState from 'use-local-storage-state';
import { CartProps } from './routes/products.$productId';

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: stylesheet }];

export const loader = async () => {
  const response = await fetch(
    'https://take-home-challenge.s3.amazonaws.com/challenge/FGT-Frontend-Take-Home.json'
  );
  const productList = await response.json();
  const { products, recommendations } = productList;
  return json({ products, recommendations });
};

export const meta: MetaFunction = () => {
  return [
    {
      charset: 'utf-8',
      title: 'Botanify',
      viewport: 'width=device-width,initial-scale=1'
    }
  ];
};

const Document = ({ children }: { children: React.ReactNode }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart] = useLocalStorageState<CartProps>('cart', {});
  const [totalCartItems, setTotalCartItems] = useState<null | number>(null);
  const overlayClasses = 'h-screen opacity-80 bg-overlay-gray fixed w-full';

  useEffect(() => {
    if (cart) {
      const getProducts = () => Object.values(cart || {});
      const productQuantity = getProducts().reduce(
        (accumulator, product) => accumulator + product.quantity,
        0
      );
      setTotalCartItems(productQuantity);
    }
  }, [cart]);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter&display=swap" rel="stylesheet" />
        <Meta />
        <Links />
      </head>
      <body className="font-inter bg-main-green">
        <div className={`${isCartOpen ? overlayClasses : 'opacity-0'}`}></div>
        <div className="px-12 lg:px-24 py-8">
          <nav className="flex justify-between">
            <Link to="/">
              <img alt="Fast Growing Trees logo" src={fgtLogo} />
            </Link>
            <img
              alt="shopping cart icon"
              className="cursor-pointer"
              onClick={toggleCart}
              src={cartDesktop}
            />
            <div className="bg-button-red text-white absolute right-[92px] w-4 rounded-full text-center text-[10px]">
              {totalCartItems}
            </div>
          </nav>
          <div id="detail">
            {isCartOpen && <Cart setIsCartOpen={setIsCartOpen} />}
            <Outlet context={{ isCartOpen, setIsCartOpen }} />
          </div>
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </div>
      </body>
    </html>
  );
};
export default function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <Document>
      <h1>Oops, there was an error</h1>
      <p>{error.message}</p>
      <p>The stack trace is:</p>
      <pre>{error.stack}</pre>
    </Document>
  );
}

import { CartProps, Product } from '~/routes/products.$productId';
import cartIcon from '../assets/cart-icon.svg';
import closeButton from '../assets/close-button.svg';
import CartItem from './cart-item';
import Recommendations from './recommendations';
import useLocalStorageState from 'use-local-storage-state';
import formatCurrency from './currency-formatter';
import { useRouteData } from '~/hooks/useRouteData';
import { AllProductsDataType, ProductsDataType } from '~/routes/_index';
import { Operation } from './counter';

const shippingThreshold = 150;

export default function Cart({ setIsCartOpen }: { setIsCartOpen: (isCartOpen: boolean) => void }) {
  const data = useRouteData<AllProductsDataType>('root');
  const [cart, setCart] = useLocalStorageState<CartProps>('cart', {});
  const getProducts = () => Object.values(cart || {});
  const totalPrice = getProducts().reduce(
    (accumulator, product) => accumulator + product.price * product.quantity,
    0
  );
  const isCartEmpty = cart && Object.keys(cart).length === 0;
  const progressBar = Math.min((totalPrice / shippingThreshold) * 100, 100);
  const shippingMessage = () => {
    if (totalPrice >= shippingThreshold) {
      return 'You get free shipping!';
    } else {
      const remainder = shippingThreshold - totalPrice;
      return `You're ${formatCurrency(remainder)} away from free shipping!`;
    }
  };

  const handleUpdateCart = (productId: number, operation: Operation) => {
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };
      if (updatedCart[productId]) {
        if (operation === 'increaseCount') {
          updatedCart[productId] = {
            ...updatedCart[productId],
            quantity: updatedCart[productId].quantity + 1
          };
        } else {
          updatedCart[productId] = {
            ...updatedCart[productId],
            quantity: updatedCart[productId].quantity - 1
          };
        }
      }
      return updatedCart;
    });
  };

  return (
    <section className="bg-white fixed right-0 top-0 h-full w-[432px] overflow-scroll">
      <div className="p-6">
        <div className="grid">
          <img
            className="col-start-1 row-start-1 cursor-pointer justify-self-start"
            onClick={() => setIsCartOpen(false)}
            src={closeButton}
          />
          <img className="col-start-1 row-start-1 justify-self-center" src={cartIcon} />
        </div>
        <div className="mb-4 mt-7 flex flex-col items-center">
          <label className="text-sm" htmlFor="progress-bar">
            {shippingMessage()}
          </label>
          <progress className="mt-4 w-full" id="progress-bar" value={progressBar} max="100">
            70 %
          </progress>
        </div>
        {isCartEmpty ? (
          <div className="flex justify-center">Your cart is empty</div>
        ) : (
          <>
            {getProducts().map((product) => (
              <CartItem key={product.id} product={product} handleUpdateCart={handleUpdateCart} />
            ))}
            <div className="py-4 flex justify-between text-lg">
              <p className="font-semibold">Subtotal</p>
              <p>{formatCurrency(totalPrice)}</p>
            </div>
          </>
        )}

        <hr className="rounded-sm"></hr>
        <Recommendations />
      </div>
    </section>
  );
}

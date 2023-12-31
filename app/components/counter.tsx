import { ProductsDataType } from '~/routes/_index';
import minusCircle from '../assets/minus-circle.svg';
import plusCircle from '../assets/plus-circle.svg';
import useLocalStorageState from 'use-local-storage-state';
import { CartProps, Product } from '~/routes/products.$productId';

export type Operation = 'decreaseCount' | 'increaseCount';

interface CounterProps {
  removeProductCallback: (productId: number) => void;
  handleUpdateQuantity: (product: ProductsDataType, operation: Operation) => void;
  product: ProductsDataType;
}

export default function Counter({
  removeProductCallback,
  handleUpdateQuantity,
  product
}: CounterProps) {
  const [cart, setCart] = useLocalStorageState<CartProps>('cart', {});
  const { id, quantity } = product;

  const reduceCount = (): void => {
    handleUpdateQuantity(product, 'decreaseCount');
    if (product.quantity === 1) {
      removeProductCallback(id);
    }
  };

  const increaseCount = (): void => {
    handleUpdateQuantity(product, 'increaseCount');
  };

  const setQuantity = (quantity: number | null): void => {
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };
      if (!quantity) {
        quantity = 0;
      }

      if (updatedCart[id]) {
        updatedCart[id] = {
          ...updatedCart[id],
          quantity: (updatedCart[id].quantity = quantity)
        };
      }
      return updatedCart;
    });
  };

  return (
    <div className="ml-4 inline-flex">
      <button
        className="cursor-pointer"
        aria-label="decrease product quantity"
        value="-"
        onClick={reduceCount}>
        <img className="max-w-none" src={minusCircle} />
      </button>
      <input
        className="w-10 px-3 text-center"
        inputMode="numeric"
        aria-label="current product quantity in cart"
        pattern="[0-9]*"
        value={quantity}
        onChange={(e) => setQuantity(parseInt(e.target.value))}
      />
      <button
        className="cursor-pointer"
        aria-label="increase product quantity"
        value="+"
        onClick={increaseCount}>
        <img className="max-w-none" src={plusCircle} />
      </button>
    </div>
  );
}

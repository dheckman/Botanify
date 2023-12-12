import { ProductsDataType } from '~/routes/_index';
import trashIcon from '../assets/trash-icon.svg';
import Counter, { Operation } from './counter';
import useLocalStorageState from 'use-local-storage-state';
import { CartProps } from '~/routes/products.$productId';

export default function CartItem({
  product,
  handleUpdateCart
}: {
  product: ProductsDataType;
  handleUpdateCart: (product: ProductsDataType, operation: Operation) => void;
}) {
  const [cart, setCart] = useLocalStorageState<CartProps>('cart', {});

  const handleRemoveProduct = (productId: number): void => {
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };
      delete updatedCart[productId];
      return updatedCart;
    });
  };

  return (
    <div className="flex justify-between p-4">
      <img
        className="max-w-[110px]"
        src={product.images[0].src || product.thumbnail.src}
        alt={product.images[0].alt || `image of ${product.title}`}
      />
      <div className="flex max-w-[182px] flex-col justify-center">
        <p className="text-sm">{product.title}</p>
        <div className="flex items-center">
          <p className="text-sm">${product.price}</p>
          <Counter
            removeProductCallback={() => handleRemoveProduct(product.id)}
            product={product}
            handleUpdateQuantity={handleUpdateCart}
          />
        </div>
      </div>
      <img
        alt="remove product from cart"
        className="cursor-pointer"
        onClick={() => handleRemoveProduct(product.id)}
        src={trashIcon}
      />
    </div>
  );
}

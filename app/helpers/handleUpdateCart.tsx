import useLocalStorageState from 'use-local-storage-state';
import { Operation } from '~/components/counter';
import { ProductsDataType } from '~/routes/_index';
import { CartProps } from '~/routes/products.$productId';

export const handleUpdateCart = (
  product: ProductsDataType,
  operation: Operation,
  setCart: (cart: CartProps | {}) => void
) => {
  setCart((prevCart: CartProps) => {
    let updatedCart = { ...prevCart };
    if (operation === 'increaseCount') {
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
    } else {
      updatedCart[product.id] = {
        ...updatedCart[product.id],
        quantity: updatedCart[product.id].quantity - 1
      };
    }
    return updatedCart;
  });
};

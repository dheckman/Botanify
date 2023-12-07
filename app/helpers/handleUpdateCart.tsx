import { Operation } from '~/components/counter';
import { ProductsDataType } from '~/routes/_index';
import { CartProps } from '~/routes/products.$productId';

export const handleUpdateCart = (product: ProductsDataType, setCart: (cart: CartProps) => void) => {
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

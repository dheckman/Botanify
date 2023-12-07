import { useRouteData } from '~/hooks/useRouteData';
import { AllProductsDataType, ProductsDataType } from '~/routes/_index';
import plusCircle from '../assets/plus-circle.svg';
import useLocalStorageState from 'use-local-storage-state';
import { CartProps } from '~/routes/products.$productId';
import { useMemo, useState } from 'react';
import { handleUpdateCart } from '~/helpers/handleUpdateCart';

export default function Recommendations() {
  const data = useRouteData<AllProductsDataType>('root');
  const recommendations = data?.recommendations;
  const [cart, setCart] = useLocalStorageState<CartProps>('cart', {});
  const [filteredRecs, setFilteredRecs] = useState(recommendations);

  const filteredRecommendations = useMemo(() => {
    const { prunersInCart, treeCount, kitQuantity } = Object.values(cart).reduce(
      (acc, curr) => {
        if (curr.product_type === 'Tree')
          return { ...acc, treeCount: acc.treeCount + curr.quantity };
        if (curr.id === 1532751872052) return { ...acc, kitQuantity: curr.quantity };
        if (curr.id === 4813305610302) return { ...acc, prunersInCart: true };
        return acc;
      },
      { treeCount: 0, kitQuantity: 0, prunersInCart: false }
    );
    const shouldRecKit = treeCount > kitQuantity;
    const shouldRecPruners = !prunersInCart;
    return filteredRecs?.filter((r) => {
      return !(
        (r.id === 1532751872052 && !shouldRecKit) ||
        (r.id === 4813305610302 && !shouldRecPruners)
      );
    });
  }, [cart]);

  const handleAddToCart = (product: ProductsDataType) => {
    return handleUpdateCart(product, setCart);
  };

  return (
    <div>
      <p className="py-4 font-semibold">Recommended Items</p>
      {filteredRecommendations?.map((product) => (
        <div key={product.id} className="p-4 flex items-center justify-between">
          <img
            alt={product.thumbnail.alt || `image of ${product.title}`}
            className="max-w-[110px]"
            src={product.images[0].src || product.thumbnail.src}
          />
          <p className="flex max-w-[182px] justify-center text-lg">{product.title}</p>
          <img
            className="h-9 cursor-pointer"
            onClick={() => handleAddToCart(product)}
            src={plusCircle}
          />
        </div>
      ))}
    </div>
  );
}

import React, { ReactNode, useEffect } from "react";
import ShopData from "../shop-data.json";
export interface ProductInter {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
}

type ProductContextValue = {
  product: ProductInter[] | null;
  setProduct: (product: ProductInter[] | null) => void;
};

export const ProductContext = React.createContext<ProductContextValue>({
  product: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setProduct: () => {},
});

type ProductProviderProps = {
  children: ReactNode;
};

export const ProductProvider = ({ children }: ProductProviderProps) => {
  const [product, setProduct] = React.useState<ProductInter[] | null>(ShopData);

  const value: ProductContextValue = { product, setProduct };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};

import React, { ReactNode, useEffect } from "react";
import ShopData from "../shop-data.js";
import { getCategoriesAndDocuments } from "../utils/Firebase/firebase.js";
export interface CategoryInter {
  title: string;
  items: ProductInter[];
}

export interface ProductInter {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  quantity?: number;
}

type CategoriesContextValue = {
  categories: CategoryInter[];
  setCategories: (product: CategoryInter[]) => void;
};

export const CategoriesContext = React.createContext<CategoriesContextValue>({
  categories: ShopData,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setCategories: () => {},
});

type ProductProviderProps = {
  children: ReactNode;
};

export const CategoriesProvider = ({ children }: ProductProviderProps) => {
  const [categories, setCategories] = React.useState<CategoryInter[]>(ShopData);

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categroyMap = await getCategoriesAndDocuments();
      setCategories(categroyMap);
    };

    getCategoriesMap();
  }, []);

  const value: CategoriesContextValue = { categories, setCategories };

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};

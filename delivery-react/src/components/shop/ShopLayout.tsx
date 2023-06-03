import React from "react";
import { ShopList } from "./ShopList";
import { ProductList } from "../product/ProductList";
import { EShopLayout } from "../shared";

export const ShopLayout: React.FC = (): JSX.Element => {
  return (
    <EShopLayout>
      <ShopList />
      <ProductList />
    </EShopLayout>
  );
};

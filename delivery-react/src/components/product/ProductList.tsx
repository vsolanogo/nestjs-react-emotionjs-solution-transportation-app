import React, { useEffect } from "react";
import { useRoute } from "wouter";
import { ProductItem } from "./ProductItem";
import { useProducts } from "../../redux/selectors/selectorHooks";
import { useAppDispatch } from "../../store/store";
import {
  loadProductsOperation,
  clearProductsOperation,
} from "../../redux/delivery/deliveryActions";
import { ProductsLayout } from "../shared";

export const ProductList: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const products = useProducts();

  const [, params] = useRoute("/shop/:id");

  useEffect(() => {
    if (params?.id) {
      dispatch(loadProductsOperation(params?.id));
    } else {
      dispatch(clearProductsOperation());
    }
  }, [params?.id]);

  return (
    <ProductsLayout>
      {products.map((i) => (
        <ProductItem key={i.id} {...i} />
      ))}
    </ProductsLayout>
  );
};

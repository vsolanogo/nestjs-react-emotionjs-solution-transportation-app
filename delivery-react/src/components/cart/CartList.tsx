import React, { useState } from "react";
import { useCartShopsWithCartItems } from "../../redux/selectors/selectorHooks";
import {
  ProductsCartLayout,
  ShopOrderComponent,
  SharedDivider,
} from "../shared";
import { CartItemComponent } from "./CartItemComponent";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { CartModalWindow } from "./CartModalWindow";

export const CartList: React.FC = (): JSX.Element => {
  const cartShop = useCartShopsWithCartItems();

  const [openWindow, setOpenWindow] = useState(false);
  const [currentId, setCurrentId] = useState(0);

  const handleCloseWindow = () => {
    setOpenWindow(false);
  };

  return (
    <>
      <CartModalWindow
        shopId={currentId}
        onWindowClose={handleCloseWindow}
        openWindow={openWindow}
      />

      {cartShop.map((i) => (
        <div key={i.id}>
          <Paper elevation={3}>
            <ShopOrderComponent>
              <Typography variant="h5" gutterBottom>
                {i.shopName}
              </Typography>

              <ProductsCartLayout>
                {i.cart.map((j) => {
                  return (
                    <CartItemComponent key={j.product.id} id={j.product.id} />
                  );
                })}
              </ProductsCartLayout>

              <Typography variant="h5" gutterBottom>
                Total price:
              </Typography>

              <Typography fontSize="lg" fontWeight="lg">
                {(i.orderPrice / 100).toFixed(2)}
              </Typography>

              <Button
                variant="contained"
                size="large"
                onClick={() => {
                  setCurrentId(i.id);
                  setOpenWindow(true);
                }}
              >
                Confirm order
              </Button>
            </ShopOrderComponent>
          </Paper>

          <SharedDivider />
        </div>
      ))}
    </>
  );
};

import React from "react";
import { CartItemComponent } from "./CartItemComponent";
import { useAppDispatch } from "../../store/store";
import {
  useCartShopsWithCartItems,
  useUserError,
  useOrder,
} from "../../redux/selectors/selectorHooks";
import {
  ProductsCartLayout,
  ShopOrderComponent,
  SharedDivider,
} from "../shared";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import {
  nameUpdateOperation,
  emailUpdateOperation,
  phoneUpdateOperation,
  addressUpdateOperation,
  createOrderOperation,
  userCreateOperation,
  userDeleteErrorAction,
  createOrderStartAction,
} from "../../redux/delivery/deliveryActions";

export const CartList: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const userError = useUserError();
  const order = useOrder();
  const cartShop = useCartShopsWithCartItems();

  const handleNameUpdate = (e) => {
    dispatch(nameUpdateOperation(e.target.value));
  };

  const handleEmailUpdate = (e) => {
    dispatch(emailUpdateOperation(e.target.value));
  };

  const handlePhoneUpdate = (e) => {
    dispatch(phoneUpdateOperation(e.target.value));
  };

  const handleAddressUpdate = (e) => {
    dispatch(addressUpdateOperation(e.target.value));
  };

  const handleConfirmOrder = (shopId) => {
    const dispatchAsync = async () => {
      await dispatch(userCreateOperation());
      await dispatch(createOrderOperation(shopId));
    };

    dispatchAsync();
  };

  const handleErrorClose = () => {
    dispatch(userDeleteErrorAction());
  };

  const handleOrderClose = () => {
    dispatch(createOrderStartAction());
  };

  return (
    <>
      <Dialog onClose={handleErrorClose} open={!!userError}>
        <DialogTitle>{JSON.stringify(userError, undefined, 2)}</DialogTitle>
      </Dialog>

      <Dialog onClose={handleOrderClose} open={!!order}>
        <DialogTitle>{JSON.stringify(order, undefined, 2)}</DialogTitle>
      </Dialog>

      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            required
            id="outlined-required"
            label="Name"
            defaultValue=""
            size="small"
            onChange={handleNameUpdate}
          />

          <TextField
            required
            id="outlined-required"
            label="Email"
            defaultValue=""
            size="small"
            onChange={handleEmailUpdate}
          />

          <TextField
            required
            id="outlined-required"
            label="Phone"
            defaultValue=""
            size="small"
            onChange={handlePhoneUpdate}
          />

          <TextField
            required
            id="outlined-required"
            label="Address"
            defaultValue=""
            size="small"
            onChange={handleAddressUpdate}
          />
        </div>
      </Box>
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
                  handleConfirmOrder(i.id);
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

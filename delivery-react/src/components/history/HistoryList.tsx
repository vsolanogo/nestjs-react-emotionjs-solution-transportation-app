import React, { useState } from "react";
import { HistoryComponent } from "./HistoryComponent";
import { useAppDispatch } from "../../store/store";
import {
  useOrdersHistoryError,
  useHistoryOrders,
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
  loadHistoryOrdersOperation,
  loadHistoryOrdersStartAction,
} from "../../redux/delivery/deliveryActions";

export const HistoryList: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const historyOrders = useHistoryOrders();
  const ordersHistoryError = useOrdersHistoryError();
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const handleEmailUpdate = (e) => {
    setEmail(e.target.value);
  };

  const handlePhoneUpdate = (e) => {
    setPhone(e.target.value);
  };

  const handleSearchOrders = () => {
    dispatch(loadHistoryOrdersOperation({ phone, email }));
  };

  const handleErrorClose = () => {
    dispatch(loadHistoryOrdersStartAction());
  };

  return (
    <>
      <Dialog onClose={handleErrorClose} open={!!ordersHistoryError}>
        <DialogTitle>
          {JSON.stringify(ordersHistoryError, undefined, 2)}
        </DialogTitle>
      </Dialog>

      <Typography variant="h5" gutterBottom>
        Please provide your information
      </Typography>

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
        </div>
      </Box>

      <Button
        variant="contained"
        size="large"
        onClick={() => {
          handleSearchOrders();
        }}
      >
        Search orders
      </Button>

      {historyOrders.map((i) => (
        <div key={i.id}>
          <Paper elevation={3}>
            <ShopOrderComponent>
              <Typography variant="h5" gutterBottom>
                {i.orderItems[0].product.shop.shopName}
              </Typography>
              <ProductsCartLayout>
                {i.orderItems.map((j) => {
                  return (
                    <>
                    <HistoryComponent key={j.id} {...j} />
                    </>
                  );
                })}
              </ProductsCartLayout>

              <Typography variant="h5" gutterBottom>
                Total price:
              </Typography>

              <Typography fontSize="lg" fontWeight="lg">
                {(
                  i.orderItems
                    .map((o) => o.price)
                    .reduce((a, b) => {
                      return a + b;
                    }, 0) / 100
                ).toFixed(2)}
              </Typography>
            </ShopOrderComponent>
          </Paper>

          <SharedDivider />
        </div>
      ))}
    </>
  );
};

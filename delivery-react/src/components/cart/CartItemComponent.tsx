import React from "react";
import { Product } from "../../models/DeliveryModels";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";
import { useAppDispatch } from "../../store/store";
import {
  cartRemoveItemOperation,
  cartUpdateQantityItemOperation,
} from "../../redux/cart/cartActions";
import { useCart } from "../../redux/selectors/selectorHooks";
import TextField from "@mui/material/TextField";

interface CartItemProps {
  id: number;
}

export const CartItemComponent: React.FC<CartItemProps> = ({
  id,
}): JSX.Element => {
  const dispatch = useAppDispatch();

  const cart = useCart();

  const theProduct: Product = cart[id].product;
  const quantity = cart[id].quantity;

  const handlerRemoveFromCart = () => {
    dispatch(cartRemoveItemOperation(id));
  };

  const handleUpdateQantity = (num) => {
    dispatch(cartUpdateQantityItemOperation(id, num));
  };

  return (
    <>
      <Card variant="outlined" sx={{ width: 320 }}>
        <Typography level="h2" fontSize="md" sx={{ mb: 0.5 }}>
          {theProduct.productName}
        </Typography>

        <AspectRatio minHeight="120px" maxHeight="200px" sx={{ my: 2 }}>
          <img src={theProduct.image} />
        </AspectRatio>
        <Box sx={{ display: "flex" }}>
          <div>
            <Typography level="body3">price:</Typography>
            <Typography fontSize="lg" fontWeight="lg">
              {((theProduct.price * quantity) / 100).toFixed(2)}
            </Typography>
          </div>
          <TextField
            id="outlined-number"
            label="Number"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            defaultValue={quantity}
            InputProps={{
              inputProps: {
                max: 100,
                min: 1,
              },
            }}
            onChange={(e) => {
              handleUpdateQantity(e.target.value);
            }}
          />

          <Button
            variant="solid"
            size="sm"
            color="primary"
            sx={{ ml: "auto", fontWeight: 600 }}
            onClick={handlerRemoveFromCart}
          >
            Remove
          </Button>
        </Box>
      </Card>
    </>
  );
};

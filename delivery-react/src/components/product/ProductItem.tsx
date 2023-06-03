import React from "react";
import { Product } from "../../models/DeliveryModels";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";
import { useAppDispatch } from "../../store/store";
import { cartAddItemOperation } from "../../redux/cart/cartActions";
import { useCartIds } from "../../redux/selectors/selectorHooks";

export const ProductItem: React.FC<Product> = ({
  id,
  productName,
  price,
  image,
}): JSX.Element => {
  const dispatch = useAppDispatch();

  const cardIds = useCartIds();
  const alreadyInCart = cardIds.includes(id);

  const handleStoreToCart = () => {
    dispatch(cartAddItemOperation(id));
  };

  return (
    <>
      <Card variant="outlined" sx={{ width: 320 }}>
        <Typography level="h2" fontSize="md" sx={{ mb: 0.5 }}>
          {productName}
        </Typography>

        <AspectRatio minHeight="120px" maxHeight="200px" sx={{ my: 2 }}>
          <img src={image} />
        </AspectRatio>
        <Box sx={{ display: "flex" }}>
          <div>
            <Typography level="body3">price:</Typography>
            <Typography fontSize="lg" fontWeight="lg">
              {(price / 100).toFixed(2)}
            </Typography>
          </div>
          <Button
            variant="solid"
            size="sm"
            color="primary"
            sx={{ ml: "auto", fontWeight: 600 }}
            onClick={handleStoreToCart}
          >
            {alreadyInCart ? "In cart" : "Add to cart"}
          </Button>
        </Box>
      </Card>
    </>
  );
};

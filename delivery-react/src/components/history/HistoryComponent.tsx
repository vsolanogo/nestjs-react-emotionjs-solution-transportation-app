import React from "react";
import { OrderItem } from "../../models/DeliveryModels";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";

export const HistoryComponent: React.FC<OrderItem> = ({
  id,
  quantity,
  price,
  createdAt,
  updatedAt,
  product,
}): JSX.Element => {
  return (
    <>
      <Card variant="outlined" sx={{ width: 320 }}>
        <Typography level="h2" fontSize="md" sx={{ mb: 0.5 }}>
          {product.productName}
        </Typography>

        <AspectRatio minHeight="120px" maxHeight="200px" sx={{ my: 2 }}>
          <img src={product.image} />
        </AspectRatio>
        <Box sx={{ display: "flex" }}>
          <div>
            <Typography level="body3">Total price:</Typography>
            <Typography fontSize="lg" fontWeight="lg">
              {(price / 100).toFixed(2)}
            </Typography>
          </div>
        </Box>

        <div>
          <Typography level="body3">quantity:</Typography>
          <Typography fontSize="lg" fontWeight="lg">
            {quantity}
          </Typography>
        </div>
      </Card>
    </>
  );
};

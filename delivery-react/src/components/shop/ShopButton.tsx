import React from "react";
import { Link } from "wouter";
import { Shop } from "../../models/DeliveryModels";

export const ShopButton: React.FC<Shop> = ({ id, shopName }): JSX.Element => {
  return <Link href={`/shop/${id}`}> {shopName}</Link>;
};

import React from "react";
import { useShops } from "../../redux/selectors/selectorHooks";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "wouter";

export const ShopList: React.FC = (): JSX.Element => {
  const shops = useShops();

  return (
    <MenuList>
      {shops.map((i) => (
        <Link href={`/shop/${i.id}`} key={i.id}>
          <MenuItem>
            <ListItem>{i.shopName}</ListItem>
            <Divider />
          </MenuItem>
        </Link>
      ))}
    </MenuList>
  );
};

import React from "react";
import { Link } from "wouter";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Badge from "@mui/material/Badge";
import { useCartIds } from "../../redux/selectors/selectorHooks";

export const Header: React.FC = (): JSX.Element => {
  const cardIds = useCartIds();

  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
        >
          <Link href={`/shop`}>
            <Button>Shop</Button>
          </Link>

          <Badge color="secondary" badgeContent={cardIds.length}>
            <Link href={`/cart`}>
              <Button>Shopping cart</Button>
            </Link>
          </Badge>
        </ButtonGroup>
      </Toolbar>
    </AppBar>
  );
};

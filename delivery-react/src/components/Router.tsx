import React from "react";
import { Route, Switch } from "wouter";
import { Home } from "./Home";
import { Header } from "./navigation/Header";
import { ShopLayout } from "./shop/ShopLayout";
import { CartLayout } from "./cart/CartLayout";

export const Router = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/shop/:id" component={ShopLayout} />
        <Route path="/shop" component={ShopLayout} />
        <Route path="/cart" component={CartLayout} />
      </Switch>
    </>
  );
};

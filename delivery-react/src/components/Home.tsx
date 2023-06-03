import React from "react";
import { Redirect } from "wouter";

export const Home: React.FC = (): JSX.Element => {
  return <Redirect to={"/shop/1"} />;
};

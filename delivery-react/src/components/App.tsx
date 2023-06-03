import React from "react";
import { useAppDispatch } from "../store/store";
import { useReduxMainState } from "../redux/selectors/selectorHooks";
import { EWrapper } from "./shared";
import { loadAppOperation } from "../redux/delivery/deliveryActions";
import { Router } from "./Router";

export const App = () => {
  const dispatch = useAppDispatch();

  const i = useReduxMainState();

  console.log(i);

  React.useEffect(() => {
    dispatch(loadAppOperation());
  }, []);

  return (
    <>
      <EWrapper>
        <Router />
      </EWrapper>
    </>
  );
};

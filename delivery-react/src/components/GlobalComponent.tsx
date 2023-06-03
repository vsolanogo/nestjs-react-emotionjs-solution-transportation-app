import React from "react";
import { Global, css } from "@emotion/react";

export const GlobalComponent = () => {
  return (
    <>
      <Global
        styles={css`
          html {
            padding: unset;
            margin: unset;
          }

          body {
            margin: 0;
          }

          button,
          a,
          textarea,
          select,
          input {
            font: inherit;
          }
        `}
      />
    </>
  );
};

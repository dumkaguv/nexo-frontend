import { FC, PropsWithChildren } from "react";
import { BrowserRouter as Router } from "react-router-dom";

export const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Router>{children}</Router>
    </>
  );
};

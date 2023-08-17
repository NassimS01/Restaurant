import { StyledCrud } from "./CrudStyled";
import PanelOne from "./PanelOne/PanelOne";
import { Outlet } from "react-router-dom";
import NotFound from "../NotFound/NotFound";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Crud = () => {
  return (
    <StyledCrud>
      {window.innerWidth >= 768 ? (
        <>
          <PanelOne />
          <Outlet />
        </>
      ) : (
        <NotFound />
      )}
    </StyledCrud>
  );
};

export default Crud;

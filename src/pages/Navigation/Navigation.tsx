/// <reference types="vite-plugin-svgr/client" />
import {
  LogoContainer,
  NavLink,
  NavLinksContainer,
  NavigationContainer,
  SignOutLink,
} from "./Navigation.styles";
import { Fragment, useContext } from "react";
import { Outlet } from "react-router-dom";

import { ReactComponent as CrownLogo } from "../../assets/crown.svg";
import { UserContext } from "../../contexts/UserContext";
import { signOutUser } from "../../utils/Firebase/firebase";
import CartIcon from "../../components/CartIcon/CartIcon";
import CartDropdown from "../../components/CartDropdown/CartDropdown";
import { CartContext } from "../../contexts/CartContext";

const Navigation = () => {
  const { user } = useContext(UserContext);
  const { isOpened } = useContext(CartContext);
  console.log(user);
  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to="/">
          <CrownLogo className="logo" />
        </LogoContainer>
        <NavLinksContainer>
          <NavLink to="/shop"> Shop </NavLink>
          {user ? (
            <SignOutLink
              onClick={() => {
                signOutUser();
              }}
            >
              Sign out
            </SignOutLink>
          ) : (
            <NavLink to="/auth"> Sign in </NavLink>
          )}
          <CartIcon />
        </NavLinksContainer>
        {isOpened && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;

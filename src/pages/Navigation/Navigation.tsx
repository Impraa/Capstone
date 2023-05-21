/// <reference types="vite-plugin-svgr/client" />
import {
  LogoContainer,
  NavLink,
  NavLinksContainer,
  NavigationContainer,
  SignOutLink,
} from "./Navigation.styles";
import { Fragment } from "react";
import { Outlet } from "react-router-dom";

import { ReactComponent as CrownLogo } from "../../assets/crown.svg";
import { signOutUser } from "../../utils/Firebase/firebase";
import CartIcon from "../../components/CartIcon/CartIcon";
import CartDropdown from "../../components/CartDropdown/CartDropdown";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user-selector";
import { selectIsCartOpen } from "../../store/cart/cart-selector";

const Navigation = () => {
  const user = useSelector(selectCurrentUser);

  const isOpened = useSelector(selectIsCartOpen);
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

/// <reference types="vite-plugin-svgr/client" />
import "./Navigation.scss";
import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";

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
      <div className="navigation">
        <Link className="logo-container" to="/">
          <CrownLogo className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link to="/shop" className="nav-link">
            {" "}
            Shop{" "}
          </Link>
          {user ? (
            <span
              className="nav-link"
              onClick={() => {
                signOutUser();
              }}
            >
              Sign out
            </span>
          ) : (
            <Link to="/auth" className="nav-link">
              {" "}
              Sign in{" "}
            </Link>
          )}
          <CartIcon />
        </div>
        {isOpened && <CartDropdown />}
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;

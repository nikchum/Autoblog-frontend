import { useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { checkIsAuth, getStatus, getToken } from 'redux/features/auth/authSelectors';
import { removeStatus } from 'redux/features/auth/authSlice';
import { logout } from '../redux/features/auth/authOperations';

import { Button } from './Button';
import { LinkButton } from './LinkButton';

import { navLinks } from 'constans/navLinks';
import logo from '../img/logo.png';

const activeStyles = {
  color: 'white',
};

export const NavBar = () => {
  const isAuth = useSelector(checkIsAuth);
  const isLogin = useSelector(getToken);
  const statusMessage = useSelector(getStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLogin) {
      toast.success(statusMessage);
      dispatch(removeStatus());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, isLogin]);

  const createNavLinks = links => {
    return links.map(({ path, text }, idx) => (
      <li key={idx}>
        <NavLink
          className="transition-colors hover:text-white focus:text-white"
          to={path}
          end
          style={({ isActive }) => (isActive ? activeStyles : undefined)}
        >
          {text}
        </NavLink>
      </li>
    ));
  };

  return (
    <div className="flex items-center justify-between py-4">
      <Link to={'/'}>
        <img className="w-28 bg-inherit" src={logo} alt="logo" />
      </Link>
      <ul className="flex gap-8">{isAuth && createNavLinks(navLinks)}</ul>

      {isAuth ? (
        <Button onClick={() => dispatch(logout())}> Sign Out</Button>
      ) : (
        <LinkButton path={'/login'}>Sing In</LinkButton>
      )}
    </div>
  );
};

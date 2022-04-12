import React, { useContext } from 'react';
import { Menu, Image, Button, Icon } from 'semantic-ui-react';
import { Link, useHistory } from 'react-router-dom';

import logo from 'assets/images/logo.svg';
import logout from 'context/actions/auth/logout';
import { GlobalContext } from 'context/Provider';
import isAuthenticated from 'utils/isAuthenticated';

import { Container } from './styles';

const Header = () => {
  const history = useHistory();

  const { authDispatch: dispatch } = useContext(GlobalContext);

  const handleUserLogout = () => {
    logout(history)(dispatch);
  };

  return (
    <Container>
      <Menu secondary pointing className="menu">
        <Image className="logo-image" src={logo} />

        <Menu.Item>
          <Link className="logo-text" to="/">
            Base Frontend
          </Link>
        </Menu.Item>

        {isAuthenticated() && (
          <Menu.Item position="right">
            <Button
              className="btn-logout"
              onClick={handleUserLogout}
              color="red"
              basic
              icon
            >
              <Icon name="log out"></Icon>
              Logout
            </Button>
          </Menu.Item>
        )}
      </Menu>
    </Container>
  );
};

export default Header;

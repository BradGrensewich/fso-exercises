import CurrentUserInfo from './CurrentUserInfo';
import NavBar from './NavBar';

const headerStyles = {
  backgroundColor: 'gray',
  display: 'flex',
  border: '1px solid black',
  alignItems: 'center',
};

const Header = () => {
  return (
    <header style={headerStyles}>
      <NavBar />
      <CurrentUserInfo />
    </header>
  );
};

export default Header;

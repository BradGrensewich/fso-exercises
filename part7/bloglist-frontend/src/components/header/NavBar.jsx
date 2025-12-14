import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <menu>
      <Link to='/'>
        <span>blogs </span>
      </Link>
      <Link to='/users'>
        <span>users </span>
      </Link>
    </menu>
  );
};

export default NavBar;

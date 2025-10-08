import { Container, LogoutBtn, Logo } from '../index';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    { name: 'Home', slug: '/', active: true },
    { name: 'Login', slug: '/login', active: !authStatus },
    { name: 'Signup', slug: '/signup', active: !authStatus },
    { name: 'All Posts', slug: '/all-posts', active: authStatus },
    { name: 'Add Post', slug: '/add-post', active: authStatus },
  ];

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-red-500 to-orange-500 shadow-xl backdrop-blur-md">
      <Container>
        <nav className="flex items-center py-3 md:py-4">
          {/* Logo */}
          <Link to="/" className="mr-6 flex items-center">
            <Logo width="50px" />
          </Link>

          {/* Navigation */}
          <ul className="flex ml-auto items-center space-x-2 md:space-x-4">
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <button
                      onClick={() => navigate(item.slug)}
                      className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/25 text-white font-semibold shadow-md transition-all duration-300 transform hover:scale-105"
                    >
                      {item.name}
                    </button>
                  </li>
                )
            )}

            {/* Logout button */}
            {authStatus && (
              <li>
                <LogoutBtn className="ml-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/25 text-white font-semibold shadow-md transition-all duration-300 transform hover:scale-105" />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;

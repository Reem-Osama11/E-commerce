import React, { useContext, useState } from 'react';
import logo from '../../assets/freshcart-logo.svg';
import { NavLink, useNavigate } from 'react-router-dom';
import { userLogin } from '../../Context/UserCounter';
import { UserContext } from '../../Context/UserContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { userloginauth, setuserloginauth } = useContext(userLogin);
  const { cartCount } = useContext(UserContext);
  const navigate = useNavigate();

  function logout() {
    // 1. مسح التوكن
    localStorage.removeItem('userToken');
    localStorage.removeItem('usertoken');
    
    // 2. تحديث الحالة
    setuserloginauth(null);
    
    // 3. التوجيه لصفحة تسجيل الدخول باستخدام useNavigate
    navigate('/login');
  }

  return (
    <header className="relative bg-gray-100 dark:bg-gray-900">
      <div className="mx-auto px-2 sm:px-4 lg:px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Logo" className="h-8 w-auto" />

            <nav aria-label="Global" className="hidden lg:block">
              <ul className="flex items-center gap-6 text-sm">
                {userloginauth !== null ? (
                  <>
                    <li>
                      <NavLink
                        className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                        to="/"
                      >
                        Home
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                        to="/cart"
                      >
                        Cart
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                        to="/products"
                      >
                        Products
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                        to="/categories"
                      >
                        Categories
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                        to="/brands"
                      >
                        Brands
                      </NavLink>
                    </li>
                  </>
                ) : null}
              </ul>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden lg:flex lg:items-center lg:gap-4">
              {userloginauth === null ? (
                <>
                  <NavLink
                    className="rounded-md bg-green-500 px-5 py-2.5 text-sm font-medium text-white shadow-sm dark:hover:bg-teal-500"
                    to="/login"
                  >
                    Login
                  </NavLink>

                  <NavLink
                    className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-green-500 dark:bg-gray-800 dark:text-white dark:hover:text-white/75"
                    to="/register"
                  >
                    Register
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink
                    to="/cart"
                    className="relative text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                  >
                    <i className="fa-solid fa-cart-shopping text-lg"></i>
                    {cartCount > 0 && (
                      <span className="absolute -top-2 -right-3 flex h-4 w-4 items-center justify-center rounded-full bg-green-500 text-[10px] font-bold text-white">
                        {cartCount}
                      </span>
                    )}
                  </NavLink>

                  {/* استخدام زر بدلاً من NavLink للـ Logout */}
                  <button
                    onClick={logout}
                    className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-green-500 dark:bg-gray-800 dark:text-white dark:hover:text-white/75"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>

            <div className="hidden lg:flex lg:items-center lg:gap-4">
              <a href="#" aria-label="Instagram" className="text-gray-500 hover:text-gray-500/75 dark:text-white dark:hover:text-white/75">
                <i className="fa-brands fa-instagram text-lg"></i>
              </a>
              <a href="#" aria-label="Facebook" className="text-gray-500 hover:text-gray-500/75 dark:text-white dark:hover:text-white/75">
                <i className="fa-brands fa-facebook text-lg"></i>
              </a>
              <a href="#" aria-label="TikTok" className="text-gray-500 hover:text-gray-500/75 dark:text-white dark:hover:text-white/75">
                <i className="fa-brands fa-tiktok text-lg"></i>
              </a>
              <a href="#" aria-label="LinkedIn" className="text-gray-500 hover:text-gray-500/75 dark:text-white dark:hover:text-white/75">
                <i className="fa-brands fa-linkedin text-lg"></i>
              </a>
              <a href="#" aria-label="YouTube" className="text-gray-500 hover:text-gray-500/75 dark:text-white dark:hover:text-white/75">
                <i className="fa-brands fa-youtube text-lg"></i>
              </a>
            </div>

            {/* زرار الـ toggle - الشاشات الصغيرة */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
                className="rounded-md p-2 text-gray-500 transition hover:bg-gray-200 dark:text-white dark:hover:bg-gray-800"
              >
                {isOpen ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* القائمة الجانبية للموبايل */}
        {isOpen && (
          <div className="absolute left-0 right-0 top-16 z-50 bg-slate-100 dark:bg-gray-900 shadow-lg lg:hidden pb-4">
            <nav aria-label="Global Mobile">
              <ul className="flex flex-col gap-4 text-sm px-4">
                {userloginauth !== null ? (
                  <>
                    <li><NavLink to="/" onClick={() => setIsOpen(false)}>Home</NavLink></li>
                    <li>
                      <NavLink to="/cart" onClick={() => setIsOpen(false)} className="relative inline-flex items-center gap-2">
                        <i className="fa-solid fa-cart-shopping text-lg"></i>
                        Cart
                        {cartCount > 0 && (
                          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-green-500 text-[10px] font-bold text-white">
                            {cartCount}
                          </span>
                        )}
                      </NavLink>
                    </li>
                    <li><NavLink to="/products" onClick={() => setIsOpen(false)}>Products</NavLink></li>
                    <li><NavLink to="/categories" onClick={() => setIsOpen(false)}>Categories</NavLink></li>
                    <li><NavLink to="/brands" onClick={() => setIsOpen(false)}>Brands</NavLink></li>
                  </>
                ) : null}

                <li className="flex flex-col gap-3 pt-2">
                  {userloginauth === null ? (
                    <>
                      <NavLink
                        className="rounded-md bg-teal-600 px-5 py-2.5 text-center text-sm font-medium text-white shadow-sm dark:hover:bg-teal-500"
                        to="/login"
                        onClick={() => setIsOpen(false)}
                      >
                        Login
                      </NavLink>

                      <NavLink
                        className="rounded-md bg-gray-100 px-5 py-2.5 text-center text-sm font-medium text-teal-600 dark:bg-gray-800 dark:text-white dark:hover:text-white/75"
                        to="/register"
                        onClick={() => setIsOpen(false)}
                      >
                        Register
                      </NavLink>
                    </>
                  ) : (
                    <button
                      className="rounded-md bg-gray-100 px-5 py-2.5 text-center text-sm font-medium text-teal-600 dark:bg-gray-800 dark:text-white dark:hover:text-white/75"
                      onClick={() => {
                        setIsOpen(false);
                        logout();
                      }}
                    >
                      Logout
                    </button>
                  )}
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
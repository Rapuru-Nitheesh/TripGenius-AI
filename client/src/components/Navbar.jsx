import {
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";

import {
  useState,
  useEffect,
  useRef,
} from "react";

import "./Navbar.css";


function Navbar() {

  const navigate = useNavigate();

  const location = useLocation();

  const token = localStorage.getItem("token");

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const isLandingPage =
    location.pathname === "/";


  const [showDropdown, setShowDropdown] =
    useState(false);

  const [showMobileMenu, setShowMobileMenu] =
    useState(false);


  const dropdownRef = useRef(null);


  // ==========================================
  // LOGOUT
  // ==========================================

  const handleLogout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    setShowDropdown(false);

    setShowMobileMenu(false);

    navigate("/");

  };


  // ==========================================
  // CLOSE DROPDOWN WHEN CLICKING OUTSIDE
  // ==========================================

  useEffect(() => {

    const handleClickOutside = (event) => {

      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(
          event.target
        )
      ) {

        setShowDropdown(false);

      }

    };


    document.addEventListener(
      "mousedown",
      handleClickOutside
    );


    return () => {

      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );

    };

  }, []);


  // ==========================================
  // CLOSE MENUS WHEN PAGE CHANGES
  // ==========================================

  useEffect(() => {

    setShowDropdown(false);

    setShowMobileMenu(false);

  }, [location.pathname]);


  // ==========================================
  // CLOSE MOBILE MENU
  // ==========================================

  const closeMobileMenu = () => {

    setShowMobileMenu(false);

    setShowDropdown(false);

  };


  return (

    <nav className="custom-navbar">

      <div className="custom-navbar-container">


        {/* ==================================
            LOGO
        ================================== */}

        <Link
          className="logo-text"
          to="/"
          onClick={closeMobileMenu}
        >
          🌍 TripGenius AI
        </Link>


        {/* ==================================
            MOBILE MENU BUTTON
        ================================== */}

        <button
          className="mobile-menu-btn"
          onClick={() =>
            setShowMobileMenu(
              !showMobileMenu
            )
          }
          aria-label="Toggle navigation"
        >

          {showMobileMenu ? "✕" : "☰"}

        </button>


        {/* ==================================
            NAVIGATION
        ================================== */}

        <div
          className={`custom-navbar-menu ${
            showMobileMenu
              ? "mobile-menu-open"
              : ""
          }`}
        >


          {/* ==================================
              GUEST NAVBAR
          ================================== */}

          {!token || isLandingPage ? (

            <>

              <Link
                className="nav-item-text"
                to="/"
                onClick={closeMobileMenu}
              >
                Home
              </Link>


              <Link
                className="nav-item-text"
                to="/login"
                onClick={closeMobileMenu}
              >
                Login
              </Link>


              <Link
                className="nav-item-text"
                to="/register"
                onClick={closeMobileMenu}
              >
                Register
              </Link>

            </>

          ) : (

            <>

              {/* ==================================
                  LOGGED-IN NAVBAR
              ================================== */}

              <Link
                className="nav-item-text"
                to="/dashboard"
                onClick={closeMobileMenu}
              >
                Home
              </Link>


              <Link
                className="nav-item-text"
                to="/trip-history"
                onClick={closeMobileMenu}
              >
                My Trips
              </Link>


              <Link
                className="nav-item-text"
                to="/Explore"
                onClick={closeMobileMenu}
              >
                Explore
              </Link>


              {/* ==================================
                  PROFILE DROPDOWN
              ================================== */}

              <div
                ref={dropdownRef}
                className="profile-container"
              >

                <button
                  className="profile-btn"
                  onClick={() =>
                    setShowDropdown(
                      !showDropdown
                    )
                  }
                >

                  👋 Hi,{" "}
                  {user?.fullName
                    ?.split(" ")[0]}

                  <span className="profile-arrow">
                    ▼
                  </span>

                </button>


                {showDropdown && (

                  <div className="custom-dropdown">

                    <Link
                      className="dropdown-item"
                      to="/profile"
                      onClick={closeMobileMenu}
                    >
                      👤 Profile
                    </Link>


                    <Link
                      className="dropdown-item"
                      to="/trip-planner"
                      onClick={closeMobileMenu}
                    >
                      ✈️ Plan Trip
                    </Link>


                    <button
                      className="dropdown-item logout-item"
                      onClick={handleLogout}
                    >
                      🚪 Logout
                    </button>

                  </div>

                )}

              </div>

            </>

          )}

        </div>

      </div>

    </nav>

  );

}


export default Navbar;
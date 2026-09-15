import { Link, useLocation } from "react-router-dom"

function Navbar() {
  const location = useLocation()

  const isHome = location.pathname === "/"

  return (
    <nav className="sticky top-0 z-50 border-b border-[#E7E1DB] bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3"
          aria-label="MITS Placement home"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#7A1F3D] text-base font-bold text-white shadow-sm">
            M
          </div>

          <div className="hidden sm:block">
            <p className="text-[15px] font-bold leading-tight text-[#242424]">
              MITS Placement
            </p>

            <p className="mt-0.5 text-[11px] font-medium text-[#8A817A]">
              University Job Portal
            </p>
          </div>
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-2 sm:gap-3">

          {/* Home */}
          <Link
            to="/"
            className={`relative px-3 py-2 text-sm font-medium transition-colors sm:px-4 ${
              isHome
                ? "text-[#7A1F3D]"
                : "text-[#5F5A56] hover:text-[#7A1F3D]"
            }`}
          >
            Home

            {isHome && (
              <span className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-[#7A1F3D] sm:left-4 sm:right-4" />
            )}
          </Link>

          {/* Sign Up */}
          <Link
            to="/signup"
            className="inline-flex items-center justify-center rounded-lg bg-[#F3E8EC] px-4 py-2 text-sm font-semibold text-[#7A1F3D] transition-all duration-200 hover:bg-[#EBD9E0] sm:px-5"
          >
            Sign Up
          </Link>

          {/* Sign In */}
            <Link
            to="/signin"
            className="inline-flex items-center justify-center rounded-lg border border-[#7A1F3D] bg-[#7A1F3D] px-4 py-2 text-sm font-semibold !text-white shadow-sm transition-all duration-200 hover:border-[#5C1730] hover:bg-[#5C1730] hover:shadow-md sm:px-5"
            >
            Sign In
            </Link>

        </div>
      </div>
    </nav>
  )
}

export default Navbar
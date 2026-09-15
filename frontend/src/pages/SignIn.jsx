import { Link } from "react-router-dom"

import Button from "../components/Button"

function SignIn() {
  const handleSubmit = (event) => {
    event.preventDefault()

    /*
     * Backend authentication will be connected here.
     *
     * Future flow:
     * POST /api/auth/login
     *        ↓
     * authenticate user
     *        ↓
     * receive authentication/session data
     *        ↓
     * redirect based on role
     */
  }

  return (
    <main className="min-h-screen bg-[#FAF8F5]">

      <div className="mx-auto flex min-h-[calc(100vh-64px)] max-w-7xl items-center justify-center px-5 py-12 sm:px-6 lg:px-8">

        <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-[#E7E1DB] bg-white shadow-[0_12px_40px_rgba(36,36,36,0.08)] lg:grid-cols-[0.9fr_1.1fr]">

          {/* Left Panel */}
          <section className="hidden bg-[#7A1F3D] p-10 text-white lg:flex lg:flex-col lg:justify-between">

            <div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-lg font-bold text-[#7A1F3D]">
                M
              </div>

              <p className="mt-8 text-sm font-semibold uppercase tracking-[0.12em] text-[#EFD8E0]">
                MITS Placement
              </p>

              <h1 className="mt-3 text-3xl font-bold leading-tight">
                Welcome back.
              </h1>

              <p className="mt-4 max-w-sm text-sm leading-7 text-[#F3E7EB]">
                Sign in to access placement opportunities, manage your profile
                and track your applications.
              </p>

            </div>


            <div className="border-t border-white/15 pt-6">

              <p className="text-xs uppercase tracking-[0.1em] text-[#EFD8E0]">
                University Job Portal
              </p>

              <p className="mt-2 text-sm text-[#F3E7EB]">
                One place for your placement journey.
              </p>

            </div>

          </section>


          {/* Form Panel */}
          <section className="p-6 sm:p-10 lg:p-12">

            {/* Mobile Brand */}
            <div className="mb-8 flex items-center gap-3 lg:hidden">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#7A1F3D] text-sm font-bold text-white">
                M
              </div>

              <div>
                <p className="text-sm font-bold text-[#242424]">
                  MITS Placement
                </p>

                <p className="text-xs text-[#8A817A]">
                  University Job Portal
                </p>
              </div>

            </div>


            <div className="mx-auto max-w-md">

              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.1em] text-[#7A1F3D]">
                  Student Portal
                </p>

                <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#242424] sm:text-3xl">
                  Sign in to your account
                </h2>

                <p className="mt-2 text-sm leading-6 text-[#6B6B6B]">
                  Enter your registered credentials to continue.
                </p>
              </div>


              <form
                onSubmit={handleSubmit}
                className="mt-8 space-y-5"
              >

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-[#242424]"
                  >
                    Email Address
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    required
                    className="profile-input"
                  />
                </div>


                {/* Password */}
                <div>
                  <div className="mb-2 flex items-center justify-between gap-4">

                    <label
                      htmlFor="password"
                      className="block text-sm font-semibold text-[#242424]"
                    >
                      Password
                    </label>

                    <button
                      type="button"
                      className="text-xs font-semibold text-[#7A1F3D] transition-colors hover:text-[#5C1730]"
                    >
                      Forgot password?
                    </button>

                  </div>

                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    required
                    className="profile-input"
                  />
                </div>


                {/* Remember */}
                <label className="flex items-center gap-3 text-sm text-[#6B6B6B]">

                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-[#D8CFC8] accent-[#7A1F3D]"
                  />

                  Keep me signed in

                </label>


                {/* Submit */}
                <Button
                  type="submit"
                  fullWidth
                >
                  Sign In
                </Button>

              </form>


              {/* Sign Up */}
              <div className="mt-8 border-t border-[#F0EBE7] pt-6 text-center">

                <p className="text-sm text-[#6B6B6B]">
                  Don't have an account?
                </p>

                <Link
                  to="/signup"
                  className="mt-2 inline-block text-sm font-bold text-[#7A1F3D] transition-colors hover:text-[#5C1730]"
                >
                  Create a student account →
                </Link>

              </div>

            </div>

          </section>

        </div>

      </div>

    </main>
  )
}

export default SignIn
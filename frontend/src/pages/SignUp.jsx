import { useState } from "react"
import { Link } from "react-router-dom"

import Button from "../components/Button"

function SignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()

    /*
     * Backend registration will be connected here.
     *
     * Future flow:
     *
     * POST /api/auth/register
     *        ↓
     * Create User
     *        ↓
     * Create Student
     *        ↓
     * Account becomes available for login
     *
     * Admin verification happens later for the placement profile,
     * not for basic account creation.
     */
  }

  return (
    <main className="min-h-screen bg-[#FAF8F5]">

      <div className="mx-auto flex min-h-[calc(100vh-64px)] max-w-7xl items-center justify-center px-5 py-12 sm:px-6 lg:px-8">

        <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-[#E7E1DB] bg-white shadow-[0_12px_40px_rgba(36,36,36,0.08)] lg:grid-cols-[1.1fr_0.9fr]">

          {/* Form */}
          <section className="order-2 p-6 sm:p-10 lg:order-1 lg:p-12">

            <div className="mx-auto max-w-md">

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


              {/* Heading */}
              <div>

                <p className="text-sm font-semibold uppercase tracking-[0.1em] text-[#7A1F3D]">
                  Student Registration
                </p>

                <h1 className="mt-2 text-2xl font-bold tracking-tight text-[#242424] sm:text-3xl">
                  Create your account
                </h1>

                <p className="mt-2 text-sm leading-6 text-[#6B6B6B]">
                  Register with your university details to start your placement
                  journey.
                </p>

              </div>


              {/* Form */}
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

                  <p className="mt-1.5 text-xs text-[#8A817A]">
                    Use an email address you regularly access.
                  </p>

                </div>


                {/* Roll Number */}
                <div>

                  <label
                    htmlFor="rollNumber"
                    className="mb-2 block text-sm font-semibold text-[#242424]"
                  >
                    Roll Number
                  </label>

                  <input
                    id="rollNumber"
                    name="rollNumber"
                    type="text"
                    autoComplete="off"
                    placeholder="Enter your roll number"
                    required
                    className="profile-input uppercase"
                  />

                </div>


                {/* Password */}
                <div>

                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-semibold text-[#242424]"
                  >
                    Password
                  </label>

                  <div className="relative">

                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      placeholder="Create a password"
                      required
                      className="profile-input pr-20"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 px-2 text-xs font-semibold text-[#7A1F3D] hover:text-[#5C1730]"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>

                  </div>

                </div>


                {/* Confirm Password */}
                <div>

                  <label
                    htmlFor="confirmPassword"
                    className="mb-2 block text-sm font-semibold text-[#242424]"
                  >
                    Confirm Password
                  </label>

                  <div className="relative">

                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      autoComplete="new-password"
                      placeholder="Re-enter your password"
                      required
                      className="profile-input pr-20"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 px-2 text-xs font-semibold text-[#7A1F3D] hover:text-[#5C1730]"
                    >
                      {showConfirmPassword ? "Hide" : "Show"}
                    </button>

                  </div>

                </div>


                {/* Agreement */}
                <label className="flex items-start gap-3 text-sm leading-5 text-[#6B6B6B]">

                  <input
                    type="checkbox"
                    required
                    className="mt-0.5 h-4 w-4 shrink-0 rounded border-[#D8CFC8] accent-[#7A1F3D]"
                  />

                  <span>
                    I agree to provide accurate information and follow the
                    university placement guidelines.
                  </span>

                </label>


                {/* Submit */}
                <Button
                  type="submit"
                  fullWidth
                >
                  Create Account
                </Button>

              </form>


              {/* Sign In */}
              <div className="mt-8 border-t border-[#F0EBE7] pt-6 text-center">

                <p className="text-sm text-[#6B6B6B]">
                  Already have an account?
                </p>

                <Link
                  to="/signin"
                  className="mt-2 inline-block text-sm font-bold text-[#7A1F3D] transition-colors hover:text-[#5C1730]"
                >
                  Sign in instead →
                </Link>

              </div>

            </div>

          </section>


          {/* Right Panel */}
          <section className="order-1 hidden bg-[#7A1F3D] p-10 text-white lg:order-2 lg:flex lg:flex-col lg:justify-between">

            <div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-lg font-bold text-[#7A1F3D]">
                M
              </div>

              <p className="mt-8 text-sm font-semibold uppercase tracking-[0.12em] text-[#EFD8E0]">
                MITS Placement
              </p>

              <h2 className="mt-3 text-3xl font-bold leading-tight">
                Build your placement profile.
              </h2>

              <p className="mt-4 max-w-sm text-sm leading-7 text-[#F3E7EB]">
                Your account is the first step. Once registered, complete your
                placement profile with your academic and career information.
              </p>

            </div>


            {/* Steps */}
            <div className="space-y-5">

              <SignupStep
                number="01"
                title="Create your account"
                description="Register using your email and university roll number."
              />

              <SignupStep
                number="02"
                title="Complete your profile"
                description="Add your academic, project and document details."
              />

              <SignupStep
                number="03"
                title="Get verified"
                description="Your submitted profile is reviewed by the administration."
              />

            </div>

          </section>

        </div>

      </div>

    </main>
  )
}


function SignupStep({ number, title, description }) {
  return (
    <div className="flex gap-4">

      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/20 bg-white/10 text-xs font-bold">
        {number}
      </div>

      <div>
        <p className="text-sm font-semibold text-white">
          {title}
        </p>

        <p className="mt-1 text-xs leading-5 text-[#F3E7EB]">
          {description}
        </p>
      </div>

    </div>
  )
}

export default SignUp
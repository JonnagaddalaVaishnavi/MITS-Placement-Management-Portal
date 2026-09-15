import { useState } from "react"
import { Link } from "react-router-dom"

import DriveCard from "../components/DriveCard"
import EmptyState from "../components/EmptyState"
import LoadingState from "../components/LoadingState"
import Button from "../components/Button"

function Home() {
  const [searchTerm, setSearchTerm] = useState("")

  /*
   * Backend integration will be added later.
   *
   * For now:
   * - drives starts empty
   * - loading can later be connected to the API request
   * - no mock/manual drive data is maintained here
   */
  const drives = []
  const loading = false

  const filteredDrives = drives.filter((drive) => {
    const search = searchTerm.toLowerCase().trim()

    if (!search) {
      return true
    }

    return (
      drive.title?.toLowerCase().includes(search) ||
      drive.company?.toLowerCase().includes(search) ||
      drive.location?.toLowerCase().includes(search)
    )
  })

  return (
    <main className="min-h-screen bg-[#FAF8F5]">

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-[#E7E1DB] bg-white">

        {/* Decorative background */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#F5E9ED] blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-24 h-72 w-72 rounded-full bg-[#F8F0DD] blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">

          <div className="max-w-3xl">

            <span className="inline-flex items-center rounded-full border border-[#E7E1DB] bg-[#FAF8F5] px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-[#7A1F3D]">
              MITS University Job Portal
            </span>

            <h1 className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight text-[#242424] sm:text-5xl lg:text-6xl">
              Your next opportunity
              <span className="block text-[#7A1F3D]">
                starts here.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-[#6B6B6B] sm:text-lg">
              Discover verified placement drives and career opportunities
              available through the MITS University placement portal.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button to="/signup">
                Create Student Account
              </Button>

              <Button to="/signin" variant="outline">
                Sign In
              </Button>
            </div>

          </div>
        </div>
      </section>


      {/* Latest Drives */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8 lg:py-20">

        {/* Section Header */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#7A1F3D]">
              Opportunities
            </p>

            <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#242424] sm:text-3xl">
              Latest Drives
            </h2>

            <p className="mt-2 max-w-xl text-sm leading-6 text-[#6B6B6B] sm:text-base">
              Explore the latest placement opportunities posted through the
              university portal.
            </p>
          </div>

          {/* Search */}
          <div className="w-full lg:max-w-sm">

            <label
              htmlFor="drive-search"
              className="sr-only"
            >
              Search drives
            </label>

            <div className="relative">

              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#8A817A]">
                🔍
              </span>

              <input
                id="drive-search"
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search company, role or location..."
                className="w-full rounded-xl border border-[#E7E1DB] bg-white py-3.5 pl-11 pr-4 text-sm text-[#242424] outline-none transition-all placeholder:text-[#9A938D] focus:border-[#7A1F3D] focus:ring-4 focus:ring-[#7A1F3D]/10"
              />

            </div>
          </div>

        </div>


        {/* Drive Content */}
        <div className="mt-10">

          {loading ? (
            <LoadingState message="Loading latest drives..." />
          ) : filteredDrives.length > 0 ? (

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filteredDrives.map((drive) => (
                <DriveCard
                  key={drive.id}
                  drive={drive}
                />
              ))}
            </div>

          ) : (

            <EmptyState
              title="No drives available yet"
              description="Latest placement opportunities will appear here once approved and published by the university."
            />

          )}

        </div>


        {/* Load More */}
        <div className="mt-10 flex justify-center">

        <Link
        to="/signin"
        className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-[10px] border border-[#7A1F3D] bg-[#F3E8EC] px-5 py-3 text-sm font-semibold !text-[#7A1F3D] shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#5C1730] hover:bg-[#EBD9E0] hover:!text-[#5C1730] hover:shadow-md"
        >
        Load More Drives
        <span className="transition-transform duration-200">→</span>
        </Link>

        </div>

      </section>


      {/* Public Portal Information */}
      <section className="border-t border-[#E7E1DB] bg-white">

        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-6 lg:grid-cols-3 lg:px-8 lg:py-20">

          <div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F5E9ED] font-bold text-[#7A1F3D]">
              01
            </div>

            <h3 className="mt-5 text-lg font-bold text-[#242424]">
              Discover Opportunities
            </h3>

            <p className="mt-2 text-sm leading-6 text-[#6B6B6B]">
              Browse the latest verified placement drives published through
              the university portal.
            </p>
          </div>


          <div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F8F0DD] font-bold text-[#A87500]">
              02
            </div>

            <h3 className="mt-5 text-lg font-bold text-[#242424]">
              Complete Your Profile
            </h3>

            <p className="mt-2 text-sm leading-6 text-[#6B6B6B]">
              Registered students can maintain their placement profile and
              required academic information.
            </p>
          </div>


          <div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EAF6EF] font-bold text-[#198754]">
              03
            </div>

            <h3 className="mt-5 text-lg font-bold text-[#242424]">
              Apply With Confidence
            </h3>

            <p className="mt-2 text-sm leading-6 text-[#6B6B6B]">
              Eligible students can view complete drive information and apply
              through the portal.
            </p>
          </div>

        </div>

      </section>


      {/* Final CTA */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8">

        <div className="overflow-hidden rounded-2xl bg-[#7A1F3D] px-6 py-12 text-center shadow-[0_12px_35px_rgba(122,31,61,0.15)] sm:px-10">

          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#EFD8E0]">
            Start your placement journey
          </p>

          <h2 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Ready to explore your next opportunity?
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[#F3E7EB]">
            Create your student account to access complete job details,
            eligibility information and applications.
          </p>

          <div className="mt-7 flex justify-center">
            <Button
              to="/signup"
              variant="secondary"
            >
              Get Started
            </Button>
          </div>

        </div>

      </section>

    </main>
  )
}

export default Home
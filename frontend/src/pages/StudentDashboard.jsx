import { useState } from "react"
import { Link } from "react-router-dom"

import Button from "../components/Button"
import DriveCard from "../components/DriveCard"
import EmptyState from "../components/EmptyState"
import LoadingState from "../components/LoadingState"
import PageHeader from "../components/PageHeader"
import StatusBadge from "../components/StatusBadge"

function StudentDashboard() {
  /*
   * These values will come from the backend after authentication.
   *
   * Expected future APIs:
   *
   * GET /api/students/me
   * GET /api/jobs/latest
   * GET /api/applications/me
   *
   * No student, drive, or application data is hardcoded here.
   */

  const [loading] = useState(false)

  const student = null
  const drives = []
  const applications = []

  if (loading) {
    return (
      <main className="min-h-screen bg-[#FAF8F5]">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-8">
          <LoadingState message="Loading your dashboard..." />
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#FAF8F5]">
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-8 lg:py-14">

        {/* Header */}
        <PageHeader
          title={`Welcome${student?.name ? `, ${student.name}` : ""}`}
          description="Stay updated with placement opportunities, your profile and recent activity."
          action={(text) => (
            <Button to="/student/profile" variant="outline">
              {text}
            </Button>
          )}
          actionText="View Profile"
        />


        {/* Profile Verification */}
        {student && student.profileStatus !== "VERIFIED" && (
          <section className="mb-8 overflow-hidden rounded-2xl border border-[#E8D7A5] bg-[#FFF9E8]">

            <div className="flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between">

              <div className="flex gap-4">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F8E8B5] text-[#A87500]">
                  !
                </div>

                <div>
                  <h2 className="font-bold text-[#242424]">
                    Complete your profile verification
                  </h2>

                  <p className="mt-1 text-sm leading-6 text-[#6B6B6B]">
                    Your profile must be verified before you can apply for
                    placement drives.
                  </p>
                </div>

              </div>

              <Button
                to="/student/profile"
                variant="outline"
              >
                Complete Profile
              </Button>

            </div>

          </section>
        )}


        {/* Dashboard Content */}
        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">

          {/* Main Column */}
          <div className="space-y-8">

            {/* Latest Drives */}
            <section>

              <div className="mb-5 flex items-end justify-between gap-4">

                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.1em] text-[#7A1F3D]">
                    Opportunities
                  </p>

                  <h2 className="mt-1 text-xl font-bold text-[#242424] sm:text-2xl">
                    Latest Drives
                  </h2>
                </div>

                <Link
                  to="/jobs"
                  className="shrink-0 text-sm font-semibold text-[#7A1F3D] hover:text-[#5C1730]"
                >
                  View all →
                </Link>

              </div>


              {drives.length > 0 ? (

                <div className="grid gap-6 md:grid-cols-2">
                  {drives.slice(0, 4).map((drive) => (
                    <DriveCard
                      key={drive.id}
                      drive={drive}
                    />
                  ))}
                </div>

              ) : (

                <EmptyState
                  title="No drives available"
                  description="New placement opportunities will appear here once they are published."
                  action={
                    <Button
                      to="/jobs"
                      variant="outline"
                    >
                      Explore Jobs
                    </Button>
                  }
                />

              )}

            </section>


            {/* Recent Applications */}
            <section>

              <div className="mb-5 flex items-end justify-between gap-4">

                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.1em] text-[#7A1F3D]">
                    Activity
                  </p>

                  <h2 className="mt-1 text-xl font-bold text-[#242424] sm:text-2xl">
                    Recent Applications
                  </h2>
                </div>

                <Link
                  to="/applications"
                  className="shrink-0 text-sm font-semibold text-[#7A1F3D] hover:text-[#5C1730]"
                >
                  View all →
                </Link>

              </div>


              {applications.length > 0 ? (

                <div className="overflow-hidden rounded-2xl border border-[#E7E1DB] bg-white">

                  {applications.slice(0, 5).map((application, index) => (
                    <div
                      key={application.id}
                      className={`
                        flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between
                        ${
                          index !== applications.length - 1
                            ? "border-b border-[#F0EBE7]"
                            : ""
                        }
                      `}
                    >

                      <div>
                        <p className="font-semibold text-[#242424]">
                          {application.jobTitle || "Job Application"}
                        </p>

                        <p className="mt-1 text-sm text-[#6B6B6B]">
                          {application.company || "Company"}
                        </p>

                        {application.appliedAt && (
                          <p className="mt-1 text-xs text-[#8A817A]">
                            Applied on {application.appliedAt}
                          </p>
                        )}
                      </div>

                      <StatusBadge
                        status={application.status}
                      />

                    </div>
                  ))}

                </div>

              ) : (

                <EmptyState
                  title="No applications yet"
                  description="Applications you submit for eligible placement drives will appear here."
                  action={
                    <Button
                      to="/jobs"
                      variant="outline"
                    >
                      Find Opportunities
                    </Button>
                  }
                />

              )}

            </section>

          </div>


          {/* Sidebar */}
          <aside className="space-y-6">

            {/* Profile Card */}
            <section className="rounded-2xl border border-[#E7E1DB] bg-white p-6 shadow-[0_2px_10px_rgba(36,36,36,0.03)]">

              <div className="flex items-center gap-4">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F5E9ED] text-lg font-bold text-[#7A1F3D]">
                  {student?.name?.charAt(0)?.toUpperCase() || "S"}
                </div>

                <div className="min-w-0">
                  <p className="truncate font-bold text-[#242424]">
                    {student?.name || "Student"}
                  </p>

                  <p className="mt-1 truncate text-sm text-[#6B6B6B]">
                    {student?.rollNumber || "Student profile"}
                  </p>
                </div>

              </div>


              <div className="mt-6 border-t border-[#F0EBE7] pt-5">

                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#6B6B6B]">
                    Profile status
                  </span>

                  <StatusBadge
                    status={
                      student?.profileStatus || "Not verified"
                    }
                  />
                </div>

              </div>


              <div className="mt-5">
                <Button
                  to="/student/profile"
                  variant="secondary"
                  fullWidth
                >
                  Manage Profile
                </Button>
              </div>

            </section>


            {/* Quick Links */}
            <section className="rounded-2xl border border-[#E7E1DB] bg-white p-6 shadow-[0_2px_10px_rgba(36,36,36,0.03)]">

              <h2 className="text-lg font-bold text-[#242424]">
                Quick Access
              </h2>

              <div className="mt-5 space-y-2">

                <QuickLink
                  to="/jobs"
                  title="Browse Jobs"
                  description="Explore available drives"
                />

                <QuickLink
                  to="/applications"
                  title="My Applications"
                  description="Track your applications"
                />

                <QuickLink
                  to="/notifications"
                  title="Notifications"
                  description="View recent updates"
                />

              </div>

            </section>

          </aside>

        </div>

      </div>
    </main>
  )
}


function QuickLink({ to, title, description }) {
  return (
    <Link
      to={to}
      className="group flex items-center justify-between rounded-xl border border-transparent p-3 transition-all hover:border-[#E7E1DB] hover:bg-[#FAF8F5]"
    >
      <div>
        <p className="text-sm font-semibold text-[#242424] transition-colors group-hover:text-[#7A1F3D]">
          {title}
        </p>

        <p className="mt-0.5 text-xs text-[#8A817A]">
          {description}
        </p>
      </div>

      <span className="text-[#8A817A] transition-transform group-hover:translate-x-1 group-hover:text-[#7A1F3D]">
        →
      </span>
    </Link>
  )
}

export default StudentDashboard
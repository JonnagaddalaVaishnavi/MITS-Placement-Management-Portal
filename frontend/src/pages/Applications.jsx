import { useMemo, useState } from "react"
import { Link } from "react-router-dom"

import EmptyState from "../components/EmptyState"
import LoadingState from "../components/LoadingState"
import PageHeader from "../components/PageHeader"
import StatusBadge from "../components/StatusBadge"

function Applications() {
  const [activeFilter, setActiveFilter] = useState("All")
  const [loading] = useState(false)

  /*
   * Backend integration will provide the student's applications.
   *
   * Expected future API:
   * GET /api/applications/me
   *
   * The backend will determine the actual application status.
   */
  const applications = []

  const filters = [
    "All",
    "Under Review",
    "Shortlisted",
    "Selected",
    "Rejected",
  ]

  const filteredApplications = useMemo(() => {
    if (activeFilter === "All") {
      return applications
    }

    return applications.filter(
      (application) =>
        application.status?.toLowerCase() === activeFilter.toLowerCase()
    )
  }, [applications, activeFilter])

  return (
    <main className="min-h-screen bg-[#FAF8F5]">
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-8 lg:py-14">

        {/* Header */}
        <PageHeader
          title="My Applications"
          description="Track the placement drives you have applied for and follow their progress."
        />


        {/* Filters */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex min-w-max gap-2">

            {filters.map((filter) => {
              const active = activeFilter === filter

              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`
                    rounded-lg px-4 py-2.5 text-sm font-semibold transition-all duration-200
                    ${
                      active
                        ? "bg-[#7A1F3D] text-white shadow-sm"
                        : "border border-[#E7E1DB] bg-white text-[#6B6B6B] hover:border-[#7A1F3D] hover:text-[#7A1F3D]"
                    }
                  `}
                >
                  {filter}
                </button>
              )
            })}

          </div>
        </div>


        {/* Content */}
        {loading ? (

          <LoadingState message="Loading your applications..." />

        ) : filteredApplications.length === 0 ? (

          <EmptyState
            title={
              activeFilter === "All"
                ? "No applications yet"
                : `No ${activeFilter.toLowerCase()} applications`
            }
            description={
              activeFilter === "All"
                ? "Applications you submit for eligible placement drives will appear here."
                : "Applications matching this status will appear here."
            }
            action={
              <Link
                to="/jobs"
                className="inline-flex items-center justify-center rounded-lg border border-[#7A1F3D] bg-transparent px-5 py-3 text-sm font-semibold text-[#7A1F3D] transition-all duration-200 hover:bg-[#7A1F3D] hover:text-white"
              >
                Explore Jobs
              </Link>
            }
          />

        ) : (

          <div className="space-y-4">

            {filteredApplications.map((application) => (
              <ApplicationCard
                key={application.id}
                application={application}
              />
            ))}

          </div>

        )}

      </div>
    </main>
  )
}


/* ---------- Application Card ---------- */

function ApplicationCard({ application }) {
  return (
    <article className="rounded-2xl border border-[#E7E1DB] bg-white p-5 shadow-[0_2px_10px_rgba(36,36,36,0.03)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_22px_rgba(36,36,36,0.07)] sm:p-6">

      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">

        {/* Job Information */}
        <div className="flex gap-4">

          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#F5E9ED] text-base font-bold text-[#7A1F3D]">
            {application.company?.charAt(0)?.toUpperCase() || "C"}
          </div>

          <div>
            <h2 className="text-lg font-bold text-[#242424]">
              {application.jobTitle || "Job Opportunity"}
            </h2>

            <p className="mt-1 text-sm font-medium text-[#6B6B6B]">
              {application.company || "Company"}
            </p>

            {application.location && (
              <p className="mt-2 text-sm text-[#8A817A]">
                📍 {application.location}
              </p>
            )}
          </div>

        </div>


        {/* Status */}
        <StatusBadge status={application.status} />

      </div>


      {/* Application Information */}
      <div className="mt-6 grid gap-4 border-t border-[#F0EBE7] pt-5 sm:grid-cols-3">

        {application.appliedAt && (
          <ApplicationInfo
            label="Applied On"
            value={application.appliedAt}
          />
        )}

        {application.deadline && (
          <ApplicationInfo
            label="Application Deadline"
            value={application.deadline}
          />
        )}

        {application.jobId && (
          <ApplicationInfo
            label="Job ID"
            value={application.jobId}
          />
        )}

      </div>


      {/* Actions */}
      <div className="mt-5 flex flex-wrap gap-3">

        {application.jobId && (
          <Link
            to={`/jobs/${application.jobId}`}
            className="inline-flex items-center justify-center rounded-lg border border-[#E7E1DB] bg-white px-4 py-2.5 text-sm font-semibold text-[#242424] transition-all hover:border-[#7A1F3D] hover:bg-[#FAF8F5] hover:text-[#7A1F3D]"
          >
            View Drive
          </Link>
        )}

      </div>

    </article>
  )
}


/* ---------- Small Information Block ---------- */

function ApplicationInfo({ label, value }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-[#8A817A]">
        {label}
      </p>

      <p className="mt-1 text-sm font-semibold text-[#242424]">
        {value}
      </p>
    </div>
  )
}

export default Applications
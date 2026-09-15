import { useMemo, useState } from "react"

import EmptyState from "../components/EmptyState"
import LoadingState from "../components/LoadingState"
import PageHeader from "../components/PageHeader"
import StatusBadge from "../components/StatusBadge"


function AdminApplications() {
  /*
   * Backend data will be connected here.
   *
   * Future flow:
   *
   * GET /api/admin/applications
   *        ↓
   * Fetch student applications
   *        ↓
   * Group/filter applications
   *        ↓
   * Display application information
   *
   * Future actions can include:
   *
   * PATCH /api/admin/applications/{id}/status
   *
   * The backend will be responsible for the actual
   * application status and student/job relationships.
   */

  const [applications] = useState([])
  const [loading] = useState(false)

  const [activeFilter, setActiveFilter] = useState("All")
  const [search, setSearch] = useState("")


  const filters = [
    "All",
    "Under Review",
    "Shortlisted",
    "Selected",
    "Rejected",
  ]


  const filteredApplications = useMemo(() => {

    const normalizedSearch = search.trim().toLowerCase()

    return applications.filter((application) => {

      const status = application.status?.toLowerCase() || ""

      const matchesFilter =
        activeFilter === "All" ||
        status === activeFilter.toLowerCase()


      const matchesSearch =
        !normalizedSearch ||
        application.studentName
          ?.toLowerCase()
          .includes(normalizedSearch) ||
        application.rollNumber
          ?.toLowerCase()
          .includes(normalizedSearch) ||
        application.company
          ?.toLowerCase()
          .includes(normalizedSearch) ||
        application.jobTitle
          ?.toLowerCase()
          .includes(normalizedSearch) ||
        application.jobId
          ?.toString()
          .toLowerCase()
          .includes(normalizedSearch)


      return matchesFilter && matchesSearch
    })

  }, [applications, activeFilter, search])


  return (
    <main className="min-h-screen bg-[#FAF8F5]">

      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-6 lg:px-8">

        <PageHeader
          title="Applications"
          description="Monitor student applications across placement drives."
        />


        {/* Search & Filters */}
        <section className="mb-6 rounded-2xl border border-[#E7E1DB] bg-white p-5 shadow-[0_2px_10px_rgba(36,36,36,0.04)] sm:p-6">

          <div className="flex flex-col gap-4">

            {/* Search */}
            <div className="relative w-full">

              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[#8A817A]">
                ⌕
              </span>

              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search by student, roll number, company or job..."
                className="profile-input pl-10"
              />

            </div>


            {/* Filters */}
            <div className="flex flex-wrap gap-2">

              {filters.map((filter) => (

                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`rounded-lg px-4 py-2.5 text-sm font-semibold transition-all duration-200 ${
                    activeFilter === filter
                      ? "bg-[#7A1F3D] text-white shadow-sm"
                      : "border border-[#E7E1DB] bg-white text-[#6B6B6B] hover:border-[#7A1F3D] hover:text-[#7A1F3D]"
                  }`}
                >
                  {filter}
                </button>

              ))}

            </div>

          </div>

        </section>


        {/* Applications */}
        {loading ? (

          <LoadingState message="Loading applications..." />

        ) : filteredApplications.length === 0 ? (

          <EmptyState
            title={
              applications.length === 0
                ? "No applications yet"
                : "No matching applications"
            }
            description={
              applications.length === 0
                ? "Student applications will appear here once students apply to approved placement drives."
                : "Try changing your search or application status filter."
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


/* -------------------------------------------------
   Application Card
------------------------------------------------- */

function ApplicationCard({
  application,
}) {
  return (
    <article className="rounded-2xl border border-[#E7E1DB] bg-white p-5 shadow-[0_2px_10px_rgba(36,36,36,0.04)] transition-all duration-200 hover:border-[#D8C8CE] hover:shadow-[0_8px_22px_rgba(36,36,36,0.07)] sm:p-6">

      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">

        {/* Student */}
        <div className="flex gap-4">

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F5E9ED] text-sm font-bold text-[#7A1F3D]">
            {application.studentName
              ?.charAt(0)
              ?.toUpperCase() || "S"}
          </div>

          <div>

            <h2 className="font-bold text-[#242424]">
              {application.studentName || "Student"}
            </h2>

            {application.rollNumber && (
              <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-[#8A817A]">
                Roll No. · {application.rollNumber}
              </p>
            )}

            {application.email && (
              <p className="mt-1 text-sm text-[#6B6B6B]">
                {application.email}
              </p>
            )}

          </div>

        </div>


        {/* Status */}
        <StatusBadge
          status={application.status || "Under Review"}
        />

      </div>


      {/* Job Information */}
      <div className="mt-6 grid gap-4 border-t border-[#F0EBE7] pt-6 sm:grid-cols-2 lg:grid-cols-4">

        <InfoItem
          label="Job"
          value={application.jobTitle}
        />

        <InfoItem
          label="Company"
          value={application.company}
        />

        <InfoItem
          label="Job ID"
          value={application.jobId}
        />

        <InfoItem
          label="Applied On"
          value={application.appliedAt}
        />

      </div>


      {/* Academic Information */}
      {(application.department ||
        application.cgpa !== undefined ||
        application.graduationYear !== undefined) && (

        <div className="mt-6 rounded-xl border border-[#E7E1DB] bg-[#FAF8F5] p-5">

          <h3 className="text-sm font-bold text-[#242424]">
            Student Information
          </h3>

          <div className="mt-4 grid gap-4 sm:grid-cols-3">

            <InfoItem
              label="Department"
              value={application.department}
            />

            <InfoItem
              label="CGPA"
              value={application.cgpa}
            />

            <InfoItem
              label="Graduation Year"
              value={application.graduationYear}
            />

          </div>

        </div>

      )}


      {/* Actions */}
      <div className="mt-6 flex flex-col gap-3 border-t border-[#F0EBE7] pt-5 sm:flex-row sm:justify-end">

        {application.resumeUrl && (
          <a
            href={application.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-lg border border-[#E7E1DB] bg-white px-4 py-2.5 text-sm font-semibold text-[#242424] transition-all duration-200 hover:border-[#7A1F3D] hover:bg-[#FAF8F5] hover:text-[#7A1F3D]"
          >
            View Resume
          </a>
        )}

        <button
          type="button"
          onClick={() => {
            /*
             * Future:
             * Open complete application/student details.
             */
          }}
          className="inline-flex items-center justify-center rounded-lg border border-[#7A1F3D] px-4 py-2.5 text-sm font-semibold text-[#7A1F3D] transition-all duration-200 hover:bg-[#7A1F3D] hover:text-white"
        >
          View Application
        </button>

      </div>

    </article>
  )
}


/* -------------------------------------------------
   Information Item
------------------------------------------------- */

function InfoItem({
  label,
  value,
}) {
  return (
    <div>

      <p className="text-xs font-semibold uppercase tracking-wide text-[#8A817A]">
        {label}
      </p>

      <p className="mt-1 text-sm font-semibold text-[#242424]">
        {value || "—"}
      </p>

    </div>
  )
}


export default AdminApplications
import { useMemo, useState } from "react"
import { Link } from "react-router-dom"

import Button from "../components/Button"
import EmptyState from "../components/EmptyState"
import LoadingState from "../components/LoadingState"
import PageHeader from "../components/PageHeader"
import StatusBadge from "../components/StatusBadge"


function MyDrives() {
  /*
   * Backend data will be connected here.
   *
   * Future flow:
   *
   * GET /api/jobs/my-drives
   *        ↓
   * Fetch drives created by logged-in coordinator
   *        ↓
   * Display them here
   *
   * The backend will provide:
   * - Job ID
   * - Title
   * - Company
   * - Location
   * - Package
   * - Deadline
   * - Status
   * - Category
   * - Created date
   */

  const [drives] = useState([])
  const [loading] = useState(false)
  const [activeFilter, setActiveFilter] = useState("All")
  const [search, setSearch] = useState("")


  const filters = [
    "All",
    "Pending",
    "Approved",
    "Rejected",
  ]


  const filteredDrives = useMemo(() => {

    const normalizedSearch = search.trim().toLowerCase()

    return drives.filter((drive) => {

      const matchesFilter =
        activeFilter === "All" ||
        drive.status?.toLowerCase() === activeFilter.toLowerCase()


      const matchesSearch =
        !normalizedSearch ||
        drive.title?.toLowerCase().includes(normalizedSearch) ||
        drive.company?.toLowerCase().includes(normalizedSearch) ||
        drive.location?.toLowerCase().includes(normalizedSearch) ||
        drive.id?.toString().toLowerCase().includes(normalizedSearch)


      return matchesFilter && matchesSearch
    })

  }, [drives, activeFilter, search])


  return (
    <main className="min-h-screen bg-[#FAF8F5]">

      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-6 lg:px-8">

        <PageHeader
          title="My Drives"
          description="View and manage the placement drives you have submitted."
          action={() => (
            <Button to="/coordinator/add-drive">
              Add New Drive
            </Button>
          )}
          actionText="Add New Drive"
        />


        {/* Search & Filters */}
        <section className="mb-6 rounded-2xl border border-[#E7E1DB] bg-white p-5 shadow-[0_2px_10px_rgba(36,36,36,0.04)] sm:p-6">

          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

            {/* Search */}
            <div className="relative w-full lg:max-w-md">

              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[#8A817A]">
                ⌕
              </span>

              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search your drives..."
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


        {/* Results */}
        {loading ? (

          <LoadingState message="Loading your drives..." />

        ) : filteredDrives.length === 0 ? (

          <EmptyState
            title={
              drives.length === 0
                ? "No drives submitted yet"
                : "No matching drives"
            }
            description={
              drives.length === 0
                ? "Once you submit a placement drive, it will appear here with its approval status."
                : "Try changing your search or filter to find another drive."
            }
            action={
              drives.length === 0 ? (
                <Button to="/coordinator/add-drive">
                  Add Your First Drive
                </Button>
              ) : null
            }
          />

        ) : (

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">

            {filteredDrives.map((drive) => (
              <DriveManagementCard
                key={drive.id}
                drive={drive}
              />
            ))}

          </div>

        )}

      </div>

    </main>
  )
}


/* -------------------------------------------------
   Drive Management Card
------------------------------------------------- */

function DriveManagementCard({ drive }) {

  return (
    <article className="group flex h-full flex-col rounded-2xl border border-[#E7E1DB] bg-white p-6 shadow-[0_2px_10px_rgba(36,36,36,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[#D8C8CE] hover:shadow-[0_12px_30px_rgba(36,36,36,0.09)]">

      {/* Top */}
      <div className="flex items-start justify-between gap-4">

        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F5E9ED] text-sm font-bold text-[#7A1F3D]">
          {drive.company?.charAt(0)?.toUpperCase() || "C"}
        </div>

        <StatusBadge status={drive.status} />

      </div>


      {/* Job ID */}
      {drive.id && (
        <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-[#8A817A]">
          Job ID · {drive.id}
        </p>
      )}


      {/* Title */}
      <h2 className="mt-2 text-lg font-bold leading-snug text-[#242424] transition-colors group-hover:text-[#7A1F3D]">
        {drive.title || "Job Opportunity"}
      </h2>

      <p className="mt-1 text-sm font-medium text-[#6B6B6B]">
        {drive.company || "Company"}
      </p>


      {/* Details */}
      <div className="mt-5 space-y-3 text-sm text-[#6B6B6B]">

        {drive.location && (
          <div className="flex items-center gap-2">
            <span>📍</span>
            <span>{drive.location}</span>
          </div>
        )}

        {drive.package && (
          <div className="flex items-center gap-2">
            <span>₹</span>
            <span>{drive.package}</span>
          </div>
        )}

        {drive.category && (
          <div className="flex items-center gap-2">
            <span>◆</span>
            <span>{drive.category}</span>
          </div>
        )}

        {drive.deadline && (
          <div className="flex items-center gap-2">
            <span>◷</span>
            <span>Deadline: {drive.deadline}</span>
          </div>
        )}

      </div>


      {/* Rejection reason */}
      {drive.status?.toLowerCase() === "rejected" &&
        drive.rejectionReason && (
          <div className="mt-5 rounded-xl border border-[#F0D1CC] bg-[#FDF3F1] p-4">

            <p className="text-xs font-bold uppercase tracking-wide text-[#C0392B]">
              Rejection reason
            </p>

            <p className="mt-1 text-sm leading-5 text-[#6B6B6B]">
              {drive.rejectionReason}
            </p>

          </div>
        )}


      {/* Actions */}
      <div className="mt-auto flex gap-3 border-t border-[#F0EBE7] pt-5">

        <Link
          to={`/jobs/${drive.id}`}
          className="inline-flex flex-1 items-center justify-center rounded-lg border border-[#E7E1DB] bg-white px-4 py-2.5 text-sm font-semibold text-[#242424] transition-all duration-200 hover:border-[#7A1F3D] hover:bg-[#FAF8F5] hover:text-[#7A1F3D]"
        >
          View Drive
        </Link>

      </div>

    </article>
  )
}


export default MyDrives
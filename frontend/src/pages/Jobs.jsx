import { useMemo, useState } from "react"

import DriveCard from "../components/DriveCard"
import EmptyState from "../components/EmptyState"
import LoadingState from "../components/LoadingState"
import PageHeader from "../components/PageHeader"

function Jobs() {
  const [activeTab, setActiveTab] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")

  /*
   * Backend integration will provide the real jobs.
   *
   * Expected future flow:
   * GET /api/jobs
   *        ↓
   *      jobs
   *        ↓
   *   filter + search
   *        ↓
   *    DriveCard
   */
  const jobs = []
  const loading = false

  const tabs = [
    "All",
    "Technical",
    "Non-Technical",
    "Internal",
    "Applied",
  ]

  const filteredJobs = useMemo(() => {
    const search = searchTerm.toLowerCase().trim()

    return jobs.filter((job) => {
      const matchesTab =
        activeTab === "All" ||
        job.category === activeTab ||
        (activeTab === "Applied" && job.isApplied)

      const matchesSearch =
        !search ||
        job.title?.toLowerCase().includes(search) ||
        job.company?.toLowerCase().includes(search) ||
        job.location?.toLowerCase().includes(search)

      return matchesTab && matchesSearch
    })
  }, [jobs, activeTab, searchTerm])

  return (
    <main className="min-h-screen bg-[#FAF8F5]">
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-8 lg:py-14">

        {/* Page Header */}
        <PageHeader
          title="Job Opportunities"
          description="Explore placement drives and career opportunities available through the university portal."
        />

        {/* Search + Tabs */}
        <div className="rounded-2xl border border-[#E7E1DB] bg-white p-4 shadow-[0_2px_10px_rgba(36,36,36,0.03)] sm:p-5">

          {/* Search */}
          <div className="relative">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#8A817A]">
              🔍
            </span>

            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search by company, role or location..."
              className="w-full rounded-xl border border-[#E7E1DB] bg-[#FAF8F5] py-3.5 pl-11 pr-4 text-sm text-[#242424] outline-none transition-all placeholder:text-[#9A938D] focus:border-[#7A1F3D] focus:bg-white focus:ring-4 focus:ring-[#7A1F3D]/10"
            />
          </div>

          {/* Tabs */}
          <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
            {tabs.map((tab) => {
              const isActive = activeTab === tab

              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`
                    shrink-0 rounded-lg px-4 py-2.5 text-sm font-semibold transition-all duration-200
                    ${
                      isActive
                        ? "bg-[#7A1F3D] text-white shadow-sm"
                        : "bg-[#FAF8F5] text-[#6B6B6B] hover:bg-[#F5E9ED] hover:text-[#7A1F3D]"
                    }
                  `}
                >
                  {tab}
                </button>
              )
            })}
          </div>

        </div>

        {/* Results */}
        <section className="mt-8">

          {loading ? (
            <LoadingState message="Loading job opportunities..." />
          ) : filteredJobs.length > 0 ? (

            <>
              <div className="mb-5 flex items-center justify-between">
                <p className="text-sm text-[#6B6B6B]">
                  Showing{" "}
                  <span className="font-semibold text-[#242424]">
                    {filteredJobs.length}
                  </span>{" "}
                  opportunities
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {filteredJobs.map((job) => (
                  <DriveCard
                    key={job.id}
                    drive={job}
                  />
                ))}
              </div>
            </>

          ) : (

            <EmptyState
              title={
                searchTerm
                  ? "No matching opportunities"
                  : activeTab === "Applied"
                    ? "No applications yet"
                    : "No job opportunities available"
              }
              description={
                searchTerm
                  ? "Try a different company, role or location."
                  : activeTab === "Applied"
                    ? "Jobs you apply for will appear here."
                    : "Approved placement drives will appear here once they are published."
              }
            />

          )}

        </section>

      </div>
    </main>
  )
}

export default Jobs
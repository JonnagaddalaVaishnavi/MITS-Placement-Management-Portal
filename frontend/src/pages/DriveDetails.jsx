import { useState } from "react"
import { Link, useParams } from "react-router-dom"

import Button from "../components/Button"
import EmptyState from "../components/EmptyState"
import LoadingState from "../components/LoadingState"
import StatusBadge from "../components/StatusBadge"

function DriveDetails() {
  const { id } = useParams()
  const [showApplyModal, setShowApplyModal] = useState(false)

  /*
   * Backend integration will provide the actual drive.
   *
   * Expected future flow:
   *
   * GET /api/jobs/{id}
   *        ↓
   *      drive
   *        ↓
   *   Drive Details
   *
   * No hardcoded drive or student data is maintained here.
   */
  const drive = null
  const loading = false

  if (loading) {
    return (
      <main className="min-h-screen bg-[#FAF8F5]">
        <div className="mx-auto max-w-5xl px-5 py-10 sm:px-6 lg:px-8">
          <LoadingState message="Loading drive details..." />
        </div>
      </main>
    )
  }

  if (!drive) {
    return (
      <main className="min-h-screen bg-[#FAF8F5]">
        <div className="mx-auto max-w-5xl px-5 py-16 sm:px-6 lg:px-8">
          <EmptyState
            title="Drive not found"
            description="This placement drive may no longer be available or has not been published yet."
            action={
              <Button to="/jobs" variant="outline">
                Back to Jobs
              </Button>
            }
          />
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#FAF8F5]">
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-6 lg:px-8 lg:py-14">

        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 text-sm text-[#8A817A]">
          <Link
            to="/jobs"
            className="transition-colors hover:text-[#7A1F3D]"
          >
            Jobs
          </Link>

          <span>/</span>

          <span className="max-w-[220px] truncate text-[#6B6B6B]">
            {drive.title}
          </span>
        </div>


        {/* Header */}
        <section className="overflow-hidden rounded-2xl border border-[#E7E1DB] bg-white shadow-[0_4px_20px_rgba(36,36,36,0.05)]">

          <div className="p-6 sm:p-8 lg:p-10">

            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">

              <div className="flex gap-5">

                {/* Company Logo */}
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#F5E9ED] text-xl font-bold text-[#7A1F3D] sm:h-16 sm:w-16">
                  {drive.company?.charAt(0)?.toUpperCase() || "C"}
                </div>

                <div>
                  <p className="text-sm font-medium text-[#6B6B6B]">
                    {drive.company}
                  </p>

                  <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#242424] sm:text-3xl">
                    {drive.title}
                  </h1>

                  {drive.jobId && (
                    <p className="mt-2 text-sm text-[#8A817A]">
                      Job ID:{" "}
                      <span className="font-semibold text-[#6B6B6B]">
                        {drive.jobId}
                      </span>
                    </p>
                  )}
                </div>

              </div>

              <StatusBadge status={drive.status} />

            </div>


            {/* Key Information */}
            <div className="mt-8 grid gap-4 border-t border-[#F0EBE7] pt-8 sm:grid-cols-2 lg:grid-cols-4">

              {drive.location && (
                <InfoItem
                  label="Location"
                  value={drive.location}
                  icon="📍"
                />
              )}

              {drive.package && (
                <InfoItem
                  label="Package"
                  value={drive.package}
                  icon="₹"
                />
              )}

              {drive.jobType && (
                <InfoItem
                  label="Job Type"
                  value={drive.jobType}
                  icon="💼"
                />
              )}

              {drive.deadline && (
                <InfoItem
                  label="Application Deadline"
                  value={drive.deadline}
                  icon="📅"
                />
              )}

            </div>

          </div>

        </section>


        {/* Main Content */}
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">

          {/* Left Content */}
          <div className="space-y-8">

            {/* Description */}
            {drive.description && (
              <DetailSection title="About the Opportunity">
                <p className="whitespace-pre-line text-sm leading-7 text-[#6B6B6B]">
                  {drive.description}
                </p>
              </DetailSection>
            )}


            {/* Eligibility */}
            {drive.eligibility && (
              <DetailSection title="Eligibility">

                <div className="grid gap-4 sm:grid-cols-2">
                  {drive.eligibility.qualification && (
                    <DetailItem
                      label="Qualification"
                      value={drive.eligibility.qualification}
                    />
                  )}

                  {drive.eligibility.department && (
                    <DetailItem
                      label="Department"
                      value={drive.eligibility.department}
                    />
                  )}

                  {drive.eligibility.graduationYear && (
                    <DetailItem
                      label="Graduation Year"
                      value={drive.eligibility.graduationYear}
                    />
                  )}

                  {drive.eligibility.cgpa && (
                    <DetailItem
                      label="Minimum CGPA"
                      value={drive.eligibility.cgpa}
                    />
                  )}

                  {drive.eligibility.backlogs !== undefined && (
                    <DetailItem
                      label="Maximum Backlogs"
                      value={drive.eligibility.backlogs}
                    />
                  )}

                  {drive.eligibility.attendance && (
                    <DetailItem
                      label="Minimum Attendance"
                      value={drive.eligibility.attendance}
                    />
                  )}
                </div>

              </DetailSection>
            )}


            {/* Skills */}
            {drive.skills && (
              <DetailSection title="Required Skills">

                <div className="flex flex-wrap gap-2">
                  {(Array.isArray(drive.skills)
                    ? drive.skills
                    : drive.skills.split(",")
                  ).map((skill) => (
                    <span
                      key={skill}
                      className="rounded-lg bg-[#F5E9ED] px-3 py-2 text-sm font-medium text-[#7A1F3D]"
                    >
                      {skill.trim()}
                    </span>
                  ))}
                </div>

              </DetailSection>
            )}


            {/* Hiring Process */}
            {drive.hiringRounds?.length > 0 && (
              <DetailSection title="Hiring Process">

                <div className="space-y-4">
                  {drive.hiringRounds.map((round, index) => (
                    <div
                      key={round.id || index}
                      className="flex gap-4"
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F5E9ED] text-xs font-bold text-[#7A1F3D]">
                        {index + 1}
                      </div>

                      <div className="pt-1">
                        <p className="text-sm font-semibold text-[#242424]">
                          {round.name || `Round ${index + 1}`}
                        </p>

                        {round.description && (
                          <p className="mt-1 text-sm leading-6 text-[#6B6B6B]">
                            {round.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

              </DetailSection>
            )}


            {/* Additional Details */}
            {drive.additionalDetails && (
              <DetailSection title="Additional Details">
                <p className="whitespace-pre-line text-sm leading-7 text-[#6B6B6B]">
                  {drive.additionalDetails}
                </p>
              </DetailSection>
            )}

          </div>


          {/* Right Sidebar */}
          <aside className="lg:sticky lg:top-24 lg:self-start">

            <div className="rounded-2xl border border-[#E7E1DB] bg-white p-6 shadow-[0_4px_18px_rgba(36,36,36,0.04)]">

              <h2 className="text-lg font-bold text-[#242424]">
                Application
              </h2>

              <p className="mt-2 text-sm leading-6 text-[#6B6B6B]">
                Review the eligibility requirements before submitting your
                application.
              </p>

              {drive.deadline && (
                <div className="mt-6 rounded-xl bg-[#FAF8F5] p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#8A817A]">
                    Deadline
                  </p>

                  <p className="mt-1 text-sm font-bold text-[#242424]">
                    {drive.deadline}
                  </p>
                </div>
              )}

              <div className="mt-6 space-y-3">

                <Button
                  fullWidth
                  onClick={() => setShowApplyModal(true)}
                  disabled={drive.status?.toLowerCase() !== "approved"}
                >
                  Apply Now
                </Button>

                <Button
                  to="/jobs"
                  variant="secondary"
                  fullWidth
                >
                  Back to Jobs
                </Button>

              </div>

            </div>

          </aside>

        </div>

      </div>


      {/* Apply Confirmation Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[#242424]/50 px-5 backdrop-blur-sm">

          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl sm:p-8">

            <div className="flex items-start justify-between gap-4">

              <div>
                <h2 className="text-xl font-bold text-[#242424]">
                  Apply for this drive?
                </h2>

                <p className="mt-2 text-sm leading-6 text-[#6B6B6B]">
                  Your application will be submitted using the profile and
                  documents associated with your student account.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowApplyModal(false)}
                className="text-xl text-[#8A817A] transition-colors hover:text-[#242424]"
                aria-label="Close"
              >
                ×
              </button>

            </div>

            <div className="mt-6 rounded-xl bg-[#FAF8F5] p-4">
              <p className="text-sm font-semibold text-[#242424]">
                {drive.title}
              </p>

              <p className="mt-1 text-sm text-[#6B6B6B]">
                {drive.company}
              </p>
            </div>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

              <Button
                variant="secondary"
                onClick={() => setShowApplyModal(false)}
              >
                Cancel
              </Button>

              <Button
                onClick={() => {
                  /*
                   * Backend application submission will be connected here.
                   */
                  setShowApplyModal(false)
                }}
              >
                Confirm Application
              </Button>

            </div>

          </div>

        </div>
      )}

    </main>
  )
}


/* ---------- Reusable Local Components ---------- */

function InfoItem({ label, value, icon }) {
  return (
    <div className="rounded-xl bg-[#FAF8F5] p-4">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-[#8A817A]">
        <span>{icon}</span>
        <span>{label}</span>
      </div>

      <p className="mt-2 text-sm font-semibold text-[#242424]">
        {value}
      </p>
    </div>
  )
}


function DetailSection({ title, children }) {
  return (
    <section className="rounded-2xl border border-[#E7E1DB] bg-white p-6 shadow-[0_2px_10px_rgba(36,36,36,0.03)] sm:p-8">

      <h2 className="text-lg font-bold text-[#242424]">
        {title}
      </h2>

      <div className="mt-5">
        {children}
      </div>

    </section>
  )
}


function DetailItem({ label, value }) {
  return (
    <div className="rounded-xl border border-[#F0EBE7] p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-[#8A817A]">
        {label}
      </p>

      <p className="mt-1 text-sm font-semibold text-[#242424]">
        {value}
      </p>
    </div>
  )
}

export default DriveDetails
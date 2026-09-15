import { useState } from "react"

import Button from "../components/Button"
import EmptyState from "../components/EmptyState"
import LoadingState from "../components/LoadingState"
import PageHeader from "../components/PageHeader"
import StatusBadge from "../components/StatusBadge"


function DriveApproval() {
  /*
   * Backend data will be connected here.
   *
   * Future flow:
   *
   * GET /api/admin/drives/pending
   *        ↓
   * Fetch drives waiting for approval
   *        ↓
   * Admin reviews drive
   *
   * Approve:
   * PATCH /api/admin/drives/{id}/approve
   *
   * Reject:
   * PATCH /api/admin/drives/{id}/reject
   *        ↓
   * Rejection reason is stored by backend
   */

  const [drives, setDrives] = useState([])
  const [loading] = useState(false)

  const [selectedDrive, setSelectedDrive] = useState(null)
  const [showRejectModal, setShowRejectModal] = useState(false)
  const [rejectionReason, setRejectionReason] = useState("")


  const approveDrive = (driveId) => {
    /*
     * Backend action will be connected here.
     *
     * PATCH /api/admin/drives/{id}/approve
     */

    setDrives((currentDrives) =>
      currentDrives.map((drive) =>
        drive.id === driveId
          ? { ...drive, status: "Approved" }
          : drive
      )
    )
  }


  const openRejectModal = (drive) => {
    setSelectedDrive(drive)
    setRejectionReason("")
    setShowRejectModal(true)
  }


  const closeRejectModal = () => {
    setSelectedDrive(null)
    setRejectionReason("")
    setShowRejectModal(false)
  }


  const rejectDrive = () => {
    if (!selectedDrive || !rejectionReason.trim()) {
      return
    }

    /*
     * Backend action will be connected here.
     *
     * PATCH /api/admin/drives/{id}/reject
     *
     * Request body:
     * {
     *   rejectionReason: "..."
     * }
     */

    setDrives((currentDrives) =>
      currentDrives.map((drive) =>
        drive.id === selectedDrive.id
          ? {
              ...drive,
              status: "Rejected",
              rejectionReason: rejectionReason.trim(),
            }
          : drive
      )
    )

    closeRejectModal()
  }


  return (
    <main className="min-h-screen bg-[#FAF8F5]">

      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-6 lg:px-8">

        <PageHeader
          title="Drive Approvals"
          description="Review placement drives submitted by coordinators before they are published to students."
        />


        {/* Approval Information */}
        <div className="mb-8 flex gap-4 rounded-2xl border border-[#E8DDBF] bg-[#FFF9EA] p-5">

          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F8EBC7] text-sm font-bold text-[#A87500]">
            !
          </div>

          <div>

            <h2 className="font-semibold text-[#242424]">
              Review before publishing
            </h2>

            <p className="mt-1 text-sm leading-6 text-[#6B6B6B]">
              Check the company details, eligibility criteria, hiring process
              and supporting documents before approving a drive.
            </p>

          </div>

        </div>


        {/* Drives */}
        {loading ? (

          <LoadingState message="Loading pending drives..." />

        ) : drives.length === 0 ? (

          <EmptyState
            title="No drives awaiting approval"
            description="New drives submitted by coordinators will appear here when they are ready for review."
          />

        ) : (

          <div className="space-y-5">

            {drives.map((drive) => (
              <DriveApprovalCard
                key={drive.id}
                drive={drive}
                onApprove={approveDrive}
                onReject={openRejectModal}
              />
            ))}

          </div>

        )}

      </div>


      {/* Reject Modal */}
      {showRejectModal && selectedDrive && (
        <RejectModal
          drive={selectedDrive}
          reason={rejectionReason}
          setReason={setRejectionReason}
          onCancel={closeRejectModal}
          onReject={rejectDrive}
        />
      )}

    </main>
  )
}


/* -------------------------------------------------
   Drive Approval Card
------------------------------------------------- */

function DriveApprovalCard({
  drive,
  onApprove,
  onReject,
}) {
  return (
    <article className="rounded-2xl border border-[#E7E1DB] bg-white p-6 shadow-[0_2px_10px_rgba(36,36,36,0.04)] sm:p-7">

      {/* Header */}
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">

        <div className="flex gap-4">

          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#F5E9ED] text-lg font-bold text-[#7A1F3D]">
            {drive.company?.charAt(0)?.toUpperCase() || "C"}
          </div>

          <div>

            <p className="text-sm font-medium text-[#6B6B6B]">
              {drive.company || "Company"}
            </p>

            <h2 className="mt-1 text-xl font-bold text-[#242424]">
              {drive.title || "Job Opportunity"}
            </h2>

            {drive.id && (
              <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-[#8A817A]">
                Job ID · {drive.id}
              </p>
            )}

          </div>

        </div>


        <StatusBadge status={drive.status || "Pending"} />

      </div>


      {/* Main Information */}
      <div className="mt-6 grid gap-4 border-t border-[#F0EBE7] pt-6 sm:grid-cols-2 lg:grid-cols-4">

        <InfoItem
          label="Location"
          value={drive.location}
        />

        <InfoItem
          label="Package"
          value={drive.package}
        />

        <InfoItem
          label="Job Type"
          value={drive.jobType}
        />

        <InfoItem
          label="Category"
          value={drive.category}
        />

        <InfoItem
          label="Qualification"
          value={drive.qualification}
        />

        <InfoItem
          label="Department"
          value={drive.department}
        />

        <InfoItem
          label="Graduation Year"
          value={drive.graduationYear}
        />

        <InfoItem
          label="Application Deadline"
          value={drive.deadline}
        />

      </div>


      {/* Eligibility */}
      {(drive.cgpa !== undefined ||
        drive.backlogs !== undefined ||
        drive.attendance !== undefined) && (

        <div className="mt-6 rounded-xl border border-[#E7E1DB] bg-[#FAF8F5] p-5">

          <h3 className="text-sm font-bold text-[#242424]">
            Eligibility Criteria
          </h3>

          <div className="mt-4 grid gap-4 sm:grid-cols-3">

            {drive.cgpa !== undefined && (
              <InfoItem
                label="Minimum CGPA"
                value={drive.cgpa}
              />
            )}

            {drive.backlogs !== undefined && (
              <InfoItem
                label="Maximum Backlogs"
                value={drive.backlogs}
              />
            )}

            {drive.attendance !== undefined && (
              <InfoItem
                label="Minimum Attendance"
                value={`${drive.attendance}%`}
              />
            )}

          </div>

        </div>

      )}


      {/* Skills */}
      {drive.skills && (
        <div className="mt-6">

          <h3 className="text-sm font-bold text-[#242424]">
            Required Skills
          </h3>

          <p className="mt-2 text-sm leading-6 text-[#6B6B6B]">
            {drive.skills}
          </p>

        </div>
      )}


      {/* Description */}
      {drive.description && (
        <div className="mt-6">

          <h3 className="text-sm font-bold text-[#242424]">
            Job Description
          </h3>

          <p className="mt-2 whitespace-pre-line text-sm leading-7 text-[#6B6B6B]">
            {drive.description}
          </p>

        </div>
      )}


      {/* Hiring Process */}
      {drive.hiringRounds?.length > 0 && (

        <div className="mt-6">

          <h3 className="text-sm font-bold text-[#242424]">
            Hiring Process
          </h3>

          <div className="mt-3 flex flex-wrap gap-2">

            {drive.hiringRounds.map((round, index) => (

              <span
                key={round.id || index}
                className="rounded-lg border border-[#E7E1DB] bg-white px-3 py-2 text-xs font-semibold text-[#6B6B6B]"
              >
                {round.round || `Round ${index + 1}`}
              </span>

            ))}

          </div>

        </div>

      )}


      {/* Actions */}
      <div className="mt-7 flex flex-col gap-3 border-t border-[#F0EBE7] pt-6 sm:flex-row sm:justify-end">

        <Button
          variant="secondary"
          onClick={() => {
            /*
             * Future:
             * Open complete drive details / JD document.
             */
          }}
        >
          Review Details
        </Button>

        <Button
          variant="danger"
          onClick={() => onReject(drive)}
        >
          Reject Drive
        </Button>

        <Button
          onClick={() => onApprove(drive.id)}
        >
          Approve Drive
        </Button>

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


/* -------------------------------------------------
   Reject Modal
------------------------------------------------- */

function RejectModal({
  drive,
  reason,
  setReason,
  onCancel,
  onReject,
}) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#242424]/45 px-5 py-8">

      <div
        className="w-full max-w-lg rounded-2xl border border-[#E7E1DB] bg-white p-6 shadow-[0_20px_60px_rgba(36,36,36,0.18)] sm:p-8"
        role="dialog"
        aria-modal="true"
        aria-labelledby="reject-drive-title"
      >

        <div>

          <p className="text-sm font-semibold uppercase tracking-[0.1em] text-[#C0392B]">
            Reject Drive
          </p>

          <h2
            id="reject-drive-title"
            className="mt-2 text-xl font-bold text-[#242424]"
          >
            Why are you rejecting this drive?
          </h2>

          <p className="mt-2 text-sm leading-6 text-[#6B6B6B]">
            The coordinator should receive a clear reason so the drive can
            be corrected and resubmitted if appropriate.
          </p>

        </div>


        <div className="mt-6 rounded-xl bg-[#FAF8F5] p-4">

          <p className="text-xs font-semibold uppercase tracking-wide text-[#8A817A]">
            Drive
          </p>

          <p className="mt-1 text-sm font-bold text-[#242424]">
            {drive.title || "Job Opportunity"}
          </p>

          <p className="mt-1 text-xs text-[#6B6B6B]">
            {drive.company || "Company"}
          </p>

        </div>


        <div className="mt-5">

          <label
            htmlFor="rejectionReason"
            className="mb-2 block text-sm font-semibold text-[#242424]"
          >
            Rejection Reason
          </label>

          <textarea
            id="rejectionReason"
            value={reason}
            onChange={(event) => setReason(event.target.value)}
            rows="5"
            placeholder="Enter the reason for rejecting this drive..."
            className="profile-input resize-y"
          />

        </div>


        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

          <Button
            variant="secondary"
            onClick={onCancel}
          >
            Cancel
          </Button>

          <Button
            variant="danger"
            onClick={onReject}
            disabled={!reason.trim()}
          >
            Confirm Rejection
          </Button>

        </div>

      </div>

    </div>
  )
}


export default DriveApproval
import { useState } from "react"

import Button from "../components/Button"
import EmptyState from "../components/EmptyState"
import LoadingState from "../components/LoadingState"
import PageHeader from "../components/PageHeader"
import StatusBadge from "../components/StatusBadge"


function ProfileVerification() {
  /*
   * Backend data will be connected here.
   *
   * Future flow:
   *
   * GET /api/admin/profile-verification
   *        ↓
   * Fetch student profiles waiting for verification
   *        ↓
   * Compare submitted information with official university data
   *        ↓
   * Admin verifies or rejects the profile
   *
   * Verify:
   * PATCH /api/admin/students/{id}/verify
   *
   * Reject:
   * PATCH /api/admin/students/{id}/reject
   *
   * The backend will store the final verification status.
   */

  const [students, setStudents] = useState([])
  const [loading] = useState(false)

  const [selectedStudent, setSelectedStudent] = useState(null)
  const [showRejectModal, setShowRejectModal] = useState(false)
  const [rejectionReason, setRejectionReason] = useState("")


  const verifyStudent = (studentId) => {
    /*
     * Backend action will be connected here.
     *
     * PATCH /api/admin/students/{id}/verify
     */

    setStudents((currentStudents) =>
      currentStudents.map((student) =>
        student.id === studentId
          ? {
              ...student,
              verificationStatus: "Verified",
            }
          : student
      )
    )
  }


  const openRejectModal = (student) => {
    setSelectedStudent(student)
    setRejectionReason("")
    setShowRejectModal(true)
  }


  const closeRejectModal = () => {
    setSelectedStudent(null)
    setRejectionReason("")
    setShowRejectModal(false)
  }


  const rejectStudent = () => {
    if (!selectedStudent || !rejectionReason.trim()) {
      return
    }

    /*
     * Backend action will be connected here.
     *
     * PATCH /api/admin/students/{id}/reject
     *
     * Request body:
     *
     * {
     *   rejectionReason: "..."
     * }
     */

    setStudents((currentStudents) =>
      currentStudents.map((student) =>
        student.id === selectedStudent.id
          ? {
              ...student,
              verificationStatus: "Rejected",
              rejectionReason: rejectionReason.trim(),
            }
          : student
      )
    )

    closeRejectModal()
  }


  return (
    <main className="min-h-screen bg-[#FAF8F5]">

      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-6 lg:px-8">

        <PageHeader
          title="Profile Verification"
          description="Compare submitted student information with official university records before verifying placement eligibility."
        />


        {/* Important Notice */}
        <div className="mb-8 flex gap-4 rounded-2xl border border-[#E8DDBF] bg-[#FFF9EA] p-5">

          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F8EBC7] text-sm font-bold text-[#A87500]">
            !
          </div>

          <div>

            <h2 className="font-semibold text-[#242424]">
              Verify against official records
            </h2>

            <p className="mt-1 text-sm leading-6 text-[#6B6B6B]">
              A student should be marked verified only when the submitted
              profile information matches the official university data.
              Unverified students cannot apply for placement drives.
            </p>

          </div>

        </div>


        {/* Verification Queue */}
        {loading ? (

          <LoadingState message="Loading profiles for verification..." />

        ) : students.length === 0 ? (

          <EmptyState
            title="No profiles awaiting verification"
            description="Student profiles submitted for verification will appear here for administrative review."
          />

        ) : (

          <div className="space-y-6">

            {students.map((student) => (

              <VerificationCard
                key={student.id}
                student={student}
                onVerify={verifyStudent}
                onReject={openRejectModal}
              />

            ))}

          </div>

        )}

      </div>


      {/* Rejection Modal */}
      {showRejectModal && selectedStudent && (
        <RejectModal
          student={selectedStudent}
          reason={rejectionReason}
          setReason={setRejectionReason}
          onCancel={closeRejectModal}
          onReject={rejectStudent}
        />
      )}

    </main>
  )
}


/* -------------------------------------------------
   Verification Card
------------------------------------------------- */

function VerificationCard({
  student,
  onVerify,
  onReject,
}) {
  return (
    <article className="rounded-2xl border border-[#E7E1DB] bg-white p-6 shadow-[0_2px_10px_rgba(36,36,36,0.04)] sm:p-8">

      {/* Header */}
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">

        <div className="flex gap-4">

          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#F5E9ED] text-lg font-bold text-[#7A1F3D]">
            {student.name?.charAt(0)?.toUpperCase() || "S"}
          </div>

          <div>

            <h2 className="text-xl font-bold text-[#242424]">
              {student.name || "Student"}
            </h2>

            <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs font-semibold text-[#8A817A]">

              {student.rollNumber && (
                <span>
                  Roll No. · {student.rollNumber}
                </span>
              )}

              {student.department && (
                <span>
                  {student.department}
                </span>
              )}

            </div>

          </div>

        </div>


        <StatusBadge
          status={student.verificationStatus || "Pending"}
        />

      </div>


      {/* Comparison */}
      <div className="mt-8">

        <div className="mb-4">

          <h3 className="text-lg font-bold text-[#242424]">
            Information Comparison
          </h3>

          <p className="mt-1 text-sm text-[#6B6B6B]">
            Compare the student's submitted information with official records.
          </p>

        </div>


        <div className="overflow-hidden rounded-xl border border-[#E7E1DB]">

          {/* Table Header */}
          <div className="grid grid-cols-[1fr_1fr_1fr] border-b border-[#E7E1DB] bg-[#FAF8F5]">

            <div className="px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#8A817A]">
              Field
            </div>

            <div className="px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#8A817A]">
              Official Data
            </div>

            <div className="px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#8A817A]">
              Submitted Data
            </div>

          </div>


          {/* Rows */}
          <ComparisonRow
            label="Name"
            official={student.official?.name}
            submitted={student.submitted?.name}
          />

          <ComparisonRow
            label="Email"
            official={student.official?.email}
            submitted={student.submitted?.email}
          />

          <ComparisonRow
            label="Roll Number"
            official={student.official?.rollNumber}
            submitted={student.submitted?.rollNumber}
          />

          <ComparisonRow
            label="Department"
            official={student.official?.department}
            submitted={student.submitted?.department}
          />

          <ComparisonRow
            label="Graduation Year"
            official={student.official?.graduationYear}
            submitted={student.submitted?.graduationYear}
          />

          <ComparisonRow
            label="CGPA"
            official={student.official?.cgpa}
            submitted={student.submitted?.cgpa}
          />

          <ComparisonRow
            label="Backlogs"
            official={student.official?.backlogs}
            submitted={student.submitted?.backlogs}
          />

        </div>

      </div>


      {/* Documents */}
      {student.documents?.length > 0 && (

        <div className="mt-7">

          <h3 className="text-sm font-bold text-[#242424]">
            Submitted Documents
          </h3>

          <div className="mt-3 flex flex-wrap gap-2">

            {student.documents.map((document) => (

              <a
                key={document.id}
                href={document.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-[#E7E1DB] bg-[#FAF8F5] px-4 py-2.5 text-xs font-semibold text-[#5F5A56] transition-colors hover:border-[#7A1F3D] hover:text-[#7A1F3D]"
              >
                {document.name || "View Document"}
              </a>

            ))}

          </div>

        </div>

      )}


      {/* Rejection Reason */}
      {student.verificationStatus?.toLowerCase() === "rejected" &&
        student.rejectionReason && (

          <div className="mt-6 rounded-xl border border-[#F0D1CC] bg-[#FDF3F1] p-4">

            <p className="text-xs font-bold uppercase tracking-wide text-[#C0392B]">
              Rejection Reason
            </p>

            <p className="mt-1 text-sm leading-6 text-[#6B6B6B]">
              {student.rejectionReason}
            </p>

          </div>

        )}


      {/* Actions */}
      {student.verificationStatus?.toLowerCase() !== "verified" && (

        <div className="mt-7 flex flex-col gap-3 border-t border-[#F0EBE7] pt-6 sm:flex-row sm:justify-end">

          <Button
            variant="danger"
            onClick={() => onReject(student)}
          >
            Reject Profile
          </Button>

          <Button
            onClick={() => onVerify(student.id)}
          >
            Verify Profile
          </Button>

        </div>

      )}

    </article>
  )
}


/* -------------------------------------------------
   Comparison Row
------------------------------------------------- */

function ComparisonRow({
  label,
  official,
  submitted,
}) {
  const hasValues =
    official !== undefined ||
    submitted !== undefined

  const matches =
    hasValues &&
    String(official ?? "").trim().toLowerCase() ===
      String(submitted ?? "").trim().toLowerCase()


  return (
    <div className="grid grid-cols-[1fr_1fr_1fr] border-b border-[#F0EBE7] last:border-b-0">

      <div className="px-4 py-4 text-sm font-semibold text-[#242424]">
        {label}
      </div>

      <div className="px-4 py-4 text-sm text-[#6B6B6B]">
        {official ?? "—"}
      </div>

      <div className="flex items-center justify-between gap-3 px-4 py-4">

        <span className="text-sm text-[#6B6B6B]">
          {submitted ?? "—"}
        </span>

        {hasValues && (
          <span
            className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase ${
              matches
                ? "bg-[#EAF6EF] text-[#198754]"
                : "bg-[#FCEBE8] text-[#C0392B]"
            }`}
          >
            {matches ? "Match" : "Mismatch"}
          </span>
        )}

      </div>

    </div>
  )
}


/* -------------------------------------------------
   Reject Modal
------------------------------------------------- */

function RejectModal({
  student,
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
        aria-labelledby="reject-profile-title"
      >

        <p className="text-sm font-semibold uppercase tracking-[0.1em] text-[#C0392B]">
          Reject Profile
        </p>

        <h2
          id="reject-profile-title"
          className="mt-2 text-xl font-bold text-[#242424]"
        >
          Why are you rejecting this profile?
        </h2>

        <p className="mt-2 text-sm leading-6 text-[#6B6B6B]">
          Provide a clear reason so the student knows what information needs
          to be corrected.
        </p>


        <div className="mt-6 rounded-xl bg-[#FAF8F5] p-4">

          <p className="text-xs font-semibold uppercase tracking-wide text-[#8A817A]">
            Student
          </p>

          <p className="mt-1 text-sm font-bold text-[#242424]">
            {student.name || "Student"}
          </p>

          {student.rollNumber && (
            <p className="mt-1 text-xs text-[#6B6B6B]">
              Roll No. · {student.rollNumber}
            </p>
          )}

        </div>


        <div className="mt-5">

          <label
            htmlFor="profileRejectionReason"
            className="mb-2 block text-sm font-semibold text-[#242424]"
          >
            Rejection Reason
          </label>

          <textarea
            id="profileRejectionReason"
            value={reason}
            onChange={(event) => setReason(event.target.value)}
            rows="5"
            placeholder="Enter the reason for rejecting this profile..."
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


export default ProfileVerification
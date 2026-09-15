import { Link } from "react-router-dom"

function DriveCard({ drive }) {
  if (!drive) {
    return null
  }

  return (
    <article className="group flex h-full flex-col rounded-2xl border border-[#E7E1DB] bg-white p-6 shadow-[0_2px_10px_rgba(36,36,36,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[#D8C8CE] hover:shadow-[0_12px_30px_rgba(36,36,36,0.09)]">

      {/* Top section */}
      <div className="flex items-start justify-between gap-4">

        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F5E9ED] text-sm font-bold text-[#7A1F3D]">
          {drive.company?.charAt(0)?.toUpperCase() || "C"}
        </div>

        {drive.status && (
          <span className="rounded-full bg-[#EAF6EF] px-3 py-1 text-xs font-semibold text-[#198754]">
            {drive.status}
          </span>
        )}

      </div>

      {/* Company */}
      <p className="mt-5 text-sm font-medium text-[#6B6B6B]">
        {drive.company || "Company"}
      </p>

      {/* Job title */}
      <h3 className="mt-1 text-lg font-bold leading-snug text-[#242424] transition-colors group-hover:text-[#7A1F3D]">
        {drive.title || "Job Opportunity"}
      </h3>

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

        {drive.qualification && (
          <div className="flex items-center gap-2">
            <span>🎓</span>
            <span>{drive.qualification}</span>
          </div>
        )}

        {drive.graduationYear && (
          <div className="flex items-center gap-2">
            <span>📅</span>
            <span>Batch {drive.graduationYear}</span>
          </div>
        )}

      </div>

      {/* Bottom section */}
      <div className="mt-auto pt-6">

        {drive.deadline && (
          <div className="mb-4 border-t border-[#F0EBE7] pt-4">
            <p className="text-xs font-medium uppercase tracking-wide text-[#8A817A]">
              Application deadline
            </p>

            <p className="mt-1 text-sm font-semibold text-[#242424]">
              {drive.deadline}
            </p>
          </div>
        )}

        <Link
          to={`/jobs/${drive.id}`}
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#7A1F3D] px-5 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#5C1730] hover:shadow-[0_6px_16px_rgba(122,31,61,0.18)]"
        >
          Know More
          <span className="transition-transform duration-200 group-hover:translate-x-1">
            →
          </span>
        </Link>

      </div>

    </article>
  )
}

export default DriveCard
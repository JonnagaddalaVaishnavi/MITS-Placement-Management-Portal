function EmptyState({
  title = "Nothing here yet",
  description = "There is no information to display at the moment.",
  action,
}) {
  return (
    <div className="flex min-h-[280px] flex-col items-center justify-center rounded-2xl border border-dashed border-[#DDD5CE] bg-white px-6 py-12 text-center">

      {/* Icon */}
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F5E9ED] text-2xl text-[#7A1F3D]">
        —
      </div>

      {/* Content */}
      <h3 className="mt-5 text-lg font-bold text-[#242424]">
        {title}
      </h3>

      <p className="mt-2 max-w-md text-sm leading-6 text-[#6B6B6B]">
        {description}
      </p>

      {/* Optional Action */}
      {action && (
        <div className="mt-6">
          {action}
        </div>
      )}

    </div>
  )
}

export default EmptyState
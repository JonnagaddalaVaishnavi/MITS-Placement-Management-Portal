function PageHeader({
  title,
  description,
  action,
  actionText,
}) {
  return (
    <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
      
      {/* Heading */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#242424] sm:text-3xl">
          {title}
        </h1>

        {description && (
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#6B6B6B] sm:text-base">
            {description}
          </p>
        )}
      </div>

      {/* Optional Action */}
      {action && actionText && (
        <div className="shrink-0">
          {action(actionText)}
        </div>
      )}

    </div>
  )
}

export default PageHeader
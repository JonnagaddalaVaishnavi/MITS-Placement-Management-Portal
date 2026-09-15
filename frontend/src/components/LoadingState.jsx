function LoadingState({
  message = "Loading...",
}) {
  return (
    <div className="flex min-h-[280px] flex-col items-center justify-center rounded-2xl border border-[#E7E1DB] bg-white px-6 py-12 text-center">

      {/* Spinner */}
      <div className="h-9 w-9 animate-spin rounded-full border-4 border-[#E9DDE2] border-t-[#7A1F3D]" />

      {/* Message */}
      <p className="mt-5 text-sm font-medium text-[#6B6B6B]">
        {message}
      </p>

    </div>
  )
}

export default LoadingState
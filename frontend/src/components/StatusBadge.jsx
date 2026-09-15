function StatusBadge({ status }) {
  if (!status) {
    return null
  }

  const normalizedStatus = status.toLowerCase()

  let styles = {
    background: "bg-[#F3F1EF]",
    text: "text-[#6B6B6B]",
  }

  if (
    normalizedStatus === "approved" ||
    normalizedStatus === "verified" ||
    normalizedStatus === "selected" ||
    normalizedStatus === "shortlisted"
  ) {
    styles = {
      background: "bg-[#EAF6EF]",
      text: "text-[#198754]",
    }
  }

  if (
    normalizedStatus === "pending" ||
    normalizedStatus === "under review" ||
    normalizedStatus === "application submitted"
  ) {
    styles = {
      background: "bg-[#FFF6DD]",
      text: "text-[#A87500]",
    }
  }

  if (
    normalizedStatus === "rejected" ||
    normalizedStatus === "failed"
  ) {
    styles = {
      background: "bg-[#FCEBE8]",
      text: "text-[#C0392B]",
    }
  }

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${styles.background} ${styles.text}`}
    >
      <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  )
}

export default StatusBadge
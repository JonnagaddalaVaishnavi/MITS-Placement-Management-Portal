import { Link } from "react-router-dom"

function Button({
  children,
  variant = "primary",
  to,
  type = "button",
  onClick,
  disabled = false,
  fullWidth = false,
}) {
  const baseStyles =
    "inline-flex min-h-[46px] items-center justify-center gap-2 rounded-[10px] px-5 py-3 text-sm font-semibold transition-all duration-200 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"

  const variants = {
    primary:
      "border border-[#7A1F3D] bg-[#7A1F3D] !text-white shadow-[0_4px_10px_rgba(122,31,61,0.14)] hover:-translate-y-0.5 hover:border-[#5C1730] hover:bg-[#5C1730] hover:shadow-[0_6px_16px_rgba(122,31,61,0.18)]",

    secondary:
      "border border-[#E7E1DB] bg-white !text-[#242424] hover:-translate-y-0.5 hover:border-[#7A1F3D] hover:bg-[#FAF8F5] hover:!text-[#7A1F3D]",

    outline:
      "border border-[#7A1F3D] bg-transparent !text-[#7A1F3D] hover:bg-[#7A1F3D] hover:!text-white",

    danger:
      "border border-[#C0392B] bg-[#C0392B] !text-white shadow-[0_4px_10px_rgba(192,57,43,0.12)] hover:-translate-y-0.5 hover:border-[#A93226] hover:bg-[#A93226]",
  }

  const className = [
    baseStyles,
    variants[variant] || variants.primary,
    fullWidth ? "w-full" : "",
  ].join(" ")

  if (to) {
    return (
      <Link
        to={to}
        className={className}
        aria-disabled={disabled}
        onClick={(event) => {
          if (disabled) {
            event.preventDefault()
          }

          if (onClick) {
            onClick(event)
          }
        }}
      >
        {children}
      </Link>
    )
  }

  return (
    <button
      type={type}
      className={className}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default Button
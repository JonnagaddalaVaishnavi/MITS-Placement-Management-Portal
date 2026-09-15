import { useState } from "react"
import { Link } from "react-router-dom"

import EmptyState from "../components/EmptyState"
import LoadingState from "../components/LoadingState"
import PageHeader from "../components/PageHeader"
import StatusBadge from "../components/StatusBadge"


function AdminDashboard() {
  /*
   * Backend dashboard data will be connected here.
   *
   * Future flow:
   *
   * GET /api/admin/dashboard
   *        ↓
   * Backend calculates current statistics
   *        ↓
   * Dashboard displays real values
   *
   * Expected response can contain:
   *
   * {
   *   totalStudents,
   *   verifiedStudents,
   *   pendingProfiles,
   *   totalDrives,
   *   pendingDrives,
   *   totalApplications
   * }
   */

  const [dashboard, setDashboard] = useState(null)
  const [loading] = useState(false)


  /*
   * These will eventually come from the backend.
   *
   * Keeping the structure here makes the UI ready for
   * the API response without introducing fake numbers.
   */
  const stats = dashboard
    ? [
        {
          label: "Total Students",
          value: dashboard.totalStudents,
          description: "Registered student accounts",
        },
        {
          label: "Verified Students",
          value: dashboard.verifiedStudents,
          description: "Placement profiles verified",
        },
        {
          label: "Total Drives",
          value: dashboard.totalDrives,
          description: "Placement drives",
        },
        {
          label: "Applications",
          value: dashboard.totalApplications,
          description: "Student applications",
        },
      ]
    : []


  /*
   * Pending actions will also come from the backend.
   *
   * Example:
   *
   * GET /api/admin/pending-actions
   */
  const pendingActions = dashboard?.pendingActions || []


  return (
    <main className="min-h-screen bg-[#FAF8F5]">

      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-6 lg:px-8">

        <PageHeader
          title="Admin Dashboard"
          description="Monitor student profiles, placement drives and application activity from one place."
        />


        {/* Dashboard Stats */}
        {loading ? (

          <LoadingState message="Loading dashboard..." />

        ) : dashboard ? (

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

            {stats.map((stat) => (
              <StatCard
                key={stat.label}
                label={stat.label}
                value={stat.value}
                description={stat.description}
              />
            ))}

          </div>

        ) : (

          <EmptyState
            title="Dashboard data is not available yet"
            description="Once the admin dashboard API is connected, current student, drive and application statistics will appear here."
          />

        )}


        {/* Pending Actions */}
        <section className="mt-8">

          <div className="mb-5">

            <h2 className="text-lg font-bold text-[#242424]">
              Pending Actions
            </h2>

            <p className="mt-1 text-sm text-[#6B6B6B]">
              Items that require administrator attention.
            </p>

          </div>


          {loading ? (

            <LoadingState message="Loading pending actions..." />

          ) : pendingActions.length === 0 ? (

            <EmptyState
              title="No pending actions"
              description="Pending profile verifications, drive approvals and other administrative tasks will appear here."
            />

          ) : (

            <div className="space-y-3">

              {pendingActions.map((action) => (
                <PendingActionCard
                  key={action.id}
                  action={action}
                />
              ))}

            </div>

          )}

        </section>


        {/* Quick Actions */}
        <section className="mt-8">

          <div className="mb-5">

            <h2 className="text-lg font-bold text-[#242424]">
              Quick Actions
            </h2>

            <p className="mt-1 text-sm text-[#6B6B6B]">
              Go directly to commonly used administration areas.
            </p>

          </div>


          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            <QuickAction
              title="Profile Verification"
              description="Review student profile submissions."
              to="/admin/profile-verification"
            />

            <QuickAction
              title="Drive Approvals"
              description="Review submitted placement drives."
              to="/admin/drive-approvals"
            />

            <QuickAction
              title="Applications"
              description="Monitor student applications."
              to="/admin/applications"
            />

            <QuickAction
              title="Notifications"
              description="View portal notifications."
              to="/notifications"
            />

          </div>

        </section>


        {/* Admin Responsibilities */}
        <section className="mt-8 rounded-2xl border border-[#E7E1DB] bg-white p-6 shadow-[0_2px_10px_rgba(36,36,36,0.04)] sm:p-8">

          <div className="max-w-3xl">

            <p className="text-sm font-semibold uppercase tracking-[0.1em] text-[#7A1F3D]">
              Administration
            </p>

            <h2 className="mt-2 text-xl font-bold text-[#242424]">
              Keep the placement portal accurate and up to date.
            </h2>

            <p className="mt-3 text-sm leading-7 text-[#6B6B6B]">
              Administrators are responsible for verifying student profiles,
              approving placement drives, monitoring applications and managing
              important portal activities.
            </p>

          </div>

        </section>

      </div>

    </main>
  )
}


/* -------------------------------------------------
   Statistics Card
------------------------------------------------- */

function StatCard({
  label,
  value,
  description,
}) {
  return (
    <div className="rounded-2xl border border-[#E7E1DB] bg-white p-6 shadow-[0_2px_10px_rgba(36,36,36,0.04)]">

      <p className="text-sm font-medium text-[#6B6B6B]">
        {label}
      </p>

      <p className="mt-3 text-3xl font-bold tracking-tight text-[#242424]">
        {value ?? "—"}
      </p>

      <p className="mt-2 text-xs leading-5 text-[#8A817A]">
        {description}
      </p>

    </div>
  )
}


/* -------------------------------------------------
   Pending Action
------------------------------------------------- */

function PendingActionCard({ action }) {

  return (
    <Link
      to={action.to || "#"}
      className="group flex flex-col gap-4 rounded-2xl border border-[#E7E1DB] bg-white p-5 shadow-[0_2px_10px_rgba(36,36,36,0.04)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#D8C8CE] hover:shadow-[0_8px_22px_rgba(36,36,36,0.07)] sm:flex-row sm:items-center sm:justify-between"
    >

      <div className="flex items-start gap-4">

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FFF6DD] text-sm font-bold text-[#A87500]">
          !
        </div>

        <div>

          <h3 className="font-semibold text-[#242424] group-hover:text-[#7A1F3D]">
            {action.title}
          </h3>

          {action.description && (
            <p className="mt-1 text-sm text-[#6B6B6B]">
              {action.description}
            </p>
          )}

        </div>

      </div>


      <div className="flex items-center gap-3">

        {action.status && (
          <StatusBadge status={action.status} />
        )}

        <span className="text-lg text-[#7A1F3D] transition-transform group-hover:translate-x-1">
          →
        </span>

      </div>

    </Link>
  )
}


/* -------------------------------------------------
   Quick Action
------------------------------------------------- */

function QuickAction({
  title,
  description,
  to,
}) {
  return (
    <Link
      to={to}
      className="group rounded-2xl border border-[#E7E1DB] bg-white p-5 shadow-[0_2px_10px_rgba(36,36,36,0.04)] transition-all duration-200 hover:-translate-y-1 hover:border-[#D8C8CE] hover:shadow-[0_10px_24px_rgba(36,36,36,0.07)]"
    >

      <div className="flex items-center justify-between">

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F5E9ED] text-sm font-bold text-[#7A1F3D]">
          →
        </div>

        <span className="text-lg text-[#B2AAA4] transition-all group-hover:translate-x-1 group-hover:text-[#7A1F3D]">
          →
        </span>

      </div>

      <h3 className="mt-5 font-semibold text-[#242424] group-hover:text-[#7A1F3D]">
        {title}
      </h3>

      <p className="mt-1 text-sm leading-5 text-[#6B6B6B]">
        {description}
      </p>

    </Link>
  )
}


export default AdminDashboard
import { useState } from "react"

import Button from "../components/Button"
import EmptyState from "../components/EmptyState"
import LoadingState from "../components/LoadingState"
import PageHeader from "../components/PageHeader"


function Notifications() {
  /*
   * Backend data will be connected here.
   *
   * Future flow:
   *
   * GET /api/notifications
   *        ↓
   * Fetch notifications for logged-in user
   *        ↓
   * Display notifications
   *
   * Future actions:
   * PATCH /api/notifications/{id}/read
   * PATCH /api/notifications/read-all
   */

  const [notifications, setNotifications] = useState([])
  const [loading] = useState(false)


  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length


  const markAsRead = (id) => {
    /*
     * Backend action will be connected here.
     *
     * PATCH /api/notifications/{id}/read
     */

    setNotifications((currentNotifications) =>
      currentNotifications.map((notification) =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    )
  }


  const markAllAsRead = () => {
    /*
     * Backend action will be connected here.
     *
     * PATCH /api/notifications/read-all
     */

    setNotifications((currentNotifications) =>
      currentNotifications.map((notification) => ({
        ...notification,
        read: true,
      }))
    )
  }


  return (
    <main className="min-h-screen bg-[#FAF8F5]">

      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-6 lg:px-8">

        <PageHeader
          title="Notifications"
          description="Stay updated with your applications, placement drives and important portal activities."
        />


        {/* Notification Header */}
        <section className="mb-6 rounded-2xl border border-[#E7E1DB] bg-white p-5 shadow-[0_2px_10px_rgba(36,36,36,0.04)] sm:p-6">

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div>

              <div className="flex items-center gap-3">

                <h2 className="text-lg font-bold text-[#242424]">
                  Your notifications
                </h2>

                {unreadCount > 0 && (
                  <span className="rounded-full bg-[#F5E9ED] px-2.5 py-1 text-xs font-bold text-[#7A1F3D]">
                    {unreadCount} unread
                  </span>
                )}

              </div>

              <p className="mt-1 text-sm text-[#6B6B6B]">
                Important updates will appear here.
              </p>

            </div>


            {unreadCount > 0 && (
              <Button
                variant="outline"
                onClick={markAllAsRead}
              >
                Mark all as read
              </Button>
            )}

          </div>

        </section>


        {/* Content */}
        {loading ? (
          <LoadingState message="Loading notifications..." />
        ) : notifications.length === 0 ? (
          <EmptyState
            title="You're all caught up"
            description="You don't have any notifications right now. New placement updates will appear here."
          />
        ) : (
          <div className="space-y-4">

            {notifications.map((notification) => (
              <NotificationCard
                key={notification.id}
                notification={notification}
                onMarkAsRead={markAsRead}
              />
            ))}

          </div>
        )}

      </div>

    </main>
  )
}


function NotificationCard({ notification, onMarkAsRead }) {

  const typeStyles = {
    application: {
      icon: "A",
      background: "bg-[#F5E9ED]",
      text: "text-[#7A1F3D]",
    },

    drive: {
      icon: "D",
      background: "bg-[#F8F1DF]",
      text: "text-[#A87500]",
    },

    profile: {
      icon: "P",
      background: "bg-[#F3F1EF]",
      text: "text-[#5F5A56]",
    },

    system: {
      icon: "!",
      background: "bg-[#F3F1EF]",
      text: "text-[#5F5A56]",
    },
  }


  const style =
    typeStyles[notification.type] || typeStyles.system


  return (
    <article
      className={`rounded-2xl border bg-white p-5 shadow-[0_2px_10px_rgba(36,36,36,0.04)] transition-all duration-200 sm:p-6 ${
        notification.read
          ? "border-[#E7E1DB]"
          : "border-[#D8C8CE] shadow-[0_5px_18px_rgba(122,31,61,0.07)]"
      }`}
    >

      <div className="flex gap-4">

        {/* Icon */}
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-sm font-bold ${style.background} ${style.text}`}
        >
          {style.icon}
        </div>


        {/* Content */}
        <div className="min-w-0 flex-1">

          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">

            <div>

              <div className="flex items-center gap-2">

                <h3 className="font-semibold text-[#242424]">
                  {notification.title}
                </h3>

                {!notification.read && (
                  <span className="h-2 w-2 shrink-0 rounded-full bg-[#7A1F3D]" />
                )}

              </div>

              {notification.message && (
                <p className="mt-2 text-sm leading-6 text-[#6B6B6B]">
                  {notification.message}
                </p>
              )}

            </div>


            {notification.createdAt && (
              <span className="shrink-0 text-xs font-medium text-[#8A817A]">
                {notification.createdAt}
              </span>
            )}

          </div>


          {!notification.read && (
            <button
              type="button"
              onClick={() => onMarkAsRead(notification.id)}
              className="mt-4 text-xs font-bold text-[#7A1F3D] transition-colors hover:text-[#5C1730]"
            >
              Mark as read
            </button>
          )}

        </div>

      </div>

    </article>
  )
}


export default Notifications
import React from "react";
import NotificationsClient from "./client";

export default function NotificationsPage() {
  return (
    <React.Suspense>
      <NotificationsClient />
    </React.Suspense>
  );
}

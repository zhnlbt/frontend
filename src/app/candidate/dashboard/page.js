// app/candidate/dashboard/page.js
'use client';

import ProtectedRoute from "@/app/components/ProtectedRoute";

export default function CandidateDashboard() {
  return (
    <ProtectedRoute requiredRole="CANDIDATE">
      <div>
        <h1>Candidate Dashboard</h1>
        {/* Your dashboard content */}
      </div>
    </ProtectedRoute>
  );
}
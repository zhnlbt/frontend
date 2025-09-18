// components/ProtectedRoute.js
'use client';

import { useUser } from '../context/userContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProtectedRoute({ children, requiredRole }) {
  const { user, isAuthenticated, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      // Redirect to sign in if not authenticated
      router.push('/signIn');
    } else if (!isLoading && isAuthenticated && requiredRole && user.role !== requiredRole) {
      // Redirect to appropriate dashboard if user doesn't have required role
      switch (user.role) {
        case 'ADMIN':
          router.push('/admin/dashboard');
          break;
        case 'EMPLOYER':
          router.push('/employer/dashboard');
          break;
        case 'CANDIDATE':
          router.push('/candidate/dashboard');
          break;
        default:
          router.push('/dashboard');
      }
    }
  }, [isLoading, isAuthenticated, user, requiredRole, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated || (requiredRole && user.role !== requiredRole)) {
    return null;
  }

  return children;
}
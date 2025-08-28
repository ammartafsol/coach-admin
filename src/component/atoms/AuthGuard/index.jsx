'use client'
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

const AuthGuard = ({ children }) => {
  const { accessToken, isLogin } = useSelector((state) => state.authReducer);
  const router = useRouter();

  useEffect(() => {
    // Check if user is not authenticated
    if (!accessToken || !isLogin) {
      router.push('/sign-in');
      return;
    }
  }, [accessToken, isLogin, router]);

  // Don't render children if not authenticated
  if (!accessToken || !isLogin) {
    return null;
  }

  return <>{children}</>;
};

export default AuthGuard;

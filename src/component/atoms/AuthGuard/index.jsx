'use client'
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

const AuthGuard = ({ children }) => {
  const { accessToken, isLogin } = useSelector((state) => state.authReducer);
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    // Only check authentication after component mounts (client-side)
    if (isClient && (!accessToken || !isLogin)) {
      router.push('/sign-in?redirect=auth_required');
      return;
    }
  }, [isClient, accessToken, isLogin, router]);

  // Don't render children if not authenticated (only on client side)
  if (isClient && (!accessToken || !isLogin)) {
    return null;
  }

  return <>{children}</>;
};

export default AuthGuard;

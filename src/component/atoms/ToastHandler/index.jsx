'use client'
import React, { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';
import RenderToast from '../RenderToast';

const ToastHandler = () => {
  const searchParams = useSearchParams();

  useEffect(() => {
    const toastMessage = searchParams.get('toast');
    const toastType = searchParams.get('type') || 'error';

    if (toastMessage) {
      // Show the toast notification
      toast[toastType](toastMessage, {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });

      // Clean up the URL by removing the toast parameters
      const url = new URL(window.location.href);
      url.searchParams.delete('toast');
      url.searchParams.delete('type');
      window.history.replaceState({}, '', url);
    }
  }, [searchParams]);

  return null; // This component doesn't render anything
};

export default ToastHandler;


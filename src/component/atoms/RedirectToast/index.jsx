'use client'
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';

const RedirectToast = () => {
  const searchParams = useSearchParams();

  useEffect(() => {
    const redirectReason = searchParams.get('redirect');
    
    if (redirectReason === 'auth_required') {
      toast.error('Please login to access this page', {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });

      // Clean up the URL
      const url = new URL(window.location.href);
      url.searchParams.delete('redirect');
      window.history.replaceState({}, '', url);
    }
  }, [searchParams]);

  return null;
};

export default RedirectToast;

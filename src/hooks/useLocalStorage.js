import { useEffect, useState } from 'react';

export default function useLocalStorage(khoa, giaTriDau) {
  const [giaTri, setGiaTri] = useState(() => {
    if (typeof window === 'undefined') return giaTriDau;

    try {
      const giaTriDaLuu = window.localStorage.getItem(khoa);
      return giaTriDaLuu === null ? giaTriDau : JSON.parse(giaTriDaLuu);
    } catch {
      return giaTriDau;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(khoa, JSON.stringify(giaTri));
    } catch {
      // Ignore storage failures such as a full or disabled localStorage.
    }
  }, [khoa, giaTri]);

  return [giaTri, setGiaTri];
}
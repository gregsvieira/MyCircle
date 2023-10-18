import {
  useState, useCallback,
} from 'react';

export default function useHome() {
  const [isLoading, setIsLoading] = useState(true);

  const stopLoading = useCallback(async () => {
    setTimeout(() => {
      setIsLoading(false);
    }, 200);
  }, []);
  stopLoading();

  return {
    isLoading,
  };
}

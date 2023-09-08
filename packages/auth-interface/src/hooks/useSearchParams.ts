function useSearchParams(): [URLSearchParams, (newParams: Record<string, string>) => void] {
  // Read the current search parameters
  const currentSearchParams = new URLSearchParams(window.location.search);

  // Update search parameters
  const setSearchParams = (newParams: Record<string, string>) => {
    const updatedSearchParams = new URLSearchParams(newParams);
    window.history.replaceState(null, "", `?${updatedSearchParams.toString()}`);
    // Dispatch a popstate event to inform any listener about the URL change
    const navEvent = new PopStateEvent('popstate');
    window.dispatchEvent(navEvent);
  };

  return [currentSearchParams, setSearchParams];
}

export default useSearchParams;

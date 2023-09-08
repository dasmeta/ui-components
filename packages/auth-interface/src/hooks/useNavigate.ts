type NavigateOptions = {
  replace?: boolean;
  state?: Record<string, any>;
};

function useNavigate(): (to: string, options?: NavigateOptions) => void {
    return (to: string, options: NavigateOptions = {}) => {
      const { replace = false, state = {} } = options;

      if (replace) {
        window.history.replaceState(state, "", to);
      } else {
        window.history.pushState(state, "", to);
      }
      
      // Dispatch a popstate event to inform any listener about the URL change
      // This can be particularly useful in SPAs to rerender based on route changes
      const navEvent = new PopStateEvent('popstate');
      window.dispatchEvent(navEvent);
    };
}

export default useNavigate;
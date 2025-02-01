export const setupViewport = () => {
  // Handle iOS Safari viewport height
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);

  // Prevent bounce/elastic scroll on iOS
  document.body.style.overflow = 'hidden';
  document.body.style.position = 'fixed';
  document.body.style.width = '100%';
  document.body.style.height = '100%';
  document.body.style.touchAction = 'none';
  
  // Set viewport meta tag for better mobile handling
  const viewport = document.querySelector('meta[name="viewport"]');
  if (viewport) {
    viewport.setAttribute('content', 
      'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover'
    );
  }
};

export const initViewport = () => {
  setupViewport();
  
  let resizeTimeout: number;
  const handleResize = () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = window.setTimeout(setupViewport, 100);
  };
  
  window.addEventListener('resize', handleResize, { passive: true });
  window.addEventListener('orientationchange', handleResize, { passive: true });
  
  return () => {
    window.removeEventListener('resize', handleResize);
    window.removeEventListener('orientationchange', handleResize);
  };
};
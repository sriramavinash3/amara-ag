import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import '../../styles/cms.css';

export default function CmsLayout() {
  useEffect(() => {
    // Add cms-mode class to document element and body to override global dark theme
    document.documentElement.classList.add('cms-mode');
    document.body.classList.add('cms-mode');

    return () => {
      document.documentElement.classList.remove('cms-mode');
      document.body.classList.remove('cms-mode');
    };
  }, []);

  return (
    <div id="cms-root" className="cms-app-shell">
      <Outlet />
    </div>
  );
}

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    const currentURL = new URL(window.location.href).pathname;
    // Select all sidebar menu items
    const sidebarLinks = document.querySelectorAll('.sidebar-link');

    sidebarLinks.forEach((link) => {
      const linkPath = new URL(link.href).pathname;

      if (currentURL === linkPath) {
        link.classList.add('bg-green-400');
        link.classList.add('text-white');
        link.classList.add('hover:text-gray-600');

      }
    });
    
    // Sidebar toggle
    const sidebarToggle = document.getElementById('desktop-sidebar-toggle');
    const sidebar = document.getElementById('logo-sidebar');
    const contentWrapper = document.querySelector('.content-wrapper');

    sidebarToggle.addEventListener('click', function () {
      sidebar.classList.toggle('sm:translate-x-0');
      contentWrapper.classList.toggle('collapsed');
    });
    // Sidebar toggle end
  });
})();

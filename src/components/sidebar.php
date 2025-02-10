<aside id="logo-sidebar" class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0" aria-label="Sidebar">
  <div class="h-full px-3 pb-4 overflow-y-auto bg-white">
    <div class="flex items-center mb-2 py-1 ">
      <a href="<?= $basePath ?>/">
        <img src="<?= $basePath ?>/src/assets/img/logo.png" class="h-16" alt="Ultrasteel Logo" />
      </a>
      <div>
        <h2 class="uppercase font-bold text-dark text-sm">The Lords Harvest</h2>
        <p class="text-gray-500 text-xs">Lukay Babatngon</p>
      </div>
    </div>

    <ul class="space-y-2 font-medium text-sm">
      <li>
        <a href="<?= $basePath ?>/" class="sidebar-link flex items-center p-2 text-gray-600 rounded-lg hover:bg-gray-100 transition-all duration-300 group">
          <i class="fa-solid fa-chart-line"></i>
          <span class="ms-3">Dashboard</span>
        </a>
      </li>
      <li>
        <a href="<?= $basePath ?>/scanner" class="sidebar-link flex items-center p-2 text-gray-600 rounded-lg hover:bg-gray-100 transition-all duration-300 group">
          <i class="fa-solid fa-people-group"></i>
          <span class="ms-3">Church Member</span>
        </a>
      </li>
      <li>
        <a href="<?= $basePath ?>/scanner" class="sidebar-link flex items-center p-2 text-gray-600 rounded-lg hover:bg-gray-100 transition-all duration-300 group">
          <i class="fa-solid fa-user-plus"></i>
          <span class="ms-3">Add Member</span>
        </a>
      </li>
      <li>
        <button type="button" class="sidebar-link flex items-center w-full p-2 text-gray-600 transition duration-75 rounded-lg group hover:bg-gray-100" aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
          <i class="fa-regular fa-calendar-check"></i>
          <span class="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">Church Attendance</span>
          <i class="fa-solid fa-angle-down"></i>
        </button>
        <ul id="dropdown-example" class="hidden py-2 space-y-2">
          <li class="space-y-2 font-medium border-t border-gray-200 dark:border-gray-700">
            <a href="#" class="flex items-center w-full p-2 text-gray-600 transition duration-75 rounded-lg pl-8 group hover:bg-gray-100">
              <i class="fa-regular fa-clipboard"></i>
              <span class="ms-3">Attendance</span>
            </a>
          </li>
          <li>
            <a href="#" class="flex items-center w-full p-2 text-gray-600 transition duration-75 rounded-lg pl-8 group hover:bg-gray-100">
              <i class="fa-solid fa-hands-praying"></i>
              <span class="ms-3">Sunday Service</span>
            </a>
          </li>
          <li>
            <a href="#" class="flex items-center w-full p-2 text-gray-600 transition duration-75 rounded-lg pl-8 group hover:bg-gray-100">
              <i class="fa-solid fa-people-roof"></i>
              <span class="ms-3">LinC Group</span>
            </a>
          </li>
          <li class="space-y-2 font-medium border-b border-gray-200 dark:border-gray-700">
            <a href="#" class="flex items-center w-full p-2 text-gray-600 transition duration-75 rounded-lg pl-8 group hover:bg-gray-100">
              <i class="fa-solid fa-seedling"></i>
              <span class="ms-3">Missional</span>
            </a>
          </li>
        </ul>
      </li>
      <li>
        <a href="<?= $basePath ?>/users" class="sidebar-link flex items-center p-2 text-gray-600 rounded-lg hover:bg-gray-100 transition-all duration-300 group">
          <i class="fa-solid fa-people-roof"></i>
          <span class="ms-3">LinC Group</span>
        </a>
      </li>
      <li>
        <a href="<?= $basePath ?>/logs" class="sidebar-link flex items-center p-2 text-gray-600 rounded-lg hover:bg-gray-100 transition-all duration-300 group">
          <i class="fa-solid fa-calendar-days"></i>
          <span class="ms-3">Calendar</span>
        </a>
      </li>

      <li class="space-y-2 font-medium border-t border-gray-200 dark:border-gray-700">
        <a href="<?= $basePath ?>/logs" class="sidebar-link mt-2 flex items-center p-2 text-gray-600 rounded-lg hover:bg-gray-100 transition-all duration-300 group">
          <i class="fa-regular fa-file-lines"></i>
          <span class="ms-3">Attendance Reports</span>
        </a>
      </li>

      <li>
        <a href="<?= $basePath ?>/logs" class="sidebar-link flex items-center p-2 text-gray-600 rounded-lg hover:bg-gray-100 transition-all duration-300 group">
          <i class="fa-solid fa-chart-pie"></i>
          <span class="ms-3">Analytics</span>
        </a>
      </li>
    </ul>
  </div>
</aside>
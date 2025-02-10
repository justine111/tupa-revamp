<?php
require_once 'src/components/header.php';
require_once 'src/components/navbar.php';
require_once 'src/components/sidebar.php';

// Handle routing
switch ($page) {
    case 'dashboard':
        require_once 'src/pages/dashboard/dashboard.php';
        break;
    case 'scanner':
        require_once 'src/pages/scanner/scanner.php';
        break;
    case 'users':
        require_once 'src/pages/users/users.php';
        break;
    case 'logs':
        require_once 'src/pages/logs/logs.php';
        break;
    default:
        require_once 'src/pages/404.php';
        break;
}

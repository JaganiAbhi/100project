<?php
require_once 'config.php';

// Check if user is logged in
if (!isset($_SESSION['user_id'])) {
    header('Location: login.php');
    exit();
}

$user_name = $_SESSION['full_name'];
$username = $_SESSION['username'];
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard - User Authentication</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <nav class="navbar">
        <a href="dashboard.php" class="navbar-brand">AuthSystem</a>
        <div class="navbar-nav">
            <span style="color: #333;">Welcome, <?php echo htmlspecialchars($user_name); ?>!</span>
            <a href="logout.php">Logout</a>
        </div>
    </nav>

    <div class="dashboard">
        <h1>Welcome to Your Dashboard</h1>
        <p>Hello <?php echo htmlspecialchars($user_name); ?> (@<?php echo htmlspecialchars($username); ?>)</p>
        <p>You have successfully logged in to your account!</p>
        
        <div style="margin-top: 2rem;">
            <a href="logout.php" class="logout-btn">Logout</a>
        </div>
    </div>
</body>
</html>
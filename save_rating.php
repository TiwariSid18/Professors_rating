
<?php
// Database connection
$servername = "localhost";
$username = "root"; // Change to your MySQL username
$password = "Tiwari1@";     // Change to your MySQL password
$dbname = "professor_rating"; // Change to your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect form data
    $professor_name = $_POST['professor_name'];
    $course_name = $_POST['course_name'];
    $rating = $_POST['rating'];
    $take_again = $_POST['take_again'];
    $comments = $_POST['comments'];
    $rated_by = $_POST['rated_by'];

    // Insert data into database
    $sql = "INSERT INTO professor_ratings (professor_name, course_name, rating, take_again, comments, rated_by)
            VALUES ('$professor_name', '$course_name', '$rating', '$take_again', '$comments', '$rated_by')";

    if ($conn->query($sql) === TRUE) {
        echo "Rating submitted successfully!";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    // Close the connection
    $conn->close();
}
?>

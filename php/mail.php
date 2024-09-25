<?php
// Ensure form data is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Assign variables with the data from the form
    $name = $_POST['name'];
    $organization = $_POST['organization'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];

    // Construct the email headers
    $mailheader = "From: $name <$email>\r\n";

    // Set the recipient email
    $recipient = "radcapnyc@gmail.com";

    // Send the mail
    if (mail($recipient, $subject, $message, $mailheader)) {
        echo 'success'; // Return success response
    } else {
        echo 'error'; // Return error response
    }
}
?>

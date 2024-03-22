<?php
error_log(print_r($_POST, true));

// Mailer form data
$name = $_POST['name'];
$email = $_POST['email'];
$mobile = $_POST['mobile'];
$date = $_POST['date'];
$message = $_POST['message'];

if(isset($_POST['statut'])) {
    $statut = $_POST['statut'];
} else {
    $statut = 'non ajouter'; // ou gérer l'erreur comme approprié
}

if(isset($_POST['logement'])) {
    $logement = $_POST['logement'];
} else {
    $logement = 'non ajouter'; // ou gérer l'erreur comme approprié
}
$address = strip_tags(htmlspecialchars($_POST['address']));

// HTML email body
$htmlBody = "<p>Name: $name</p>";
$htmlBody .= "<p>Email: $email</p>";
($mobile !== "noMobile") ? $htmlBody .= "<p>Mobile: $mobile</p>" : "";
$htmlBody .= "<p>Date: $date</p>";
$htmlBody .= "<p>Message: $message</p>";
$htmlBody .= "<p>Statut: $statut</p>";
$htmlBody .= "<p>Logement: $logement</p>";
$htmlBody .= "<p>Address: $address</p>";


// // Prepare the email headers
// $headers  = 'MIME-Version: 1.0' . "\r\n";
// $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
// // Send the email
// mail('wiipassionnet@gmail.com', 'Mailer Form Data', $htmlBody, $headers);


// Plain text email body
$plainTextBody = "Name: $name\n";
$plainTextBody .= "Email: $email\n";
($mobile !== "noMobile") ? $plainTextBody .= "Mobile: $mobile\n" : "";
$plainTextBody .= "Date: $date\n";
$plainTextBody .= $message;
$plainTextBody .= "Statut: $statut\n";
$plainTextBody .= "Logement: $logement\n";
$plainTextBody .= "Adresse: $address\n";


// Recipient name. Change this name to your
$recipientName = "Joe User";

// Recipient email. Change this email to your
$recipientEmail = "joe@example.com";

// Initiate PHPMailer
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/Exception.php';
require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/SMTP.php';

//Create an instance
$mail = new PHPMailer(true);

// Set mailer to use SMTP or PHP's mail() function
// If you use SMTP, it will be "true". Otherwise, it will be "false"
$useSMTP = true;

if ($useSMTP) {
    // Server settings for SMTP
    $mail->isSMTP();
    $mail->Host = 'smtp.ethereal.email';
    $mail->SMTPAuth = true;
    $mail->Username = 'donna.wolf@ethereal.email';
    $mail->Password = 'd5U8CSAWVKUVuZx9hB';
    $mail->SMTPSecure = 'tls';
    $mail->Port = 587;
} else {
    // Server settings for PHP's mail()
    $mail->isMail();
}

// Recipients info
$mail->setFrom($email, $name);
$mail->addAddress($recipientEmail, $recipientName);
$mail->addReplyTo($email, $name);
// $mail->addCC('cc@example.com');
// $mail->addBCC('bcc@example.com');

// Mail content
$mail->isHTML(true);
$mail->Body = $htmlBody;
$mail->AltBody = $plainTextBody;

try {
    // Mail send
    $mail->send();
    
    // Passing success message with "success" status
    echo json_encode(array('status' => 'success', 'message' => "Vos informations on été envoyées avec succès !"));
} catch (Exception $e) {
    // Passing error message with "error" status
    echo json_encode(array('status' => 'error', 'message' => "L'email n'a pas été envoyer" . $mail->ErrorInfo));
}

?>
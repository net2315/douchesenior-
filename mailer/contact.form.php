<?php

// Mailer form data
$name = $_POST['name'];
$email = $_POST['email'];
$mobile = $_POST['mobile'];
$date = $_POST['date'];

$statut = isset($_POST['statut']) ? $_POST['statut'] : 'Non spécifié';
$logement = isset($_POST['logement']) ? $_POST['logement'] : 'Non spécifié';

$address = strip_tags(htmlspecialchars($_POST['address']));
$cpostal =  $_POST['cpostal'];
$city = $_POST['city'];


// HTML email body
$htmlBody = "<p>Name: $name</p>";
$htmlBody .= "<p>Email: $email</p>";
($mobile !== "noMobile") ? $htmlBody .= "<p>Mobile: $mobile</p>" : "";
$htmlBody .= "<p>Date: $date</p>";
$htmlBody .= "<p>Statut: $statut</p>";
$htmlBody .= "<p>Logement: $logement</p>";
$htmlBody .= "<p>Address: $address</p>";
$htmlBody .= "<p>Code postal: $cpostal</p>";
$htmlBody .= "<p>Ville: $city</p>";


// Plain text email body
$plainTextBody = "Name: $name\n";
$plainTextBody .= "Email: $email\n";
($mobile !== "noMobile") ? $plainTextBody .= "Mobile: $mobile\n" : "";
$plainTextBody .= "Date: $date\n";
$plainTextBody .= "Statut: $statut\n";
$plainTextBody .= "Logement: $logement\n";
$plainTextBody .= "Adresse: $address\n";
$plainTextBody .= "Code Postal: $cpostal \n";
$plainTextBody .= "Ville: $city";


// Recipient name. Change this name to your
$recipientName = "Ruben Grattepench";

// Recipient email. Change this email to your
$recipientEmail = "douche@doucheseniorplus.com";

// Initiate PHPMailer
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/Exception.php';
require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/SMTP.php';

//Create an instance
$mail = new PHPMailer(false);

// Set mailer to use SMTP or PHP's mail() function
// If you use SMTP, it will be "true". Otherwise, it will be "false"
$useSMTP = false;

if ($useSMTP) {
    // Server settings for SMTP
    $mail->isSMTP();
    $mail->Host = 'mail.infomaniak.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'douche@doucheseniorplus.com';
    $mail->Password = 'T3p1O/2.#UQl-kq';
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
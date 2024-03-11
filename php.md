<?php

// Inclusion de PHPMailer
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;

require_once 'mailer/PHPMailer/PHPMailer.php';
require_once 'mailer/PHPMailer/SMTP.php';

// Vérification si le formulaire a bien été envoyé
// Vérification que tous les champs requis sont remplis
// Formulaire complet
if("METHOD_REQUEST" == "POST"){
    // Protection des données
$name = $_POST["name"];
$email = $_POST["email"];
$phone = $_POST["phone"];
$subject = $_POST["subject"];
$message = $_POST["message"];
}


if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    die("Adresse mail invalide");
}

// Envoi de l'email
$mail = new PHPMailer();
// Configuration de l'envoi via SMTP
$mail->isSMTP();
$mail->Host = 'smtp.gmail.com';
$mail->SMTPAuth = true;
$mail->Username = 'chlomo.freoua@gmail.com'; // Remplacez cette ligne par votre adresse email
$mail->Password = 'lysvjszruhsufdxh'; // Remplacez cette ligne par votre mot de passe
$mail->SMTPSecure = 'tls';
$mail->Port = 587;

// Configuration de l'email
$mail->setFrom('inscription@gmah-du-Raincy.fr', 'Ohr Meir'); // Remplacez cette ligne par votre adresse email et votre nom
$mail->addAddress('wiipassionnet@gmail.com');
$mail->Subject = "$subject";
$mail->isHTML(true);
$mail->Body = "
            <div style='font-family: Arial, sans-serif; font-size: 16px; line-height: 1.5; text-align: center;'>
            <img src='https://usualcom.net/wp-content/uploads/2017/09/12364849-Planet-Earth-and-human-eye-Stock-Photo.jpg width: 50; height: 50;>
            <p>Nom : $name</p>
            <p>Email: $email</p>
            <p>Téléphone : $phone</p>
            <p>Message : $message</p>
            <p>Vous pouvez dès à présent vous connecter <a href='https://07d2-62-35-85-52.ngrok-free.app/Gmah_du_raincy/connexion.php'>ici</a><p>
            <p>Nous espérons que vous serez ravi de votre expérience et que vous nous aiderez à avancer dans le hessed authentique.</p>
            <p>Si vous avez besoin de quoi que ce soit ou si même vous souhaitez nous aider, n'hésitez pas à envoyer un mail à <a href='mailto:gmahkehilat@gmail.com'>gmahkehilat@gmail.com</a>.</p>
            <p>Merci pour tout!</p>
            </div>
            ";
if (!$mail->send()) {
    echo 'Erreur lors de l\'envoi de l\'email : ' . $mail->ErrorInfo;
} 





juste avant le form
 <?php require_once('mailer/contact.form.php')?>

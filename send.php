<?php
 
    if(isset($_POST['email'])) {
    // EDIT THE 2 LINES BELOW AS REQUIRED
    $email_to = "tony14pro@gmail.com";
    $email_subject = "REQUEST FROM FRONT_END PROFESSIONAL";

    // validation expected data exists
     if(!isset($_POST['name']) ||
         !isset($_POST['email']) ||
         !isset($_POST['subject']) ||
         !isset($_POST['message'])) {
         died('We are sorry, but there appears to be a problem with the form you submitted.');

     }
     
 
    $sender_name = $_POST['name']; // required
    $sender_email = $_POST['email']; // required
    $post_title = $_POST['subject']; // required
    $post_message = $_POST['message']; // required

    $email_message = "Hello! FONT_END PROFESSIONALS .\n\n";
 
    function clean_string($string) {
 
      $bad = array("content-type","bcc:","to:","cc:","href");
 
      return str_replace($bad,"",$string);
 
    }
 
     
 
    $email_message .= "Sender Name: ".clean_string($sender_name)."\n";
    $email_message .= "Email: ".clean_string($sender_email)."\n";
    $email_message .= "Subject: ".clean_string($post_title)."\n";
    $email_message .= "Message: ".clean_string($post_message)."\n";

    $data['name'] =    $sender_name;
    $data['email'] =   $sender_email;
    $data['subject'] = $post_title;
    $data['message'] = $post_message;
 
     
 
// create email headers
 
$headers = 'From: '.$sender_email."\r\n".
 
'Reply-To: '.$sender_email."\r\n" .
 
'X-Mailer: PHP/' . phpversion();

    if (@mail($email_to, $email_subject, $email_message, $headers)) {
        $data['success'] = true;
        $data['message'] = 'Thank you for sending e-mail.';
    } else {
        $data['success'] = false;
        $data['errors'] = $errors;
    }
    echo json_encode($data);
}
 
?>
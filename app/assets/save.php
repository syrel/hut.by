<?php
/**
 * Created by PhpStorm.
 * User: aliaksei
 * Date: 29/12/15
 * Time: 14:39
 */

function error($description) {
    header('Content-Type: application/json');
    echo json_encode([
        'success' => false,
        'error' => $description
    ]);
    die();
}

function success(){
    header('Content-Type: application/json');
    echo json_encode([
        'success' => true
    ]);
    die();
}

function isAdmin($mail) {
    $string = file_get_contents('config/security.json');
    $json_a = json_decode($string);
    $admins = $json_a->admins;
    foreach ($admins as $admin) {
        if(strcmp($admin, $mail) === 0) {
            return true;
        }
    }
    return false;
}

function backup(){
    if (!is_dir('config/backup')) {
        mkdir('config/backup', 0777, true);
    }
    $folder = 'config/backup/'.date('Y-m-d');
    if (!is_dir($folder)) {
        mkdir($folder, 0777, true);
        copy('config/catalog.json', $folder.'/catalog'.microtime(true).'.json');
    }
}

function save() {
    $catalog = $_POST['catalog'];
    file_put_contents('config/catalog.json', json_encode($catalog, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE), LOCK_EX);
}

$user = $_POST['user'];

$username = $user['username'];
$email = $user['email'];
$token = $user['token'];

$validation = json_decode(file_get_contents('https://www.googleapis.com/oauth2/v3/tokeninfo?id_token='.$token));

if (count($validation) === 0) {
    error('Invalid token. Please sign again');
}

$gUsername = $validation->name;
if (strcmp($username, $gUsername) !== 0) {
    error('Could not verify user data');
}

$gEmail = $validation->email;
if (strcmp($gEmail, $email) !== 0) {
    error('Could not verify user data');
}

$gEmailVerified = $validation->email_verified;
if (strcmp($gEmailVerified, "true") !== 0) {
    error('Email ' .$gEmail. ' is not verified.');
}

if (isAdmin($gEmail) !== true) {
    error('You have not enough privileges');
}

backup();
save();
success();
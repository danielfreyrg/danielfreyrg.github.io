<?php
// Add custom Theme Functions here
function enqueue_custom_script() {
    // Enqueue custom script
    wp_enqueue_script( 'custom-script', get_stylesheet_directory_uri() . '/script.js', array(), '1.0', true );

    // Enqueue external jQuery library
    wp_enqueue_script( 'jquery', 'https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js', array(), '3.6.4', true );
    wp_script_add_data( 'jquery', 'script_execution', 'after' );
}

add_action( 'wp_enqueue_scripts', 'enqueue_custom_script' );






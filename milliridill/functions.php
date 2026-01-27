<?php

function enqueue_custom_script() {
    wp_enqueue_script( 'custom-script', get_stylesheet_directory_uri() . '/script.js', array(), '1.0', true );
}

add_action( 'wp_enqueue_scripts', 'enqueue_custom_script' );


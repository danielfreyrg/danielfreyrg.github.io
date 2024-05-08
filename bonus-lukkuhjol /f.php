function enqueue_custom_scripts() {
    // Enqueue D3.js
    wp_enqueue_script('d3-js', 'https://d3js.org/d3.v3.min.js', array(), null, true);
    
    // Enqueue lukkuhjol.js from theme directory
    wp_enqueue_script('lukkuhjol-js', get_stylesheet_directory_uri() . '/asseta/js/lukkuhjol.js', array(), null, true);
}
add_action('wp_enqueue_scripts', 'enqueue_custom_scripts');

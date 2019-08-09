<?php  
/**
 * Modify API data for posts.
 */
function twentynineteen_child_modify_api_data() {
    register_rest_field( 'posts',
        '_custom_data', // Add it to the response
        array(
            'get_callback'    => function( $object, $field_name, $request ){
            	return array(
            		'date' => get_the_date( '', $object['id'] ),
            		'featured_image' => wp_get_attachment_image_src( get_post_thumbnail_id( $object['id']), 'full' ),
            		'categories' => get_term( $object, 'category' ),
            		'tags' => get_term( $object, 'post_tag' ),
            		'author' => array(
            			'name' => get_the_author_meta('display_name', (int) $object['author']),
            			'url' => get_author_posts_url( (int) $object['author'] ),
            		),
            	);
            }, // Callback function - returns the value
            'update_callback' => null,
            'schema'          => null,
        )
    );


}
//add_action( 'rest_api_init', 'twentynineteen_child_modify_api_data' );

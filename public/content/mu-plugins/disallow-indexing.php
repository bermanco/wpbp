<?php

/**
 * Disallow search engine indexing
 *
 * if the environment is not 'production', add a meta tag to disable indexing.
 */

if (APP_ENV !== 'production' && !is_admin()) {
	add_action('pre_option_blog_public', '__return_zero');
}

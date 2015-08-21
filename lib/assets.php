<?php

namespace Roots\Sage\Assets;

/**
 * Scripts and stylesheets
 *
 * Enqueue stylesheets in the following order:
 * 1. /theme/dist/styles/main.css
 *
 * Enqueue scripts in the following order:
 * 1. /theme/dist/scripts/modernizr.js
 * 2. /theme/dist/scripts/main.js
 */

class JsonManifest {
  private $manifest;

  public function __construct($manifest_path) {
    if (file_exists($manifest_path)) {
      $this->manifest = json_decode(file_get_contents($manifest_path), true);
    } else {
      $this->manifest = [];
    }
  }

  public function get() {
    return $this->manifest;
  }

  public function getPath($key = '', $default = null) {
    $collection = $this->manifest;
    if (is_null($key)) {
      return $collection;
    }
    if (isset($collection[$key])) {
      return $collection[$key];
    }
    foreach (explode('.', $key) as $segment) {
      if (!isset($collection[$segment])) {
        return $default;
      } else {
        $collection = $collection[$segment];
      }
    }
    return $collection;
  }
}

function asset_path($filename) {
  $dist_path = get_template_directory_uri() . DIST_DIR;
  $directory = dirname($filename) . '/';
  $file = basename($filename);
  static $manifest;

  if (empty($manifest)) {
    $manifest_path = get_template_directory() . DIST_DIR . 'assets.json';
    $manifest = new JsonManifest($manifest_path);
  }

  if (array_key_exists($file, $manifest->get())) {
    return $dist_path . $directory . $manifest->get()[$file];
  } else {
    return $dist_path . $directory . $file;
  }
}

function assets() {
  wp_enqueue_style('sage_css', asset_path('styles/main.css'), false, null);

  if (is_single() && comments_open() && get_option('thread_comments')) {
    wp_enqueue_script('comment-reply');
  }
  wp_enqueue_script('modernizr', asset_path('scripts/modernizr.js'), [], null, true);
  if (is_page_template( 'template-angular-app.php')) {
    wp_register_script('angular', '//ajax.googleapis.com/ajax/libs/angularjs/1.4.4/angular.min.js',['jquery'], null, false);
    wp_register_script('angular_resource', '//cdnjs.cloudflare.com/ajax/libs/angular.js/1.4.4/angular-resource.min.js',['angular'], null, false);
    wp_register_script('angular_animate', '//cdnjs.cloudflare.com/ajax/libs/angular.js/1.2.16/angular-animate.js',['angular'], null, false);
    wp_enqueue_script('angular', asset_path('//ajax.googleapis.com/ajax/libs/angularjs/1.4.4/angular.min.js'), ['jquery'], null, false);
    wp_enqueue_script('angular_resource', asset_path('//cdnjs.cloudflare.com/ajax/libs/angular.js/1.4.4/angular-resource.min.js'), ['angular'], null, false);
    wp_enqueue_script('angular_animate', '//cdnjs.cloudflare.com/ajax/libs/angular.js/1.2.16/angular-animate.js',['angular'], null, false);
    wp_enqueue_script('app', asset_path('../assets/scripts/app/app.js'), ['angular','jquery','angular_animate'], null, false);
  }
  wp_enqueue_script('sage_js', asset_path('scripts/main.js'), ['jquery'], null, true);
}
add_action('wp_enqueue_scripts', __NAMESPACE__ . '\\assets', 100);

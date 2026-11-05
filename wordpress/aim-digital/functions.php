<?php
if (!defined('ABSPATH')) exit;
function aim_digital_setup() {
  add_theme_support('title-tag'); add_theme_support('post-thumbnails'); add_theme_support('custom-logo'); add_theme_support('automatic-feed-links'); add_theme_support('html5', ['search-form','comment-form','comment-list','gallery','caption','style','script']);
  register_nav_menus(['primary' => __('Primary navigation','aim-digital'),'footer' => __('Footer navigation','aim-digital')]);
}
add_action('after_setup_theme','aim_digital_setup');
function aim_digital_assets() { wp_enqueue_style('aim-digital-fonts','https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Manrope:wght@500;600;700;800&display=swap',[],null); wp_enqueue_style('aim-digital-style',get_stylesheet_uri(),['aim-digital-fonts'],'1.0.0'); }
add_action('wp_enqueue_scripts','aim_digital_assets');
function aim_digital_customize($wp_customize) {
  $wp_customize->add_section('aim_contact',['title'=>__('AIM Digital contact details','aim-digital'),'priority'=>30]);
  $fields=['phone'=>'Phone','email'=>'Email','booking_url'=>'Discovery booking URL','quote_url'=>'Quote/contact page URL'];
  foreach($fields as $key=>$label){$wp_customize->add_setting('aim_'.$key,['default'=>['phone'=>'+44 7933 837137','email'=>'info@aimdigitallimited.co.uk','booking_url'=>'https://aimdigitallimited.co.uk/contact/','quote_url'=>'/quote/'][$key],'sanitize_callback'=>$key==='email'?'sanitize_email':'esc_url_raw']);$wp_customize->add_control('aim_'.$key,['label'=>__($label,'aim-digital'),'section'=>'aim_contact','type'=>'text']);}
}
add_action('customize_register','aim_digital_customize');
function aim_digital_install_pages(){
  $definitions=[
    'home'=>['Home',''], 'services'=>['Services','page-templates/services.php'],
    'work'=>['Our Work','page-templates/work.php'], 'faq'=>['FAQ','page-templates/faq.php'],
    'quote'=>['Contact & Quote','page-templates/contact.php'], 'blog'=>['Insights','']
  ]; $ids=[];
  foreach($definitions as $slug=>$definition){$page=get_page_by_path($slug);if(!$page){$id=wp_insert_post(['post_title'=>$definition[0],'post_name'=>$slug,'post_type'=>'page','post_status'=>'publish']);if(is_wp_error($id))continue;}else{$id=$page->ID;} $ids[$slug]=$id;if($definition[1])update_post_meta($id,'_wp_page_template',$definition[1]);}
  if(isset($ids['home'],$ids['blog'])){update_option('show_on_front','page');update_option('page_on_front',$ids['home']);update_option('page_for_posts',$ids['blog']);}
  $menu=wp_get_nav_menu_object('AIM Digital Main Menu');$menu_id=$menu?$menu->term_id:wp_create_nav_menu('AIM Digital Main Menu');
  if(!is_wp_error($menu_id)){foreach(['services'=>'Services','work'=>'Our work','faq'=>'FAQ','quote'=>'Contact','blog'=>'Insights'] as $slug=>$label){if(isset($ids[$slug]))wp_update_nav_menu_item($menu_id,0,['menu-item-title'=>$label,'menu-item-object'=>'page','menu-item-object-id'=>$ids[$slug],'menu-item-type'=>'post_type','menu-item-status'=>'publish']);} $locations=get_theme_mod('nav_menu_locations',[]);$locations['primary']=$menu_id;set_theme_mod('nav_menu_locations',$locations);}
}
add_action('after_switch_theme','aim_digital_install_pages');
function aim_digital_services(){return [
 ['AI-Powered Website & Software Development','ai-website-software-development','AI-powered development combines experienced developers with tools that assist research, prototyping and implementation. AIM Digital builds business websites and bespoke software around your users, workflows and goals.','Requirements and user journeys|Responsive interface design|Website or application development|Integration planning and testing'],
 ['SEO & AI Search Optimisation','seo','SEO improves how search engines understand your website and how useful its pages are to potential customers. We combine technical reviews, on-page improvements, content planning and appropriate off-page activity without guaranteeing rankings or citations.','Technical and crawl review|On-page content and internal linking|Off-page opportunity assessment|AI-search and answer structure review'],
 ['Digital Marketing','digital-marketing','Digital marketing connects your offer with the people most likely to need it. We plan search, social media, email and paid advertising around a defined audience and commercial goal.','Audience and channel planning|Google Ads and paid campaign support|Social media content planning|Email campaign planning'],
 ['eBay Account Management, Store Setup & Listing Optimisation','ebay-store-optimisation','Management for individual and business eBay accounts, from store setup and listing optimisation to order workflows and buyer communication.','Account and store review|Listing titles and descriptions|Order workflows|Buyer communication'],
 ['Etsy Store Setup, Listing & Optimisation','etsy-store-optimisation','Etsy store optimisation brings product information, shop presentation and listing language into a coherent buying experience.','Shop organisation and setup support|Product title and description planning|Listing field and keyword review|Product photography guidance'],
 ['E-Commerce Solutions','e-commerce-solutions','E-commerce development creates an online store that helps customers browse products, understand their choices and complete a purchase. We support Shopify and WordPress/WooCommerce projects.','Shopify store design and development|WordPress and WooCommerce stores|Catalogue and checkout planning|Integration planning'],
 ['Content & Copywriting','content-copywriting','Conversion-focused copywriting explains what your business offers, who it helps and what a reader can do next. We write clear website copy, product descriptions and search-friendly articles using an agreed brief.','Audience and message brief|Website and landing-page copy|Product descriptions|Search-friendly editorial content'],
 ['Technical Support & IT Consulting','technical-support-it-consulting','Technical support helps diagnose problems with the systems your business uses online. We review symptoms, existing setup and requirements before agreeing an investigation or support scope.','Website issue investigation|Domain and email setup|Technical advice|Maintenance planning']
];}
function aim_digital_projects(){return [
 ['Faremakers.com','Travel website, admin panel & payment options','Developed a travel website with an administration panel, JazzCash payment integration and a cash-on-delivery option.','faremakers.png','https://faremakers.com','Client project'],
 ['FastSports.tv','Director control system for real-time graphics','Developed a director control system for real-time Vizrt graphics control at FastSports.tv.','fastsports.png','https://fastsports.tv','Client project'],
 ['Samir & Aly','Website performance improvements & bug fixes','Worked on website performance improvements and resolved bugs for Samir & Aly.','samir-and-aly.png','https://samirandaly.com','Client project'],
 ['Almarah Foundation UK','ERP for donations, smart housing & operations','Recently onboarded and currently working on an ERP system covering donations, smart housing and wider operational requirements.','almarah.png','https://almarah.org.uk','In progress'],
 ['BusyBees Dubai','Personal project experience in Dubai cleaning services','Our director worked personally on a project for BusyBees Dubai, a cleaning-service business in Dubai.','busybees.png','','Director experience']
];}
function aim_digital_asset($folder,$file){return get_theme_file_uri('assets/'.$folder.'/'.$file);}

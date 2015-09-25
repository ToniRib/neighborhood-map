// For the mobile off screen hamburger menu
// Off-canvas slide menu for bootstrap credit:
// http://blog.themearmada.com/off-canvas-slide-menu-for-bootstrap/

$(document).ready(function(){
  // Navigation Menu Slider
  $('#nav-expander').on('click',function(e){
    e.preventDefault();
    $('body').toggleClass('nav-expanded');
  });
  $('.mobile-list').on('click', function(e) {
    console.log('clicked');
    e.preventDefault();
    $('body').toggleClass('nav-expanded');
  })
});

jQuery(document).ready(function ($) {
  // Owl Carousel  
  var owl = $('.carousel-default');
  owl.owlCarousel({
    nav: true,
    dots: true,
    items: 1,
    loop: true,
    navText: ["&#xf007", "&#xf006"],
    autoplay: true,
    autoplayTimeout: 4000
  });
  var owl = $('.carousel-fade-transition');
  owl.owlCarousel({
    nav: true,
    dots: true,
    items: 1,
    loop: true,
    navText: ["&#xf007", "&#xf006"],
    autoplay: true,
    animateOut: 'fadeOut',
    autoplayTimeout: 4000
  });
});

// get all folders in our .directory-list
var allFolders = $(".directory-list li > ul");
allFolders.each(function () {

  // add the folder class to the parent <li>
  var folderAndName = $(this).parent();
  folderAndName.addClass("folder");

  // backup this inner <ul>
  var backupOfThisFolder = $(this);
  // then delete it
  $(this).remove();
  // add an <a> tag to whats left ie. the folder name
  folderAndName.wrapInner("<a href='#' />");
  // then put the inner <ul> back
  folderAndName.append(backupOfThisFolder);

  // now add a slideToggle to the <a> we just added
  folderAndName.find("a").click(function (e) {
    $(this).siblings("ul").slideToggle("slow");
    e.preventDefault();
  });

});
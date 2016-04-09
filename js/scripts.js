

$(document).ready(function () {
  console.log("Running initial scripts.");
  $('.portfolio-screen').fadeTo(0,0);
  //NAVIGATION EVENTS
  //TODO Add functionality for history editting here.
  $(".desktop-nav").click(function(event){
    event.preventDefault();
    NavListener(event);
  });
  //
  var thumbs = document.getElementsByClassName('thumbnail');
  if (thumbs.length > 0) {
    for ( t = 0; t < thumbs.length; t++) {
      //First we apply the images as backgrounds for easier centering.
      var category = $(thumbs[t]).attr('category');
      var imgName = $(thumbs[t]).attr('imgref');
      var imgType = $(thumbs[t]).attr('imgtype');
      var imgString = "url('assets/thumbnails/" + category + "-" + imgName + "." + imgType + "')";
      $(thumbs[t]).css('background-image', imgString);
      //Now we add Event Listeners to open the images in our image viewer.
      $(thumbs[t]).children('a').click(function(event) {
        event.preventDefault();
        ThumbnailClick(event);
      });
    }
  }
});

function NavListener(e)
{
  if ($(e.target).hasClass('selected'))
  {
    console.log('Unclickable');

  } else if (!$(e.target).hasClass('selected')) {
    $('.desktop-nav.selected').removeClass('selected');
    $(e.target).addClass('selected');
  } else if ($(e.target).parent('a').hasClass('selected')) {
    $('.desktop-nav.selected').removeClass('selected');
    $(e.target).parent('a').addClass('selected');
  }

}

function ThumbnailClick (e) {
  $thumbs = new Object();
  $data = new Object();
  $data.url = $(e.target).attr("href");

  var img = $(e.target).attr("href");
  var groupName = $(e.target).attr("groupName");
  var group = [];
  var thumbs = document.getElementsByClassName('thumbnail');
  for (t=0; t < thumbs.length; t++){
    if ($(thumbs[t]).attr('groupName') == groupName) {
      group.push(thumbs[t]);
    }
  }
  if (group.length > 0) {
    console.log ("Building slides for the slideshow");
    BuildSlideshow(group, img);
  }

}

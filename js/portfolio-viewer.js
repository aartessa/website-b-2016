var portfolioSlides = [];
var slideCount = 0;


function BuildSlideshow(groupTargets, target,project, description) {
  var $url = window.location.href;
  var location = $url.substring(0, $url.lastIndexOf('/') + 1);
  console.log(location);
  var count = 0;
  var loadedCount = 0;
  for (i = 0; i < groupTargets.length; i++) {
    var $data = new Object();
    var imgLink = $(groupTargets[i]).children('a').attr('href');
    imgLink = location + imgLink;
    var curCount = i;
    var $slideImg = $('<img>');
    $data.imgURL = imgLink;
    $data.desc = $(groupTargets[i]).children('a').attr('data-desc');
    $data.project = $(groupTargets[i]).children('a').attr('data-project');
    $data.imgFile = $('<img>');
    portfolioSlides.push($data);
    if ($(groupTargets[i]).children('a').attr('href') == target) {
      slideCount = count;
      LoadImage($data, count, true);
    } else {
      LoadImage($data, count, false);
    }

    count++;
  }

}

function LoadImage(imgData, imgNum, isSlideTarget) {
  console.log(portfolioSlides[imgNum].imgFile);
  if (isSlideTarget) {
    var $img = $('<img>');
    $img.load( function(response, status, xhr) {
      $(portfolioSlides[imgNum].imgFile).attr('src', $($img).attr('src'));
      ShowSlideShow(imgNum);
    });
    $img.attr('src', imgData.imgURL);
  } else {
    var $img = $('<img>');
    $img.load( function() {
      $(portfolioSlides[imgNum].imgFile).attr('src', $($img).attr('src'));
    });
    $img.attr('src', imgData.imgURL);
  }
}

function ShowSlideShow(slideNum) {
  //Fade in Screen
  $('.portfolio-screen').addClass('showing').fadeTo(400, 1);
  //Activate button bindings.
  $('.portfolio-closer').bind('click', function () {
    CloseViewer();
  });
  $('.nav-left').bind('click', function() {
    ChangeSlide("left");
  });
  $('.nav-right').bind('click', function() {
    ChangeSlide("right");
  });
  //
  $imgHTML = '<img class="slide new-slide slide-fade">';
  $imgText = '<div class="slide-text"><h3>' + portfolioSlides[slideNum].project + '</h3> <p>' + portfolioSlides[slideNum].desc + '</p></div>'
  $('.slide-container').html( $imgHTML );
  $('.slide-description').html( $imgText );
  $('.new-slide').attr('src', $(portfolioSlides[slideNum].imgFile).attr('src')).delay(400).toggleClass('new-slide').toggleClass('active-slide');
  console.log(slideNum);
}

function ChangeSlide (direction) {

  switch (direction) {
    case "left":
      if (slideCount == 0) {
        slideCount = portfolioSlides.length - 1;
      } else {
        slideCount--;
      }
      break;
    case "right":
    if (slideCount == portfolioSlides.length - 1) {
      slideCount = 0;
    } else {
      slideCount++;
    }
      break;
    default:
    console.log("Your slides are out of whack!")
  }
  $curSlide = $('.slide-container').html();
  $('.slide-container').html($curSlide + ' <img class="slide new-slide slide-fade">');
  $('.active-slide').addClass('slide-kill').fadeOut(400).delay(400).detach();
  $('.new-slide').attr('src', $(portfolioSlides[slideCount].imgFile).attr('src')).fadeIn(400).toggleClass('new-slide').toggleClass('active-slide');
}

function CloseViewer() {
  portfolioSlides.splice(0, portfolioSlides.length);
  slideCount = 0;
  //
  $('.active-slide').addClass('slide-kill').fadeOut(400).delay(400).detach();
  $('.portfolio-screen').fadeTo(400,0, function(){
    $('.portfolio-screen').removeClass('showing');
  });
  $('.portfolio-closer').unbind('click', function () {
    CloseViewer();
  });
  $('.nav-left').unbind('click', function() {
    ChangeSlide("left");
  });
  $('.nav-right').unbind('click', function() {
    ChangeSlide("right");
  });
}

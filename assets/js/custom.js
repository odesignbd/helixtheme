//POTENZA var

 (function($){
  "use strict";
  var POTENZA = {};

  /*************************
  Predefined Variables
*************************/
var $window = $(window),
    $document = $(document),
    $body = $('body'),
    $countdownTimer = $('.countdown'),
    $bar = $('.bar'),
    $pieChart = $('.round-chart'),
    $progressBar = $('.skill-bar'),
    $counter = $('.counter'),
    $datetp = $('.datetimepicker');
    //Check if function exists
    $.fn.exists = function () {
        return this.length > 0;
    };


/*************************
  PHP Contact Form
*************************/
 POTENZA.contactform = function () {
      $( "#contactform" ).submit(function( event ) {
          $("#ajaxloader").show();
          $("#contactform").hide();
          $.ajax({
            url:'php/contact-form.php',
            data:$(this).serialize(),
            type:'post',
            success:function(response){
              $("#ajaxloader").hide();
              $("#contactform").show();

              $("#formmessage").html(response).show().delay(20000).fadeOut('slow');
            }
          });
          event.preventDefault();
        });
    }


/*************************
        One page
*************************/
    POTENZA.onepagenav = function () {

            // Cache selectors
      var lastId,
          topMenu = $("#onepagenav"),
          topMenuHeight = topMenu.outerHeight()-30,
          // All list items
          menuItems = topMenu.find("a"),
          // Anchors corresponding to menu items
          scrollItems = menuItems.map(function(){
            var item = $($(this).attr("href"));
            if (item.length) { return item; }
          });

      // Bind click handler to menu items
      // so we can get a fancy scroll animation
      menuItems.on('click', function(e) {
        var href = $(this).attr("href"),
            offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight+1;
        $('html, body').stop().animate({
            scrollTop: offsetTop
        }, 1200);
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
          if($window.width() < 991){
              $('#onepagenav .menu-mobile-collapse-trigger,.vertical-header a.but').click();
          }
        }
        e.preventDefault();
      });

      // Bind to scroll
      $window.scroll(function(){
         // Get container scroll position
         var fromTop = $(this).scrollTop()+topMenuHeight;

         // Get id of current scroll item
         var cur = scrollItems.map(function(){
           if ($(this).offset().top < fromTop)
             return this;
         });
         // Get the id of the current element
         cur = cur[cur.length-1];
         var id = cur && cur.length ? cur[0].id : "";

         if (lastId !== id) {
             lastId = id;
             // Set/remove active class
             menuItems
               .parent().removeClass("active")
               .end().filter("[href='#"+id+"']").parent().addClass("active");
         }
      });

         $("#myNavbar a,.move").on('click', function(event) {
            if (this.hash !== "") {
               event.preventDefault();
                var hash = this.hash;
                var offsetheight = 0;
                if($('nav').hasClass('affix-top')){
                    offsetheight = 100;
                }
                 $('html, body').animate({
                  scrollTop: $(hash).offset().top - offsetheight
                 }, 800, function(){
                 window.location.hash = hash;
               });
              } // End if
             if($('.navbar-toggle').css('display') != 'none'){
               $(".navbar-toggle").trigger( "click" );
             }
        });
    }


/****************************************************
              pieChart
****************************************************/
 POTENZA.pieChart = function () {
        if ($pieChart.exists()) {
            loadScript(plugin_path + 'easy-pie-chart/easy-pie-chart.js', function() {
            $pieChart.each(function () {
                var $elem = $(this),
                    pieChartSize = $elem.attr('data-size') || "160",
                    pieChartAnimate = $elem.attr('data-animate') || "2000",
                    pieChartWidth = $elem.attr('data-width') || "6",
                    pieChartColor = $elem.attr('data-color') || "#84ba3f",
                    pieChartTrackColor = $elem.attr('data-trackcolor') || "rgba(0,0,0,0.10)";
                $elem.find('span, i').css({
                    'width': pieChartSize + 'px',
                    'height': pieChartSize + 'px',
                    'line-height': pieChartSize + 'px'
                });
                $elem.appear(function () {
                    $elem.easyPieChart({
                        size: Number(pieChartSize),
                        animate: Number(pieChartAnimate),
                        trackColor: pieChartTrackColor,
                        lineWidth: Number(pieChartWidth),
                        barColor: pieChartColor,
                        scaleColor: false,
                        lineCap: 'square',
                        onStep: function (from, to, percent) {
                            $elem.find('span.percent').text(Math.round(percent));
                        }
                    });
               });
            });
         });
      }
    }


 /*************************
        calendar
*************************/
POTENZA.calendarlist = function () {
 if ($('#calendar').exists()) {
   loadScript(plugin_path + 'fullcalendar/fullcalendar.min.js', function() {
  $('#calendar').fullCalendar({
      defaultDate: '2018-05-12',
      editable: true,
      eventLimit: true, // allow "more" link when too many events
      events: [
        {
          title: 'All Day Event',
          start: '2018-05-01'
        },
        {
          title: 'Long Event',
          start: '2018-05-07',
          end: '2018-05-10'
        },
        {
          id: 999,
          title: 'Repeating Event',
          start: '2018-05-09T16:00:00'
        },
        {
          id: 999,
          title: 'Repeating Event',
          start: '2018-05-16T16:00:00'
        },
        {
          title: 'Conference',
          start: '2018-05-11',
          end: '2018-05-13'
        },
        {
          title: 'Meeting',
          start: '2018-05-12T10:30:00',
          end: '2018-05-12T12:30:00'
        },
        {
          title: 'Lunch',
          start: '2018-05-12T12:00:00'
        },
        {
          title: 'Meeting',
          start: '2018-05-12T14:30:00'
        },
        {
          title: 'Happy Hour',
          start: '2018-05-12T17:30:00'
        },
        {
          title: 'Dinner',
          start: '2018-05-12T20:00:00'
        },
        {
          title: 'Birthday Party',
          start: '2018-05-13T07:00:00'
        },
        {
          title: 'Click for Google',
          url: 'http://google.com/',
          start: '2018-05-28'
        }
       ]
      });
     });
    }
  };



/****************************************************
          javascript
****************************************************/
var _arr  = {};
  function loadScript(scriptName, callback) {
    if (!_arr[scriptName]) {
      _arr[scriptName] = true;
      var body    = document.getElementsByTagName('body')[0];
      var script    = document.createElement('script');
      script.type   = 'text/javascript';
      script.src    = scriptName;
      // then bind the event to the callback function
      // there are several events for cross browser compatibility
      // script.onreadystatechange = callback;
      script.onload = callback;
      // fire the loading
      body.appendChild(script);
    } else if (callback) {
      callback();
    }
  };

/****************************************************
     POTENZA Window load and functions
****************************************************/
  //Window load functions
    $window.on("load",function(){
          // POTENZA.preloader(),
          // POTENZA.Isotope(),
          // POTENZA.masonry(),
          // POTENZA.pieChart(),
          // POTENZA.progressBar();
    });
 //Document ready functions
    $document.ready(function () {
        //POTENZA.megaMenu(),
        //POTENZA.counters(),
        //POTENZA.accordion(),
        //POTENZA.carousel(),
        //POTENZA.mailchimp(),
        //POTENZA.contactform(),
        //POTENZA.countdownTimer(),
        // POTENZA.goToTop(),
        // POTENZA.mediav(),
        // POTENZA.googlemapopen(),
        // POTENZA.mobileslider(),
        // POTENZA.onepagenav(),
        // POTENZA.mediaPopups(),
        // POTENZA.pniceScroll(),
        // POTENZA.datetimepick(),
        // POTENZA.datatables(),
        // POTENZA.wowanimation(),
        // POTENZA.googlemaps(),
        // POTENZA.fancyselect(),
        // POTENZA.searchbox(),
        // POTENZA.cartbox(),
        // POTENZA.raindrops(),
        // POTENZA.sidepanel(),
        // POTENZA.slickslider(),
        // POTENZA.typer(),
        // POTENZA.stickyFooter(),
        // POTENZA.masonry(),
        // POTENZA.leftbarsticky(),
        // POTENZA.calendarlist(),
        // POTENZA.instagramfeed(),
        // POTENZA.flickrfeed(),
        // POTENZA.mobileview();
    });
})(jQuery);

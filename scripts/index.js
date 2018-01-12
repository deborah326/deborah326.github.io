$(document).ready(function() {

  $("nav").find("li").on("click", "a", function() {
    $('.navbar-collapse.in').collapse('hide');
  });

  $('body').scrollspy({
    target: ".navbar"
  });

  var quoteArray = [{
    quote: "If your mind is empty, it is always ready for anything, it is open to everything. In the beginner's mind there are many possibilities, but in the expert's mind there are few.",
    author: "Shunryu Suzuki"
  }, {
    quote: "A wonderful painting is the result fo the feeling in your fingers.  If you have teh feeling of the thickness of the ink in your brush, the painting is already there before you paint.  When you dip your brush into the ink you already know the result of your drawing, or else you cannot paint.  So before you do something, 'being' is there, the result is there.",
    author: "Shunryu Suzuki"
  }, {
    quote: "Empty your mind, be formless, shapeless - like water. Now you put water into a cup, it becomes the cup, you put water into a bottle, it becomes the bottle, you put it in a teapot, it becomes the teapot. Now water can flow or it can crash. Be water, my friend.",
    author: "Bruce Lee"
  }, {
    quote: "Nature uses only the longest threads to weave her patterns, so that each small piece of her fabric reveals the organization of the entire tapestry.",
    author: "Richard Feynman"
  }, {
    quote: "Nearly all men can stand adversity, but if you want to test a man's character, give him power.",
    author: "Abraham Lincoln"
  }, {
    quote: "Every saint has a past. Every sinner has a future.",
    author: "Warren Buffett"
  }, {
    quote: "What important truth do very few people agree with you on?",
    author: "Peter Theil"
  }, {
    quote: "I constantly see people rise in life who are not the smartest, sometimes not even the most diligent, but they are learning machines. They go to bed every night a little wiser than they were when they got up and boy does that help, particularly when you have a long run ahead of you.",
    author: "Charlie Munger"
  }, {
    quote: "The best pictures are always those one dreams of when one is smoking a pipe in bed, but which never get done. But still one ought to try, however incompetent one may feel before the unspeakable perfection and radiant splendour of nature.",
    author: "Vincent Van Gogh"
  }, {
    quote: "Victorious warriors win first and then go to war, while defeated warriors go to war first and then seek to win.",
    author: "Sun-Tzu"
  }, {
    quote: "If you live each day as it was your last, someday you'll most certainly be right.",
    author: "Steve Jobs"
  }];

  var lastQuote;

  $("#quoteButton").click(function() {
    var length = quoteArray.length;
    do {
      var quoteNo = Math.floor(Math.random() * length);
    }
    while (lastQuote === quoteNo); // re-roll if same quote
    lastQuote = quoteNo; // remember the value
    var newQuote = quoteArray[quoteNo].quote;
    var newAuthor = quoteArray[quoteNo].author;
    $("#quote").html("“" + newQuote + "”");
    $("#author").html("- " + newAuthor);
    var myUrl = 'https://twitter.com/intent/tweet?text=' + newQuote + "  - " + newAuthor;
    $("#twitterButton").attr("href", myUrl);
  });

  $("#quoteButton").click();

  $('#gallery').click(function(e) {
    e.preventDefault();
    $.swipebox([{
        href: "images/femaleportrait.jpg",
        title: 'Female portrait'
      },
      {
        href: "images/oldportrait.jpg",
        title: 'Old man portrait'
      },
      {
        href: "images/faleportrait.jpg",
        title: 'Male ortrait'
      }
    ]);
  });

  var myCenter = new google.maps.LatLng(22.284684, 114.147292);

  function initialize() {
    var mapProp = {
      center: myCenter,
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      scrollwheel: false
    };

    var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);

    var marker = new google.maps.Marker({
      position: myCenter,
    });

    marker.setMap(map);
  }

  google.maps.event.addDomListener(window, 'load', initialize);

  window.twttr = (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0],
        t = window.twttr || {};
      if (d.getElementById(id)) return t;
      js = d.createElement(s);
      js.id = id;
      js.src = "https://platform.twitter.com/widgets.js";
      fjs.parentNode.insertBefore(js, fjs);

      t._e = [];
      t.ready = function(f) {
        t._e.push(f);
      };

      return t;
    }

    (document, "script", "twitter-wjs"));

}); //Closing tag for document ready function
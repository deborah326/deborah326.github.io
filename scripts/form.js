$(document).ready(function() {
  $("input, textarea").focus(function() {
    $(this).prev().children().addClass("active");
    $(this).next().addClass("active");
    $(this).parent().find(".lenghtCounter").show();
  }).blur(function() {
    $("svg").removeClass("active invalid");
    $(this).removeClass("invalid");
    $("label").removeClass("active invalid");
    $(".lenghtCounter").hide();
  })
  $(".input-field i").click(function() {
    $(this).next().focus();
  })
  $("input, textarea").blur(function() {
    if ($(this).val().length != 0) {
      $(this).next().addClass("filled");
    } else {
      $(this).next().removeClass("filled");
    }
  });

  // This prevents the user to input characters in a field for numbers
  $(phoneField).keydown(function(e) {
    var key = e.charCode || e.keyCode || 0;
    $phone = $(this);
    char = $phone.val().charAt(1);

    if (key !== 8 && key !== 9 && char !== "3") {
      $phone.attr("maxlength", "18");

      if ($phone.val().length === 0) {
        $phone.val($phone.val() + '+');
      }
    }

    if (key !== 8 && key !== 9 && char == "3") {
      $phone.attr("maxlength", "19");

      if ($phone.val().length === 0) {
        $phone.val($phone.val() + '+');
      }
    }

    return (key == 8 ||
      key == 9 ||
      key == 46 ||
      (key >= 48 && key <= 57) ||
      (key >= 96 && key <= 105));
  })
});

// Here we count symbols in input fields
$(document).delegate('input', 'keyup', function() {
  var field = $(this),
    counter = $(this).parent().find(".lenghtCounter span");

  field.bind('keydown', function() {
    setTimeout(function() {
      counter.text(field.val().length + "/" + field.attr("maxlength"))
    }, 4);
    if ($(this).val().length == $(this).attr("maxlength")) {
      counter.css("color", "#3498db");
    } else {
      counter.css("color", "inherit");
    }
  });
});

// Changing textarea height depending on the amount of text
$.each($("#message"), function() {
  var offset = this.offsetHeight - this.clientHeight;

  var resizeTextarea = function(el) {
    $(el).css('height', 'auto').css('height', el.scrollHeight + offset);
  };
  $(this).on('keyup input', function() {
    resizeTextarea(this);
  })
});
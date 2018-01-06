$(document).ready(function() {
  var breakLength = 5;
  var sessionLength = 25;
  var timeInterval = 0;
  var timeBreakInterval = 0;
  var pause = false;
  var breakRunning = false;
  var totalSeconds = 0;
  var totalBreakSeconds = 0;
  var s = 0;
  var m = 0;
  var seconds = "";
  var minutes = "";
  var bs = 0;
  var bm = 0;
  var bseconds = "";
  var bminutes = "";

  $("#plusBreak").click(function() {
    breakLength += 1;
    $("#currentBreak").text(breakLength);
  });

  $("#minusBreak").click(function() {
    if (breakLength > 1) {
      breakLength -= 1;
    }
    $("#currentBreak").text(breakLength);
  });

  $("#plusSession").click(function() {
    sessionLength += 1;
    $("#currentSession").text(sessionLength);
    $("#clock").text(sessionLength);
  });

  $("#minusSession").click(function() {
    if (sessionLength > 1) {
      sessionLength -= 1;
    }
    $("#currentSession").text(sessionLength);
    $("#clock").text(sessionLength);
  });

  $("#resetAll").click(function() {
    breakLength = 5;
    sessionLength = 25;
    $("#currentBreak").text(breakLength);
    $("#currentSession").text(sessionLength);
    $("#clock").text(sessionLength);
    clearInterval(timeInterval);
    clearInterval(timeBreakInterval);
    clockRunning = false;
    breakRunning = false;
    pause = false;
    $("#message").text('Set your break and session length below and click "Start"!');
  });

  function checkTime(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }

  var initiateBreak = function() {
    breakRunning = true;
    if (totalBreakSeconds >= 0) {
      bs = totalBreakSeconds % 60;
      bm = Math.floor(totalBreakSeconds / 60);
      bminutes = checkTime(bm);
      bseconds = checkTime(bs);
      bs -= 1;
      $("#clock").html(bminutes + ":" + bseconds);
      totalBreakSeconds -= 1;
      timeBreakInterval = setTimeout(function() {
        initiateBreak()
      }, 100);
    } else if (totalBreakSeconds < 0) {
      $("#message").text('Your session is over. Reset the clock, set your break and session length below and click "Start"!');
    }
  }

  var initiateClock = function() {
    if (totalSeconds >= 0) {
      s = totalSeconds % 60;
      m = Math.floor(totalSeconds / 60);
      minutes = checkTime(m)
      seconds = checkTime(s);
      s -= 1;
      $("#clock").html(minutes + ":" + seconds);
      totalSeconds -= 1;
      timeInterval = setTimeout(function() {
        initiateClock()
      }, 100);
    } else if (totalSeconds < 0) {
      totalBreakSeconds = 60 * $("#currentBreak").text();
      initiateBreak();
      $("#message").text("Timeout! Let's take a " + breakLength + " minute(s) break!");
    }
  }

  $("#startNow").click(function() {
    if (pause === false) {
      if (breakRunning === false) {
        totalSeconds = 60 * $("#clock").text();
        $("#message").text("Let's focus and work for " + sessionLength + " minute(s)!");
        initiateClock();
      }
    } else {
      if (breakRunning === false) {
        totalSeconds = m * 60 + s;
        if (s < 0) {
          $("#message").text("Here we go again! " + m + " minute(s) and " + 0 + " second(s) to go!");
          initiateClock();
        } else {
          $("#message").text("Here we go again! " + m + " minute(s) and " + s + " second(s) to go!");
          initiateClock();
        }
        pause = false;
      } else {
        totalBreakSeconds = bm * 60 + bs;
        if (bs < 0) {
          $("#message").text("Your remaining break time is " + bm + " minute(s) and " + 0 + " second(s).");
          initiateBreak();
        } else {
          $("#message").text("Your remaining break time is " + bm + " minute(s) and " + bs + " second(s).");
          initiateBreak();
        }
        pause = false;
      }
    }
  });

  $("#pauseNow").click(function() {
    $("#message").text("Pause");
    pause = true;
    clearTimeout(timeInterval);
    clearTimeout(timeBreakInterval);
  });

}); //Closing tags for document ready function
$(document).ready(function() {
  var testNumLength = function(number) {
    if (number.length > 10) {
      $("#display").text(number.substr(number.length - 11, 10));
      if (number.length > 10) {
        number = "";
        $("#display").text("Err");
      }
    }
  };
  var testTotalLength = function(total) {
    total = total.toString();
    if (total.length > 10) {
      $("#display").text(total.substr(total.length - 11, 10));
    }
  };

  //Declare variables
  var newNumber = "";
  var subTotal = 0;
  var currentTotal = 0;
  var operator = "";
  var functions = "";
  $("#display").text("0");

  //Click functions on buttons
  $("#numbers > a").not("#decimal").click(function() {
    newNumber += $(this).text();
    $("#decimal").click(function() {
      if (newNumber.indexOf(".") === -1) {
        newNumber += $(this).text();
      }
    });
    $("#display").text(newNumber);
    testNumLength(newNumber);
  });

  $("#clearall").click(function() {
    newNumber = "";
    subTotal = 0;
    operator = "";
    $("#display").text("0");
  });

  $("#negative").click(function() {
    if (newNumber != "") {
      newNumber = -newNumber;
      $("#display").text(newNumber);
    } else {
      subTotal = -subTotal;
      $("#display").text(subTotal);
    }
  });

  $("#percentage").click(function() {
    if (operator != "" && newNumber != "") {
      currentTotal = (parseFloat(newNumber) * subTotal / 100);
      subTotal = subTotal + currentTotal;
      $("#display").text(currentTotal);
      currentTotal = 0;
    } else if (subTotal === 0) {
      subTotal = (parseFloat(newNumber) / 100);
      $("#display").text(subTotal.toFixed(6));
    } else if (subTotal != 0) {
      subTotal = (subTotal / 100);
      $("#display").text(subTotal.toFixed(6));
    } else {
      subTotal = parseFloat(newNumber) / 100;
      $("#display").text(subTotal.toFixed(6));
    }
    newNumber = "";
  });

  $("#operators > a").not("#equals").click(function() {
    operator = $(this).text();
    if (newNumber === "") {
      $("#display").text(subTotal);
      return;
    } else {
      if (operator === "+") {
        subTotal = subTotal + parseFloat(newNumber);
      } else if (operator === "-") {
        if (subTotal === 0) {
          subTotal = parseFloat(newNumber);
        } else {
          subTotal = subTotal - parseFloat(newNumber);
        }
      } else if (operator === "×") {
        if (subTotal === 0) {
          subTotal = parseFloat(newNumber);
        } else {
          subTotal = subTotal * parseFloat(newNumber);
        }
      } else if (operator === "÷") {
        if (subTotal === 0) {
          subTotal = parseFloat(newNumber);
        } else {
          subTotal = subTotal / parseFloat(newNumber);
        }
      }
      subTotal = parseFloat(subTotal.toFixed(6));
      $("#display").text(subTotal);
    }
    newNumber = "";
  });

  $("#equals").click(function() {
    if (operator === "" && newNumber != "") {
      subTotal = parseFloat(newNumber);
    } else if (operator === "+" && newNumber != "") {
      subTotal = subTotal + parseFloat(newNumber);
    } else if (operator === "-" && newNumber != "") {
      subTotal = subTotal - parseFloat(newNumber);
    } else if (operator === "×" && newNumber != "") {
      if (newNumber != "0") {
        subTotal = subTotal * parseFloat(newNumber);
      }
    } else if (operator === "÷" && newNumber != "") {
      if (newNumber != "0") {
        subTotal = subTotal / parseFloat(newNumber);
      }
    } else {
      subTotal = parseFloat(subTotal.toFixed(6));
    }
    $("#display").text(subTotal);
    newNumber = "";
    operator = "";
  });

}); //CLosing document ready function tag
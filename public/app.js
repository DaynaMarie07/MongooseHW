function displayResults(animals) {
  $("tbody").empty();
  animals.forEach(function(myAnimals) {
    $("tbody").append("<tr><td>" + myAnimals.name + "</td>" +
    "<td>" + myAnimals.numLegs + "</td>" +
    "<td>" + myAnimals.class + "</td>" +
    "<td>" + myAnimals.weight + "</td>" +
    "<td>" + myAnimals.newName + "</td></tr>");
  });
}
      function setActive(selector) {
        // remove current and apply 'active' class 
        $("th").removeClass("active");
        $(selector).addClass("active");
      }

$.getJSON("/all", function(data) {
  displayResults(data);
});

  $("#weight-sort").on("click", function() {
      setActive("#myAnimals-weight");
      $.getJSON("/weight", function(data) {
      // table body
      displayResults(data);
  });
});

$("#name-sort").on("click", function() {
// Set new column-- active
  setActive("#myAnimals-name");
// Do an api call to the back end for json with all animals sorted by name
  $.getJSON("/name", function(data) {
//generate a table body
    displayResults(data);
  });
});

$("document").ready(function () {
    const amenities = {};
    $('INPUT[type="checkbox"]').change(function () {
      if ($(this).is(":checked")) {
        amenities[$(this).attr("data-id")] = $(this).attr("data-name");
      } else {
        delete amenities[$(this).attr("data-id")];
      }
      $(".amenities H4").text(Object.values(amenities).join(", "));
    });
  });
  
  // Task 3 - API status
  
  $(document).ready(function () {
    $.get("http://localhost:5001/api/v1/status/", function (data) {
      if (data.status === "OK") {
        $("div#api_status").addClass("available");
      }
    }).fail(function () {
      $("div#api_status").removeClass("available");
    });
  });

$(function () {
    const amenitiesList = [];
    $("input[type=checkbox]").prop("checked", false);
    $(".amenities h4").css({
      width: "100%",
      height: "100%",
      "white-space": "nowrap",
      overflow: "hidden",
      "text-overflow": "ellipsis",
      "padding-bottom": "16px",
    });
    $('input[type="checkbox"]').click(function () {
      const $checkbox = $(this);
      if ($checkbox.prop("checked") === true) {
        amenitiesList.push($checkbox.data("name"));
      } else {
        amenitiesList.forEach((element, index) => {
          if (element === $checkbox.data("name")) {
            amenitiesList.splice(index, 1);
          }
        });
      }
      $(".amenities h4").text(amenitiesList.join(", "));
    });
  });
  /* code for task 3 */
  $(document).ready(function () {
    $.get("http://localhost:5001/api/v1/status/", function (data) {
      if (data.status === "OK") {
        $("div#api_status").addClass("available");
      }
    }).fail(function () {
      $("div#api_status").removeClass("available");
    });
  });
  
  /* code for task 4 */

  $(function () {
    $.ajax({
      type: "POST",
      url: "http://localhost:5001/api/v1/places_search/",
      contentType: "application/json",
      data: "{}",
      dataType: "json",
      success: function (data) {
        data.forEach(function (place) {
          $("section.places").append(
            '<article><div class="title_box"><h2>' +
              place.name +
              '</h2><div class="price_by_night">$' +
              place.price_by_night +
              '</div></div><div class="information"><div class="max_guest">' +
              place.max_guest +
              '</div><div class="number_rooms">' +
              place.number_rooms +
              '</div><div class="number_bathrooms">' +
              place.number_bathrooms +
              '</div></div><div class="description">' +
              place.description +
              "</div></article>"
          );
        });
      },
    });
  });

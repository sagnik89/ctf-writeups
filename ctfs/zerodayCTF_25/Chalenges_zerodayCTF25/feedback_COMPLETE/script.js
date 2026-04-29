$("#rating").on("input", function() {
      $("#ratingValue").text($(this).val());
    });

    $("#submitBtn").click(function() {
      const name = $("#name").val();
      const review = $("#review").val();
      const rating = $("#rating").val();

      $.ajax({
        url: "/submit",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({ name, review, rating }),
        success: function(resp) {
          $("#avg").text(resp.avg_rating);
          $("#submitBtn").prop("disabled", true).text("Feedback Submitted 💫");

          $.post("/reveal", function(r) {
            if (r.startsWith("zero{")) {
              $("#flagBox").text(r).fadeIn();
            }
          });
        },
        error: function(xhr) {
          alert(xhr.responseJSON.message);
        }
      });
    });

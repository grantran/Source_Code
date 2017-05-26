$(() => {
  $.ajax({
    method: "GET",
    url: "/api/comments/"
  }).done((comments) => {
    console.log(comments);
    comments.forEach((comments) => {
      $("<div>").text(comments.comment).appendTo($("body"));
    })
  });;
});

$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    users.forEach((user) => {
      $("<div>").text(user.username).appendTo($("body"));

  });

    console.log(users);
    users.forEach((user) => {
      $("<div>").text(user.username).appendTo($("body"));
    })
  });
});



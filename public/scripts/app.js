// $(() => {
//   $.ajax({
//     method: "GET",
//     url: "/api/comments/"
//   }).done((comments) => {
//     console.log(comments);
//     comments.forEach((comments) => {
//       $("<div>").text(comments.comment).appendTo($("body"));
//     })
//   });;
// });

// $(() => {
//   $.ajax({
//     method: "GET",
//     url: "/api/users"
//   }).done((users) => {
//     users.forEach((user) => {
//       $("<div>").text(user.username).appendTo($("body"));

//   });

//     console.log(users);
//     users.forEach((user) => {
//       $("<div>").text(user.username).appendTo($("body"));
//     })
//   });
// });

$(document).ready(function() {
  var resourceContainer = $('#resources');

  // Makes sure people can't add code into text inputs
  function escape(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }




  // creates elements on the page for each tweet
  function createResourceElement(resource) {
    const html = `
       <article class="thumbnail">
            <div class="caption">
              <h3>${escape(testArray)}</h3>
              <p>${escape(resource.content.text)}</p>
              <p> Posted by ${resource.user.name}</p>
            </div>
            <a href="http://placehold.it"><img src="http://placehold.it/350x150"></a>
            <div class = "footer">
              <p>TAG, TAG, TAG</p>
              <img href="" class="likeicon" src="/images/heart.png">
              <li class="dropdown">
                <a href="#" class="dropdown-toggle btn btn-default" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Post a comment<span class="caret"></span></a>
                <div class="dropdown-menu">
                  <h3> Write a Comment</h3>
                  <form>
                    <textarea name="text" placeholder="What do you think?"></textarea>
                    <input type="Submit">
                  </form>
                </div>
              </li>
              <li class="dropdown">
                <a href="#" class="dropdown-toggle btn btn-default" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">View comments<span class="caret"></span></a>
                <ul class="dropdown-menu">
                  <div class="comment-box">
                    <p> username 1 </p>
                    <p> This is a comment.</p>
                  </div>
                  <div>
                    <p> username 2</p>
                    <p> This is also a comment.</p>
                  </div>
                  <div>
                    <p> username 2</p>
                    <p> Another comment</p>
                  </div>
                </ul>
              </li>
            </article>
      `;
    return $(html);
  }

  // Renders the tweets via loop and adds them to the top of the page
  function renderResource(resources) {
    var resourceContainer = $(".resourceWall");
    resourceContainer.empty();
    for (var i = 0; i < resources.length; i++) {
      var resource = resources[i];
      resourceContainer.prepend(createResourceElement(resource));
    }
  }



  // loads the tweets via ajax on success calls on the renderTweets function
  function loadResources() {
    $.ajax({
      url: '/api/resources',
      method: 'GET',
      success: function(data) {
        renderResources(data);
      }
    });
  }

  // sends the tweet data to the server on success calls on the loadTweets function
  function saveResource(data) {
    $.ajax({
      url: '/api/resources',
      method: 'POST',
      data: data,
      success: function(data) {
        loadResources();

      }
    });
  }

  loadResources();


});




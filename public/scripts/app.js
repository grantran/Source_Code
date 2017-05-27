

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
       <article class="thumbnail" id="resource-${resource.id}">
            <div class="caption">
              <h3 href="${escape(resource.url)}">${escape(resource.title)}</h3>
              <p>${escape(resource.description)}</p>
              <p> Posted by </p>
            </div>
            <a href="${escape(resource.url)}"><img class="resourceImage" src="${resource.imageURL}"></a>
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
  function renderResources(resources) {
    var resourceContainer = $(".resourceWall");
    resourceContainer.empty();
    for (var i = 0; i < resources.length; i++) {
      var resource = resources[i];
    }
      $.get("/getOgs", function(data){
        var seeds = (data)
        seeds.forEach(function(resource){
        resourceContainer.prepend(createResourceElement(resource));
      });
     })
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




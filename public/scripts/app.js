$(document).ready(function() {
  var resourceContainer = $('#resources');

  // Makes sure people can't add code into text inputs
  function escape(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  function getComments() {
    $(".resourceWall").on('click', ".comment", function(event) {
      var resourceid = $(this).attr('data-resourceid');
    $.ajax({
      url: '/api/comments?id=' + resourceid,
      method: 'GET',
      success: function(results) {
        var commentContainer = $('.comment-view');
        $('.comment-view').empty();
        results.forEach((item) => {
          commentContainer.prepend(createCommentElement(item));
          // $('<div>').text(item.username + ': ' + item.comment).appendTo($('.comment-view'));
        });
      }
    })
    });
  }

  function postComments() {
    $(".resourceWall").on('click', ".comment-post", function(event) {
      // console.log(event);
      var resourceid = $(this).attr('data-resourceid');
      // console.log($resourceid);
    $.ajax({
      url: '/api/comments',
      method: 'POST',
      success: function(results) {
        res.end();
      }
    })
    });
  }

function likesPost(){
  $(".resourceWall").on('click', '.like-review', function(event) {
    $(this).html('<i class="fa fa-heart" aria-hidden="true"></i> You liked this');
    $(this).children('.fa-heart').addClass('animate-like');

      var resourceid = $(this).attr('data-resourceid');
      console.log(resourceid);


    $.ajax({
      url: '/api/likebutton/' + resourceid,
      method: 'POST',
      success: function(results) {
        $(".likeicon").filter('[data-resourceid="resourceid"]').css({'background-color':"red"});

      }
    });
  });
  };

  function addTags() {
    $.ajax({
      url: '/api/getTags/',
      method: 'GET',
      success: function(results) {
        // console.log(results);
        results.forEach((item) => {
          $('<td class="thetags" style="padding-right:1.5em;font-size:40px ">').text(" #" + item.tags).appendTo($('.tagsSpan'));
        })
      }
    })
  }

function createCommentElement(comments) {

    const html = `
        <article class="commentBlock">
          <div class="userNameComment">${comments.username}</div>
          <div class="userComment">${comments.comment}</div>
        </article>
      `;
    return $(html);
  }

    function ran_col(id) { //function name
      var color = '#'; // hexadecimal starting symbol
      var letters = ['B3CC57','ECF081','FFBE40','EF746F','AB3E5B','E2FF9E','2C9FA3','C0C0C0', 'F45D4C']; //Set your colors here
      color += letters[Math.floor(Math.random() * letters.length)];
      
      var thumbs = document.getElementById(id); // Setting the random color on your div element.
      console.log(color);
      thumbs.style.border = '3px solid ' + color;
      }


  // creates elements on the page for each tweet
  function createResourceElement(resource) {
    let rdi = "${resource.id}";
    const html = `

       <article class="thumbnail" data="resource-${resource.id}" style="border: 0px">

       <div class="col-lg-3 col-md-4 thumb">
       <article class="thumbnail" data="resource-${resource.id}" id=${resource.id}>
            <div class="caption">
              <h3 href="${escape(resource.url)}">${escape(resource.title)}</h3>
              <p>${escape(resource.description)}</p>
              <p> Posted by ${resource.username}</p>
            </div>
            <a href="${escape(resource.url)}"><img class="resourceImage" src="${resource.image}"></a>
            <div class = "footer">
              <p>${escape(resource.tags)}</p>
              <p class="thetags">#${escape(resource.tags)}</p>
              <li class="dropdown">
                <a href="#" class="dropdown-toggle btn btn-default" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Post a comment<span class="caret"></span></a>
                <div class="dropdown-menu comment-post">
                  <form class="postComment" action="/api/comments" method="POST" data-resourceid="${resource.id}">
                    <textarea class="commentTextArea" name="text" placeholder="What do you think?"></textarea>
                    <input type="Submit" name="${resource.id}">
                  </form>
                </div>
              </li>
              <li class="dropdown">
                <a  class="dropdown-toggle btn btn-default comment"  data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false" data-resourceid="${resource.id}">View comments<span class="caret"></span></a>
                <ul class="dropdown-menu comment-view">
                </ul>
              </li>
                <span class="like-content">
                  <button class="btn-secondary like-review" data-resourceid="${resource.id}">
                    <i class="fa fa-heart" aria-hidden="true"></i> Like
                  </button>
                </span>
            </div>
          </article>
          </div>
            </article>
            

      `;
    return $(html);
  }

  // Renders the tweets via loop and adds them to the top of the page
  function renderResources (data) {

    var resourceContainer = $(".resourceWall");
    resourceContainer.empty();
    // console.log(data);

    data.forEach(function(item) {
      resourceContainer.prepend(createResourceElement(item));
      ran_col(item.id);
    })
  }






  // loads the tweets via ajax on success calls on the renderTweets function
  function loadResources() {
    $.ajax({
      url: '/api/resources',
      method: 'GET',
      success: function(data) {
        // console.log(data, 'this comes second');
        renderResources(data);
        getComments();
        likesPost();
        addTags();
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
  // renderResources();

});




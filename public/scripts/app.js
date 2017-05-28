

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
      // console.log(event);
      var resourceid = $(this).attr('data-resourceid');
      // console.log($resourceid);
    $.ajax({
      url: '/api/comments?id=' + resourceid,
      method: 'GET',
      // data: {resourceid: $resourceid},
      // dataType: "json",
      success: function(results) {
        $('.dropdown-menu').empty();
        results.forEach((item) => {
          $('<div>').text(item.username + ': ' + item.comment).appendTo($('.dropdown-menu'));
        });
      }
    })
    });
  }

  // creates elements on the page for each tweet
  function createResourceElement(resource) {
    const html = `
       <article class="thumbnail" data="resource-${resource.id}">
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
                <a href="#" class="dropdown-toggle btn btn-default" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false" >Post a comment<span class="caret"></span></a>
                <div class="dropdown-menu">
                  <form action="/api/comments" method="POST" data-resourceid="${resource.id}">
                    <textarea name="text" placeholder="What do you think?"></textarea>
                    <input type="Submit">
                  </form>
                </div>
              </li>
              <li class="dropdown">
                <a href="#"  class="dropdown-toggle btn btn-default comment"  data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false" data-resourceid="${resource.id}">View comments<span class="caret"></span></a>
                <ul class="dropdown-menu">
                </ul>
              </li>
            </article>
      `;
    return $(html);
  }


     var grid = $('.grid').masonry({
        columnWidth: 200,
         itemSelector: '.grid-item'
        });

  // Renders the tweets via loop and adds them to the top of the page
  function renderResources(resources) {
    $('.prependButton').on( 'click', function() {
    // create new item elements
      var $items = $(createResourceElement(resource));
    // prepend items to grid
      $grid.prepend( $items )
      // add and lay out newly prepended items
      .masonry( 'prepended', $items );
    });


    // var resourceContainer = $(".resourceContainer");
     // var resourceRow = $(".resourceRow");

    // resourceContainer.empty();

    // resourceRow.empty();
    // for (var i = 0; i < resources.length; i++) {
    //   var resource = resources[i];
    // }

     //  $.get("/getOgs", function(data){
     //    var seeds = (data)
     //    seeds.forEach(function(resource){
     //    resourceContainer.prepend(createResourceElement(resource));
     //  });
     // })
  }



  // loads the tweets via ajax on success calls on the renderTweets function
  function loadResources() {
    $.ajax({
      url: '/api/resources',
      method: 'GET',
      success: function(data) {
        // console.log(data);
        renderResources(data);
        getComments();
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




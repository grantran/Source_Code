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

function getImageFromURL(resource){



  $.get("https://cors-anywhere.herokuapp.com/" + escape(resource.url), function(data) {
    // var meta = $(data).filter('meta[name="og:image"]').attr("content");
    // console.log(meta)

    // var logo = $(data).filter('img[id="logo"]').attr("src");
    // var ogImage = $(data).filter('meta[property="og:image"]').attr("content");
    // var twitterImage = $(data).filter('meta[name="twitter:image"]').attr("content");
    // var schemaImage = $(data).filter('[itemprop="image"]').attr("src");


    // var imageURL = ogImage || twitterImage || schemaImage || "http://placehold.it/400x400"

    var imageURL = resource.url + "/" + $(data).filter("link[rel=apple-touch-icon]").attr('href');


    $(`#resource-${resource.id}`).find(".resourceImage").attr("src", imageURL);
    console.log("resource.url" + resource.url + "imageURL   " +  imageURL);



});

  // function proxify( request ) {
  //   request.url = "http://www.inertie.org/ba-simple-proxy.php?mode=native&url=" + encodeURIComponent( request.url );
  //   return request;
  // }

  //   // Create an instance of ImageResolver
  //   // The proxy function is passed as an option


  // var resolver = new ImageResolver( { requestPlugin : proxify } );
  //   resolver.register(new ImageResolver.Opengraph());
  //   resolver.register(new ImageResolver.FileExtension());
  //   resolver.register(new ImageResolver.NineGag());
  //   resolver.register(new ImageResolver.Instagram());
  //   resolver.register(new ImageResolver.ImgurPage());

  //   resolver.register(new ImageResolver.MimeType());
  //   resolver.register(new ImageResolver.Flickr( '6a4f9b6d16c0eaced089c91a2e7e87ad' ));

  //   resolver.register(new ImageResolver.Webpage());

  // resolver.resolve(url, function(result){
  //   if (result) {
  //       console.log(result.image);
  //   } else {
  //       console.log( "No image found" );
  //   }
// });
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
              <p>caption</p>
              <p> Posted by </p>
            </div>
            <a href="${escape(resource.url)}"><img class="resourceImage" src=""></a>
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

  // Renders the tweets via loop and adds them to the top of the page
  function renderResources(resources) {
    var resourceContainer = $(".resourceWall");
    resourceContainer.empty();
    for (var i = 0; i < resources.length; i++) {
      var resource = resources[i];
      // console.log(resources[i]);
      resourceContainer.prepend(createResourceElement(resource));
      getImageFromURL(resource);
    }
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




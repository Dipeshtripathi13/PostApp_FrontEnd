fetch("http://localhost:8080/posts/")
  .then(function (res) {
    return res.text();
  })
  .then(function (jres) {
    console.log(jres);

    const jsonData = JSON.parse(jres);

    for (var i = 0; i < jsonData.length; i++) {
      var post = jsonData[i];
      insertOnePost(
        post.task,
        post.name,
        post.id,
      );
    }
  })
  .catch(function (error) {
    console.log("Error fetching: " + error);
  });

function insertOnePost(authorName, postContent, postId) {
  var toInsert = ` <div class="post">
    <div>
        <div class="author">${authorName}</div>
        
    </div>
    <div class="content">${postContent}</div>
    <hr>
    <button style='color: red' onclick="deletePost('${postId}')">Delete</button>
</div>`;

  const container = document.getElementById("posts-container");

  container.insertAdjacentHTML("afterbegin", toInsert);
}

// insertOnePost("Author Name", "Content", "hijo");

function deletePost(postId) {
  console.log("Deleting " + postId);

  fetch("http://localhost:8080/posts/" + postId, {
    method: "DELETE",
  })
    .then(function (res) {
      return res.text();
    })
    .then(function (v) {
      console.log(v);
      window.location.reload() ;
    })
    .catch(function (e) {
      console.log("error: " + e);
    });
}

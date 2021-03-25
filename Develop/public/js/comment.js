const postComment = async (event) => {
  event.preventDefault();

  var comment = document.querySelector('#submit-comment').innerHTML;
  var id = window.location.href.toString().split('edit/')[1];


    const response = await fetch("/post/" + id, {
      method: 'POST',
      body: JSON.stringify({
        blogId: id,
        text: comment,
      }),
      headers: { 'Content-Type': 'application/json' },
    })

    //adds to db.json
    if (response.ok) {
      alert('Comment posted!');
    
    } else {
      alert('Failed to post comment');
    }
};


document.querySelector('#update').addEventListener('click', updatePost);

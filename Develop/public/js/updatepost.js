const updatePost = async (event) => {
  debugger;
  event.preventDefault();

  var id = window.location.href.toString().split('edit/')[1];
  console.log(id);

  var blogname = document.querySelector('#title').innerHTML;
  var blogtext = document.querySelector('#blog-text').innerHTML;
  var filename = id.trim("?");
  var html = `<p id="blog-text" contenteditable="true">${blogtext}</p>`

    const response = await fetch("/post/edit/" + id, {
      method: 'PUT',
      body: JSON.stringify({
        id: id,
        name: blogname,
        text: html,
        filename: filename
      }),
      headers: { 'Content-Type': 'application/json' },
    })

    //adds to db.json
    if (response.ok) {
      alert('Post updated!');
      document.location.replace('/dashboard');
    
    } else {
      alert('Failed to update post');
    }
};


document.querySelector('#update').addEventListener('click', updatePost);

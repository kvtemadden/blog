const updatePost = async (event) => {
  debugger;
  event.preventDefault();

  var id = window.location.href.toString().split('edit/')[1];

  var blogname = document.querySelector('#title').innerHTML;
  var blogdesc = document.querySelector('#desc').innerHTML;
  var blogtext = document.querySelector('#blog-text').innerHTML;

    const response = await fetch("/post/edit/" + id, {
      method: 'PUT',
      body: JSON.stringify({
        id: id,
        name: blogname,
        content: blogtext,
        description: blogdesc,
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

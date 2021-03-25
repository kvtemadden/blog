const createPost = async (event) => {
  event.preventDefault();

  var blogname = document.querySelector('#blog-title').innerHTML;
  var blogtext = document.querySelector('#blog-text').innerHTML;
  var blogdesc = document.querySelector('#blog-desc').innerHTML;

  var html = `<p id="blog-text" contenteditable="true">${blogtext}</p>`

    const response = await fetch("/post/new", {
      method: 'POST',
      body: JSON.stringify({
        name: blogname,
        text: html,
        description: blogdesc
      }),
      headers: { 'Content-Type': 'application/json' },
    })

    if (response.ok) {
      alert('Post created!');
      document.location.replace('/dashboard');
    
    } else {
      alert('Failed to create post');
    }
};


document.querySelector('#create').addEventListener('click', createPost);

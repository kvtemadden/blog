const deletePost = async (event) => {
  event.preventDefault();

  var id = window.location.href.toString().split('edit/')[1];
  console.log(id);

    const response = await fetch("/post/edit/" + id, {
      method: 'DELETE',
      body: JSON.stringify({
        id: id
      }),
      headers: { 'Content-Type': 'application/json' },
    })

    if (response.ok) {
      document.location.replace('/dashboard');

    } else {
      alert('Failed to delete post');
    }
};

document.querySelector('#delete').addEventListener('click', deletePost);

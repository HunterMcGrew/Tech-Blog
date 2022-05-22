// submit comment button
const commentBtn = document.getElementById("commentBtn");

const commentFormHandler = async function(event) {
  event.preventDefault();

  const postId = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1];
  const commentBody = document.getElementById("commentBody").value;

  if (commentBody) {
    await fetch('/api/comment', {
      method: 'POST',
      body: JSON.stringify({
        postId: postId,
        body: commentBody,
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    document.location.reload();
  }
};

commentBtn.addEventListener("click", commentFormHandler);

// const postId = document.querySelector('input[name="post-id"]').value;

const editFormHandler = async function(event) {
  event.preventDefault();

  const postId = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];
  let postTitle = document.getElementById('postTitle').value;
  let postBody = document.getElementById('postBody').value;
try {
  await fetch(`/api/post/${postId}`, {
    method: "PUT",
    body: JSON.stringify({
      title: postTitle,
      body: postBody,
    }),
    headers: {"Content-Type" : "application/json"}
    
  });
  

  document.location.replace(`/post/${postId}`);
} catch (err) {
  if (err) throw err;
}
};

const deleteClickHandler = async function() {
  await fetch(`/api/post/:id`, {
    method: 'DELETE',
  });
  

  document.location.replace('/dashboard');
};

const cancelClickHandler = () => {
  document.location.replace("/dashboard");
}

const updateBtn = document.getElementById("updateBtn");
const deleteBtn = document.getElementById("deleteBtn");
const cancelBtn = document.getElementById("cancelBtn");

updateBtn.addEventListener("click", editFormHandler);
deleteBtn.addEventListener("click", deleteClickHandler);
cancelBtn.addEventListener("click", cancelClickHandler);;

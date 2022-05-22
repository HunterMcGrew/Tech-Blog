const newFormHandler = async function(event) {
  event.preventDefault();

  const title = document.getElementById('postTitle').value;
  const body = document.getElementById('postBody').value;

  await fetch(`/api/post/`, {
    method: 'POST',
    body: JSON.stringify({
      title: title,
      body: body,
    }),
    headers: { 'Content-Type': 'application/json' },
  });
  
  document.location.replace('/dashboard');
};

const submit = document.getElementById("submit");
submit.addEventListener("click", newFormHandler);


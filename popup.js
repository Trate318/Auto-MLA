document.getElementById('generate').addEventListener('click', () => {
  const name = document.getElementById('name').value;
  const instructor = document.getElementById('instructor').value;
  const course = document.getElementById('course').value;
  const title = document.getElementById('title').value;

  const status = document.getElementById('status');
  status.textContent = 'Sending...';

  fetch("https://script.google.com/macros/s/AKfycbzjr2q3E7mxOL_QH-FhGk5kfZte96ta7eevos1JUCceGtxuoPtmPnl5UGksJpITZ4q6zA/exec", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({name, instructor, course, title })
  })
  .then(res => res.text())
  .then( 
    status.textContent = "✅ Success"
  )
  .then(text => {
    document.getElementById('status').textContent = text;
    if (text.startsWith("https://")) {
      chrome.tabs.create({ url: text });  // open the created doc
    }
  })
  .catch(error => {
    status.textContent = "❌ Error: " + error.message;
  });
});

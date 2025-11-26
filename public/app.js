async function loadTasks(){
  const res = await fetch('/tasks')
  const tasks = await res.json()
  const tbody = document.querySelector('#tasksTable tbody')
  tbody.innerHTML = ''
  tasks.forEach(t => {
    const tr = document.createElement('tr')
    tr.innerHTML = `<td>\${t.title}</td><td>\${t.description || ''}</td><td><button data-id="\${t.id}" class="del">Delete</button></td>`
    tbody.appendChild(tr)
  })
}

document.getElementById('taskForm').addEventListener('submit', async (e) => {
  e.preventDefault()
  const title = document.getElementById('title').value
  const description = document.getElementById('description').value
  await fetch('/tasks', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title, description }) })
  document.getElementById('title').value = ''
  document.getElementById('description').value = ''
  await loadTasks()
})

document.addEventListener('click', async (e) => {
  if (e.target.classList.contains('del')) {
    const id = e.target.dataset.id
    await fetch('/tasks/' + id, { method: 'DELETE' })
    await loadTasks()
  }
})

loadTasks()

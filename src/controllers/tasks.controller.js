import * as service from '../services/tasks.service.js'

export async function getAll(req, res) {
  const tasks = await service.getAll()
  res.json(tasks)
}

export async function getById(req, res) {
  const task = await service.getById(req.params.id)
  if (!task) return res.status(404).json({ error: 'Not found' })
  res.json(task)
}

export async function create(req, res) {
  const { title, description } = req.body
  if (!title) return res.status(400).json({ error: 'title is required' })
  const newTask = await service.create({ title, description })
  res.status(201).json(newTask)
}

export async function update(req, res) {
  const updated = await service.update(req.params.id, req.body)
  if (!updated) return res.status(404).json({ error: 'Not found' })
  res.json(updated)
}

export async function remove(req, res) {
  const deleted = await service.remove(req.params.id)
  if (!deleted) return res.status(204).send()
}

export async function removeTask(req, res) {
  try {
    const id = req.params.id;
    await taskService.remove(id);
    return res.sendStatus(204);
  } catch (error) {
    console.error("DELETE error:", error);
    return res.status(500).json({ error: "Internal error" });
  }
}



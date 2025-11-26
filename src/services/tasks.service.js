import { readFile, writeFile } from 'fs/promises'
import { join } from 'path'
import { v4 as uuidv4 } from 'uuid'

const DB = join(process.cwd(), 'src', 'data', 'tasks.json')

async function readDB() {
  try {
    const content = await readFile(DB, 'utf-8')
    return JSON.parse(content)
  } catch (e) {
    return []
  }
}

async function writeDB(data) {
  await writeFile(DB, JSON.stringify(data, null, 2))
}

export async function getAll() {
  return await readDB()
}

export async function getById(id) {
  const list = await readDB()
  return list.find(t => t.id === id)
}

export async function create(task) {
  const list = await readDB()
  const newTask = { id: uuidv4(), title: task.title, description: task.description || '', createdAt: new Date().toISOString() }
  list.push(newTask)
  await writeDB(list)
  return newTask
}

export async function update(id, data) {
  const list = await readDB()
  const idx = list.findIndex(t => t.id === id)
  if (idx === -1) return null
  list[idx] = { ...list[idx], ...data, updatedAt: new Date().toISOString() }
  await writeDB(list)
  return list[idx]
}



export async function remove(id) {
  const tasks = await this.getAll();
  const newList = tasks.filter(t => t.id !== Number(id));

  await fs.writeFile(DB_PATH, JSON.stringify(newList, null, 2));
  return true;
}

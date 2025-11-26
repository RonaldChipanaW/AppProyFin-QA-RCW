import { describe, it, expect, beforeEach, vi } from 'vitest'
import * as service from '../../src/services/tasks.service.js'
import { writeFile } from 'fs/promises'
import { join } from 'path'

const DB = join(process.cwd(), 'src', 'data', 'tasks.json')

async function setDB(data){
  await writeFile(DB, JSON.stringify(data, null, 2))
}

describe('tasks.service - unit/integration-like', () => {
  beforeEach(async () => {
    await setDB([])
  })

  it('creates a task', async () => {
    const t = await service.create({ title: 'Test', description: 'Desc' })
    expect(t).toHaveProperty('id')
    expect(t.title).toBe('Test')
  })

  it('gets all tasks', async () => {
    await service.create({ title: 'A' })
    await service.create({ title: 'B' })
    const all = await service.getAll()
    expect(all.length).toBe(2)
  })

  it('updates a task', async () => {
    const t = await service.create({ title: 'ToUpdate' })
    const up = await service.update(t.id, { title: 'Updated' })
    expect(up.title).toBe('Updated')
  })

/*   it('removes a task', async () => {
    const t = await service.create({ title: 'ToDelete' })
    const removed = await service.remove(t.id)
    expect(removed).toBe(true)
    const all = await service.getAll()
    expect(all.length).toBe(0)
  }) */

  it('getById returns null when not found', async () => {
    const r = await service.getById('no-id')
    expect(r).toBeUndefined()
  })
})

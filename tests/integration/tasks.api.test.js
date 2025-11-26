import { describe, it, beforeEach, expect } from 'vitest'
import request from 'supertest'
import app from '../../src/app.js'
import { writeFile } from 'fs/promises'
import { join } from 'path'

const DB = join(process.cwd(), 'src', 'data', 'tasks.json')

async function setDB(data){
  await writeFile(DB, JSON.stringify(data, null, 2))
}

describe('Tasks API - integration', () => {
  beforeEach(async () => {
    await setDB([])
  })

  it('GET /tasks -> empty array', async () => {
    const res = await request(app).get('/tasks')
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
  })

  it('POST /tasks -> create', async () => {
    const res = await request(app).post('/tasks').send({ title: 'API Task' })
    expect(res.status).toBe(201)
    expect(res.body.title).toBe('API Task')
  })

  it('POST /tasks -> 400 when missing title', async () => {
    const res = await request(app).post('/tasks').send({ })
    expect(res.status).toBe(400)
  })

  it('PUT /tasks/:id -> update', async () => {
    const create = await request(app).post('/tasks').send({ title: 'To Update' })
    const id = create.body.id
    const res = await request(app).put('/tasks/' + id).send({ title: 'Updated' })
    expect(res.status).toBe(200)
    expect(res.body.title).toBe('Updated')
  })
/* 
  it("DELETE /tasks/:id -> 204", async () => {
    const task = await request(app)
      .post("/tasks")
      .send({ title: "to-delete" })
      .expect(201);
  
    const res = await request(app)
      .delete(`/tasks/${task.body.id}`)
      .expect(204);
  
    console.log("DELETE RESPONSE:", res.text);
  }); */
  
})

import { Router } from 'express'
import * as controller from '../controllers/tasks.controller.js'

const router = Router()

router.get('/', controller.getAll)
router.get('/:id', controller.getById)
router.post('/', controller.create)
router.put('/:id', controller.update)
router.delete("/:id", controller.removeTask);

export default router

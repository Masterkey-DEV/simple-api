import { Router } from 'express'
import { MovieController } from '../controllers/movies.js'

export const moviesRouter = Router()

moviesRouter.get('/', MovieController.getAll)

moviesRouter.get('/:id', MovieController.getByID)

// moviesRouter.put('/:id', (req, res) => {
//   const resultado = partialValidator(req.body)
//   if (resultado.error) {
//     return res.status(400).json({ error: JSON.parse(resultado.error.message) })
//   }
//   const { id } = req.params
//   const moveIndex = movies.findIndex((movie) => movie.id === id)
//   if (moveIndex === -1) {
//     return res.status(404).json({ message: 'movie not found' })
//   }
//   const updateMOvie = {
//     ...movies[moveIndex],
//     ...resultado.data
//   }
//   movies[moveIndex] = updateMOvie
//   res.status(202).json(updateMOvie)
// })

moviesRouter.post('/', MovieController.createMovie)

moviesRouter.delete('/:id', MovieController.deleteMovie)

moviesRouter.patch('/:id', MovieController.update)

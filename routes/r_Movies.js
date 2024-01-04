import { Router } from 'express'
import { randomUUID } from 'node:crypto'
import { validator, partialValidator } from '../schemas/zod.js'
import { readJSON } from '../require.js'

const movies = readJSON('./movies.json')

export const moviesRouter = Router()

moviesRouter.get('/', (req, res) => {
  const { genre } = req.query
  if (genre) {
    // verificamos si tenemos un gentero en caso de tenerlo las pelis seran iguales a las peliculas filtradas por su genero en donde algun genero incluta el gener busaco en lowercase
    const pelis = movies.filter((movie) =>
      movie.genre.some(
        (gen) => gen.toLocaleLowerCase() === genre.toLocaleLowerCase()
      )
    )
    res.json(pelis)
    return
  }
  res.json(movies)
})

moviesRouter.get('/:id', (req, res) => {
  const resultado = partialValidator(req.body)
  if (resultado.error) {
    return res.status(400).json({ error: JSON.parse(resultado.error.message) })
  }
  const { id } = req.params
  const moveIndex = movies.findIndex((movie) => movie.id === id)
  if (moveIndex === -1) {
    return res.status(404).json({ message: 'movie not found' })
  }
  const updateMOvie = {
    ...movies[moveIndex],
    ...resultado.data
  }
  movies[moveIndex] = updateMOvie
  res.status(202).json(updateMOvie)
})

moviesRouter.post('/', (req, res) => {
  const resultado = validator(req.body)

  if (resultado.error) {
    return res.status(400).json({ error: JSON.parse(resultado.error.message) })
  }

  const newMovie = {
    id: randomUUID(),
    ...resultado.data
  }
  // esto no seria rest
  movies.push(newMovie)
  console.log('peli creada correctamente')
  res.status(201).json(movies)
})

moviesRouter.delete('/:id', (req, res) => {
  const { id } = req.params
  const moveIndex = movies.findIndex((movie) => movie.id === id)
  if (moveIndex === -1) {
    return res.status(404).json({ message: 'movie not found' })
  }
  movies.splice(moveIndex, 1)
  res.status(200).json(movies[moveIndex])
  console.log('peli eliminada correctamente')
})

moviesRouter.patch('/:id', (req, res) => {
  const resultado = partialValidator(req.body)
  if (resultado.error) {
    return res.status(400).json({ error: JSON.parse(resultado.error.message) })
  }
  const { id } = req.params
  const moveIndex = movies.findIndex((movie) => movie.id === id)
  if (moveIndex === -1) {
    return res.status(404).json({ message: 'movie not found' })
  }
  const updateMOvie = {
    ...movies[moveIndex],
    ...resultado.data
  }
  movies[moveIndex] = updateMOvie
  res.status(202).json(updateMOvie)
})

import { MovieModel } from '../models/movies.js'
import { validator, partialValidator } from '../schemas/zod.js'

export class MovieController {
  static async getAll (req, res) {
    const { genre } = req.query
    const moviess = await MovieModel.getAll({ genre })
    if (moviess.length > 0) {
      return res.json(moviess)
    }
    return res.status(404).send({ message: 'theres no movies by these gender' })
  }

  static async getByID (req, res) {
    const { id } = req.params
    const pelis = await MovieModel.getByID({ id })
    if (pelis) return res.json(pelis)
    res.status(404).send({ message: 'movie not found' })
  }

  static async createMovie (req, res) {
    const resultado = validator(req.body)

    if (resultado.error) {
      return res.status(400).json({ error: JSON.parse(resultado.error.message) })
    }

    const newMovie = await MovieModel.createMovie({ input: resultado.data })
    return res.status(202).json(newMovie)
  }

  static async deleteMovie (req, res) {
    const { id } = req.params

    const result = await MovieModel.deleteMovie({ id })
    if (result === false) {
      return res.status(404).json({ message: 'movie not found' })
    }
    res.status(200).json(result)
    console.log('peli eliminada correctamente')
  }

  static async update (req, res) {
    const resultado = partialValidator(req.body)
    if (resultado.error) {
      return res.status(400).json({ error: JSON.parse(resultado.error.message) })
    }
    const { id } = req.params
    const updateMovie = await MovieModel.update({ id, update: resultado.data })
    if (updateMovie === false) {
      return res.status(404).json({ message: 'movie not found' })
    }
    res.status(202).json(updateMovie)
  }
}

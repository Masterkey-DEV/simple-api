const z = require('zod')

const schema = z.object({
  title: z.string({
    invalid_type_error: 'movie must be a string',
    required_error: 'movie title is required.'
  }),
  year: z.number().int().positive().min(1900).max(2024),
  duration: z.number().positive(),
  director: z.string(),
  poster: z.string().url({
    message: 'poster must be a valid url'
  }),
  genre: z.array(z.enum(['action', 'adventure', 'horror', 'drama', 'fantasy', 'thriller', 'comedy'], {
    required_error: 'genre is required',
    invalid_type_error: 'genre must be an array of strings'
  })),
  rate: z.number().min(0).max(10).default(5)
})

function validator (object) {
  return schema.safeParse(object)
}

function partialValidator (object) {
  return schema.partial().safeParse(object)
}

module.exports = { validator, partialValidator }

const logger = require('./logger')

const requestLogger = (request, response, next) => {
    logger.info('Method:', request.method)
    logger.info('Path:  ', request.path)
    logger.info('Body:  ', request.body)
    logger.info('---')
    next()
  }

const unknownEndpoint = (request, response) => {
    response.status(404).send({error: 'unknown endpoint'})
}


const errorhandler = (error, request, response, next) => {
    if(error.name === 'CastError' && error.kind === 'ObjectId') {
        return response.status(400).send({error: 'malformatted id'})
    } else if(error.name === 'ValidationError') {
        return response.status(400).json({error: error.message})
    } else if(error.name === 'JsonWebTokenError') {
        return response.status(401).json({error: 'invalid token'})
    }

    next(error)
}

module.exports = {
    unknownEndpoint,
    errorhandler,
    requestLogger
}
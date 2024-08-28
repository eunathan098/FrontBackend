import {Request, Response} from 'express'
import { validate } from 'class-validator'
import { ProductRepository } from '@/repositories/product.repository'
import { CreateProductDTO, UpdateProductDTO } from '@/dto/product.dto'
import { Product } from '@/entities/product.entity'

export class ProductController {
   private productRepository: ProductRepository
  ProductRepository: any

   constructor() {
    this.productRepository = new ProductRepository
  }

  findAll = async (request: Request, response: Response): Promise<Response> => {
    const products = await this.productRepository.getAll()

    return response.status(200).send({
      data: products
    })
  }

        //  Esta função esta definida para possa pelo corpo da requisição criar registros de (name, description, price e weight)
  create = async (request: Request, response: Response): Promise<Response> => {
    const {name, description, weight, price} = request.body

    const createProductDTO = new CreateProductDTO
    createProductDTO.name = name
    createProductDTO.description = description
    createProductDTO.weight = weight
    createProductDTO.price = price

          //  Validando os dados enviados na requisição!
    const errors = await validate(createProductDTO)
    if (errors.length > 0) {
      return response.status(422).send({
        error: errors
      })
    }

    const productDb = await this.productRepository.create(createProductDTO)

    return response.status(201).send({
      data: productDb
    })
  }

  findOne = async (request: Request, response: Response): Promise<Response> => {
    const id: string = request.params.id

    const product = await this.productRepository.find(id)
    if (!product) {
      return response.status(404).send({
        error: 'Product not found'
      })
    }

    return response.status(200).send({
      data: product
    })
  }

  update = async(request: Request, response: Response): Promise<Response> => {
    const id: string = request.params.id
    const {name, description, price, weight } = request.body

    const updateDto = new UpdateProductDTO
    updateDto.id = id
    updateDto.name = name
    updateDto.description = description
    updateDto.weight = weight
    updateDto.price = price


    const errors = await validate(updateDto)
    if (errors.length > 0) {
      return response.status(422).send({
        errors
      })
    }

    try {
      const productDb = await this.productRepository.update(updateDto)
      if (!productDb) {
        return response.status(404).send({
          error: 'Product Not Found'
        })
      }
      return response.status(200).send({
        data: productDb
      })
    } catch (error) {
      return response.status(500).send({
        error: 'Internal error'
      })
    }
  }

  delete = async (request: Request, response: Response): Promise<Response> => {
    const id: string = request.params.id

    try {
      await this.productRepository.delete(id)
      return response.status(200).json({message: "Produto excluido com  sucesso"});

      // return response.status(204).send({})
    } catch (error) {
      return response.status(400).send({
        error: 'Error deleting'
      })
    }
  }
}
export default new ProductController

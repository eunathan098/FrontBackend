import AppDataSource from "@/database/connection";
import { CreateProductDTO, UpdateProductDTO } from "@/dto/product.dto";
import { Product } from "@/entities/product.entity";
import { Repository } from "typeorm";

export class ProductRepository {
  save(product: Product) {
    throw new Error('Method not implemented.');
  }
  findOneBy(id: string) {
    throw new Error('Method not implemented.');
  }
  private repository: Repository<Product>;

  constructor() {
    this.repository = AppDataSource.getRepository(Product);
  }

  async getAll(): Promise<Product[]> {
    return await this.repository.find();
  }

  async create(input: CreateProductDTO): Promise<Product> {
    const product = new Product();
    product.name = input.name;
    product.description = input.description;
    product.weight = input.weight;
    product.price = input.price;

    return await this.repository.save(product);
  }

  async find(id: string): Promise<Product | null> {
    return await this.repository.findOneBy({ id });
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async update(input: UpdateProductDTO): Promise<Product | null> {
    const product = await this.find(input.id);
    if (!product) {
      return null;
    }

    product.name = input.name;
    product.description = input.description;
    product.weight = input.weight;
    product.price = input.price;

    return await this.repository.save(product);
  }

  async edit(id: string, name?: string, description?: string, weight?: number, price?: number): Promise<Product | null> {
    // Encontra o produto pelo ID
    const product = await this.find(id);

    if (!product) {
      return null;
    }

    // Atualiza somente os campos fornecidos
    if (name !== undefined) product.name = name;
    if (description !== undefined) product.description = description;
    if (weight !== undefined) product.weight = weight;
    if (price !== undefined) product.price = price;

    // Salva as alterações no banco de dados
    return await this.repository.save(product);
  }
}

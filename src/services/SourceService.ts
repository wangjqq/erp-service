import { AppDataSource } from '../data-source';
import { Source } from '../entities/Source';

export class SourceService {
  private readonly sourceRepository = AppDataSource.getRepository(Source);

  async createSource(
    name: string,
    address: string,
    phone: string,
    mainBusiness: string,
    priceAdvantage: '低' | '中' | '高',
    types: ('进货渠道' | '出货渠道')[]
  ): Promise<Source> {
    const newSource = this.sourceRepository.create({
      name,
      address,
      phone,
      mainBusiness,
      priceAdvantage,
      types,
    });
    return await this.sourceRepository.save(newSource);
  }

  async updateSource(
    id: number,
    name: string,
    address: string,
    phone: string,
    mainBusiness: string,
    priceAdvantage: '低' | '中' | '高',
    types: ('进货渠道' | '出货渠道')[],
    transactionCount: number = 0
  ): Promise<Source> {
    const source = await this.sourceRepository.findOne({where:{id}});

    if (!source) {
      throw new Error('找不到指定的渠道');
    }

    source.name = name;
    source.address = address;
    source.phone = phone;
    source.mainBusiness = mainBusiness;
    source.priceAdvantage = priceAdvantage;
    source.types = types;
    source.transactionCount = transactionCount;

    return await this.sourceRepository.save(source);
  }

  async deleteSource(id: number): Promise<void> {
    const source = await this.sourceRepository.findOne({where:{id}});

    if (!source) {
      throw new Error('找不到指定的渠道');
    }

    await this.sourceRepository.remove(source);
  }

  async getAllSources(): Promise<Source[]> {
    return await this.sourceRepository.find();
  }

  async getSourceById(id: number): Promise<Source> {
    const source = await this.sourceRepository.findOne({where:{id}});

    if (!source) {
      throw new Error('找不到指定的渠道');
    }

    return source;
  }
}

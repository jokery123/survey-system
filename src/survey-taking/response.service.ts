import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Response } from './response.entity';
import { CreateResponseDto } from './input/create-response.dto';


@Injectable()
export class ResponseService {
    constructor(
    @InjectRepository(Response)
    private readonly responseRepository: Repository<Response>,

    ) {}

    public async findOneById(responseId: number): Promise<Response> {
        return await this.responseRepository.findOneByOrFail({id: responseId}); 
        }

    public async findByQuestionAndUser(userId: number, questionIds: number[]): Promise<Response[]> {
/*         return await this.responseRepository
        .createQueryBuilder('r')
        .where('r.questionId = :questionId', { questionId })
        .andWhere('r.userId = :userId', { userId })
        .getOne(); */
        return await this.responseRepository
        .createQueryBuilder('r')
        .where('r.questionId IN (:...questionIds)', { questionIds })
        .andWhere('r.userId = :userId', { userId })
        .getMany();

    }


    public async saveResponse(input: CreateResponseDto): Promise<Response> {
        return await this.responseRepository.save(new Response({
            ...input
        }));
    }

}

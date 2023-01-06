import { DataSource, In, Repository } from "typeorm";
import { InvolvedsEntity } from "../entities/involveds.entity";

export interface IInvolvedsRepository {
    saveIfNotExists(data: Array<InvolvedsEntity>): Promise<Array<InvolvedsEntity>>;
}

export class InvolvedsRepository implements IInvolvedsRepository {
    private readonly repository: Repository<InvolvedsEntity>;
    constructor(connection: DataSource) {
        this.repository = connection.getRepository(InvolvedsEntity);
    }
    public saveIfNotExists = async (data: Array<InvolvedsEntity>): Promise<Array<InvolvedsEntity>> => {
        const info = (await this.repository.upsert(data, { conflictPaths: { cpf: true } }))
        const ids = info.generatedMaps.map((item) => item.id);
        const involveds = await this.repository.findBy({ id: In(ids) });
        return involveds;
    }
}
import {
    Entity,
    PrimaryGeneratedColumn,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm'

@Entity()
export abstract class Model extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: number

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    constructor(data?: Partial<any>) {
        super()

        Object.assign(this, data)
    }

    toJSON() {
        //modify here the response json
        return this
    }
}

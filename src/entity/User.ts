import { Entity, Column } from 'typeorm'
import {
    IsEmail,
    IsNotEmpty,
    IsAlpha,
    IsNumber,
    Min,
    Max
} from 'class-validator'
import { Model } from './Model'

@Entity({ name: 'users' })
export class User extends Model {
    @Column({
        unique: true
    })
    @IsEmail()
    @IsNotEmpty()
    email: string

    @Column()
    @IsNotEmpty()
    @IsAlpha()
    firstName: string

    @Column()
    @IsNotEmpty()
    @IsAlpha()
    lastName: string

    @Column()
    @IsNumber()
    @Min(16)
    @Max(100)
    age: number

    @Column()
    address: string

    fullName = () => this.firstName + ' ' + this.lastName
}

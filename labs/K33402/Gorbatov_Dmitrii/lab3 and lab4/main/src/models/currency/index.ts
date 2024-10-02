import { Table, Column, Model, Unique, AllowNull, DataType, AutoIncrement, PrimaryKey } from 'sequelize-typescript';
import { Optional } from "sequelize";

export type CurrencyAttributes = {
    id: number;
    name: string;
    price: number;
    category: CategoryName;
    latestPrice: number;
};

export enum CategoryName {
    TOKEN = "TOKEN",
    STABLECOIN = "STABLECOIN",
    CURRENCY = "CURRENCY"
}

export type CurrencyCreationAttributes = Optional<CurrencyAttributes, 'id'>;

@Table
export class Currency extends Model<CurrencyAttributes, CurrencyCreationAttributes> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @Unique
    @Column
    name: string;

    @Column
    price: number;

    @Column({
        type: DataType.ENUM(...Object.values(CategoryName)),
        defaultValue: CategoryName.TOKEN,
    })
    category: CategoryName;
}

export default Currency;

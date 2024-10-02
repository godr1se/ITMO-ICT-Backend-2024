import { Table, Column, AutoIncrement, PrimaryKey, ForeignKey, Model } from "sequelize-typescript";
import Currency from "../currency";
import { Optional } from "sequelize";

export type BalanceAttributes = {
    id: number;
    userId: number;
    userName: string;
    currency: string;
    currencyId: number;
    count: number;
};

export type BalanceCreationAttributes = Optional<BalanceAttributes, 'id'>;

@Table
export class Balance extends Model<BalanceAttributes, BalanceCreationAttributes> {

    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @Column
    userId: number;

    @Column
    userName: string;

    @ForeignKey(() => Currency)
    @Column
    currencyId: number;

    @Column
    currency: string;

    @Column
    count: number;
}

export default Balance;

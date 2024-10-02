import { Table, Model, PrimaryKey, AutoIncrement, Column, ForeignKey } from 'sequelize-typescript';
import Currency from '../currency';

export type HistoryAttributes = {
    id: number;
    idCurrency: number;
    nameCur: string;
    priceCur: number;
};


@Table
export default class History extends Model<HistoryAttributes> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id!: number;

    @ForeignKey(() => Currency)
    @Column
    idCurrency!: number;

    @Column
    nameCur!: string;

    @Column
    priceCur!: number;
}

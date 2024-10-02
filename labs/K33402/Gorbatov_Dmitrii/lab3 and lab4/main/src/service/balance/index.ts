import Balance, { BalanceAttributes } from "../../models/balance";
import Currency from "../../models/currency";

class BalanceService {
    async getAll() {
        try {
            const result = await Balance.findAll();
            return (result.length === 0) ? 'no data' : result;
        } catch (err) {
            console.error(err);
            throw new Error('Failed to fetch balances');
        }
    }

    async getById(id: number) {
        try {
            const item = await Balance.findByPk(id);
            return item;
        } catch (err) {
            console.error(err);
            throw new Error('Failed to fetch balance by ID');
        }
    }

    async getByUserId(userId: number) {
        try {
            const items = await Balance.findAll({ where: { userId } });
            return items;
        } catch (err) {
            console.error(err);
            throw new Error('Failed to fetch balances by user ID');
        }
    }

    async create(userId: number, currencyId: number, basketData: Omit<BalanceAttributes, 'currency' | 'user'>) {
        try {
            const currency = await Currency.findOne({ where: { id: currencyId } });
            if (!currency) {
                throw new Error('Currency not found');
            }

            const result = await Balance.create({
                ...basketData,
                userId,
                currencyId: currency.id,
                currency: currency.name
            });
            return result;
        } catch (err) {
            console.error(err);
            throw new Error('Failed to create balance');
        }
    }

    async update(balanceId: number, balanceData: BalanceAttributes) {
        try {
            const result = await Balance.update(
                {
                    currency: balanceData.currency,
                    currencyId: balanceData.currencyId,
                    count: balanceData.count
                },
                { where: { id: balanceId } }
            );
            return result;
        } catch (err) {
            console.error(err);
            throw new Error('Failed to update balance');
        }
    }

    async delete(id: number) {
        try {
            const result = await Balance.destroy({ where: { id } });
            return result;
        } catch (err) {
            console.error(err);
            throw new Error('Failed to delete balance');
        }
    }
}

export default BalanceService;

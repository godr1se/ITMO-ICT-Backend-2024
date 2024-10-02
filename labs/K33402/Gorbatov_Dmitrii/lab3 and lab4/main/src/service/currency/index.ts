import Currency, { CurrencyCreationAttributes } from "../../models/currency";
import History from "../../models/history";

class CurrencyService {
    async getAll() {
        try {
            const result = await Currency.findAll();
            return result && result.length > 0 ? result : 'Sorry, your DB is empty';
        } catch (err) {
            console.error(err);
            throw new Error('Failed to fetch currencies');
        }
    }

    async getById(id: number) {
        try {
            const result: any = await Currency.findByPk(id);
            return result ? result : null;
        } catch (err) {
            console.error(err);
            throw new Error('Failed to fetch currency by ID');
        }
    }

    async createCurrency(currencyData: CurrencyCreationAttributes): Promise<Currency> {
        try {
            const currency = await Currency.create(currencyData);
            return currency;
        } catch (err) {
            console.error(err);
            throw new Error('Failed to create currency');
        }
    }

    async updatePrice(currencyId: number, newPrice: number) {
        try {
            const existingCurrency: any = await Currency.findByPk(currencyId);
            if (!existingCurrency) {
                throw new Error('Currency not found');
            }

            const historyItem = await History.create({
                ...existingCurrency,
                idCurrency: existingCurrency.id,
                nameCur: existingCurrency.name,
                priceCur: existingCurrency.price
            });

            const result: any = await Currency.update(
                { price: newPrice },
                { where: { id: currencyId } }
            );

            console.log(historyItem);
            return result;
        } catch (err) {
            console.error(err);
            throw new Error('Failed to update currency price');
        }
    }

    async delete(id: number) {
        try {
            const result = await Currency.destroy({ where: { id } });
            return result;
        } catch (err) {
            console.error(err);
            throw new Error('Failed to delete currency');
        }
    }
}

export default CurrencyService;

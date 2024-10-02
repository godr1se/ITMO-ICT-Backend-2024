import History from "../../models/history";

class HistoryService {
    async getById(curId: number) {
        try {
            const result = await History.findAll({ where: { idCurrency: curId } });
            if (!result || result.length === 0) {
                throw new Error("No records found.");
            }
            return result;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    async delete(id: number) {
        try {
            const result = await History.destroy({ where: { id } });
            if (result === 0) {
                throw new Error("No records deleted.");
            }
            return result;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }
}

export default HistoryService;

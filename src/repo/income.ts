import * as _ from 'lodash';
import * as Sequelize from 'sequelize';
import { factory } from '..';
import income, { IIncomeModel } from './model/income';

/**
 * 興行収入レポジトリ
 */
export default class IncomeRepository {
    public readonly incomeModel: IIncomeModel;
    private sequelize: Sequelize.Sequelize;
    constructor(db: Sequelize.Sequelize) {
        this.incomeModel = income(db);
        this.sequelize = db;
    }

    /**
     * 興行外収入検索
     */
    public async search(params: factory.income.attributes) {
        return this.incomeModel.findAll({
            where: params
        });
    }

    public async bulkModifyByDateAndTheater(params: factory.income.attributes[]) {
        const transaction = await this.sequelize.transaction();
        try {
            const ogAccounts = (await this.incomeModel.findAll({
                where: {
                    date: params[0].date,
                    theaterCd: params[0].theaterCd
                }
            })).map((account) => account.get({ plain: true }));

            const deletedData = _.differenceBy(ogAccounts, params, 'id');
            if (deletedData.length > 0) {
                await this.incomeModel.destroy({
                    where: {
                        id: { [Sequelize.Op.in]: [ _(deletedData).map('id') ] }
                    }
                });
            }

            const newData = _.differenceBy(params, ogAccounts, 'id');
            if (newData.length > 0) {
                await this.incomeModel.bulkCreate(newData);
            }

            // params から新規登録情報を削除
            _.pullAll(params, newData);

            const updatedData = _.differenceWith(params, ogAccounts, (a, b) => {
                return a.subjectDetailCd   === b.subjectDetailCd
                    && a.opponentSubjectCd === b.opponentSubjectCd
                    // tslint:disable-next-line:triple-equals
                    && a.amount            ==  b.amount
                    && a.movieCd           === b.movieCd
                    && a.note              === b.note
                    // tslint:disable-next-line:triple-equals
                    && a.quantity          ==  b.quantity;
            });
            _(updatedData).forEach(async (data) => {
                await this.incomeModel.update(data, { where: { id: data.id } });
            });
        } catch (err) {
            transaction.rollback();
            throw(err);
        }
    }
}

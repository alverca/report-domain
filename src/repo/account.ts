import * as Sequelize from 'sequelize';
import { factory } from '..';
import account, { IAccountModel } from './model/account';

/**
 * 科目レポジトリ
 */
export default class AccountRepository {
    public readonly accountModel: IAccountModel;
    constructor(db: Sequelize.Sequelize) {
        this.accountModel = account(db);
    }

    public async search(params: Partial<factory.account.attributes>) {
        const findOption: Sequelize.FindOptions<Partial<factory.screeningWork.attributes>> = {
            where: params
        };

        return this.accountModel.findAll(findOption);
    }
}

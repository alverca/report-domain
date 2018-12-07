import * as Sequelize from 'sequelize';
import { factory } from '..';
import screeningWork, { IScreeningWorkModel } from './model/screeningWork';

/**
 * 上映作品レポジトリ
 */
export default class ScreeningWorkRepository {
    public readonly screeningWorkModel: IScreeningWorkModel;
    constructor(db: Sequelize.Sequelize) {
        this.screeningWorkModel = screeningWork(db);
    }

    public async search(params: factory.screeningWork.searchCondition) {
        const findOption: Sequelize.FindOptions<Partial<factory.screeningWork.attributes>> = {
            where: { ...<Partial<factory.screeningWork.attributes>>params }
        };
        const whereOption = <Sequelize.WhereOptions<typeof params>>findOption.where;
        if (typeof params.boxOfficeStart === 'object' && !(params.boxOfficeStart instanceof Date)) {
            const boxOfficeStart = (<factory.common.IDateSearch>params.boxOfficeStart);
            whereOption.boxOfficeStart = { };
            if (boxOfficeStart.from !== undefined) {
                whereOption.boxOfficeStart = {
                    ...(<Object>whereOption.boxOfficeStart),
                    [Sequelize.Op.gte]: boxOfficeStart.from
                };
            }
            if (boxOfficeStart.to !== undefined) {
                whereOption.boxOfficeStart = {
                    ...(<Object>whereOption.boxOfficeStart),
                    [Sequelize.Op.lte]: boxOfficeStart.to
                };
            }
        }

        if (typeof params.boxOfficeEnd === 'object' && !(params.boxOfficeStart instanceof Date)) {
            const boxOfficeEnd = (<factory.common.IDateSearch>params.boxOfficeEnd);
            whereOption.boxOfficeEnd = { };
            if (boxOfficeEnd.from !== undefined) {
                whereOption.boxOfficeEnd = {
                    ...(<Object>whereOption.boxOfficeEnd),
                    [Sequelize.Op.gte]: boxOfficeEnd.from
                };
            }
            if (boxOfficeEnd.to !== undefined) {
                whereOption.boxOfficeEnd = {
                    ...(<Object>whereOption.boxOfficeEnd),
                    [Sequelize.Op.lte]: boxOfficeEnd.to
                };
            }
        }

        return this.screeningWorkModel.findAll(findOption);
    }
}

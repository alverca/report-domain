import * as Sequelize from 'sequelize';
import theater, { ITheaterModel } from './model/theater';

/**
 * 劇場レポジトリ
 */
export default class TheaterRepository {
    public readonly theaterModel: ITheaterModel;
    constructor(db: Sequelize.Sequelize) {
        this.theaterModel = theater(db);
    }
}

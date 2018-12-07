/**
 * 配給マスタテーブル
 */
import * as factory from '@toei-jp/report-factory';
import * as Sequelize from 'sequelize';

export interface ITheaterInstance extends
    Sequelize.Instance<factory.theater.attributes>, factory.theater.attributes { }

export interface ITheaterModel extends Sequelize.Model<ITheaterInstance, factory.theater.attributes> { }

// tslint:disable:no-magic-numbers
export default (sqlize: Sequelize.Sequelize) => {
    return sqlize.define<ITheaterInstance, factory.theater.attributes>(
        'theater',
        {
            theaterId: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING(50),
                field: '劇場ID'
            },
            theaterCd: {
                type: Sequelize.STRING(50),
                field: '劇場CD'
            },
            theaterName: {
                type: Sequelize.STRING(100),
                field: '劇場名'
            },
            theaterEnName: {
                type: Sequelize.STRING(100),
                field: '劇場英名'
            },
            theaterKanaName: {
                type: Sequelize.STRING(100),
                field: '劇場カナ名'
            },
            saleStartPeriod: {
                type: Sequelize.DECIMAL(3),
                field: '販売開始期間'
            },
            maxSeatPerOrder: {
                type: Sequelize.DECIMAL(3),
                field: '座席購入上限数'
            },
            endSaleTimeAfterScreening: {
                type: Sequelize.DECIMAL(6),
                field: '上映後販売終了時間'
            },
            createdAt: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
                field: 'CRT_TMSTMP'
            },
            updatedAt: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
                field: 'LST_UPDT_TMSTMP'
            }
        },
        {
            tableName: 'STM_THEATER'
        });
};

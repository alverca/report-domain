/**
 * 上映作品マスタテーブル
 */
import * as factory from '@toei-jp/report-factory';
import * as Sequelize from 'sequelize';

export interface IScreeningWorkInstance extends
    Sequelize.Instance<factory.screeningWork.attributes>, factory.screeningWork.attributes { }

export interface IScreeningWorkModel extends Sequelize.Model<IScreeningWorkInstance, Partial<factory.screeningWork.attributes>> { }

// tslint:disable:no-magic-numbers
// tslint:disable-next-line:max-func-body-length
export default (sqlize: Sequelize.Sequelize) => {
    return sqlize.define<IScreeningWorkInstance, factory.screeningWork.attributes>(
        'screeningWork',
        {
            screeningWorkId: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING(50),
                field: '上映作品ID'
            },
            screeningWorkName: {
                type: Sequelize.STRING(200),
                field: '上映作品名'
            },
            screeningWorkEnName: {
                type: Sequelize.STRING(200),
                field: '上映作品英名'
            },
            screeningWorkKanaName: {
                type: Sequelize.STRING(200),
                field: '上映作品カナ名'
            },
            screeningWorkSubtitle: {
                type: Sequelize.STRING(200),
                field: '上映作品サブタイトル'
            },
            signageDisplayName: {
                type: Sequelize.STRING(200),
                field: 'サイネージ表示名'
            },
            signageSubtitleDisplayName: {
                type: Sequelize.STRING(200),
                field: 'サイネージサブタイトル表示名'
            },
            theaterId: {
                type: Sequelize.STRING(50),
                field: '劇場ID'
            },
            theaterCd: {
                type: Sequelize.STRING(50),
                field: '劇場CD'
            },
            theaterName: {
                type: Sequelize.STRING(50),
                field: '劇場名'
            },
            screeningFormat: {
                type: Sequelize.STRING(50),
                field: '上映形態'
            },
            subDub: {
                type: Sequelize.STRING(50),
                field: '字幕吹替'
            },
            sound: {
                type: Sequelize.STRING(50),
                field: '音響'
            },
            mvtkFlag: {
                type: Sequelize.STRING(3),
                field: 'ムビチケ利用'
            },
            boxOfficeStart: {
                type: Sequelize.DATE,
                field: '興行開始日'
            },
            boxOfficeEnd: {
                type: Sequelize.DATE,
                field: '興行終了日'
            },
            summarizeStartDay: {
                type: Sequelize.DECIMAL(3),
                field: '集計開始曜日'
            },
            screeningWorkSupplyDescrption: {
                type: Sequelize.STRING(1000),
                field: '上映作品補足説明'
            },
            workId: {
                type: Sequelize.STRING(50),
                field: '作品ID'
            },
            workCd: {
                type: Sequelize.STRING(50),
                field: '作品CD'
            },
            workName: {
                type: Sequelize.STRING(200),
                field: '作品名'
            },
            workSubtitle: {
                type: Sequelize.STRING(200),
                field: '作品サブタイトル'
            },
            screenTime: {
                type: Sequelize.STRING(10),
                field: '上映時間'
            },
            rating: {
                type: Sequelize.STRING(50),
                field: 'レイティング'
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
            tableName: 'STM_SCREENINGWORK'
        });
};

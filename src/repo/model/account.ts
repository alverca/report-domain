/**
 * 科目マスタテーブル
 */
import * as factory from '@toei-jp/report-factory';
import * as Sequelize from 'sequelize';

export interface IAccountInstance extends
    Sequelize.Instance<factory.account.attributes>, factory.account.attributes { }

export interface IAccountModel extends Sequelize.Model<IAccountInstance, Partial<factory.account.attributes>> { }

// tslint:disable:no-magic-numbers
export default (sqlize: Sequelize.Sequelize) => {
    return sqlize.define<IAccountInstance, factory.account.attributes>(
        'account',
        {
            subjectId: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING(50),
                field: '科目ID'
            },
            subjectCd: {
                type: Sequelize.STRING(50),
                field: '科目CD'
            },
            subjectName: {
                type: Sequelize.STRING(100),
                field: '科目名'
            },
            subjectGroupCd: {
                type: Sequelize.STRING(50),
                field: '科目分類CD'
            },
            subjectGroupName: {
                type: Sequelize.STRING(100),
                field: '科目分類名'
            },
            subjectDetailCd: {
                type: Sequelize.STRING(50),
                field: '科目細目CD'
            },
            subjectDetailName: {
                type: Sequelize.STRING(100),
                field: '科目細目名'
            },
            typeCode: {
                type: Sequelize.STRING(50),
                field: '科目区分CD'
            },
            typeName: {
                type: Sequelize.STRING(100),
                field: '科目区分名'
            },
            mobilizeTarget: {
                type: Sequelize.SMALLINT,
                field: '動員対象'
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
            tableName: 'STM_ACCOUNT'
        });
};

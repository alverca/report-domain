/**
 * 興行外収入テーブル
 */
import * as factory from '@toei-jp/report-factory';
import * as Sequelize from 'sequelize';

export interface IIncomeInstance extends
    Sequelize.Instance<factory.income.attributes>, factory.income.attributes { }

export interface IIncomeModel extends Sequelize.Model<IIncomeInstance, factory.income.attributes> { }

// tslint:disable:no-magic-numbers
export default (sqlize: Sequelize.Sequelize) => {
    return sqlize.define<IIncomeInstance, factory.income.attributes>(
        'income',
        {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING(50),
                field: 'ID'
            },
            theaterCd: {
                type: Sequelize.STRING(50),
                field: '劇場CD'
            },
            theaterName: {
                type: Sequelize.STRING(100),
                field: '劇場名'
            },
            date: {
                type: Sequelize.DATE,
                field: '日付'
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
                field: '細目CD'
            },
            subjectDetailName: {
                type: Sequelize.STRING(100),
                field: '細目名'
            },
            quantity: {
                type: Sequelize.STRING(100),
                field: '数量'
            },
            amount: {
                type: Sequelize.STRING(100),
                field: '金額'
            },
            opponentSubjectCd: {
                type: Sequelize.STRING(100),
                field: '相手科目CD'
            },
            opponentSubjectName: {
                type: Sequelize.DECIMAL(100),
                field: '相手科目名'
            },
            note: {
                type: Sequelize.TEXT,
                field: '備考'
            },
            movieCd: {
                type: Sequelize.STRING(100),
                field: '作品CD'
            },
            movieName: {
                type: Sequelize.STRING(100),
                field: '作品名'
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
            tableName: 'STM_NONBOXOFFICEINCOME'
        });
};

/**
 * 科目レポジトリテスト
 */
// tslint:disable:no-implicit-dependencies
import * as assert from 'power-assert';
import { Op } from 'sequelize';
import * as sinon from 'sinon';

import Repository from './income';

let sandbox: sinon.SinonSandbox;

describe('IncomeRepository', () => {
    let sequelizeMock: any;
    before(() => {
        // tslint:disable-next-line:no-require-imports
        sequelizeMock = require('sequelize-mock');
    });

    describe('search', () => {
        beforeEach(() => {
            sandbox = sinon.createSandbox();
        });

        afterEach(() => {
            sandbox.restore();
        });

        it('科目データを取得できるはず', async () => {
            const findArgs = {
                theaterCd: '001',
                date: new Date()
            };
            const expectedArgs = {
                order: ['createdAt'],
                where: findArgs
            };
            const expectedResult = [{ id: 0 }];
            const repo = new Repository(new sequelizeMock());
            const model = repo.incomeModel;

            sandbox.mock(model).expects('findAll').once()
                .withExactArgs(expectedArgs).resolves(expectedResult);

            const result = await repo.search(findArgs);
            assert.deepEqual(result, expectedResult);
            sandbox.verify();
        });
    });

    describe('bulkModifyByDateAndTheater', () => {
        beforeEach(() => {
            sandbox = sinon.createSandbox();
        });

        afterEach(() => {
            sandbox.restore();
        });

        it('エラーがなかったら、データを保存できるはず', async () => {
            const date = new Date();
            const theaterCd = '0001';
            const ogData = [{
                id: '0001',
                subjectDetailCd: '1234',
                date,
                theaterCd
            }, {
                id: '0002',
                subjectDetailCd: '1234',
                date,
                theaterCd
            }];
            const data = [{
                id: '0001',
                subjectDetailCd: '12345',
                date,
                theaterCd
            }, {
                id: '0003',
                subjectDetailCd: '12345',
                date,
                theaterCd
            }];

            const sqlize = new sequelizeMock();
            const commitStub = sandbox.stub().resolves();
            sqlize.transaction = async () => ({ commit: commitStub });
            const repo = new Repository(sqlize);
            const model = repo.incomeModel;

            sandbox.mock(model).expects('findAll').once()
                .withExactArgs({ where: { date, theaterCd } })
                .resolves(ogData.map((d) => ({ get: () => d }))); // stub function get

            sandbox.mock(model).expects('destroy').once()
                .withExactArgs({ where: { id: { [Op.in]: [ogData[1].id] } } })
                .resolves();

            sandbox.mock(model).expects('bulkCreate').once()
                .withExactArgs([data[1]])
                .resolves();

            sandbox.mock(model).expects('update').once()
                .withExactArgs(data[0], { where: { id: data[0].id } })
                .resolves();

            const result = await repo.bulkModifyByDateAndTheater(<any>data);
            assert.equal(result, undefined);
            assert(commitStub.calledOnce);
            sandbox.verify();
        });

        it('エラーが発生すればエラーとなるはず', async () => {
            const date = new Date();
            const theaterCd = '0001';
            const data = [{
                id: '0001',
                subjectDetailCd: '12345',
                date,
                theaterCd
            }, {
                id: '0003',
                subjectDetailCd: '12345',
                date,
                theaterCd
            }];

            const sqlize = new sequelizeMock();
            const rollbackStub = sandbox.stub().resolves();
            sqlize.transaction = async () => ({ rollback: rollbackStub });
            const repo = new Repository(sqlize);
            const model = repo.incomeModel;

            sandbox.mock(model).expects('findAll').once()
                .withExactArgs({ where: { date, theaterCd } })
                .rejects(new Error());

            const result = await repo.bulkModifyByDateAndTheater(<any>data)
                .catch((err) => err);
            assert(result instanceof Error);
            assert(rollbackStub.calledOnce);
            sandbox.verify();
        });

        it('新しいデータがなかったら、bulkCreateをしないはず', async () => {
            const date = new Date();
            const theaterCd = '0001';
            const ogData = [{
                id: '0001',
                subjectDetailCd: '1234',
                date,
                theaterCd,
                quantity: null,
                amount: null
            }, {
                id: '0002',
                subjectDetailCd: '1234',
                date,
                theaterCd
            }];
            const data = [{
                id: '0001',
                subjectDetailCd: '1234',
                date,
                theaterCd,
                quantity: '',
                amount: ''
            }, {
                id: '0002',
                subjectDetailCd: '12345',
                date,
                theaterCd,
                quantity: 10,
                amount: 1000
            }];

            const sqlize = new sequelizeMock();
            const repo = new Repository(sqlize);
            const model = repo.incomeModel;

            sandbox.mock(model).expects('findAll').once()
                .withExactArgs({ where: { date, theaterCd } })
                .resolves(ogData.map((d) => ({ get: () => d }))); // stub function get

            sandbox.mock(model).expects('destroy').never();

            sandbox.mock(model).expects('bulkCreate').never();

            sandbox.mock(model).expects('update').once().resolves();

            await repo.bulkModifyByDateAndTheater(<any>data)
                .catch((err) => err);
            sandbox.verify();
        });
    });
});

/**
 * 科目レポジトリテスト
 */
// tslint:disable:no-implicit-dependencies
import * as assert from 'power-assert';
import { Op } from 'sequelize';
import * as sinon from 'sinon';

import Repository from './screeningWork';

let sandbox: sinon.SinonSandbox;

describe('UserRepository', () => {
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
            let findArgs: any = {
                boxOfficeStart: {
                    from: new Date(),
                    to: new Date()
                },
                boxOfficeEnd: {
                    from: new Date(),
                    to: new Date()
                }
            };
            let expectedArgs: any = {
                where: {
                    boxOfficeStart: {
                        [Op.gte]: findArgs.boxOfficeStart.from,
                        [Op.lte]: findArgs.boxOfficeStart.to
                    },
                    boxOfficeEnd: {
                        [Op.gte]: findArgs.boxOfficeEnd.from,
                        [Op.lte]: findArgs.boxOfficeEnd.to
                    }
                }
            };
            const expectedResult = [{ id: 0 }];
            const repo = new Repository(new sequelizeMock());
            const model = repo.screeningWorkModel;

            sandbox.mock(model).expects('findAll').once()
                .withExactArgs(expectedArgs).resolves(expectedResult);

            let result = await repo.search(findArgs);
            assert.deepEqual(result, expectedResult);
            sandbox.verify();

            // ===================================

            findArgs = {
                boxOfficeEnd: { }
            };

            expectedArgs = {
                where: {
                    boxOfficeEnd: { }
                }
            };

            sandbox.mock(model).expects('findAll').once()
                .withExactArgs(expectedArgs).resolves(expectedResult);

            result = await repo.search(findArgs);
            assert.deepEqual(result, expectedResult);
            sandbox.verify();

            // ===================================

            findArgs = {
                boxOfficeStart: { }
            };

            expectedArgs = {
                where: {
                    boxOfficeStart: { }
                }
            };

            sandbox.mock(model).expects('findAll')
                .withExactArgs(expectedArgs).once().resolves(expectedResult);

            result = await repo.search(findArgs);
            assert.deepEqual(result, expectedResult);
            sandbox.verify();
        });
    });
});

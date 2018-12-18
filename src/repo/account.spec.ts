/**
 * 科目レポジトリテスト
 */
// tslint:disable:no-implicit-dependencies
import * as assert from 'power-assert';
import * as sinon from 'sinon';

import AccountRepository from './account';

let sandbox: sinon.SinonSandbox;

describe('AccountRepository', () => {
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
                subjectName: 'abc'
            };
            const expectedResult = [{ id: 0 }];
            const accountRepo = new AccountRepository(new sequelizeMock());
            const accountModel = accountRepo.accountModel;

            sandbox.mock(accountModel).expects('findAll').withArgs({
                where: findArgs
            }).resolves(expectedResult);

            const result = await accountRepo.search(findArgs);
            assert.deepEqual(result, expectedResult);
            sandbox.verify();
        });
    });
});

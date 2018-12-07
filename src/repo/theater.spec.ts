/**
 * 科目レポジトリテスト
 */
// tslint:disable:no-implicit-dependencies
import * as assert from 'power-assert';

import Repository from './theater';

describe('UserRepository', () => {
    let sequelizeMock: any;
    before(() => {
        // tslint:disable-next-line:no-require-imports
        sequelizeMock = require('sequelize-mock');
    });

    describe('constructor', () => {

        it('modelはオブジェクトはず', async () => {
            const repo = new Repository(new sequelizeMock());
            const model = repo.theaterModel;

            assert.equal(typeof model, 'object');
        });
    });
});

// tslint:disable:max-classes-per-file completed-docs
/**
 * リポジトリー
 */
import AccountRepository from './repo/account';
import IncomeRepository from './repo/income';
import ScreeningWorkRepository from './repo/screeningWork';
import TheaterRepository from './repo/theater';

export class Account extends AccountRepository { }

export class Income extends IncomeRepository { }

export class ScreeningWork extends ScreeningWorkRepository { }

export class Theater extends TheaterRepository { }

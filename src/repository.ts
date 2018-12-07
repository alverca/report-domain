// tslint:disable:max-classes-per-file completed-docs
/**
 * リポジトリー
 */
import AccountRepository from './repo/account';
import IncomeRepository from './repo/income';
import ScreeingWorkRepository from './repo/screeningWork';
import TheaterRepository from './repo/theater';

export class Account extends AccountRepository { }

export class Income extends IncomeRepository { }

export class ScreeningWork extends ScreeingWorkRepository { }

export class Theater extends TheaterRepository { }

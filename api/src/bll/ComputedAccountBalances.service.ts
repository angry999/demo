import { AbstractService } from './AbstractService.service';
import { Injectable, Inject } from '@nestjs/common';
import { ComputedAccountBalances } from '../model/ComputedAccountBalances.entity';
import { ComputedAccountBalancesDal } from '../dal/ComputedAccountBalances.provider';

/**
 * A service to support the operations on instances of ComputedAccountBalances
 * NOTE: the base of these services essentially proxy dal methods
 */
@Injectable()
export class ComputedAccountBalancesService extends AbstractService<ComputedAccountBalances>
{
	constructor(private injectedDal: ComputedAccountBalancesDal) 
	{
		super(injectedDal);
	}
}

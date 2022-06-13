import { AbstractService } from './AbstractService.service';
import { Injectable, Inject } from '@nestjs/common';
import { ComputedProjectBalances } from '../model/ComputedProjectBalances.entity';
import { ComputedProjectBalancesDal } from '../dal/ComputedProjectBalances.provider';

/**
 * A service to support the operations on instances of ComputedProjectBalances
 * NOTE: the base of these services essentially proxy dal methods
 */
@Injectable()
export class ComputedProjectBalancesService extends AbstractService<ComputedProjectBalances>
{
	constructor(private injectedDal: ComputedProjectBalancesDal) 
	{
		super(injectedDal);
	}
}

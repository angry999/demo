import { AbstractService } from './AbstractService.service';
import { Injectable, Inject } from '@nestjs/common';
import { ComputedProjectPositions } from '../model/ComputedProjectPositions.entity';
import { ComputedProjectPositionsDal } from '../dal/ComputedProjectPositions.provider';

/**
 * A service to support the operations on instances of ComputedProjectPositions
 * NOTE: the base of these services essentially proxy dal methods
 */
@Injectable()
export class ComputedProjectPositionsService extends AbstractService<ComputedProjectPositions>
{
	constructor(private injectedDal: ComputedProjectPositionsDal) 
	{
		super(injectedDal);
	}
}

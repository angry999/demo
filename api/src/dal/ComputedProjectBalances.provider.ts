import { AbstractDal } from './AbstractDal';
import { ComputedProjectBalances } from '../model/ComputedProjectBalances.entity';

export class ComputedProjectBalancesDal extends AbstractDal<ComputedProjectBalances>
{  
    /**
     * set the type of entity to manage via a constructor
     */
    setEntityType()
    {
        this.setEntityTypeByConstructor(ComputedProjectBalances);
    }
}	

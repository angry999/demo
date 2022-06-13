import { AbstractDal } from './AbstractDal';
import { ComputedAccountBalances } from '../model/ComputedAccountBalances.entity';

export class ComputedAccountBalancesDal extends AbstractDal<ComputedAccountBalances>
{  
    /**
     * set the type of entity to manage via a constructor
     */
    setEntityType()
    {
        this.setEntityTypeByConstructor(ComputedAccountBalances);
    }
}	

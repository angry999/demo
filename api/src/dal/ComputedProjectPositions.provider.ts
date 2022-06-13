import { AbstractDal } from './AbstractDal';
import { ComputedProjectPositions } from '../model/ComputedProjectPositions.entity';

export class ComputedProjectPositionsDal extends AbstractDal<ComputedProjectPositions>
{  
    /**
     * set the type of entity to manage via a constructor
     */
    setEntityType()
    {
        this.setEntityTypeByConstructor(ComputedProjectPositions);
    }
}	

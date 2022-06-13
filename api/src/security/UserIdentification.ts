import { UserType } from 'fundscraper-model-enums';

/**
 * a method of identifying a single user of the system
 */
export class UserIdentification {
    user_id: number;
    user_type: UserType;

    constructor(id: number, type: UserType) {
        this.user_id = id;
        this.user_type = type;
    }
}
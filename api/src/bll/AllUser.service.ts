import { Logger, NotFoundException } from '@nestjs/common';
import { AllUserDal } from '../dal/AllUser.provider';
import { Preference } from '../model/Preference.entity';
import { AllUserService_generated } from './bll.generated';

/**
 * Business logic (service) classes for model in typescript (nest.js) for AllUser
 * NOTE: EDIT AT WILL, this is intially generated and then left alone. Your changes will not be affected by subsequent code generation runs
 * one person, identified by an email address, who uses the system
 */

/**
 * AllUser
 * one person, identified by an email address, who uses the system
 */
export class AllUserService extends AllUserService_generated {
    /**
     * place your custom code here
     */

    private logger = new Logger(AllUserService.name);

    constructor(superInjectedDal: AllUserDal) {
        super(superInjectedDal);
    }

    /**
     * get a specific preferences for a given user
     * @param user_id - the id of the user to update the preference for
     * @param preferenceName - the preference to update
     * @returns the value to assign to the preference
     */
    async getPreference(user_id: number, preferenceName: string): Promise<Preference> {
        let user = await this.repository.findOneById(user_id);
        if (user == null)
            throw new NotFoundException();
        let asString = user['preferences_as_json'] == null ? '{}' : user['preferences_as_json'];
        let preferences = JSON.parse(asString);
        let result = new Preference();
        result.name = preferenceName;
        result.value = preferences[preferenceName];
        return result;
    }

    /**
     * update a specific preferences for a given user
     * @param user_id - the id of the user to update the preference for
     * @param preference - the preference to update
     * @param value the value to assign to the preference
     */
    async updatePreference(user_id: number, preference: Preference) {
        if (typeof preference === 'string') {
            preference = JSON.parse(preference);
        }
        let user = await this.repository.findOneById(user_id);
        if (user == null)
            throw new NotFoundException();
        let asString = user['preferences_as_json'] == null ? '{}' : user['preferences_as_json'];
        let preferences = JSON.parse(asString);
        preferences[preference.name] = preference.value;
        let updatedAsString = JSON.stringify(preferences);

        await this.repository.updatePartial({ preferences_as_json: updatedAsString }, user_id);
    }
}



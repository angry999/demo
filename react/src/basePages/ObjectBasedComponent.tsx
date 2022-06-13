import { Component } from "react";

/**
 * base point of inheritence for components that have to make an api call to load their data
 */
abstract class ObjectBasedComponent<P, S> extends Component<P, S>
{
	/**
	 * get the value for a property path from a given root object
	 * @param object row the object that represents a row in the table that we need data from
	 * @param string propertyPath a property path to the value we want to extract
	 * @return object the value of the object at the given path
	 */
	valueForProperty(row: any, propertyPath: string): any
	{
		let periodAt = propertyPath.indexOf('.');
		if (periodAt === -1)
			return row[propertyPath];

		let propertyReferenceName = propertyPath.substring(0, periodAt);
		let referencedObject = row[propertyReferenceName];
		if (referencedObject === null || referencedObject === undefined)
			return null;

		let childFieldName = propertyPath.substring(periodAt + 1);
		return this.valueForProperty(referencedObject, childFieldName);
	}
}

export default ObjectBasedComponent;

import {Type, TypeOf, Errors, success} from 'io-ts';
import {reporter as report} from 'io-ts-reporters';

const isErrors = (result: any): result is Errors => {
	try {
		const keys = ['value', 'context', 'message'];
		return Object.keys(result[0]).every(key => keys.includes(key));
	} catch (e) {
		return false;
	}
};

export default function<Schema extends Type<any>>(schema: Schema) {
	const validateConfigObject = (data: unknown): true | string[] => {
		const result = schema.decode(data);

		if (isErrors(result.value))
			return report(result);
		else
			return true;
	};

	const loadConfigObject = (data: unknown): TypeOf<Schema> => {
		const result = schema.decode(data);

		if (isErrors(result.value))
			throw new Error(report(result).join('\n'));
		else
			return result.value;
	};

	const loadConfigFile = (filepath: string): TypeOf<Schema> => {
		return loadConfigObject(require(filepath));
	};

	return {
		loadConfigObject: loadConfigObject,
		loadConfigFile: loadConfigFile,
		validateConfigObject: validateConfigObject
	};
};

export const withDefault = <A, O, I>(codec: Type<A, O, I>, defaultValue: A): Type<A, O, I> => {
	const name = `default(${codec.name})`;
	const isDefaultValid = codec.is(defaultValue);

	return new Type<A, O, I>(
		name,
		codec.is,
		(i, context) => {
			const validation = codec.validate(i, context);
			return validation.isLeft() && isDefaultValid && (i === undefined || i === null) ? success(defaultValue) : validation
		},
		codec.encode
	);
};

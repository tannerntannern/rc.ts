import {Type, TypeOf, Errors} from 'io-ts';
import {PathReporter} from 'io-ts/lib/PathReporter';

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
			return PathReporter.report(result);
		else
			return true;
	};

	const loadConfigObject = (data: unknown): TypeOf<Schema> => {
		const result = schema.decode(data);

		if (isErrors(result.value)) {
			throw new Error(PathReporter.report(result).join('\n'));
		}
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

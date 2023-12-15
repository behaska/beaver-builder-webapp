interface AssertionErrorData {
	readonly actual: number;
	readonly expected: number;
	readonly message: string;
}

class AssertionError implements Error {
	message: string;
	name: string;

	constructor(param: AssertionErrorData) {
		this.name = 'AssertionError';
		this.message = `${param.message}. Actual: ${param.actual}. Expected: ${param.expected}`;
	}

}

export type { AssertionErrorData };
export { AssertionError };
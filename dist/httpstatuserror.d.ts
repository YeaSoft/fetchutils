/// <reference types="node" />

/**
 * Simple error class for http operations
 * @property {number} code - The http result code
 * @property {any} res - The http operation result data
 */
export class HttpStatusError extends Error {
	readonly code: number;
	readonly res: any;

	/**
	 * Creates a new HttpStatusError object and sets the `error.message`
	 * property to the provided text message.
	 *
	 * @param message - The http result message
	 * @param status - The http result code
	 * @param result - Optional result data of the operation
	 */
	constructor( message: string, status: number, result?: any );
}
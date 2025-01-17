/// <reference types="node" />

import FormData from 'form-data';

import { Response, BodyInit, HeadersInit, RequestRedirect } from "node-fetch";
import { FetchAuth, FetchBasicAuth, FetchHelperOptions, FetchHelper } from "./fetchhelper";



/**
 * Options specific to a `FormHelper` object.
 */
export interface FormHelperOptions extends FetchHelperOptions {
	/**
	 * The maximum amount of bytes (or characters) to buffer. Default is 2097152 (2 MiB)
	 */
	maxDataSize?: number;
	/**
	 * Whether to apply back pressure to the underlaying streams. If set to `false`,
	 * the underlaying streams will never be paused. If set to `true`, the underlaying
	 * streams will be paused right after being appended, as well as when
	 * `delayedStream.pipe()` wants to throttle. Default is `true`
	 */
	pauseStreams?: boolean;
}

/**
 * This class provides a handy interface for submitting multipart forms
 * includeing file uploads.
 */
export class FormHelper extends FetchHelper {
	/**
	 * Creates a new `FormHelper` object
	 * @param options - Optional options for the http requests persisted through the whole lifecycle of the object
	 */
	constructor( options?: FormHelperOptions );

	/**
	 * Resets the form content allowing the `FormHelper` object to be reused
	 */
	reset(): void;

	/**
	 * Submits the form.
	 *
	 * This method performs an http POST request with the supplied form data encoded into the body.
	 * The returned promise reeturns the resulting request.
	 *
	 * @param url - A string representing the URL for fetching. If either the `FormHelper` options
	 *              or the supplied options provide a `baseurl`, this value must be relative since
	 *              it is concatenated to the `baseurl`.
	 * @param options - Optional options or the http requests that will override the options
	 *                  provided for the object.
	 * @return Promise<Response>
	 */
	post( url?: string, options?: FormHelperOptions ): Promise<Request>;

	/**
	 * Submits the form.
	 *
	 * This method performs an http POST request with the supplied form data encoded into the body
	 * and expects a JSON encoded reponse. If the request was unsuccesful (http status >= 400),
	 * an `HttpStatusException` is thrown. If the decoding fails, an exception is thrown. The
	 * returned promise returns the decoded result.
	 *
	 * @param url - A string representing the URL for fetching. If either the `FormHelper` options
	 *              or the supplied options provide a `baseurl`, this value must be relative since
	 *              it is concatenated to the `baseurl`.
	 * @param options - Optional options or the http requests that will override the options
	 *                  provided for the object.
	 * @return Promise<boolean | number | string | Array | Object>
	 */
	postGetJson( url?: string, options?: FormHelperOptions ): Promise<boolean | number | string | Array<any> | Object>;

	/**
	 * Submits the form.
	 *
	 * This method performs an http POST request with the supplied form data encoded into the body.
	 * The returned promise reeturns the resulting request.
	 *
	 * @param url - A string representing the URL for fetching. If either the `FormHelper` options
	 *              or the supplied options provide a `baseurl`, this value must be relative since
	 *              it is concatenated to the `baseurl`.
	 * @param options - Optional options or the http requests that will override the options
	 *                  provided for the object.
	 * @return Promise<Response>
	 */
	submit( url?: string, options?: FormHelperOptions ): Promise<Request>;

	/**
	 * Submits the form.
	 *
	 * This method performs an http POST request with the supplied form data encoded into the body
	 * and expects a JSON encoded reponse. If the request was unsuccesful (http status >= 400),
	 * an `HttpStatusException` is thrown. If the decoding fails, an exception is thrown. The
	 * returned promise returns the decoded result.
	 *
	 * @param url - A string representing the URL for fetching. If either the `FormHelper` options
	 *              or the supplied options provide a `baseurl`, this value must be relative since
	 *              it is concatenated to the `baseurl`.
	 * @param options - Optional options or the http requests that will override the options
	 *                  provided for the object.
	 * @return Promise<boolean | number | string | Array | Object>
	 */
	submitGetJson( url?: string, options?: FormHelperOptions ): Promise<boolean | number | string | Array<any> | Object>;

	/**
	 * Append data to the form.
	 *
	 * You can submit about any format (string, integer, boolean, buffer, etc.).
	 * However, Arrays are not supported and need to be turned into strings by the user.
	 *
	 * @param field - Name of the form field
	 * @param value - Value of the form field
	 * @param options - Optional overrides for handling this specific form field. See `FormHelperOptions`
	 */
	append( field: string, value: any, options?: FormData.AppendOptions | string ): void;

	/**
	 * This method adds the correct `content-type` header to the provided array of userHeaders.
	 * @param userHeaders - Array of headers
	 */
	getHeaders( userHeaders?: FormData.Headers ): FormData.Headers;

	/**
	 * Return the full formdata request package, as a Buffer.
	 */
	getBuffer(): Buffer;

	/**
	 * Set the boundary string, overriding the default behavior
	 * @param boundary - Boundary string
	 */
	setBoundary( boundary: string ): void;

	/**
	 * Return the boundary of the `formData`.
	 * By default, the boundary consists of 26 - followed by 24 numbers
	 */
	getBoundary(): string;

	/**
	 * Returns the Content-Length asynchronously. The callback is used to handle
	 * errors and continue once the length has been calculated
	 * @param callback - Callback function
	 */
	getLength( callback: ( error: Error | null, length: number ) => void ): void;

	/**
	 * Same as getLength but synchronous.
	 *
	 * **Note:** getLengthSync doesn't calculate streams length.
	 */
	getLengthSync(): number;

	/**
	 * Checks if the length of added values is known.
	 */
	hasKnownLength(): boolean;
}
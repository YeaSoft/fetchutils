/// <reference types="node" />

import { Readable, Duplex } from "node:stream";
import { Response } from "node-fetch";
import { FetchHelperOptions, FetchHelper } from "./fetchhelper";

/**
 * Options specific to a `RequestHelper` object.
 */
export interface RequestHelperOptions extends FetchHelperOptions {
	/**
	 * Strictly encode URI components with `strict-uri-encode`. It uses `encodeURIComponent` if
	 * set to `false`. You probably don't care about this option.
	 * @default true
	 */
	strict?: boolean;
	/**
	 * URL encode the keys and values.
	 * @default true
	 */
	encode?: boolean;
	/**
	 * Supports both `Function` as a custom sorting function or `false` to disable sorting.
	 * If omitted, keys are sorted using `Array#sort()`, which means, converting them to strings
	 * and comparing strings in Unicode code point order.
	 */
	sort?: ( item1: string, item2: string ) => number | boolean;
	/**
	 * Defines how arrays are encoded. Default value is `'none'`. The following options are possible:
	 * * `'none'`: Serialize arrays by using duplicate keys
	 * * `'bracket'`: Serialize arrays using bracket representation
	 * * `'index'`: Serialize arrays using index representation
	 * * `'comma'`: Serialize arrays by separating elements with comma
	 * * `'separator'`: Serialize arrays by separating elements with a custom character
	 * * `'bracket-separator'`: Serialize arrays by explicitly post-fixing array names with brackets and separating elements with a custom character
	 * @default none - Serialize arrays by using duplicate keys
	 */
	arrayFormat?: string;
	/**
	 * The character used to separate array elements when using `{arrayFormat: 'separator'}`
	 * @default ,
	 */
	arrayFormatSeparator?: string;
	/**
	 * Skip keys with `null` as the value.
	 * Note that keys with `undefined` as the value are always skipped.
	 * @default false
	 */
	skipNull?: boolean;
	/**
	 * Skip keys with an empty string as the value.
	 * @default false
	 */
	skipEmptyString?: boolean;
}

/**
 * This class provides a handy interface for submitting GET and POST requests
 * and supports also file uploads.
 */
export class RequestHelper extends FetchHelper {
	/**
	 * Creates a new `RequestHelper` object
	 * @param options - Optional options for the http requests persisted through the whole lifecycle of the object
	 */
	constructor( options?: RequestHelperOptions );

	/**
	 * Performs an http/https GET request.
	 *
	 * This method performs an http GET request with the supplied `params` encoded into the URL.
	 * The returned promise returns the resulting request.
	 *
	 * @param url - A string representing the URL for fetching. If either the RequestHelper options
	 *              or the supplied options provide a `baseurl`, this value must be relative since
	 *              it is concatenated to the `baseurl`.
	 * @param params - Optional object containing the parameters sent with the request
	 * @param options - Optional options or the http requests that will override the options
	 *                  provided for the object.
	 */
	get( url: string, params?: Object, options?: RequestHelperOptions ): Promise<Response>;

	/**
	 * Performs an http/https GET request.
	 *
	 * This method performs an http GET request and expects a JSON encoded reponse. If the request
	 * was unsuccesful (http status >= 400), an HttpStatusException is thrown. If the decoding
	 * fails, an exception is thrown. The returned promise returns the decoded result.
	 *
	 * @param url - A string representing the URL for fetching. If either the RequestHelper options
	 *              or the supplied options provide a `baseurl`, this value must be relative since
	 *              it is concatenated to the `baseurl`.
	 * @param params - Optional object containing the parameters sent with the request
	 * @param options - Optional options or the http requests that will override the options
	 *                  provided for the object.
	 */
	getGetJson( url: string, params?: Object, options?: RequestHelperOptions ): Promise<boolean | number | string | Array<any> | Object>;

	/**
	 * Performs an http/https GET request.
	 *
	 * This method performs an http GET request. If the request was unsuccesful
	 * (http status >= 400), an HttpStatusException is thrown. If the decoding fails, an exception
	 * is thrown. The returned promise returns the decoded result as a string.
	 *
	 * @param url - A string representing the URL for fetching. If either the RequestHelper options
	 *              or the supplied options provide a `baseurl`, this value must be relative since
	 *              it is concatenated to the `baseurl`.
	 * @param params - Optional object containing the parameters sent with the request
	 * @param options - Optional options or the http requests that will override the options
	 *                  provided for the object.
	 */
	getGetText( url: string, params?: Object, options?: RequestHelperOptions ): Promise<string>;

	/**
	 * Performs an http/https GET request.
	 *
	 * This method performs an http GET request. If the request was unsuccesful
	 * (http status >= 400), an HttpStatusException is thrown. If the decoding fails, an exception
	 * is thrown. The returned promise returns the decoded result as a `Blob`.
	 *
	 * @param url - A string representing the URL for fetching. If either the RequestHelper options
	 *              or the supplied options provide a `baseurl`, this value must be relative since
	 *              it is concatenated to the `baseurl`.
	 * @param params - Optional object containing the parameters sent with the request
	 * @param options - Optional options or the http requests that will override the options
	 *                  provided for the object.
	 */
	getGetBlob( url: string, params?: Object, options?: RequestHelperOptions ): Promise<Blob>;

	/**
	 * Performs an http/https GET request.
	 *
	 * This method performs an http GET request. If the request was unsuccesful
	 * (http status >= 400), an HttpStatusException is thrown. If the decoding fails, an exception
	 * is thrown. The returned promise returns the decoded result as an `ArrayBuffer`.
	 *
	 * @param url - A string representing the URL for fetching. If either the RequestHelper options
	 *              or the supplied options provide a `baseurl`, this value must be relative since
	 *              it is concatenated to the `baseurl`.
	 * @param params - Optional object containing the parameters sent with the request
	 * @param options - Optional options or the http requests that will override the options
	 *                  provided for the object.
	 */
	getArrayBuffer( url: string, params?: Object, options?: RequestHelperOptions ): Promise<ArrayBuffer>;

	/**
	 * Performs an http/https GET request.
	 *
	 * This method performs an http GET request. If the request was unsuccesful
	 * (http status >= 400), an HttpStatusException is thrown. If the decoding fails, an exception
	 * is thrown. The returned promise returns the decoded result as a `Buffer`.
	 *
	 * @param url - A string representing the URL for fetching. If either the RequestHelper options
	 *              or the supplied options provide a `baseurl`, this value must be relative since
	 *              it is concatenated to the `baseurl`.
	 * @param params - Optional object containing the parameters sent with the request
	 * @param options - Optional options or the http requests that will override the options
	 *                  provided for the object.
	 */
	getBuffer( url: string, params?: Object, options?: RequestHelperOptions ): Promise<Buffer>;


	/**
	 * Performs an http/https POST request.
	 *
	 * This method performs an http POST request with the supplied `params` encoded into the body.
	 * The returned promise returns the resulting request.
	 *
	 * * params of type `string` are sent verbatim. If not specified in the headers, the Content-Type will be set to `text/plain`
	 * * params of type `Blob` are sent verbatim. If not specified in the headers, the Content-Type will be set from the type stored in the Blob or or `application/octet-stream` if no type was stored.
	 * * params of type `Buffer` or `ArrayBuffer` are sent verbatim. If not specified in the headers, the Content-Type will be set to `application/octet-stream`
	 * * params of type `Readable` or `Duplex` are sent verbatim. If not specified in the headers, the Content-Type will be set to `application/octet-stream`
	 * * params of type `Object` are sent based on the encoding specified in the Content-Type header. If no Content-Type header is specified, `application/json` is assumed. All json types and `application/x-www-form-urlencoded` are currently supported.
	 *
	 * @param url - A string representing the URL for fetching. If either the RequestHelper options
	 *              or the supplied options provide a `baseurl`, this value must be relative since
	 *              it is concatenated to the `baseurl`.
	 * @param params - Optional object containing the parameters sent with the request. These
	 *                 parameters will be encoded into the body according to the passed type and
	 *                 supplied encoding header
	 * @param options - Optional options or the http requests that will override the options
	 *                  provided for the object.
	 */
	post( url: string, params?: string | Blob | ArrayBuffer | Readable | Duplex | Object, options?: RequestHelperOptions ): Promise<Response>;

	/**
	 * Performs an http/https POST request.
	 *
	 * This method performs an http POST request with the supplied `params` encoded into the body
	 * and expects a JSON encoded reponse. If the request was unsuccesful (http status >= 400),
	 * an HttpStatusException is thrown. If the decoding fails, an exception is thrown. The
	 * returned promise returns the decoded result.
	 *
	 * * params of type `string` are sent verbatim. If not specified in the headers, the Content-Type will be set to `text/plain`
	 * * params of type `Blob` are sent verbatim. If not specified in the headers, the Content-Type will be set from the type stored in the Blob or or `application/octet-stream` if no type was stored.
	 * * params of type `Buffer` or `ArrayBuffer` are sent verbatim. If not specified in the headers, the Content-Type will be set to `application/octet-stream`
	 * * params of type `Readable` or `Duplex` are sent verbatim. If not specified in the headers, the Content-Type will be set to `application/octet-stream`
	 * * params of type `Object` are sent based on the encoding specified in the Content-Type header. If no Content-Type header is specified, `application/json` is assumed. All json types and `application/x-www-form-urlencoded` are currently supported.
	 *
	 * @param url - A string representing the URL for fetching. If either the RequestHelper options
	 *              or the supplied options provide a `baseurl`, this value must be relative since
	 *              it is concatenated to the `baseurl`.
	 * @param params - Optional object containing the parameters sent with the request. These
	 *                 parameters will be encoded into the body according to the passed type and
	 *                 supplied encoding header
	 * @param options - Optional options or the http requests that will override the options
	 *                  provided for the object.
	 */
	postGetJson( url: string, params?: string | Blob | ArrayBuffer | Readable | Duplex | Object, options?: RequestHelperOptions ): Promise<boolean | number | string | Array<any> | Object>;

	/**
	 * Performs an http/https POST request.
	 *
	 * This method performs an http POST request with the supplied `params` encoded into the body.
	 * If the request was unsuccesful (http status >= 400), an HttpStatusException is thrown.
	 * If the decoding fails, an exception is thrown. The returned promise returns the decoded
	 * result as a string.
	 *
	 * * params of type `string` are sent verbatim. If not specified in the headers, the Content-Type will be set to `text/plain`
	 * * params of type `Blob` are sent verbatim. If not specified in the headers, the Content-Type will be set from the type stored in the Blob or or `application/octet-stream` if no type was stored.
	 * * params of type `Buffer` or `ArrayBuffer` are sent verbatim. If not specified in the headers, the Content-Type will be set to `application/octet-stream`
	 * * params of type `Readable` or `Duplex` are sent verbatim. If not specified in the headers, the Content-Type will be set to `application/octet-stream`
	 * * params of type `Object` are sent based on the encoding specified in the Content-Type header. If no Content-Type header is specified, `application/json` is assumed. All json types and `application/x-www-form-urlencoded` are currently supported.
	 *
	 * @param url - A string representing the URL for fetching. If either the RequestHelper options
	 *              or the supplied options provide a `baseurl`, this value must be relative since
	 *              it is concatenated to the `baseurl`.
	 * @param params - Optional object containing the parameters sent with the request. These
	 *                 parameters will be encoded into the body according to the passed type and
	 *                 supplied encoding header
	 * @param options - Optional options or the http requests that will override the options
	 *                  provided for the object.
	 */
	postGetText( url: string, params?: string | Blob | ArrayBuffer | Readable | Duplex | Object, options?: RequestHelperOptions ): Promise<string>;

	/**
	 * Performs an http/https POST request.
	 *
	 * This method performs an http POST request with the supplied `params` encoded into the body.
	 * If the request was unsuccesful (http status >= 400), an HttpStatusException is thrown.
	 * If the decoding fails, an exception is thrown. The returned promise returns the decoded
	 * result as a `Blob`.
	 *
	 * * params of type `string` are sent verbatim. If not specified in the headers, the Content-Type will be set to `text/plain`
	 * * params of type `Blob` are sent verbatim. If not specified in the headers, the Content-Type will be set from the type stored in the Blob or or `application/octet-stream` if no type was stored.
	 * * params of type `Buffer` or `ArrayBuffer` are sent verbatim. If not specified in the headers, the Content-Type will be set to `application/octet-stream`
	 * * params of type `Readable` or `Duplex` are sent verbatim. If not specified in the headers, the Content-Type will be set to `application/octet-stream`
	 * * params of type `Object` are sent based on the encoding specified in the Content-Type header. If no Content-Type header is specified, `application/json` is assumed. All json types and `application/x-www-form-urlencoded` are currently supported.
	 *
	 * @param url - A string representing the URL for fetching. If either the RequestHelper options
	 *              or the supplied options provide a `baseurl`, this value must be relative since
	 *              it is concatenated to the `baseurl`.
	 * @param params - Optional object containing the parameters sent with the request. These
	 *                 parameters will be encoded into the body according to the passed type and
	 *                 supplied encoding header
	 * @param options - Optional options or the http requests that will override the options
	 *                  provided for the object.
	 */
	postGetBlob( url: string, params?: string | Blob | ArrayBuffer | Readable | Duplex | Object, options?: RequestHelperOptions ): Promise<Blob>;

	/**
	 * Performs an http/https POST request.
	 *
	 * This method performs an http POST request with the supplied `params` encoded into the body.
	 * If the request was unsuccesful (http status >= 400), an HttpStatusException is thrown.
	 * If the decoding fails, an exception is thrown. The returned promise returns the decoded
	 * result as an `ArrayBuffer`.
	 *
	 * * params of type `string` are sent verbatim. If not specified in the headers, the Content-Type will be set to `text/plain`
	 * * params of type `Blob` are sent verbatim. If not specified in the headers, the Content-Type will be set from the type stored in the Blob or or `application/octet-stream` if no type was stored.
	 * * params of type `Buffer` or `ArrayBuffer` are sent verbatim. If not specified in the headers, the Content-Type will be set to `application/octet-stream`
	 * * params of type `Readable` or `Duplex` are sent verbatim. If not specified in the headers, the Content-Type will be set to `application/octet-stream`
	 * * params of type `Object` are sent based on the encoding specified in the Content-Type header. If no Content-Type header is specified, `application/json` is assumed. All json types and `application/x-www-form-urlencoded` are currently supported.
	 *
	 * @param url - A string representing the URL for fetching. If either the RequestHelper options
	 *              or the supplied options provide a `baseurl`, this value must be relative since
	 *              it is concatenated to the `baseurl`.
	 * @param params - Optional object containing the parameters sent with the request. These
	 *                 parameters will be encoded into the body according to the passed type and
	 *                 supplied encoding header
	 * @param options - Optional options or the http requests that will override the options
	 *                  provided for the object.
	 */
	postGetArrayBuffer( url: string, params?: string | Blob | ArrayBuffer | Readable | Duplex | Object, options?: RequestHelperOptions ): Promise<ArrayBuffer>;


	/**
	 * Performs an http/https POST request.
	 *
	 * This method performs an http POST request with the supplied `params` encoded into the body.
	 * If the request was unsuccesful (http status >= 400), an HttpStatusException is thrown.
	 * If the decoding fails, an exception is thrown. The returned promise returns the decoded
	 * result as an `Buffer`.
	 *
	 * * params of type `string` are sent verbatim. If not specified in the headers, the Content-Type will be set to `text/plain`
	 * * params of type `Blob` are sent verbatim. If not specified in the headers, the Content-Type will be set from the type stored in the Blob or or `application/octet-stream` if no type was stored.
	 * * params of type `Buffer` or `ArrayBuffer` are sent verbatim. If not specified in the headers, the Content-Type will be set to `application/octet-stream`
	 * * params of type `Readable` or `Duplex` are sent verbatim. If not specified in the headers, the Content-Type will be set to `application/octet-stream`
	 * * params of type `Object` are sent based on the encoding specified in the Content-Type header. If no Content-Type header is specified, `application/json` is assumed. All json types and `application/x-www-form-urlencoded` are currently supported.
	 *
	 * @param url - A string representing the URL for fetching. If either the RequestHelper options
	 *              or the supplied options provide a `baseurl`, this value must be relative since
	 *              it is concatenated to the `baseurl`.
	 * @param params - Optional object containing the parameters sent with the request. These
	 *                 parameters will be encoded into the body according to the passed type and
	 *                 supplied encoding header
	 * @param options - Optional options or the http requests that will override the options
	 *                  provided for the object.
	 */
	postGetBuffer( url: string, params?: string | Blob | ArrayBuffer | Readable | Duplex | Object, options?: RequestHelperOptions ): Promise<Buffer>;

	/**
	 * Performs an http/https DELETE request.
	 *
	 * This method performs an http DELETE request with the supplied `params` encoded into the body.
	 * The returned promise returns the resulting request.
	 *
	 * * params of type `string` are sent verbatim. If not specified in the headers, the Content-Type will be set to `text/plain`
	 * * params of type `Blob` are sent verbatim. If not specified in the headers, the Content-Type will be set from the type stored in the Blob or or `application/octet-stream` if no type was stored.
	 * * params of type `Buffer` or `ArrayBuffer` are sent verbatim. If not specified in the headers, the Content-Type will be set to `application/octet-stream`
	 * * params of type `Readable` or `Duplex` are sent verbatim. If not specified in the headers, the Content-Type will be set to `application/octet-stream`
	 * * params of type `Object` are sent based on the encoding specified in the Content-Type header. If no Content-Type header is specified, `application/json` is assumed. All json types and `application/x-www-form-urlencoded` are currently supported.
	 *
	 * @param url - A string representing the URL for fetching. If either the RequestHelper options
	 *              or the supplied options provide a `baseurl`, this value must be relative since
	 *              it is concatenated to the `baseurl`.
	 * @param params - Optional object containing the parameters sent with the request. These
	 *                 parameters will be encoded into the body according to the passed type and
	 *                 supplied encoding header
	 * @param options - Optional options or the http requests that will override the options
	 *                  provided for the object.
	 */
	delete( url: string, params?: string | Blob | ArrayBuffer | Readable | Duplex | Object, options?: RequestHelperOptions ): Promise<Response>;

	/**
	 * Performs an http/https DELETE request.
	 *
	 * This method performs an http DELETE request with the supplied `params` encoded into the body
	 * and expects a JSON encoded reponse. If the request was unsuccesful (http status >= 400),
	 * an HttpStatusException is thrown. If the decoding fails, an exception is thrown. The
	 * returned promise returns the decoded result.
	 *
	 * * params of type `string` are sent verbatim. If not specified in the headers, the Content-Type will be set to `text/plain`
	 * * params of type `Blob` are sent verbatim. If not specified in the headers, the Content-Type will be set from the type stored in the Blob or or `application/octet-stream` if no type was stored.
	 * * params of type `Buffer` or `ArrayBuffer` are sent verbatim. If not specified in the headers, the Content-Type will be set to `application/octet-stream`
	 * * params of type `Readable` or `Duplex` are sent verbatim. If not specified in the headers, the Content-Type will be set to `application/octet-stream`
	 * * params of type `Object` are sent based on the encoding specified in the Content-Type header. If no Content-Type header is specified, `application/json` is assumed. All json types and `application/x-www-form-urlencoded` are currently supported.
	 *
	 * @param url - A string representing the URL for fetching. If either the RequestHelper options
	 *              or the supplied options provide a `baseurl`, this value must be relative since
	 *              it is concatenated to the `baseurl`.
	 * @param params - Optional object containing the parameters sent with the request. These
	 *                 parameters will be encoded into the body according to the passed type and
	 *                 supplied encoding header
	 * @param options - Optional options or the http requests that will override the options
	 *                  provided for the object.
	 */
	deleteGetJson( url: string, params?: string | Blob | ArrayBuffer | Readable | Duplex | Object, options?: RequestHelperOptions ): Promise<boolean | number | string | Array<any> | Object>;

	/**
	 * Performs an http/https DELETE request.
	 *
	 * This method performs an http DELETE request with the supplied `params` encoded into the body.
	 * If the request was unsuccesful (http status >= 400), an HttpStatusException is thrown.
	 * If the decoding fails, an exception is thrown. The returned promise returns the decoded
	 * result as a string.
	 *
	 * * params of type `string` are sent verbatim. If not specified in the headers, the Content-Type will be set to `text/plain`
	 * * params of type `Blob` are sent verbatim. If not specified in the headers, the Content-Type will be set from the type stored in the Blob or or `application/octet-stream` if no type was stored.
	 * * params of type `Buffer` or `ArrayBuffer` are sent verbatim. If not specified in the headers, the Content-Type will be set to `application/octet-stream`
	 * * params of type `Readable` or `Duplex` are sent verbatim. If not specified in the headers, the Content-Type will be set to `application/octet-stream`
	 * * params of type `Object` are sent based on the encoding specified in the Content-Type header. If no Content-Type header is specified, `application/json` is assumed. All json types and `application/x-www-form-urlencoded` are currently supported.
	 *
	 * @param url - A string representing the URL for fetching. If either the RequestHelper options
	 *              or the supplied options provide a `baseurl`, this value must be relative since
	 *              it is concatenated to the `baseurl`.
	 * @param params - Optional object containing the parameters sent with the request. These
	 *                 parameters will be encoded into the body according to the passed type and
	 *                 supplied encoding header
	 * @param options - Optional options or the http requests that will override the options
	 *                  provided for the object.
	 */
	deleteGetText( url: string, params?: string | Blob | ArrayBuffer | Readable | Duplex | Object, options?: RequestHelperOptions ): Promise<string>;

	/**
	 * Performs an http/https DELETE request.
	 *
	 * This method performs an http DELETE request with the supplied `params` encoded into the body.
	 * If the request was unsuccesful (http status >= 400), an HttpStatusException is thrown.
	 * If the decoding fails, an exception is thrown. The returned promise returns the decoded
	 * result as a `Blob`.
	 *
	 * * params of type `string` are sent verbatim. If not specified in the headers, the Content-Type will be set to `text/plain`
	 * * params of type `Blob` are sent verbatim. If not specified in the headers, the Content-Type will be set from the type stored in the Blob or or `application/octet-stream` if no type was stored.
	 * * params of type `Buffer` or `ArrayBuffer` are sent verbatim. If not specified in the headers, the Content-Type will be set to `application/octet-stream`
	 * * params of type `Readable` or `Duplex` are sent verbatim. If not specified in the headers, the Content-Type will be set to `application/octet-stream`
	 * * params of type `Object` are sent based on the encoding specified in the Content-Type header. If no Content-Type header is specified, `application/json` is assumed. All json types and `application/x-www-form-urlencoded` are currently supported.
	 *
	 * @param url - A string representing the URL for fetching. If either the RequestHelper options
	 *              or the supplied options provide a `baseurl`, this value must be relative since
	 *              it is concatenated to the `baseurl`.
	 * @param params - Optional object containing the parameters sent with the request. These
	 *                 parameters will be encoded into the body according to the passed type and
	 *                 supplied encoding header
	 * @param options - Optional options or the http requests that will override the options
	 *                  provided for the object.
	 */
	deleteGetBlob( url: string, params?: string | Blob | ArrayBuffer | Readable | Duplex | Object, options?: RequestHelperOptions ): Promise<Blob>;

	/**
	 * Performs an http/https DELETE request.
	 *
	 * This method performs an http DELETE request with the supplied `params` encoded into the body.
	 * If the request was unsuccesful (http status >= 400), an HttpStatusException is thrown.
	 * If the decoding fails, an exception is thrown. The returned promise returns the decoded
	 * result as an `ArrayBuffer`.
	 *
	 * * params of type `string` are sent verbatim. If not specified in the headers, the Content-Type will be set to `text/plain`
	 * * params of type `Blob` are sent verbatim. If not specified in the headers, the Content-Type will be set from the type stored in the Blob or or `application/octet-stream` if no type was stored.
	 * * params of type `Buffer` or `ArrayBuffer` are sent verbatim. If not specified in the headers, the Content-Type will be set to `application/octet-stream`
	 * * params of type `Readable` or `Duplex` are sent verbatim. If not specified in the headers, the Content-Type will be set to `application/octet-stream`
	 * * params of type `Object` are sent based on the encoding specified in the Content-Type header. If no Content-Type header is specified, `application/json` is assumed. All json types and `application/x-www-form-urlencoded` are currently supported.
	 *
	 * @param url - A string representing the URL for fetching. If either the RequestHelper options
	 *              or the supplied options provide a `baseurl`, this value must be relative since
	 *              it is concatenated to the `baseurl`.
	 * @param params - Optional object containing the parameters sent with the request. These
	 *                 parameters will be encoded into the body according to the passed type and
	 *                 supplied encoding header
	 * @param options - Optional options or the http requests that will override the options
	 *                  provided for the object.
	 */
	deleteGetArrayBuffer( url: string, params?: string | Blob | ArrayBuffer | Readable | Duplex | Object, options?: RequestHelperOptions ): Promise<ArrayBuffer>;


	/**
	 * Performs an http/https DELETE request.
	 *
	 * This method performs an http DELETE request with the supplied `params` encoded into the body.
	 * If the request was unsuccesful (http status >= 400), an HttpStatusException is thrown.
	 * If the decoding fails, an exception is thrown. The returned promise returns the decoded
	 * result as an `Buffer`.
	 *
	 * * params of type `string` are sent verbatim. If not specified in the headers, the Content-Type will be set to `text/plain`
	 * * params of type `Blob` are sent verbatim. If not specified in the headers, the Content-Type will be set from the type stored in the Blob or or `application/octet-stream` if no type was stored.
	 * * params of type `Buffer` or `ArrayBuffer` are sent verbatim. If not specified in the headers, the Content-Type will be set to `application/octet-stream`
	 * * params of type `Readable` or `Duplex` are sent verbatim. If not specified in the headers, the Content-Type will be set to `application/octet-stream`
	 * * params of type `Object` are sent based on the encoding specified in the Content-Type header. If no Content-Type header is specified, `application/json` is assumed. All json types and `application/x-www-form-urlencoded` are currently supported.
	 *
	 * @param url - A string representing the URL for fetching. If either the RequestHelper options
	 *              or the supplied options provide a `baseurl`, this value must be relative since
	 *              it is concatenated to the `baseurl`.
	 * @param params - Optional object containing the parameters sent with the request. These
	 *                 parameters will be encoded into the body according to the passed type and
	 *                 supplied encoding header
	 * @param options - Optional options or the http requests that will override the options
	 *                  provided for the object.
	 */
	deleteGetBuffer( url: string, params?: string | Blob | ArrayBuffer | Readable | Duplex | Object, options?: RequestHelperOptions ): Promise<Buffer>;
}
/// <reference types="node" />

import { Response, BodyInit, HeadersInit, RequestRedirect } from "node-fetch";
import { Agent } from "http";
import { URL } from "url";
import { AbortSignal } from "node-fetch/externals";

/**
 * Specify authentication information
 */
export interface FetchAuth {
	/**
	 * Authetication string or a function that returns the authentication string.
	 * If a function is specified, it is invoked at each request.
	 */
	credentials?: ( () => string ) | string;
	/**
	 * Optional authentication type. Default value is `Bearer`
	 */
	authtype?: string;
}

/**
 * Specifies credentials for basic authentication
 */
export interface FetchBasicAuth {
	/**
	 * The user name for authenticating
	 */
	username: string;
	/**
	 * An optional password for authenticating
	 */
	password?: string;
}

/**
 * Options specific to a `FetchHelper` object.
 */
export interface FetchHelperOptions {
	/**
	 * The default base url to use for all requests
	 */
	baseurl?: string;
	/**
	 * If `true` all http requests with status >= 400 will throw a `HttpStatusError`
	 */
	onlysuccessful?: boolean;
	/**
	 * If specified, all requests will send the corresponding authentication data
	 */
	auth?: FetchAuth | FetchBasicAuth;
	/**
	 * If specified, the request will be routed via the specified proxy. It `true`, the
	 * proxy is taken from enviroment variables. (*_PROXY and NO_PROXY -
	 * See https://www.npmjs.com/package/proxy-from-env)
	 *
	 * This option has **no effect** if used in conjunction with the option
	 * `agent`. In this case the option is ignored.
	 */
	proxy?: boolean | string;

	/**
	 * A request body. can be null, a string, a Buffer, a Blob, or a Node.js Readable stream.
	 * See documentation of `node-fetch` for further details
	 */
	body?: BodyInit;
	/**
	 * Request Headers.
	 * See documentation of `node-fetch` for further details
	 */
	headers?: HeadersInit;
	/**
	 * The http method used for the requests. Default method is `GET`.
	 * See documentation of `node-fetch` for further details about format and default headers
	 */
	method?: string;
	/**
	 * Redirection behaviour: set to `manual` to extract redirect headers, `error` to reject redirect.
	 * Default value is `follow`. See documentation of `node-fetch` for further details
	 */
	redirect?: RequestRedirect;
	/**
	 * Pass an instance of AbortSignal to optionally abort requests.
	 * See documentation of `node-fetch` for further details
	 */
	signal?: AbortSignal | null;

	// node-fetch extensions
	/**
	 * http(s).Agent instance or function that returns an instance.
	 * Allows custom proxy, certificate etc.
	 * See documentation of `node-fetch` for further details
	 */
	agent?: Agent | ( ( parsedUrl: URL ) => Agent );
	/**
	 * Support gzip/deflate content encoding. `false` to disable.
	 * See documentation of `node-fetch` for further details
	 */
	compress?: boolean; // =true support gzip/deflate content encoding. false to disable
	/**
	 * Maximum redirect count. `0` to not follow redirect. Default value is `20`.
	 * See documentation of `node-fetch` for further details
	 */
	follow?: number;
	/**
	 * Maximum response body size in bytes. `0` to disable. Default value is `0`.
	 * See documentation of `node-fetch` for further details
	 */
	size?: number;
	/**
	 * Request/response timeout in ms, it resets on redirect. `0` to disable (OS limit applies).
	 * Signal is recommended instead.  Default value is `0`.
	 * See documentation of `node-fetch` for further details
	 */
	timeout?: number;
}

/**
 * Support class for `node-fetch` with persistent options and additional facilities
 * for auth and http error handling
 */
export class FetchHelper {
	/**
	 * Creates a new `FetchHelper` object
	 * @param options - Optional options for the http requests persisted through the whole lifecycle of the object
	 */
	constructor( options?: FetchHelperOptions );

	/**
	 * Performs a http fetch
	 * @param url - A string representing the URL for fetching. If either the FetchHelper options
	 *              or the supplied options provide a `baseurl`, this value must be relative since
	 *              it is concatenated to the `baseurl`.
	 * @param options - Optional options or the http requests that will override the options
	 *                  provided for the object.
	 * @return Promise<Response>
	 */
	fetch( url: string, options?: FetchHelperOptions ): Promise<Response>;

	/**
	 * Set the default authentication mode for requests made with the object (changes options
	 * passed in the constructor)
	 * @param auth - An authentication description object - See `FetchAuth` and `FetchBasicAuth`
	 */
	setAuth( auth: FetchAuth | FetchBasicAuth ): void;

	/**
	 * Sets the default base url to use for all requests (changes options passed in the constructor)
	 * @param url - The default base url to use for all requests
	 */
	setBaseUrl( url: string ): void;

	/**
	 * Sets the default behaviour on unsuccessful http requests (http status >= 400, changes options passed in the constructor)
	 * @param onlysuccessful - If `true` all http requests with http status >= 400 will throw a `HttpStatusError`
	 */
	setOnlySuccesful( onlysuccessful: boolean ): void;
}
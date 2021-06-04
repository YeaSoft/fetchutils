// activate strict mode
'use strict';

// load system modules
const { Readable, Duplex } = require( 'stream' );

// load library modules
const merge = require( 'deepmerge' );
const Blob = require( 'fetch-blob' );
const queryString = require( 'query-string' );
const { getSpecifiedStr } = require( '@yeasoft/baseutils' );

// load local modules
const { FetchHelper } = require( './fetchhelper.js' );

// options for queryString
const QUERY_OPTIONS = [ 'strict', 'encode', 'sort', 'arrayFormat', 'arrayFormatSeparator', 'skipNull', 'skipEmptyString' ];

// exported class declaration
class RequestHelper extends FetchHelper {
	constructor( options ) {
		super( options );
		this.queryOptions = this._extractOptions( this.defaults, QUERY_OPTIONS );
	}

	get( url, params, options ) {
		options = this._prepareOptions( options );
		options.method = 'GET';
		params = this._prepareParams( options, params );
		return this._fetch( `${url}${params}`, options );
	}

	getGetJson( url, params, options ) {
		options = this._prepareOptions( options );
		options.method = 'GET';
		options.onlysuccessful = true;
		params = this._prepareParams( options, params );
		return this._fetch( `${url}${params}`, options ).then( res => res.json() );
	}

	getGetText( url, params, options ) {
		options = this._prepareOptions( options );
		options.method = 'GET';
		options.onlysuccessful = true;
		params = this._prepareParams( options, params );
		return this._fetch( `${url}${params}`, options ).then( res => res.text() );
	}

	getGetBlob( url, params, options ) {
		options = this._prepareOptions( options );
		options.method = 'GET';
		options.onlysuccessful = true;
		params = this._prepareParams( options, params );
		return this._fetch( `${url}${params}`, options ).then( res => res.blob() );
	}

	getArrayBuffer( url, params, options ) {
		options = this._prepareOptions( options );
		options.method = 'GET';
		options.onlysuccessful = true;
		params = this._prepareParams( options, params );
		return this._fetch( `${url}${params}`, options ).then( res => res.arrayBuffer() );
	}

	getBuffer( url, params, options ) {
		options = this._prepareOptions( options );
		options.method = 'GET';
		options.onlysuccessful = true;
		params = this._prepareParams( options, params );
		return this._fetch( `${url}${params}`, options ).then( res => res.buffer() );
	}

	post( url, data, options ) {
		options = this._prepareOptions( options );
		options = this._prepareBody( options, data );
		options.method = 'POST';
		return this._fetch( url, options );
	}

	postGetJson( url, data, options ) {
		options = this._prepareOptions( options );
		options = this._prepareBody( options, data );
		options.method = 'POST';
		options.onlysuccessful = true;
		return this._fetch( url, options ).then( res => res.json() );
	}

	postGetText( url, data, options ) {
		options = this._prepareOptions( options );
		options = this._prepareBody( options, data );
		options.method = 'POST';
		options.onlysuccessful = true;
		return this._fetch( url, options ).then( res => res.text() );
	}

	postGetBlob( url, data, options ) {
		options = this._prepareOptions( options );
		options = this._prepareBody( options, data );
		options.method = 'POST';
		options.onlysuccessful = true;
		return this._fetch( url, options ).then( res => res.blob() );
	}

	postGetArrayBuffer( url, data, options ) {
		options = this._prepareOptions( options );
		options = this._prepareBody( options, data );
		options.method = 'POST';
		options.onlysuccessful = true;
		return this._fetch( url, options ).then( res => res.arrayBuffer() );
	}

	postGetBuffer( url, data, options ) {
		options = this._prepareOptions( options );
		options = this._prepareBody( options, data );
		options.method = 'POST';
		options.onlysuccessful = true;
		return this._fetch( url, options ).then( res => res.buffer() );
	}

	_prepareParams( options, params ) {
		let queryOptions = merge( this.queryOptions, this._extractOptions( options, QUERY_OPTIONS ) );
		if ( params instanceof Object ) {
			var result = queryString.stringify( params, queryOptions );
			return result ? `?${result}` : '';
		}
		return '';
	}

	// _prepareBodyCall( method, url, data, options, callback ) {
	// 	options = this._prepareOptions( options );
	// 	options = this._prepareBody( options, data );
	// 	options.method = method;
	// 	return callback( url, options );
	// }

	// _prepareSearchParamCall( method, url, params, options, callback ) {
	// 	options = this._prepareOptions( options );
	// 	params = this._prepareParams( options, params );
	// 	options.method = method;
	// 	return callback( `${url}${params}`, options );
	// }

	_prepareBody( options, data ) {
		if ( data === null || data === undefined ) {
			options.body = null;
		}
		else if ( typeof data === 'string' ) {
			ensureContentType( options, 'text/plain' );
			options.body = data;
		}
		else if ( data instanceof Blob ) {
			ensureContentType( options, data.type );
			options.body = data;
		}
		else if ( data instanceof Buffer || data instanceof ArrayBuffer ) {
			ensureContentType( options );
			options.body = data;
		}
		else if ( data instanceof Readable || data instanceof Duplex ) {
			ensureContentType( options );
			options.body = data;
		}
		else if ( data instanceof Object ) {
			switch ( options.headers[ 'Content-Type' ] ) {
				case undefined:
					// default is application/json
					options.headers[ 'Content-Type' ] = 'application/json';
					options.body = JSON.stringify( data );
					break;
				case 'application/json':
					options.body = JSON.stringify( data );
					break;
				case 'application/x-www-form-urlencoded':
					options.body = queryString.stringify(
						data,
						merge( this.queryOptions, this._extractOptions( options, QUERY_OPTIONS ) )
					);
					break;
				default:
					if ( testJsonContentType( options.headers[ 'Content-Type' ] ) ) {
						options.body = JSON.stringify( data );
						break;
					}
					throw Error( `Invalid Content-Type ${options.headers[ 'Content-Type' ]}` );
			}
		}
		else {
			throw TypeError( `Unsupported data type ${typeof data}` );
		}
		return options;
	}
}

// helper
function ensureContentType( options, defval ) {
	if ( options.headers[ 'Content-Type' ] === undefined ) {
		options.headers[ 'Content-Type' ] = getSpecifiedStr( defval, 'application/octet-stream' );
	}
}

function testJsonContentType( contentType ) {
	if ( typeof contentType != 'string' ) {
		return false;
	}
	let next = contentType.split( '/' );
	if ( next.length < 2 ) {
		return false;
	}
	next = next[ 1 ].split( '+' );
	while ( next.length ) {
		if ( next.pop() === 'json' ) {
			return true;
		}
	}
	return false;
}

// exported entities
exports.RequestHelper = RequestHelper;
// activate strict mode
'use strict';

// load library modules
const fetch = require( 'node-fetch' );
const merge = require( 'deepmerge' );
const { getValidObj, getSpecifiedStr } = require( '@yeasoft/baseutils' );

// load local modules
const { HttpStatusError } = require( './httpstatuserror.js' );

class FetchHelper {
	constructor( options ) {
		this.defaults = merge( {}, getValidObj( options, {} ) );
		ensureObjMember( this.defaults, 'headers', {} );
		ensureObjMember( this.defaults, 'auth', {} );
		// separate internal settings from mode-fetch options
		let fhoptions = this._extractOptions( this.defaults, [ 'auth', 'onlysuccessful', 'baseurl' ] );
		this.setAuth( fhoptions.auth );
		this.setOnlySuccesful( fhoptions.onlysuccessful );
		this.setBaseUrl( fhoptions.baseurl );
	}

	fetch( url, options ) {
		return this._fetch( url, this._prepareOptions( options ) );
	}

	setAuth( auth ) {
		this.auth = prepareAuth( auth );
	}

	setBasicAuth( username, password ) {
		this.auth = prepareAuth( { username, password } );
	}

	setBaseUrl( url ) {
		this.baseurl = getSpecifiedStr( url, '' );
	}

	setOnlySuccesful( onlysuccessful ) {
		this.onlysuccessful = !!( onlysuccessful );
	}

	// internal methods
	_extractOptions( options, keylist ) {
		var extracted = {};
		if ( options instanceof Object && keylist instanceof Array ) {
			keylist.forEach( key => {
				if ( key in options ) {
					extracted[ key ] = options[ key ];
					delete options[ key ];
				}
			} );
		}
		return extracted;
	}

	_prepareOptions( options ) {
		let result = merge( this.defaults, getValidObj( options, {} ) );
		let auth = this.auth;
		// override default auth if specified
		if ( result.auth instanceof Object ) {
			auth = prepareAuth( result.auth );
		}
		delete result.auth;
		if ( auth ) {
			result.headers[ 'Authorization' ] = auth;
		}
		return result;
	}

	_fetch( url, options ) {
		var baseurl = getSpecifiedStr( options.baseurl, this.baseurl );
		var onlysuccessful = typeof options.onlysuccessful === 'boolean' ? options.onlysuccessful : this.onlysuccessful;
		delete options.baseurl;
		delete options.onlysuccessful;
		return onlysuccessful ? fetch( baseurl + url, options ).then( res => {
			if ( res.ok ) {
				return res;
			}
			else {
				throw new HttpStatusError( res.statusText, res.status, res );
			}
		} ) : fetch( baseurl + url, options );
	}
}

// helper
function ensureObjMember( obj, key, defval ) {
	if ( !( obj[ key ] instanceof Object ) ) {
		obj[ key ] = defval;
	}
}

function prepareAuth( auth ) {
	if ( auth.username && auth.password ) {
		return 'Basic ' + Buffer.from( `${auth.username}:${auth.password}` ).toString( 'base64' );
	}
	else if ( typeof auth.credentials === 'function' ) {
		return getSpecifiedStr( auth.authtype, 'Bearer' ) + ' ' + auth.credentials();
	}
	else if ( typeof credentials === 'string' ) {
		return getSpecifiedStr( auth.authtype, 'Bearer' ) + ' ' + auth.credentials;
	}
	return undefined;
}

// exported entities
exports.FetchHelper = FetchHelper;

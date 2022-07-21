// activate strict mode
'use strict';

// simple http error class
class HttpStatusError extends Error {
	constructor( message, status, res ) {
		super( message );
		this.status = status;
		this.code = status;
		this.res = res;
	}
}

// exported entity
exports.HttpStatusError = HttpStatusError;
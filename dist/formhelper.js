// activate strict mode
'use strict';

// load library modules
const FormData = require( 'form-data' );

// load local modules
const { FetchHelper } = require( './fetchhelper.js' );

// options for FormData
const FORM_OPTIONS = [ 'maxDataSize', 'pauseStreams' ];

// exported class declaration
class FormHelper extends FetchHelper {
	constructor( options ) {
		super( options );
		this.formOptions = this._extractOptions( this.defaults, FORM_OPTIONS );
		this.formData = new FormData( this.formOptions );
	}

	reset() {
		delete this.formData;
		this.formData = new FormData( this.formOptions );
	}

	post( url, options ) {
		options = this._prepareOptions( options );
		options.method = 'POST';
		options.body = this.formData;
		return this._fetch( url, options );
	}

	postGetJson( url, options ) {
		options = this._prepareOptions( options );
		options.method = 'POST';
		options.headers[ 'Accept' ] = 'application/json';
		options.onlyok = true;
		options.body = this.formData;
		return this._fetch( url, options ).then( res => res.json() );
	}

	submit( url, options ) { return this.post( url, options ); }
	submitGetJson( url, options ) { return this.postGetJson( url, options ); }

	toString() {
		return '[object FormHelper]';
	}

	// passthrough original form-data methods
	append( field, value, options ) { return this.formData.append( field, value, options ); }
	getHeaders( userHeaders ) { return this.formData.getHeaders( userHeaders ); }
	getBoundary() { return this.formData.getBoundary(); }
	setBoundary( boundary ) { return this.formData.setBoundary( boundary ); }
	getBuffer() { return this.formData.getBuffer(); }
	getLengthSync() { return this.formData.getLengthSync(); }
	getLength( callback ) { return this.formData.getLength( callback ); }
	hasKnownLength() { return this.formData.hasKnownLength(); }
}


// exported entities
exports.FormHelper = FormHelper;

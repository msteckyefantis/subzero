'use strict';

const OBJECT = 'object';

const FUNCTION = 'function';


module.exports = Object.freeze({

    freezeClass( classToFreeze ) {

        validateClass( classToFreeze );

        Object.freeze( classToFreeze.prototype );

        return Object.freeze( classToFreeze );
    },

    deepFreezeClass( classToFreeze ) {

        validateClass( classToFreeze );

        return deepFreezeObject( classToFreeze );
    },

    deepFreezeObject( objectToFreeze ) {

        validateObject( objectToFreeze );

        return deepFreezeObject( objectToFreeze );
    }
});


function deepFreezeObject( object ) {
    /* NOTE: does accept a class too,
        but will not recursively freeze a class within a class/object
    */

    for( let propertyName of Object.getOwnPropertyNames( object ) ) {

        const property = object[ propertyName ];

        if( (typeof property === OBJECT) && (property !== null) ) {

            deepFreezeObject( property );
        }
    }

    return Object.freeze( object )
}


function validateClass( classToFreeze ) {

    if( typeof classToFreeze !== FUNCTION ) {

        throw new TypeError( 'subzero error: invalid class' );
    }
}


function validateObject( objectToFreeze ) {

    if( typeof objectToFreeze !== OBJECT ) {

        throw new TypeError( 'subzero error: invalid object' );
    }
}

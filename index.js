'use strict';

const OBJECT = 'object';

const FUNCTION = 'function';


const subzero = {

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
    },

    megaFreezeClass( classToFreeze ) {

        validateClass( classToFreeze );

        return megaFreezeObject( classToFreeze );
    },

    megaFreezeObject( objectToFreeze ) {

        validateObject( objectToFreeze );

        return megaFreezeObject( objectToFreeze );
    }
};


const deepFreezeObject = Object.freeze( function( object ) {
    /* NOTE: does accept a class too,
        but will not recursively freeze a class within a class/object
    */

    for( let propertyName of Object.getOwnPropertyNames( object ) ) {

        const property = object[ propertyName ];

        if(  object.hasOwnProperty( propertyName ) &&

            (typeof property === OBJECT ) &&

            (property !== null)
        ) {

            deepFreezeObject( property );
        }
    }

    return Object.freeze( object )
});


const megaFreezeObject = Object.freeze( function( object ) {

    Object.freeze( object );

    for( let propertyName of Object.getOwnPropertyNames( object ) ) {

        const property = object[ propertyName ];

        if( object.hasOwnProperty( propertyName ) &&

            (typeof property === OBJECT || typeof property === FUNCTION) &&

            (property !== null) &&

            !Object.isFrozen( property )
        ) {

            megaFreezeObject( property );
        }
    }

    return object;
});


const validateClass = Object.freeze( function( classToFreeze ) {

    if( typeof classToFreeze !== FUNCTION ) {

        throw new TypeError( 'subzero error: invalid class' );
    }
});


const validateObject = Object.freeze( function( objectToFreeze ) {

    if( typeof objectToFreeze !== OBJECT ) {

        throw new TypeError( 'subzero error: invalid object' );
    }
});


module.exports = subzero.megaFreezeObject( subzero );

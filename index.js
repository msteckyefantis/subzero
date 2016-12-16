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

        return deepFreeze( classToFreeze );
    },

    deepFreezeObject( objectToFreeze ) {

        validateObject( objectToFreeze );

        return deepFreeze( objectToFreeze );
    },

    megaFreezeClass( classToFreeze ) {

        validateClass( classToFreeze );

        return megaFreeze( classToFreeze );
    },

    megaFreezeObject( objectToFreeze ) {

        validateObject( objectToFreeze );

        return megaFreeze( objectToFreeze );
    }
};


const deepFreeze = Object.freeze( function( objectOrClass ) {

    for( const propertyName of Object.getOwnPropertyNames( objectOrClass ) ) {

        const property = objectOrClass[ propertyName ];

        if( objectOrClass.hasOwnProperty( propertyName ) &&

            (typeof property === OBJECT ) &&

            (property !== null)
        ) {

            deepFreeze( property );
        }
    }

    return Object.freeze( objectOrClass )
});


const megaFreeze = Object.freeze( function( objectOrClass ) {

    Object.freeze( objectOrClass );

    for( const propertyName of Object.getOwnPropertyNames( objectOrClass ) ) {

        const property = objectOrClass[ propertyName ];

        if( objectOrClass.hasOwnProperty( propertyName ) &&

            (typeof property === OBJECT || typeof property === FUNCTION) &&

            (property !== null) &&

            !Object.isFrozen( property )
        ) {

            megaFreeze( property );
        }
    }

    return objectOrClass;
});


const validateClass = Object.freeze( function( classToFreeze ) {

    if( typeof classToFreeze !== FUNCTION ) {

        throw new TypeError( 'subzero error: invalid class' );
    }
});


const validateObject = Object.freeze( function( objectToFreeze ) {

    if( (typeof objectToFreeze !== OBJECT) || (objectToFreeze === null) ) {

        throw new TypeError( 'subzero error: invalid object' );
    }
});


module.exports = subzero.megaFreezeObject( subzero );

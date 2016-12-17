'use strict';

const OBJECT = 'object';

const FUNCTION = 'function';

// NOTE: the subzeroVariable can be an object, a function, or a class
const subzero = {

    freeze( value ) {

        if( isSubzeroVariable( value ) ) {

            return freeze( value );
        }

        return value;
    },

    deepFreeze( value ) {

        if( isSubzeroVariable( value ) ) {

            return deepFreeze( value );
        }

        return value;
    },

    megaFreeze( value ) {

        if( isSubzeroVariable( value ) ) {

            return megaFreeze( value, [] );
        }

        return value;
    }
};


const freeze = Object.freeze( function( subzeroVariable ) {

    const prototype = subzeroVariable.prototype;

    if( prototype ) {

        Object.freeze( prototype );
    }

    return Object.freeze( subzeroVariable );
});


const deepFreeze = Object.freeze( function( subzeroVariable ) {

    for( const propertyName of Object.getOwnPropertyNames( subzeroVariable ) ) {

        const property = subzeroVariable[ propertyName ];

        if( subzeroVariable.hasOwnProperty( propertyName ) &&

            isObject( property )
        ) {

            deepFreeze( property );
        }
    }

    return Object.freeze( subzeroVariable );
});


const megaFreeze = Object.freeze( function( subzeroVariable, processed ) {

    for( const propertyName of Object.getOwnPropertyNames( subzeroVariable ) ) {

        const property = subzeroVariable[ propertyName ];

        if( subzeroVariable.hasOwnProperty( propertyName ) &&

            isSubzeroVariable( property ) &&

            !isInArray( processed, property )
        ) {

            processed.push( property );

            megaFreeze( property, processed );
        }
    }

    return Object.freeze( subzeroVariable );
});


const isSubzeroVariable = Object.freeze( function( value ) {

    return( isFunctionOrClass( value ) || isObject( value ) );
});


const isObject = Object.freeze( function( value ) {

    if( (value !== null) && (typeof value === OBJECT) ) {

        return true;
    }

    return false;
});


const isFunctionOrClass = Object.freeze( function( value ) {

    if( typeof value === FUNCTION ) {

        return true;
    }

    return false;
});


const isInArray = Object.freeze( function( array, value ) {

    return( array.indexOf( value ) >= 0 );
});

module.exports = subzero.megaFreeze( subzero );

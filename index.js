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

    megaFreeze( value ) {

        if( isSubzeroVariable( value ) ) {

            const processedSubzeroVariables = [];

            megaFreeze( value, processedSubzeroVariables );

            processedSubzeroVariables.length = 0;

            Object.freeze( processedSubzeroVariables );

            return value;
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


const megaFreeze = Object.freeze( function( subzeroVariable, processedSubzeroVariables ) {

    for( const propertyName of Object.getOwnPropertyNames( subzeroVariable ) ) {

        const property = subzeroVariable[ propertyName ];

        if( isSubzeroVariable( property ) && (processedSubzeroVariables.indexOf( property ) < 0 ) ) {

            processedSubzeroVariables.push( property );

            megaFreeze( property, processedSubzeroVariables );
        }
    }

    Object.freeze( subzeroVariable );
});


const isSubzeroVariable = Object.freeze( function( value ) {

    const isObject = ( (value !== null) && (typeof value === OBJECT) );

    const isFunctionOrClass = typeof value === FUNCTION;

    return( isFunctionOrClass || isObject );
});


module.exports = subzero.megaFreeze( subzero );

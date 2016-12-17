'use strict';

const OBJECT = 'object';

const FUNCTION = 'function';

// NOTE: the subzeroVariable can be an object, a function, or a class
const subzero = {

    freeze( value ) {

        if( isSubzeroVariable( value ) ) {

            const prototype = value.prototype;

            if( prototype ) {

                Object.freeze( prototype );
            }

            Object.freeze( value )
        }

        return value;
    },

    megaFreeze( value ) {

        if( isSubzeroVariable( value ) ) {

            const processedSubzeroVariables = [ Object.freeze( value ) ];

            megaFreezeProperties( value, processedSubzeroVariables );

            processedSubzeroVariables.length = 0;

            Object.freeze( processedSubzeroVariables );
        }

        return value;
    }
};


const megaFreezeProperties = Object.freeze( function( subzeroVariable, processedSubzeroVariables ) {

    for( const propertyName of Object.getOwnPropertyNames( subzeroVariable ) ) {

        const property = subzeroVariable[ propertyName ];

        if( isSubzeroVariable( property ) && (processedSubzeroVariables.indexOf( property ) < 0) ) {

            processedSubzeroVariables.push( Object.freeze( property ) );

            megaFreezeProperties( property, processedSubzeroVariables );
        }
    }
});


const isSubzeroVariable = Object.freeze( function( value ) {

    const isObject = ( (value !== null) && (typeof value === OBJECT) );

    const isFunctionOrClass = typeof value === FUNCTION;

    return( isFunctionOrClass || isObject );
});


module.exports = subzero.megaFreeze( subzero );

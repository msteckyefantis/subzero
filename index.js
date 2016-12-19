'use strict';

const OBJECT = 'object';

const FUNCTION = 'function';

// NOTE: a subzeroVariable refers to an object, a function, or a class
const subzero = {

    freeze( value ) {

        const prototype = value.prototype;

        if( isFunctionOrClass( value ) && prototype ) {

            Object.freeze( prototype );
        }

        return Object.freeze( value );
    },

    megaFreeze( value ) {

        Object.freeze( value )

        if( isSubzeroVariable( value ) ) {

            megaFreezeSubzeroVariable( value );
        }

        return value;
    }
};


const megaFreezeSubzeroVariable = Object.freeze( function( frozenSubzeroVariable ) {

    const processedSubzeroVariables = [ frozenSubzeroVariable ];

    freezeAllPropertiesRecursively( frozenSubzeroVariable, processedSubzeroVariables );

    processedSubzeroVariables.length = 0;

    Object.freeze( processedSubzeroVariables );
});

Object.freeze( megaFreezeSubzeroVariable.prototype );


const freezeAllPropertiesRecursively = Object.freeze( function( subzeroVariable, processedSubzeroVariables ) {

    for( const propertyName of Object.getOwnPropertyNames( subzeroVariable ) ) {

        const property = subzeroVariable[ propertyName ];

        const propertyIsASubzeroVariable = isSubzeroVariable( property );

        const propertyIsNotAlreadyProcessed = (processedSubzeroVariables.indexOf( property ) < 0);

        if( propertyIsASubzeroVariable && propertyIsNotAlreadyProcessed ) {

            processedSubzeroVariables.push( Object.freeze( property ) );

            freezeAllPropertiesRecursively( property, processedSubzeroVariables );
        }
    }
});

Object.freeze( freezeAllPropertiesRecursively.prototype );


const isSubzeroVariable = Object.freeze( function( value ) {

    const isObject = ( (value !== null) && (typeof value === OBJECT) );

    return( isFunctionOrClass( value ) || isObject );
});

Object.freeze( isSubzeroVariable.prototype );


const isFunctionOrClass = Object.freeze( function( value ) {

    return( typeof value === FUNCTION );
});

Object.freeze( isFunctionOrClass.prototype );


module.exports = subzero.megaFreeze( subzero );

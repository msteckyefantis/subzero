'use strict';

const OBJECT = 'object';

const FUNCTION = 'function';

const nodeVersion = Number( process.versions.node.split( '.' )[0] );

// NOTE: a subzeroVariable refers to an object, a function, or a class
const subzero = {

    freeze( value ) {

        if( isFunctionOrClass( value ) && value.prototype ) {

            Object.freeze( value.prototype );
        }

        return Object.freeze( value );
    },

    megaFreeze( value ) {

        if( isSubzeroVariable( value ) ) {

            maximallyFreezeSubzeroVariable( value );

            freezeAllProperties( value );
        }

        return value;
    }
};


const freezeAllProperties = Object.freeze( subzeroVariable => {

    const processedSubzeroVariables = [];

    freezeAllPropertiesRecursively( subzeroVariable, processedSubzeroVariables );

    // cleanup
    processedSubzeroVariables.length = 0;

    Object.freeze( processedSubzeroVariables );
});


const freezeAllPropertiesRecursively = Object.freeze( ( subzeroVariable, processedSubzeroVariables ) => {

    for( const propertyName of Object.getOwnPropertyNames( subzeroVariable ) ) {

        const property = subzeroVariable[ propertyName ];

        const propertyIsASubzeroVariable = isSubzeroVariable( property );

        const propertyIsNotAlreadyProcessed = (processedSubzeroVariables.indexOf( property ) < 0);

        if( propertyIsASubzeroVariable && propertyIsNotAlreadyProcessed ) {

            maximallyFreezeSubzeroVariable( property );

            processedSubzeroVariables.push( property )

            freezeAllPropertiesRecursively( property, processedSubzeroVariables );
        }
    }
});


const maximallyFreezeSubzeroVariable = Object.freeze( subzeroVariable => {

    if( !(subzeroVariable instanceof Buffer) ) {

        Object.freeze( subzeroVariable );
    }
    else if( nodeVersion >= 6 ) {

        Object.seal( subzeroVariable );
    }
});


const isSubzeroVariable = Object.freeze( value => {

    const isObject = ( (value !== null) && (typeof value === OBJECT) );

    return( isFunctionOrClass( value ) || isObject );
});


const isFunctionOrClass = Object.freeze( value => {

    return( typeof value === FUNCTION );
});


module.exports = subzero.megaFreeze( subzero );

'use strict';

const OBJECT = 'object';

const FUNCTION = 'function';


// NOTE: the subzeroVariable can be an object, a function, or a class
const subzero = {

    freeze( subzeroVariable ) {

        validateSubzeroVariable( subzeroVariable );

        return freeze( subzeroVariable );
    },

    deepFreeze( subzeroVariable ) {

        validateSubzeroVariable( subzeroVariable );

        return deepFreeze( subzeroVariable );
    },

    megaFreeze( classToFreeze ) {

        validateSubzeroVariable( classToFreeze );

        return megaFreeze( classToFreeze );
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

            ( property !== null ) &&

            ( typeof property === OBJECT )
        ) {

            deepFreeze( property );
        }
    }

    return Object.freeze( subzeroVariable );
});


const megaFreeze = Object.freeze( function( subzeroVariable ) {

    Object.freeze( subzeroVariable );

    for( const propertyName of Object.getOwnPropertyNames( subzeroVariable ) ) {

        const property = subzeroVariable[ propertyName ];

        const subzeroVariableIsAFunctionOrAClass = ( typeof property === FUNCTION );

        const subzeroVariableIsAnObject =  ( (property !== null) && (typeof property === OBJECT) );

        if( subzeroVariable.hasOwnProperty( propertyName ) &&

            ( subzeroVariableIsAFunctionOrAClass || subzeroVariableIsAnObject ) &&

            !Object.isFrozen( property )
        ) {

            megaFreeze( property );
        }
    }


    return subzeroVariable;
});


const validateSubzeroVariable = Object.freeze( function( subzeroVariable ) {

    const subzeroVariableIsValid = (

        ( typeof subzeroVariable === FUNCTION ) ||

        ( (subzeroVariable !== null) && (typeof subzeroVariable === OBJECT) )
    );

    if( !subzeroVariableIsValid ) {

        throw new TypeError( 'subzero error: input must be an object, function, or class' );
    }
});


module.exports = subzero.megaFreeze( subzero );

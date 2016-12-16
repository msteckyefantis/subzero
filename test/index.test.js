'use strict';
/* jshint expr: true */

const expect = require( 'chai' ).expect;

const ROOT_PATH = '../';

const MODULE_PATH = 'index';

const FULL_MODULE_PATH = ROOT_PATH + MODULE_PATH;

const subzero = require( FULL_MODULE_PATH );


describe( MODULE_PATH, function() {

    describe( 'subzero', function() {

        describe( 'init failiures', function() {

            [

                'freeze',
                'deepFreeze',
                'megaFreeze'

            ].forEach( function( functionName ) {

                it( `${ functionName } failed init: invalid input type`, function() {

                    const ControlClass = 69;

                    let erroredAsExpected = false;

                    try {

                        subzero[ functionName ]( ControlClass );
                    }
                    catch( err ) {

                        if( err instanceof TypeError ) {

                            expect( err.message ).to.equal( 'subzero error: input must be an object, function, or class' );

                            erroredAsExpected = true;
                        }
                    }
                    finally {

                        expect( erroredAsExpected ).to.be.true;
                    }
                });
            });
        });

        describe( 'freezing functions normal operation', function() {

            [
                {
                    name: 'freeze',

                    innerObjectsWillBeFrozen: false,

                    innerFunctionsAndClassesWillBeFrozen: false,

                    variableInsideAlreadyFrozenVariablesWillBeFrozen: false,
                    // NOTE: the (subzero)variables can be an object, a function, or a class
                },

                {
                    name: 'deepFreeze',

                    innerObjectsWillBeFrozen: true,

                    innerFunctionsAndClassesWillBeFrozen: false,

                    variableInsideAlreadyFrozenVariablesWillBeFrozen: true,
                },

                {
                    name: 'megaFreeze',

                    innerObjectsWillBeFrozen: true,

                    innerFunctionsAndClassesWillBeFrozen: true,

                    variableInsideAlreadyFrozenVariablesWillBeFrozen: false
                }

            ].forEach( function( functionData ) {

                [
                    {
                        type: 'object',

                        getVariableToValidate: function() { return {} },

                        secondObjectName: 'a',
                    },

                    {
                        type: 'function',

                        getVariableToValidate: function() { return function() {} },

                        secondObjectName: 'prototype',
                    },

                    {
                        type: 'class',

                        getVariableToValidate: function() { return class {} },

                        secondObjectName: 'prototype',
                    }

                ].forEach( function( subzeroVariableData ) {
                    // NOTE: the subzeroVariable can be an object, a function, or a class

                    it( `${ functionData.name } freezing ${ subzeroVariableData.type }`, function() {

                        const subzeroVariableToValidate = subzeroVariableData.getVariableToValidate();

                        const InnerClass = class {};

                        InnerClass.x = {

                            y: {}
                        };

                        const controlFunction = function() {};

                        controlFunction.x = {

                            y: {}
                        };

                        const objectInsideAlreadyFrozenObject = {};

                        subzeroVariableToValidate.a = {

                            b: {

                                c: {

                                    d: {

                                        InnerClass,

                                        controlFunction,

                                        e: Object.freeze({ objectInsideAlreadyFrozenObject })
                                    }
                                }
                            }
                        };

                        subzeroVariableToValidate[ subzeroVariableData.secondObjectName ].x = {

                            y: {

                                z: {}
                            },

                            w: {}
                        };

                        expect( subzero[ functionData.name ]( subzeroVariableToValidate ) ).to.equal( subzeroVariableToValidate );

                        expect( Object.isFrozen( subzeroVariableToValidate ) ).to.be.true;
                        expect( Object.isFrozen( subzeroVariableToValidate.a ) ).to.equal( functionData.innerObjectsWillBeFrozen );
                        expect( Object.isFrozen( subzeroVariableToValidate.a.b ) ).to.equal( functionData.innerObjectsWillBeFrozen );
                        expect( Object.isFrozen( subzeroVariableToValidate.a.b.c ) ).to.equal( functionData.innerObjectsWillBeFrozen );
                        expect( Object.isFrozen( subzeroVariableToValidate.a.b.c.d ) ).to.equal( functionData.innerObjectsWillBeFrozen );

                        if( subzeroVariableData.type !== 'object' ) {

                            expect( Object.isFrozen( subzeroVariableToValidate[ subzeroVariableData.secondObjectName ] ) ).to.be.true;
                        }

                        expect( Object.isFrozen( subzeroVariableToValidate[ subzeroVariableData.secondObjectName ].x ) ).to.equal( functionData.innerObjectsWillBeFrozen );
                        expect( Object.isFrozen( subzeroVariableToValidate[ subzeroVariableData.secondObjectName ].x.y ) ).to.equal( functionData.innerObjectsWillBeFrozen );
                        expect( Object.isFrozen( subzeroVariableToValidate[ subzeroVariableData.secondObjectName ].x.y.z ) ).to.equal( functionData.innerObjectsWillBeFrozen );
                        expect( Object.isFrozen( subzeroVariableToValidate[ subzeroVariableData.secondObjectName ].x.w ) ).to.equal( functionData.innerObjectsWillBeFrozen );
                        expect( Object.isFrozen( InnerClass ) ).to.equal( functionData.innerFunctionsAndClassesWillBeFrozen );
                        expect( Object.isFrozen( InnerClass.x ) ).to.equal( functionData.innerFunctionsAndClassesWillBeFrozen );
                        expect( Object.isFrozen( InnerClass.x.y ) ).to.equal( functionData.innerFunctionsAndClassesWillBeFrozen );
                        expect( Object.isFrozen( controlFunction ) ).to.equal( functionData.innerFunctionsAndClassesWillBeFrozen );
                        expect( Object.isFrozen( controlFunction.x ) ).to.equal( functionData.innerFunctionsAndClassesWillBeFrozen );
                        expect( Object.isFrozen( controlFunction.x.y ) ).to.equal( functionData.innerFunctionsAndClassesWillBeFrozen );
                        expect( Object.isFrozen( objectInsideAlreadyFrozenObject ) ).to.equal( functionData.variableInsideAlreadyFrozenVariablesWillBeFrozen );
                    });
                });
            });
        });
    });
});

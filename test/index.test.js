'use strict';
/* jshint expr: true */

const expect = require( 'chai' ).expect;

const ROOT_PATH = '../';

const MODULE_PATH = 'index';

const FULL_MODULE_PATH = ROOT_PATH + MODULE_PATH;

const subzero = require( FULL_MODULE_PATH );

const nodeVersion = Number( process.versions.node.split( '.' )[0] );


describe( MODULE_PATH, function() {

    describe( 'subzero', function() {

        describe( 'no op, return input value (non object, function, or class input)', function() {

            [

                'freeze',
                'megaFreeze'

            ].forEach( function( functionName ) {

                it( `${ functionName } with number input`, function() {

                    const controlNumber = 69;

                    expect( subzero[ functionName ]( controlNumber ) ).to.equal( controlNumber );
                });

                it( `${ functionName } with string input`, function() {

                    const controlString = 'xxx';

                    expect( subzero[ functionName ]( controlString ) ).to.equal( controlString );
                });

                it( `${ functionName } with bool input`, function() {

                    const controlBool = true;

                    expect( subzero[ functionName ]( controlBool ) ).to.equal( controlBool );
                });
            });
        });

        describe( 'freezing functions normal operation', function() {

            [
                {
                    name: 'freeze',

                    innerObjectsWillBeFrozen: false,

                    innerFunctionsAndClassesWillBeFrozen: false,

                    objectsInsideAlreadyFrozenObjectsWillBeFrozen: false,

                    objectsInsideAlreadyFrozenFunctionsWillBeFrozen: false,

                    functionsInsideAlreadyFrozenFunctionsWillBeFrozen: false,

                    functionsInsideAlreadyFrozenObjectsWillBeFrozen: false,

                    bufferWillBeSealedIfVersionIsGreaterOrEqualTo6Dot9: false
                },

                {
                    name: 'megaFreeze',

                    innerObjectsWillBeFrozen: true,

                    innerFunctionsAndClassesWillBeFrozen: true,

                    objectsInsideAlreadyFrozenObjectsWillBeFrozen: true,

                    objectsInsideAlreadyFrozenFunctionsWillBeFrozen: true,

                    functionsInsideAlreadyFrozenFunctionsWillBeFrozen: true,

                    functionsInsideAlreadyFrozenObjectsWillBeFrozen: true,

                    bufferWillBeSealedIfVersionIsGreaterOrEqualTo6Dot9: true
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

                        const functionInsideAlreadyFrozenObject = function() {};

                        const objectInsideAlreadyFrozenFunction = {};

                        const functionInsideAlreadyFrozenFunction = function() {};

                        const functionToFreeze = function() {};

                        functionToFreeze.objectInsideAlreadyFrozenFunction = objectInsideAlreadyFrozenFunction;

                        functionToFreeze.functionInsideAlreadyFrozenFunction = functionInsideAlreadyFrozenFunction;

                        const frozenFunctionWithNonFrozenObjectInside = Object.freeze( functionToFreeze );

                        const buff = new Buffer( 69 );

                        buff.x = {

                            y: {},

                            f: function(){}
                        };

                        subzeroVariableToValidate.a = {

                            b: {

                                c: {

                                    d: {

                                        InnerClass,

                                        controlFunction,

                                        buff,

                                        e: Object.freeze({

                                            objectInsideAlreadyFrozenObject,

                                            functionInsideAlreadyFrozenObject
                                        }),

                                        frozenFunctionWithNonFrozenObjectInside
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

                        if( !((subzeroVariableData.type === 'object') && (functionData.name === 'freeze')) ) {

                            expect( Object.isFrozen( subzeroVariableToValidate[ subzeroVariableData.secondObjectName ] ) ).to.be.true;
                        }
                        else {

                            expect( Object.isFrozen( subzeroVariableToValidate[ subzeroVariableData.secondObjectName ] ) ).to.be.false;
                        }

                        expect( Object.isFrozen( subzeroVariableToValidate[ subzeroVariableData.secondObjectName ].x ) ).to.equal( functionData.innerObjectsWillBeFrozen );
                        expect( Object.isFrozen( subzeroVariableToValidate[ subzeroVariableData.secondObjectName ].x.y ) ).to.equal( functionData.innerObjectsWillBeFrozen );
                        expect( Object.isFrozen( subzeroVariableToValidate[ subzeroVariableData.secondObjectName ].x.y.z ) ).to.equal( functionData.innerObjectsWillBeFrozen );
                        expect( Object.isFrozen( subzeroVariableToValidate[ subzeroVariableData.secondObjectName ].x.w ) ).to.equal( functionData.innerObjectsWillBeFrozen );

                        expect( Object.isFrozen( InnerClass ) ).to.equal( functionData.innerFunctionsAndClassesWillBeFrozen );
                        expect( Object.isFrozen( InnerClass.prototype ) ).to.equal( functionData.innerFunctionsAndClassesWillBeFrozen );
                        expect( Object.isFrozen( InnerClass.x ) ).to.equal( functionData.innerFunctionsAndClassesWillBeFrozen );
                        expect( Object.isFrozen( InnerClass.x.y ) ).to.equal( functionData.innerFunctionsAndClassesWillBeFrozen );

                        expect( Object.isFrozen( controlFunction ) ).to.equal( functionData.innerFunctionsAndClassesWillBeFrozen );
                        expect( Object.isFrozen( controlFunction.prototype ) ).to.equal( functionData.innerFunctionsAndClassesWillBeFrozen );
                        expect( Object.isFrozen( controlFunction.x ) ).to.equal( functionData.innerFunctionsAndClassesWillBeFrozen );
                        expect( Object.isFrozen( controlFunction.x.y ) ).to.equal( functionData.innerFunctionsAndClassesWillBeFrozen );

                        expect( Object.isFrozen( objectInsideAlreadyFrozenObject ) ).to.equal( functionData.objectsInsideAlreadyFrozenObjectsWillBeFrozen );
                        expect( Object.isFrozen( objectInsideAlreadyFrozenFunction ) ).to.equal( functionData.objectsInsideAlreadyFrozenFunctionsWillBeFrozen );

                        expect( Object.isFrozen( functionInsideAlreadyFrozenFunction ) ).to.equal( functionData.functionsInsideAlreadyFrozenFunctionsWillBeFrozen );
                        expect( Object.isFrozen( functionInsideAlreadyFrozenFunction.prototype ) ).to.equal( functionData.objectsInsideAlreadyFrozenFunctionsWillBeFrozen );

                        expect( Object.isFrozen( functionInsideAlreadyFrozenObject ) ).to.equal( functionData.functionsInsideAlreadyFrozenObjectsWillBeFrozen )
                        expect( Object.isFrozen( functionInsideAlreadyFrozenObject.prototype ) ).to.equal( functionData.objectsInsideAlreadyFrozenFunctionsWillBeFrozen );

                        const bufferWillBeSealed = (

                            functionData.bufferWillBeSealedIfVersionIsGreaterOrEqualTo6Dot9 &&
                            (nodeVersion >= 6)
                        );

                        expect( Object.isSealed( buff ) ).to.equal( bufferWillBeSealed );
                        expect( Object.isFrozen( buff.x ) ).to.equal( functionData.innerObjectsWillBeFrozen );
                        expect( Object.isFrozen( buff.x.y ) ).to.equal( functionData.innerObjectsWillBeFrozen );
                        expect( Object.isFrozen( buff.x.f ) ).to.equal( functionData.innerFunctionsAndClassesWillBeFrozen );
                        expect( Object.isFrozen( buff.x.f.prototype ) ).to.equal( functionData.innerObjectsWillBeFrozen );
                    });
                });
            });
        });

        describe( 'other', function() {

            it( 'subzero is mega frozen itself', function() {

                expect( subzero ).to.be.frozen;
                expect( subzero.freeze ).to.be.frozen;
                expect( subzero.megaFreeze ).to.be.frozen;
                /*
                    NOTE: certain functions don't have prototypes <<e.g f in: const o = { f() {} } >>
                    subzero's functions don't have prototypes
                */
            });

            it( 'README.md megaFreeze example test', function() {


                /*
                	this example uses a function,
                    subzero.megaFreeze also works with objects and classes
                */
                function f() {}

                const InnerClass = class {};

                InnerClass.x = {

                    y: {}
                };

                const innerFunction = function() {};

                innerFunction.x = {

                    y: {}
                };

                const objectInsideAlreadyFrozenObject = {};

                const functionInsideAlreadyFrozenObject = function() {};

                const objectInsideAlreadyFrozenFunction = {};

                const functionInsideAlreadyFrozenFunction = function() {};

                const functionToFreeze = function() {};

                functionToFreeze.objectInsideAlreadyFrozenFunction = objectInsideAlreadyFrozenFunction;

                functionToFreeze.functionInsideAlreadyFrozenFunction = functionInsideAlreadyFrozenFunction;

                const frozenFunctionWithNonFrozenObjectAndFunctionInside = Object.freeze( functionToFreeze );

                const buff = new Buffer( 69 );

                buff.x = {

                    y: {},

                    f: function() {}
                };

                f.a = {

                    b: {

                        c: {

                            d: {

                                InnerClass,

                                innerFunction,

                                buff,

                                e: Object.freeze({

                                    objectInsideAlreadyFrozenObject,

                                    functionInsideAlreadyFrozenObject
                                }),

                                frozenFunctionWithNonFrozenObjectAndFunctionInside
                            }
                        }
                    }
                };

                f.prototype.x = {

                    y: {

                        z: {}
                    },

                    w: {}
                };


                /*
                    It's time to freeze your opponent for the flawless victory with fatality.

                	None of the following assertions will throw an AssertionError:
                */

                console.assert( !Object.isFrozen( f ) );
                console.assert( !Object.isFrozen( f.prototype ) );
                console.assert( !Object.isFrozen( f.a ) );
                console.assert( !Object.isFrozen( f.a.b ) );
                console.assert( !Object.isFrozen( f.a.b.c ) );
                console.assert( !Object.isFrozen( f.a.b.c.d ) );
                console.assert( !Object.isFrozen( f.prototype.x ) );
                console.assert( !Object.isFrozen( f.prototype.x.y ) );
                console.assert( !Object.isFrozen( f.prototype.x.y.z ) );
                console.assert( !Object.isFrozen( f.prototype.x.w ) );
                console.assert( !Object.isFrozen( InnerClass ) );
                console.assert( !Object.isFrozen( InnerClass.prototype ) );
                console.assert( !Object.isFrozen( InnerClass.x ) );
                console.assert( !Object.isFrozen( InnerClass.x.y ) );
                console.assert( !Object.isFrozen( innerFunction ) );
                console.assert( !Object.isFrozen( innerFunction.prototype ) );
                console.assert( !Object.isFrozen( innerFunction.x ) );
                console.assert( !Object.isFrozen( innerFunction.x.y ) );
                console.assert( !Object.isFrozen( objectInsideAlreadyFrozenObject ) );
                console.assert( !Object.isFrozen( objectInsideAlreadyFrozenFunction ) );
                console.assert( !Object.isFrozen( functionInsideAlreadyFrozenObject ) );
                console.assert( !Object.isFrozen( functionInsideAlreadyFrozenObject.prototype ) );
                console.assert( !Object.isFrozen( functionInsideAlreadyFrozenFunction ) );
                console.assert( !Object.isFrozen( functionInsideAlreadyFrozenFunction.prototype ) );
                console.assert( !Object.isSealed( buff ) ); // you cannot freeze buffers
                console.assert( !Object.isFrozen( buff.x ) );
                console.assert( !Object.isFrozen( buff.x.y ) );
                console.assert( !Object.isFrozen( buff.x.f ) );
                console.assert( !Object.isFrozen( buff.x.f.prototype ) );

                // Mega Freeze f
                const reference = subzero.megaFreeze( f );

                console.assert( ( reference === f ) );

                console.assert( Object.isFrozen( f ) );
                console.assert( Object.isFrozen( f.prototype ) );
                console.assert( Object.isFrozen( f.a ) );
                console.assert( Object.isFrozen( f.a.b ) );
                console.assert( Object.isFrozen( f.a.b.c ) );
                console.assert( Object.isFrozen( f.a.b.c.d ) );
                console.assert( Object.isFrozen( f.prototype.x ) );
                console.assert( Object.isFrozen( f.prototype.x.y ) );
                console.assert( Object.isFrozen( f.prototype.x.y.z ) );
                console.assert( Object.isFrozen( f.prototype.x.w ) );
                console.assert( Object.isFrozen( InnerClass ) );
                console.assert( Object.isFrozen( InnerClass.prototype ) );
                console.assert( Object.isFrozen( InnerClass.x ) );
                console.assert( Object.isFrozen( InnerClass.x.y ) );
                console.assert( Object.isFrozen( innerFunction ) );
                console.assert( Object.isFrozen( innerFunction.prototype ) );
                console.assert( Object.isFrozen( innerFunction.x ) );
                console.assert( Object.isFrozen( innerFunction.x.y ) );
                console.assert( Object.isFrozen( objectInsideAlreadyFrozenObject ) );
                console.assert( Object.isFrozen( objectInsideAlreadyFrozenFunction ) );
                console.assert( Object.isFrozen( functionInsideAlreadyFrozenObject ) );
                console.assert( Object.isFrozen( functionInsideAlreadyFrozenObject.prototype ) );
                console.assert( Object.isFrozen( functionInsideAlreadyFrozenFunction ) );
                console.assert( Object.isFrozen( functionInsideAlreadyFrozenFunction.prototype ) );
                const nodeVersion = Number( process.version.split( '.' )[0].substring( 1 ) + '.' + process.version.split( '.' )[1] );
                if( nodeVersion >= 6 ) console.assert( Object.isSealed( buff ) );
                console.assert( Object.isFrozen( buff.x ) );
                console.assert( Object.isFrozen( buff.x.y ) );
                console.assert( Object.isFrozen( buff.x.f ) );
                console.assert( Object.isFrozen( buff.x.f.prototype ) );
            });

            it( 'message about coverage', function() {

                if( nodeVersion >= 6) {

                    console.log(`

                    the following coverage results means the code is fully covered for

                    node v6 or greater

                    current version: ${ nodeVersion }

                    ----
                    Statements   : 100% ( 36/36 )
                    Branches     : 94.44% ( 17/18 )
                    Functions    : 100% ( 2/2 )
                    Lines        : 100% ( 36/36 )
                    ----
                    `);
                }
                else {

                    console.log(`

                    the following coverage results means the code is fully covered for

                    less than node v6

                    current version: ${ nodeVersion }

                    ----
                    Statements   : 97.22% ( 35/36 )
                    Branches     : 94.44% ( 17/18 )
                    Functions    : 100% ( 2/2 )
                    Lines        : 97.22% ( 35/36 )
                    ----
                    `);
                }
            });
        });
    });
});

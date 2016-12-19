'use strict';
/* jshint expr: true */

const expect = require( 'chai' ).expect;

const ROOT_PATH = '../';

const MODULE_PATH = 'index';

const FULL_MODULE_PATH = ROOT_PATH + MODULE_PATH;

const subzero = require( FULL_MODULE_PATH );


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

                    functionsInsideAlreadyFrozenObjectsWillBeFrozen: false
                },

                {
                    name: 'megaFreeze',

                    innerObjectsWillBeFrozen: true,

                    innerFunctionsAndClassesWillBeFrozen: true,

                    objectsInsideAlreadyFrozenObjectsWillBeFrozen: true,

                    objectsInsideAlreadyFrozenFunctionsWillBeFrozen: true,

                    functionsInsideAlreadyFrozenFunctionsWillBeFrozen: true,

                    functionsInsideAlreadyFrozenObjectsWillBeFrozen: true
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

                        subzeroVariableToValidate.a = {

                            b: {

                                c: {

                                    d: {

                                        InnerClass,

                                        controlFunction,

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
        });
    });
});

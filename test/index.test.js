'use strict';
/* jshint expr: true */

const expect = require( 'chai' ).expect;

const ROOT_PATH = '../';

const MODULE_PATH = 'index';

const FULL_MODULE_PATH = ROOT_PATH + MODULE_PATH;

const subzero = require( FULL_MODULE_PATH );


describe( MODULE_PATH, function() {

    describe( 'subzero', function() {

        describe( '.freezeClass', function() {

            it( 'failed init: invalid class', function() {

                const ControlClass = 69;

                let erroredAsExpected = false;

                try {

                    subzero.freezeClass( ControlClass );
                }
                catch( err ) {

                    if( err instanceof TypeError ) {

                        expect( err.message ).to.equal( 'subzero error: invalid class' );

                        erroredAsExpected = true;
                    }
                }
                finally {

                    expect( erroredAsExpected ).to.be.true;
                }
            });

            it( 'normal operation', function() {

                const ControlClass = class { f() { return 69 } };

                expect( subzero.freezeClass( ControlClass ) ).to.equal( ControlClass );

                expect( Object.isFrozen( ControlClass ) ).to.be.true;
                expect( Object.isFrozen( ControlClass.prototype ) ).to.be.true;
            });
        });

        describe( '.freezeClass (tested on function)', function() {

            it( 'failed init: invalid function', function() {

                const controlFunction = 69;

                let erroredAsExpected = false;

                try {

                    subzero.freezeClass( controlFunction );
                }
                catch( err ) {

                    if( err instanceof TypeError ) {

                        expect( err.message ).to.equal( 'subzero error: invalid class' );

                        erroredAsExpected = true;
                    }
                }
                finally {

                    expect( erroredAsExpected ).to.be.true;
                }
            });

            it( 'normal operation', function() {

                const controlFunction = function() {};

                expect( subzero.freezeClass( controlFunction ) ).to.equal( controlFunction );

                expect( Object.isFrozen( controlFunction ) ).to.be.true;
                expect( Object.isFrozen( controlFunction.prototype ) ).to.be.true;
            });
        });

        describe( '.deepFreezeClass', function() {

            it( 'failed init: invalid class', function() {

                const ControlClass = 69;

                let erroredAsExpected = false;

                try {

                    subzero.deepFreezeClass( ControlClass );
                }
                catch( err ) {

                    if( err instanceof TypeError ) {

                        expect( err.message ).to.equal( 'subzero error: invalid class' );

                        erroredAsExpected = true;
                    }
                }
                finally {

                    expect( erroredAsExpected ).to.be.true;
                }
            });

            it( 'normal operation', function() {

                const C = class {};

                const InnerClass = class {};

                InnerClass.x = {

                    y: {}
                };

                const controlFunction = function() {};

                controlFunction.x = {

                    y: {}
                };

                const willBeFrozen = {};

                C.a = {

                    b: {

                        c: {

                            d: {

                                InnerClass,

                                controlFunction,

                                e: Object.freeze({ willBeFrozen })
                            }
                        }
                    }
                };

                C.prototype.x = {

                    y: {

                        z: {}
                    },

                    w: {}
                };

                expect( subzero.deepFreezeClass( C ) ).to.equal( C );

                expect( Object.isFrozen( C ) ).to.be.true;
                expect( Object.isFrozen( C.a ) ).to.be.true;
                expect( Object.isFrozen( C.a.b ) ).to.be.true;
                expect( Object.isFrozen( C.a.b.c ) ).to.be.true;
                expect( Object.isFrozen( C.a.b.c.d ) ).to.be.true;
                expect( Object.isFrozen( C.prototype ) ).to.be.true;
                expect( Object.isFrozen( C.prototype.x ) ).to.be.true;
                expect( Object.isFrozen( C.prototype.x.y ) ).to.be.true;
                expect( Object.isFrozen( C.prototype.x.y.z ) ).to.be.true;
                expect( Object.isFrozen( C.prototype.x.w ) ).to.be.true;
                expect( Object.isFrozen( InnerClass ) ).to.be.false;
                expect( Object.isFrozen( InnerClass.x ) ).to.be.false;
                expect( Object.isFrozen( InnerClass.x.y ) ).to.be.false;
                expect( Object.isFrozen( controlFunction ) ).to.be.false;
                expect( Object.isFrozen( controlFunction.x ) ).to.be.false;
                expect( Object.isFrozen( controlFunction.x.y ) ).to.be.false;
                expect( Object.isFrozen( C.a.b.c.d.e.willBeFrozen ) ).to.be.true;
            });
        });

        describe( '.deepFreezeClass (tested on a function)', function() {

            it( 'failed init: invalid function', function() {

                const controlFunction = 69;

                let erroredAsExpected = false;

                try {

                    subzero.deepFreezeClass( controlFunction );
                }
                catch( err ) {

                    if( err instanceof TypeError ) {

                        expect( err.message ).to.equal( 'subzero error: invalid class' );

                        erroredAsExpected = true;
                    }
                }
                finally {

                    expect( erroredAsExpected ).to.be.true;
                }
            });

            it( 'normal operation', function() {

                const controlFunctionToFreeze = function() {};

                const InnerClass = class {};

                InnerClass.x = {

                    y: {}
                };

                const controlFunction = function() {};

                controlFunction.x = {

                    y: {}
                };

                const willBeFrozen = {};

                controlFunctionToFreeze.a = {

                    b: {

                        c: {

                            d: {

                                InnerClass,

                                controlFunction,

                                e: Object.freeze({ willBeFrozen })
                            }
                        }
                    }
                };

                controlFunctionToFreeze.prototype.x = {

                    y: {

                        z: {}
                    },

                    w: {}
                };

                expect( subzero.deepFreezeClass( controlFunctionToFreeze ) ).to.equal( controlFunctionToFreeze );

                expect( Object.isFrozen( controlFunctionToFreeze ) ).to.be.true;
                expect( Object.isFrozen( controlFunctionToFreeze.a ) ).to.be.true;
                expect( Object.isFrozen( controlFunctionToFreeze.a.b ) ).to.be.true;
                expect( Object.isFrozen( controlFunctionToFreeze.a.b.c ) ).to.be.true;
                expect( Object.isFrozen( controlFunctionToFreeze.a.b.c.d ) ).to.be.true;
                expect( Object.isFrozen( controlFunctionToFreeze.prototype ) ).to.be.true;
                expect( Object.isFrozen( controlFunctionToFreeze.prototype.x ) ).to.be.true;
                expect( Object.isFrozen( controlFunctionToFreeze.prototype.x.y ) ).to.be.true;
                expect( Object.isFrozen( controlFunctionToFreeze.prototype.x.y.z ) ).to.be.true;
                expect( Object.isFrozen( controlFunctionToFreeze.prototype.x.w ) ).to.be.true;
                expect( Object.isFrozen( InnerClass ) ).to.be.false;
                expect( Object.isFrozen( InnerClass.x ) ).to.be.false;
                expect( Object.isFrozen( InnerClass.x.y ) ).to.be.false;
                expect( Object.isFrozen( controlFunction ) ).to.be.false;
                expect( Object.isFrozen( controlFunction.x ) ).to.be.false;
                expect( Object.isFrozen( controlFunction.x.y ) ).to.be.false;
                expect( Object.isFrozen( controlFunctionToFreeze.a.b.c.d.e.willBeFrozen ) ).to.be.true;
            });
        });

        describe( '.deepFreezeObject', function() {

            it( 'failed init: invalid object', function() {

                const controlObject = 69;

                let erroredAsExpected = false;

                try {

                    subzero.deepFreezeObject( controlObject );
                }
                catch( err ) {

                    if( err instanceof TypeError ) {

                        expect( err.message ).to.equal( 'subzero error: invalid object' );

                        erroredAsExpected = true;
                    }
                }
                finally {

                    expect( erroredAsExpected ).to.be.true;
                }
            });

            it( 'normal operation', function() {

                const o =  {};

                const InnerClass = class {};

                InnerClass.x = {

                    y: {}
                };

                const controlFunction = function() {};

                controlFunction.x = {

                    y: {}
                };

                const willBeFrozen = {};

                o.a = {

                    b: {

                        c: {

                            d: {

                                InnerClass,

                                controlFunction,

                                e: Object.freeze({ willBeFrozen })
                            }
                        }
                    }
                };

                o.x = {

                    y: {

                        z: {}
                    },

                    w: {}
                };

                expect( subzero.deepFreezeObject( o ) ).to.equal( o );

                expect( Object.isFrozen( o ) ).to.be.true;
                expect( Object.isFrozen( o.a ) ).to.be.true;
                expect( Object.isFrozen( o.a.b ) ).to.be.true;
                expect( Object.isFrozen( o.a.b.c ) ).to.be.true;
                expect( Object.isFrozen( o.a.b.c.d ) ).to.be.true;
                expect( Object.isFrozen( o.x ) ).to.be.true;
                expect( Object.isFrozen( o.x.y ) ).to.be.true;
                expect( Object.isFrozen( o.x.y.z ) ).to.be.true;
                expect( Object.isFrozen( o.x.w ) ).to.be.true;
                expect( Object.isFrozen( InnerClass ) ).to.be.false;
                expect( Object.isFrozen( InnerClass.x ) ).to.be.false;
                expect( Object.isFrozen( InnerClass.x.y ) ).to.be.false;
                expect( Object.isFrozen( controlFunction ) ).to.be.false;
                expect( Object.isFrozen( controlFunction.x ) ).to.be.false;
                expect( Object.isFrozen( controlFunction.x.y ) ).to.be.false;
                expect( Object.isFrozen( o.a.b.c.d.e.willBeFrozen ) ).to.be.true;
            });
        });

        describe( '.megaFreezeClass', function() {

            it( 'failed init: invalid class', function() {

                const controlObject = 69;

                let erroredAsExpected = false;

                try {

                    subzero.megaFreezeClass( controlObject );
                }
                catch( err ) {

                    if( err instanceof TypeError ) {

                        expect( err.message ).to.equal( 'subzero error: invalid class' );

                        erroredAsExpected = true;
                    }
                }
                finally {

                    expect( erroredAsExpected ).to.be.true;
                }
            });

            it( 'normal operation', function() {

                const C = class {};

                const InnerClass = class {};

                const controlFunction = function() {};

                controlFunction.x = {

                    y: {}
                };

                InnerClass.x = {

                    y: {}
                };

                // be careful about objects within already frozen objects
                const wontBeFrozen = {};

                C.a = {

                    b: {

                        c: {

                            d: {

                                InnerClass,

                                controlFunction,

                                e: Object.freeze({ wontBeFrozen })
                            }
                        }
                    }
                };

                C.prototype.x = {

                    y: {

                        z: {}
                    },

                    w: {}
                };

                expect( subzero.megaFreezeClass( C ) ).to.equal( C );

                expect( Object.isFrozen( C ) ).to.be.true;
                expect( Object.isFrozen( C.a ) ).to.be.true;
                expect( Object.isFrozen( C.a.b ) ).to.be.true;
                expect( Object.isFrozen( C.a.b.c ) ).to.be.true;
                expect( Object.isFrozen( C.a.b.c.d ) ).to.be.true;
                expect( Object.isFrozen( C.prototype ) ).to.be.true;
                expect( Object.isFrozen( C.prototype.x ) ).to.be.true;
                expect( Object.isFrozen( C.prototype.x.y ) ).to.be.true;
                expect( Object.isFrozen( C.prototype.x.y.z ) ).to.be.true;
                expect( Object.isFrozen( C.prototype.x.w ) ).to.be.true;
                expect( Object.isFrozen( InnerClass ) ).to.be.true;
                expect( Object.isFrozen( InnerClass.x ) ).to.be.true;
                expect( Object.isFrozen( InnerClass.x.y ) ).to.be.true;
                expect( Object.isFrozen( controlFunction ) ).to.be.true;
                expect( Object.isFrozen( controlFunction.x ) ).to.be.true;
                expect( Object.isFrozen( controlFunction.x.y ) ).to.be.true;
                expect( Object.isFrozen( C.a.b.c.d.e.wontBeFrozen ) ).to.be.false;
            });
        });

        describe( '.megaFreezeClass (tested on a function)', function() {

            it( 'failed init: invalid class', function() {

                const controlFunction = 69;

                let erroredAsExpected = false;

                try {

                    subzero.megaFreezeClass( controlFunction );
                }
                catch( err ) {

                    if( err instanceof TypeError ) {

                        expect( err.message ).to.equal( 'subzero error: invalid class' );

                        erroredAsExpected = true;
                    }
                }
                finally {

                    expect( erroredAsExpected ).to.be.true;
                }
            });

            it( 'normal operation', function() {

                const controlFunctionToFreeze = function() {};

                const InnerClass = class {};

                const controlFunction = function() {};

                controlFunction.x = {

                    y: {}
                };

                InnerClass.x = {

                    y: {}
                };

                const wontBeFrozen = {};

                controlFunctionToFreeze.a = {

                    b: {

                        c: {

                            d: {

                                InnerClass,

                                controlFunction,

                                e: Object.freeze({ wontBeFrozen })
                            }
                        }
                    }
                };

                controlFunctionToFreeze.prototype.x = {

                    y: {

                        z: {}
                    },

                    w: {}
                };

                expect( subzero.megaFreezeClass( controlFunctionToFreeze ) ).to.equal( controlFunctionToFreeze );

                expect( Object.isFrozen( controlFunctionToFreeze ) ).to.be.true;
                expect( Object.isFrozen( controlFunctionToFreeze.a ) ).to.be.true;
                expect( Object.isFrozen( controlFunctionToFreeze.a.b ) ).to.be.true;
                expect( Object.isFrozen( controlFunctionToFreeze.a.b.c ) ).to.be.true;
                expect( Object.isFrozen( controlFunctionToFreeze.a.b.c.d ) ).to.be.true;
                expect( Object.isFrozen( controlFunctionToFreeze.prototype ) ).to.be.true;
                expect( Object.isFrozen( controlFunctionToFreeze.prototype.x ) ).to.be.true;
                expect( Object.isFrozen( controlFunctionToFreeze.prototype.x.y ) ).to.be.true;
                expect( Object.isFrozen( controlFunctionToFreeze.prototype.x.y.z ) ).to.be.true;
                expect( Object.isFrozen( controlFunctionToFreeze.prototype.x.w ) ).to.be.true;
                expect( Object.isFrozen( InnerClass ) ).to.be.true;
                expect( Object.isFrozen( InnerClass.x ) ).to.be.true;
                expect( Object.isFrozen( InnerClass.x.y ) ).to.be.true;
                expect( Object.isFrozen( controlFunction ) ).to.be.true;
                expect( Object.isFrozen( controlFunction.x ) ).to.be.true;
                expect( Object.isFrozen( controlFunction.x.y ) ).to.be.true;
                expect( Object.isFrozen( controlFunctionToFreeze.a.b.c.d.e.wontBeFrozen ) ).to.be.false;
            });
        });

        describe( '.megaFreezeObject', function() {

            it( 'failed init: invalid object', function() {

                const controlObject = 69;

                let erroredAsExpected = false;

                try {

                    subzero.megaFreezeObject( controlObject );
                }
                catch( err ) {

                    if( err instanceof TypeError ) {

                        expect( err.message ).to.equal( 'subzero error: invalid object' );

                        erroredAsExpected = true;
                    }
                }
                finally {

                    expect( erroredAsExpected ).to.be.true;
                }
            });

            it( 'normal operation', function() {

                const o =  {};

                const InnerClass = class {};

                InnerClass.x = {

                    y: {}
                };

                const controlFunction = function() {};

                controlFunction.x = {

                    y: {}
                };

                // be careful about objects within already frozen objects
                const wontBeFrozen = {};

                o.a = {

                    b: {

                        c: {

                            d: {

                                InnerClass,

                                controlFunction,

                                e: Object.freeze( { wontBeFrozen } )
                            }
                        }
                    }
                };

                o.x = {

                    y: {

                        z: {}
                    },

                    w: {}
                };

                expect( subzero.megaFreezeObject( o ) ).to.equal( o );

                expect( Object.isFrozen( o ) ).to.be.true;
                expect( Object.isFrozen( o.a ) ).to.be.true;
                expect( Object.isFrozen( o.a.b ) ).to.be.true;
                expect( Object.isFrozen( o.a.b.c ) ).to.be.true;
                expect( Object.isFrozen( o.a.b.c.d ) ).to.be.true;
                expect( Object.isFrozen( o.x ) ).to.be.true;
                expect( Object.isFrozen( o.x.y ) ).to.be.true;
                expect( Object.isFrozen( o.x.y.z ) ).to.be.true;
                expect( Object.isFrozen( o.x.w ) ).to.be.true;
                expect( Object.isFrozen( InnerClass ) ).to.be.true;
                expect( Object.isFrozen( InnerClass.x ) ).to.be.true;
                expect( Object.isFrozen( InnerClass.x.y ) ).to.be.true;
                expect( Object.isFrozen( controlFunction ) ).to.be.true;
                expect( Object.isFrozen( controlFunction.x ) ).to.be.true;
                expect( Object.isFrozen( controlFunction.x.y ) ).to.be.true;
                expect( Object.isFrozen( o.a.b.c.d.e.wontBeFrozen ) ).to.be.false;
            });
        });
    });
});

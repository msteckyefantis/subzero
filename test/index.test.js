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

                C.a = {

                    b: {

                        c: {

                            d: {

                                InnerClass
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

                o.a = {

                    b: {

                        c: {

                            d: {

                                InnerClass
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
            });
        });
    });
});

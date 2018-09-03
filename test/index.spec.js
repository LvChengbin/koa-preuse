const Koa = require( 'koa' );
const preuse = require( '../' );
const context = require( './context' );

describe( 'preuse', () => {
    it( 'executed', done => {
        const app = new Koa();        
        preuse( app, () => done() );
        app.callback()( ...context() );
    } ); 

    it( 'ordered', done => {
        let res = [];
        const app = new Koa();        
        preuse( app, ( ctx, next ) => {
            res.push( 1 );
            next();
        } );
        preuse( app, ( ctx, next ) => {
            res.push( 2 );
            next();
        } );
        preuse( app, ( ctx, next ) => {
            res.push( 3 );
            next();
        } );
        preuse( app, ( ctx, next ) => {
            res.push( 4 );
            next();
        } );
        preuse( app, ( ctx, next ) => {
            res.push( 5 );
            next();
        } );
        app.callback()( ...context() ).then( () => {
            expect( res ).toEqual( [ 5, 4, 3, 2, 1 ] );
            done();
        } );
    } );

    it( 'with other middleware', done => {
        let res = [];
        const app = new Koa();        
        app.use( () => {
            res.push( 6 );
            expect( res ).toEqual( [ 5, 4, 3, 2, 1, 6 ] );
            done();
        } );
        preuse( app, ( ctx, next ) => {
            res.push( 1 );
            next();
        } );
        preuse( app, ( ctx, next ) => {
            res.push( 2 );
            next();
        } );
        preuse( app, ( ctx, next ) => {
            res.push( 3 );
            next();
        } );
        preuse( app, ( ctx, next ) => {
            res.push( 4 );
            next();
        } );
        preuse( app, ( ctx, next ) => {
            res.push( 5 );
            next();
        } );
        app.callback()( ...context() );
    } );
} );

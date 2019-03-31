let should = require('should'),
	sinon = require('sinon'),
	chai = require('chai');
import { graphql } from 'graphql';

let model = require('../../../models');
import Schema from '../../../graphql';
import loaders from '../../../graphql/loaders';
import {dummyAuthors, dummyQuotes} from './testData';

//SET THE GRAPHQL SCHEMA.
const graphQLServer = function(authorQuery){
	return graphql({
			schema: Schema,
			source: authorQuery,
			contextValue: { models: model, loaders }
	});
}

describe('Author - Author Controller UNIT TESTING - ', function () {
  let sandbox = null;

	let AuthorModel = model.author;
  let QuoteModel = model.quote;
	let AuthorCtrl = require('../../resolvers/author').default;

  const authorQuery = `
					query{
						authors{
							id
							name
							quotes{
								id
								quote
							}
						}
					}
      `;
	before(function(){
		//console.log("--- initialzing MAIN DESCRIBE ---");
		//Move all functins that are being stubbed over here.
  });

	after(function () {
			//console.log("--- restoring  MAIN DESCRIBE ---");
	});

	describe('Get All Authors Test', function () {
		let authorGetAllStub;
    let quoteGetAllStub;
    let quotesByIdsStub;
		before(function(){
	    sandbox = sinon.sandbox.create();
	    authorGetAllStub = sandbox.stub(AuthorModel, 'findAll').callsFake(function() {
          return dummyAuthors;
      });

      quoteGetAllStub = sandbox.stub(QuoteModel, 'findAll').callsFake(function() {
          return dummyQuotes;
      });
      /*
      quotesByIdsStub = sandbox.stub(loaders.quotesByIds, 'load').callsFake(function() {
          return dummyQuotes;
      });
      */
	  });

		after(function () {
				sandbox && sandbox.restore();
		});

		it('Should call findAll Once on the Authors and Quote Model', async function () {
			let result = await graphQLServer(authorQuery);
			//console.log(result.data.authors[0].quotes);
			result.should.have.property('data')
			.and.have.property('authors');
      sinon.assert.calledOnce(authorGetAllStub);
      sinon.assert.calledOnce(quoteGetAllStub);
      //sinon.assert.calledOnce(quotesByIdsStub);
		});

	});

});

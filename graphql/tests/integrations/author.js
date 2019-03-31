//import request from 'supertest-as-promised';
import request from 'supertest';
import httpStatus from 'http-status';
import chai from 'chai';
let should = require('should');
//import app from '../../../index';
//import models from '../../models/';

let app = require('../../../server.js');
let model = require('../../../models');

describe('AUTHOR CRUD Integration Testing', function () {

  /*
  before(async () => {
    models.sequelize.sync().then(()=>{
        done();
    });
  });
  */


  /*
  before(async () => {
    //return await models.sequelize.sync({ force: true });
    return await models.sequelize.sync();
  });
  */
  after(async ()=>{
		process.exit();
    /*
    models.sequelize.close().then(()=>{
        done();
    });
    */
    //return await models.sequelize.close();
  });

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

	const authorOnlyQuery = `
					query{
						authors{
							id
							name
						}
					}
      `;

  describe('# GET All the Authors', function () {

    it('Should get all the Authors and Quotes', (done) => {
			let requestBody = {
					"query": authorQuery,
					"variables":null
			};
      request(app)
        .post('/graphql')
				.send(requestBody)
        .expect(httpStatus.OK)
				.end(function(err, res) {
					if (err) return done(err);
					let result = res.body;
					result.should.have.property('data')
					done();
				});

    });

		it('Should get all the Authors only', (done) => {
			let requestBody = {
					"query": authorOnlyQuery,
					"variables":null
			};
      request(app)
        .post('/graphql')
				.send(requestBody)
        .expect(httpStatus.OK)
				.end(function(err, res) {
					if (err) return done(err);
					let result = res.body;
					result.should.have.property('data')
					done();
				});
    });

	});


});

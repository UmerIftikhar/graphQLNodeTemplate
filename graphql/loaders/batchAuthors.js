import _ from 'lodash';
import models from '../../models/index.js';

let DataLoader = require('dataloader');

let authorsById = new DataLoader(getAuhtorsByID);


async function getAuhtorsByID(authorIds){
  let authors = await models.author.findAll({ where: { id: authorIds }, raw: true  });
  /*
  let data = authors.map((author) => author.get({ plain: true }));
  return data;
  */
  return authors;
  /*
	let quotes = await models.quote.findAll({ where: { author_id: authorIds } });
	let data = quotes.map((quote) => quote.get({ plain: true }));
	const groupQuotes = _.groupBy(data, 'author_id');
	return authorIds.map(aId => groupQuotes[aId] || []);
  */
}

export default authorsById;

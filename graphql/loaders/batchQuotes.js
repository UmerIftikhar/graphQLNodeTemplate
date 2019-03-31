import _ from 'lodash';
import models from '../../models/index.js';

let DataLoader = require('dataloader');

let quotesByIds = new DataLoader(getTagsByID);


async function getTagsByID(authorIds){
	let quotes = await models.quote.findAll({ where: { author_id: authorIds }, raw: true });
	/*
	let data = quotes.map((quote) => quote.get({ plain: true }));
	const groupQuotes = _.groupBy(data, 'author_id');
	*/
	const groupQuotes = _.groupBy(quotes, 'author_id');
	return authorIds.map(aId => groupQuotes[aId] || []);
}

export default quotesByIds;

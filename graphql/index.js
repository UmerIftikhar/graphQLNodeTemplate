import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import { makeExecutableSchema } from 'graphql-tools';
import path from 'path';

const typesArray = fileLoader(path.join(__dirname, './schema'), { recursive: true })
const typeDefs = mergeTypes(typesArray, { all: true })
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')));

const Schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default Schema;

/*
export default {
    typeDefs,
    resolvers,
};
*/

/*
import authorInput from './schema/inputs/author.js';
import authorMutation from './schema/mutations/author.js';
import authorQueries from './schema/queries/author.js';
import authorTypes from './schema/types/author.js';
import quoteInput from './schema/inputs/quote.js';
import quoteQueries from './schema/queries/quote.js';
import quoteTypes from './schema/types/quote.js';

const typeDefinitions = [
  authorInput,
  authorMutation,
  authorQueries,
  authorTypes,
  quoteInput,
  quoteQueries,
  quoteTypes
];

const typeDefs = mergeTypes(typeDefinitions);
*/

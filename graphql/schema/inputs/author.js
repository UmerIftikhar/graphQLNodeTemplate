export default `
input AuthorInput {
  name: String!,
  last_name: String!,
  quotes: [QuoteInput!]
}
`





/*
import {
  GraphQLInputObjectType,
  GraphQLString
} from 'graphql';

export default new GraphQLInputObjectType({
  name: 'authorinput',
  fields: () => ({
      name: { type: GraphQLString },
      last_name: { type: GraphQLString },
      name: { type: GraphQLString },
  })
});
*/

export default {
  Mutation: {
    createAuthor: async (parent, args, { models }, info) => {
      return models.author.build({
          name: args.author.name,
          last_name: args.author.last_name
      }).save().then(function(newAuthor) {
          return models.author.findById(newAuthor.id);
      });
    }
  },
  Query: {
    authors: async (parent, args, { models }, info) => {
      return models.author.findAll({where: args});
    },
    author: async (parent, args, { models, user }, info) => {
      return models.author.findById(args.id);
    }
  },
  Author: {
    quotes: async ({ id }, args, { models, loaders }, info) => {
      let authorQuotes = await loaders.quotesByIds.load(id);
      return authorQuotes;
      //return loaders.quotesByIds.load(id);
      //return models.quote.findAll({ where: { author_id: id } });
    }
  }
};

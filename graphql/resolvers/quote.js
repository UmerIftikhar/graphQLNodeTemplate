export default {
  Query: {
    quote: (parent, args, { models }, info) => {
      return model.quote.findById(args.id);
    },
    quotes: (parent, args, { models, user }, info) => {
      return models.quote.findAll({where: args, include: [ { model: models.author } ] });
    }
  },
  Quote: {
    author: (obj, args, { models, loaders }, info) => {
      return loaders.authorsById.load(obj.author_id);
      /*
      let author_id = obj.author_id;
      return models.author.findById(author_id);
      */
      //return loaders.quotesByIds.load(id);
      //return models.quote.findAll({ where: { author_id: id } });
    }
  }
};

export default `

type Query {
  quote(id: Int!): Quote!
  quotes(author_id: Int!): [Quote!]!
}

`

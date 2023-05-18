import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLBoolean,
} from "graphql";

import { IEvent } from "./resolver/events/typings";
import addEvent from "./resolver/events/create";
import viewEvent from "./resolver/events/view";
import listEvents from "./resolver/events/list";
import removeEvent from "./resolver/events/remove";

const eventType = new GraphQLObjectType({
  name: "Event",
  fields: {
    id: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: new GraphQLNonNull(GraphQLString) },
  },
});

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    fields: {
      listEvents: {
        type: new GraphQLList(eventType),
        resolve: (parent) => {
          return listEvents();
        },
      },
      viewEvent: {
        args: {
          id: { type: new GraphQLNonNull(GraphQLString) },
        },
        type: eventType,
        resolve: (parent, args: { id: string }) => {
          return viewEvent(args.id);
        },
      },
    },
  }),

  mutation: new GraphQLObjectType({
    name: "Mutation",
    fields: {
      createEvent: {
        args: {
          name: { type: new GraphQLNonNull(GraphQLString) },
          description: { type: new GraphQLNonNull(GraphQLString) },
        },
        type: eventType,
        resolve: (parent, args: IEvent) => {
          return addEvent(args);
        },
      },
      removeProduct: {
        args: {
          id: { type: new GraphQLNonNull(GraphQLString) },
        },
        type: GraphQLBoolean,
        resolve: (parent, args: { id: string }) => {
          return removeEvent(args.id);
        },
      },
    },
  }),
});
export default schema;

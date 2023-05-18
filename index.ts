// import { Event, Response } from "./type";
// const servicesConstant = require("./config/servicesConstant.js");

// exports.handler = async (event: Event) => {
//   const serviceName = event["serviceName"];
//   const payload = event["payload"];
//   // responses objects
//   const response: Response = {
//     statusCode: 200,
//     body: JSON.stringify("Hello from Lambda!"),
//   };
//   try {
//     console.log("serviceName============", serviceName);
//     /* code */
//     if (servicesConstant.hasOwnProperty(serviceName)) {
//       let services = servicesConstant[serviceName].jobs;
//       response["result"] = await services.startExicution(payload);
//       response["body"] = "successfully exicuted!";
//     } else {
//       throw JSON.stringify("No such job registered to the service!");
//     }
//   } catch (error) {
//     console.log("Error ====>", error);
//     response["statusCode"] = 400;
//     response["body"] = JSON.stringify(error);
//   }
//   return response;
// };
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./src/schema";
import express from "express";

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

const port = 4000;
app.listen({ port }, () =>
  console.log(`Server running at http://localhost:${port}${server.graphqlPath}`)
);

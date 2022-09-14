
// import { Window } from "happy-dom";

import Document from "./document";
const Node_1 = (require("../../node_modules/happy-dom/lib/nodes/node/Node"));

export const window = {
  document: new Document(),
  Node: Node_1.default

};

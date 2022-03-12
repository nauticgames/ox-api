import { app, port } from "./server";

app.listen(port, () => {
  console.log("Server listen in port", port);
});

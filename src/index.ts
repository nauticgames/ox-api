import server from "./config/server";
import app from "./server";
import cron from "node-cron";
import ReSyncStadiums from "./functions/ReSyncStadiums";

cron.schedule("*/2  * * * *", () => {
  console.log("Syncing stadiums");
  ReSyncStadiums({ bucketName: server.aws.stadiumsBucket });
});

app.listen(server.port, () => {
  console.log("Server listen in port", server.port);
});

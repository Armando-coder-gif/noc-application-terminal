import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronService } from "./cron/cron-service";

export class Server {
  static start(): void {
    console.log("Server started...");
    CronService.createJob("*/5 * * * * *", () => {
      const url: string = "https://google.com";
      new CheckService(
        () => {
          console.log(`${url} is ok`);
        },
        (error: string) => {
          console.log(error);
        }
      ).execute(url);
      // new CheckService().execute("http://localhost:3000");
    });
  }
}

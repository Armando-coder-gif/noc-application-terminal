import { CronJob } from "cron";

export class Server {
  static start(): void {
    console.log("Server started...");

    const job = new CronJob(
      "*/3 * * * * *", // cronTime
      () => {
        const date = new Date();
        console.log("3 second", date);
      }
    );

    job.start();
  }
}

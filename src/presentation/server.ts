import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDataSource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";

const fileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDataSource()
);

export class Server {
  static start(): void {
    console.log("Server started...");

    // mandar email

    // CronService.createJob("*/5 * * * * *", () => {
    //   const url: string = "https://www.google.com";
    //   new CheckService(
    //     fileSystemLogRepository,
    //     () => {
    //       console.log(`${url} is ok`);
    //     },
    //     (error: string) => {
    //       console.log(error);
    //     },
    //   ).execute(url);
    //   // new CheckService().execute("http://localhost:3000");
    // });
  }
}

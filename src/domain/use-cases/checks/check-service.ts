import {
  LogEntity,
  LogEntityOptions,
  LogSeverityLevel,
} from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface CheckServiceUseCase {
  execute(url: string): Promise<boolean>;
}

type SuccessCallBack = () => void | undefined;
type ErrorCallBack = (error: string) => void | undefined;

export class CheckService implements CheckServiceUseCase {
  constructor(
    private readonly logRepository: LogRepository,
    private readonly SuccessCallBack?: SuccessCallBack,
    private readonly ErrorCallBack?: ErrorCallBack,
  ) {}

  async execute(url: string): Promise<boolean> {
    try {
      const req = await fetch(url);
      if (!req.ok) {
        throw new Error(`Error on checking service ${url}`);
      }

      const log = new LogEntity({
        level: LogSeverityLevel.LOW,
        message: `Service ${url} working`,
        origin: "check-service.ts",
      });
      this.logRepository.saveLog(log);

      // Call success callback if provided
      this.SuccessCallBack && this.SuccessCallBack();
      return true;
    } catch (error) {
      const errorMessage = `${url} is not ok. ${error}`;

      const log = new LogEntity({
        level: LogSeverityLevel.HIGH,
        message: errorMessage,
        origin: "check-service.ts",
      });
      this.logRepository.saveLog(log);

      // Call error callback if provided
      this.ErrorCallBack && this.ErrorCallBack(errorMessage);
      return false;
    }
  }
}

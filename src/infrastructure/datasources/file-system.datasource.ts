import fs from 'fs'
import path from 'path'
import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";




export class FileSystemDataSource implements LogDataSource {
  private readonly logPath: string = path.join(__dirname, "../../../logs");
  private readonly lowLogPath: string = path.join(__dirname, "../../../logs/logs-low.log");
  private readonly mediumLogPath: string = path.join(__dirname, "../../../logs/logs-medium.log");
  private readonly highLogPath: string = path.join(__dirname, "../../../logs/logs-high.log");

  constructor() {
    this.createLogsFiles();
  }

  private createLogsFiles = () => {
    if (!fs.existsSync(this.logPath)) {
      fs.mkdirSync(this.logPath);
    }

    [this.lowLogPath, this.mediumLogPath, this.highLogPath].forEach((path) => {
      if (fs.existsSync(path)) return;
      fs.writeFileSync(path, ""); // archivo vacio
    });
  };

  async saveLog(newLog: LogEntity): Promise<void> {
    const logAsJSON: string = JSON.stringify(newLog);

    fs.appendFileSync(this.lowLogPath, logAsJSON);

    if (newLog.level === LogSeverityLevel.LOW) return;

    if (newLog.level === LogSeverityLevel.MEDIUM) {
      fs.appendFileSync(this.mediumLogPath, logAsJSON);
    } else {
      fs.appendFileSync(this.highLogPath, logAsJSON);
    }
  }

  private getLogsFromFile = (path: string): LogEntity[] => {
    const content = fs.readFileSync(path, "utf-8");
    const logs = content.split("\n").map((log) => LogEntity.fromJson(log));

    return logs;
  };

  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    switch (severityLevel) {
      case LogSeverityLevel.LOW:
        return this.getLogsFromFile(this.lowLogPath);
      case LogSeverityLevel.MEDIUM:
        return this.getLogsFromFile(this.mediumLogPath);
      case LogSeverityLevel.HIGH:
        return this.getLogsFromFile(this.highLogPath);
      default:
        throw new Error(`${severityLevel} not implemented`);
    }
  }
}

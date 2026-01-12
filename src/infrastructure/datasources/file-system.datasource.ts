import fs from 'fs'
import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";




export class FileSystemDataSource implements LogDataSource {

    private readonly logPath: string = "/logs";
    private readonly lowLogPath: string = "/logs/logs-low.log";
    private readonly mediumLogPath: string = "/logs/logs-medium.log";
    private readonly highLogPath: string = "/logs/logs-high.log";


    constructor() {
        this.createLogsFiles();
    }

    private createLogsFiles = () => {
        if(!fs.existsSync(this.logPath)) {
            fs.mkdirSync(this.logPath);
        }

        // se puede optimizar este codigo
        // if(fs.existsSync(this.lowLogPath)) return;
        // fs.writeFileSync(this.lowLogPath, '');

        [
            this.lowLogPath,
            this.mediumLogPath,
            this.highLogPath
        ].forEach( path => {
            if (fs.existsSync(path)) return;
            fs.writeFileSync(path, ''); // archivo vacio
        });
    }

    saveLog(log: LogEntity): Promise<void> {
        throw new Error("Method not implemented.");
    }

    getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        throw new Error("Method not implemented.");
    }



}

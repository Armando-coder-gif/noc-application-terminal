export enum LogSeverityLevel{
    LOW = 'low',
    MEDIUM = 'medium',
    HIGH = 'high'
}


export class LogEntity{

    public level: LogSeverityLevel; // Enum
    public message: string;
    public createdAt: Date;

    constructor(message: string, level: LogSeverityLevel){
        this.message = message;
        this.level = level;
        this.createdAt = new Date();

    }

}

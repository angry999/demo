
import { Logger, LoggerService, LogLevel, Optional } from '@nestjs/common';
const fs = require('fs')

export class RollingLogger implements LoggerService {
    private static logLevels: LogLevel[] = [
        'log',
        'error',
        'warn',
        'debug',
        'verbose',
    ];
    private static lastTimestamp?: number;
    private static logFileName?: string;
    protected static instance?: typeof RollingLogger | LoggerService = RollingLogger;

    constructor(
        @Optional() protected context?: string,
        @Optional() private readonly isTimestampEnabled = false,
    ) {
    }

    error(message: any, trace = '', context?: string) {
        const instance = this.getInstance();
        if (!this.isLogLevelEnabled('error')) {
            return;
        }
        instance &&
            instance.error.call(instance, message, trace, context || this.context);
    }

    log(message: any, context?: string) {
        this.callFunction('log', message, context);
    }

    warn(message: any, context?: string) {
        this.callFunction('warn', message, context);
    }

    debug(message: any, context?: string) {
        this.callFunction('debug', message, context);
    }

    verbose(message: any, context?: string) {
        this.callFunction('verbose', message, context);
    }

    setContext(context: string) {
        this.context = context;
    }

    getTimestamp() {
        return RollingLogger.getTimestamp();
    }

    static overrideLogger(logger: LoggerService | LogLevel[] | boolean) {
        if (Array.isArray(logger)) {
            this.logLevels = logger;
            return;
        }
        this.instance = logger as LoggerService;
    }

    static log(message: any, context = '', isTimeDiffEnabled = true) {
        this.printMessage('LOG', message, context, isTimeDiffEnabled);
    }

    static error(
        message: any,
        trace = '',
        context = '',
        isTimeDiffEnabled = true,
    ) {
        this.printMessage('ERROR', message, context, isTimeDiffEnabled);
        this.printStackTrace(trace);
    }

    static warn(message: any, context = '', isTimeDiffEnabled = true) {
        this.printMessage('WARN', message, context, isTimeDiffEnabled);
    }

    static debug(message: any, context = '', isTimeDiffEnabled = true) {
        this.printMessage('DEBUG', message, context, isTimeDiffEnabled);
    }

    static verbose(message: any, context = '', isTimeDiffEnabled = true) {
        this.printMessage('VERBOSE', message, context, isTimeDiffEnabled);
    }
    static getTimestamp() {
        const localeStringOptions = {
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            day: '2-digit',
            month: '2-digit',
        };
        return new Date(Date.now()).toLocaleString(undefined, localeStringOptions);
    }

    private callFunction(
        name: 'log' | 'warn' | 'debug' | 'verbose',
        message: any,
        context?: string,
    ) {
        if (!this.isLogLevelEnabled(name)) {
            return;
        }
        const instance = this.getInstance();
        const func = instance && (instance as typeof Logger)[name];
        func &&
            func.call(
                instance,
                message,
                context || this.context,
                this.isTimestampEnabled,
            );
    }

    protected getInstance(): typeof RollingLogger | LoggerService {
        const { instance } = RollingLogger;
        return instance === this ? RollingLogger : instance;
    }

    private isLogLevelEnabled(level: LogLevel): boolean {
        return RollingLogger.logLevels.includes(level);
    }

    private static printMessage(
        level: string,
        message: any,
        context = '',
        isTimeDiffEnabled?: boolean
    ) {
        const output = typeof message != 'string'
            ? `${'Object:'}\n${JSON.stringify(message, null, 2)}\n`
            : message;

        const pidMessage = `[${level}] ${process.pid}-`;
        const contextMessage = context;
        const timestampDiff = this.updateAndGetTimestampDiff(isTimeDiffEnabled);
        const instance = (this.instance as typeof Logger) ?? Logger;
        const computedMessage = `${pidMessage}${RollingLogger.getTimestamp()} ${contextMessage} ${output}${timestampDiff}\n`;

        process.stdout.write(computedMessage);
        this.print(computedMessage);
    }

    private static updateAndGetTimestampDiff(
        isTimeDiffEnabled?: boolean,
    ): string {
        const includeTimestamp = RollingLogger.lastTimestamp && isTimeDiffEnabled;
        const result = includeTimestamp
            ? ` +${Date.now() - RollingLogger.lastTimestamp}ms`
            : '';
        RollingLogger.lastTimestamp = Date.now();
        return result;
    }

    private static printStackTrace(trace: string) {
        if (!trace) {
            return;
        }
        process.stderr.write(trace);
        this.print(`${trace}\n`);
    }

    private static print(text: string) {
        let now = new Date();
        let nowAsString = now.toISOString().substr(0, 13).replace(':', '-');
        let baseName = (process.env.APP_LOG === undefined) ? 'app' : process.env.APP_LOG;
        let logFileName = `${baseName}-${nowAsString}.log`;
        if (this.logFileName !== logFileName) {
            this.logFileName = logFileName;
        }        
        fs.appendFile(this.logFileName, text, (err) => {
            if (err) throw err;
        });        
    }
}
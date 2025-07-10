type LogLevel = 'INFO' | 'WARN' | 'ERROR';

function formatLog(level: LogLevel, message: string, data?: any) {
  const timestamp = new Date().toISOString();
  let log = `[${timestamp}] [${level}] ${message}`;
  if (data !== undefined) {
    log += ` | data: ${JSON.stringify(data)}`;
  }
  return log;
}

export const logger = {
  info(message: string, data?: any) {
    console.log(formatLog('INFO', message, data));
  },
  warn(message: string, data?: any) {
    console.warn(formatLog('WARN', message, data));
  },
  error(message: string, data?: any) {
    console.error(formatLog('ERROR', message, data));
  },
};

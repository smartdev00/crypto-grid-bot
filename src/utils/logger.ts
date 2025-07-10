type LogLevel = 'INFO' | 'WARN' | 'ERROR';

function getLevelColor(level: LogLevel): string {
  switch (level) {
    case 'INFO':
      return '\x1b[32m'; // Green
    case 'WARN':
      return '\x1b[33m'; // Yellow (closest to orange)
    case 'ERROR':
      return '\x1b[31m'; // Red
    default:
      return '';
  }
}

function formatLog(level: LogLevel, message: string, data?: any) {
  const timestamp = new Date().toISOString();
  const levelColor = getLevelColor(level);
  const coloredLevel = `${levelColor}${level}\x1b[0m`;
  const coloredMessage = `\x1b[35m${message}\x1b[0m`; // Purple (magenta)
  let log = `[${timestamp}] [${coloredLevel}] ${coloredMessage}`;
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

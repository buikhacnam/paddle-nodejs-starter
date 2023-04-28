import { createLogger, format, transports } from 'winston'

import DailyRotateFile from 'winston-daily-rotate-file'

const logger = createLogger({
	level: 'info',
	format: format.combine(format.timestamp(), format.json()),
	transports: [
		new transports.Console(),
		new DailyRotateFile({
			filename: 'logs/application-%DATE%.log',
			datePattern: 'YYYY-MM-DD',
			zippedArchive: true,
			maxSize: '20m',
			maxFiles: '14d',
		}),
	],
})

export default logger

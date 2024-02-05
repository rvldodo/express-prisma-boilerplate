import bunyan, { LoggerOptions, Stream, LogLevelString } from "bunyan";
import bFormat from "bunyan-format";
import colors from "colors";

const formatOut = bFormat({ outputMode: "long", color: true });
let level: LogLevelString = "info";

const stream: Stream = {
  stream: formatOut,
  level,
};

const log = bunyan.createLogger({
  name: "Express-prisma-boilerplate",
  // stream: process.stdout,
  streams: [stream],
  serializers: bunyan.stdSerializers,
});

const debug = (obj: any, msg?: string) => {
  log.debug(colors.gray(obj), msg || "");
};
const info = (obj: any, msg?: string) => {
  log.info(colors.white(obj), msg || "");
};
const warn = (obj: any, msg?: string) => {
  log.warn(colors.yellow(obj), msg || "");
};
const error = (obj: any, msg?: string) => {
  log.warn(colors.red(obj), msg || "");
};

export default { debug, info, warn, error };

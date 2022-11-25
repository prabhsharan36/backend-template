import tracer from "tracer";
import colors from "colors";
import config from "../config";

const Logger = tracer.console({
  level: config.logs.level,
  preprocess(data: {title: string}) {
    data.title = data.title.toUpperCase();
  },

  format: [
    "{{timestamp}} <{{title}}> {{message}} (in {{file}}:{{line}})", // default format
    {
      info: "<{{title}}> {{message}}", // information format
    },
  ],
  dateformat: "HH:MM:ss.L",
  filters: {
    log: colors.white,
    trace: colors.magenta,
    debug: colors.blue,
    fatal: colors.bgRed,
    info: colors.green,
    warn: colors.yellow,
    error: [colors.red, colors.bold],
  },
});

export default Logger;

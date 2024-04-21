const logType = {
  ERROR: 31,
  INFO: 32,
  WARN: 33,
};

export function logger(
  type: "ERROR" | "INFO" | "WARN",
  data?: any,
  message?: any
) {
  if (process.env['DISABLED_LOGS'] !== "true") {
    console.log(
      `\x1b[${logType[type] || 33}m%s\x1b[0m`,
      `[${type || "INFO"}] ${new Date().toLocaleString()} : ${message || ""}=>`,
      JSON.stringify(data)
    );
  }
}

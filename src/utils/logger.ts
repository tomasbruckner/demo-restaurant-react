const Logger = {
  info(...args: unknown[]) {
    // eslint-disable-next-line no-console
    console.log(...args);
  },
  error(...args: unknown[]) {
    // eslint-disable-next-line no-console
    console.error(...args);
  },
};

export default Logger;

const WSOptions = {
  clientConfig: {
    keepalive: true,
    keepaliveInterval: 1000, // ms
  },
  reconnect: {
    auto: true,
    delay: 1000,
    maxAttempts: 10,
    onTimeout: false,
  },
};

export default WSOptions;

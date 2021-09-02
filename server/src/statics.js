const envs = {
  dev: {
    env: "development",
    host: "0.0.0.0",
    port: 8080,
  },
  prod: {
    env: "production",
    host: "0.0.0.0",
    port: 8080,
  },
  test: {
    env: "test",
    host: "0.0.0.0",
    port: 8080,
  },
};

export default envs[process.env.NODE_ENV];

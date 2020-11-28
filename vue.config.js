const config = {
  devServer: {
    proxy:
      process.env.NODE_ENV === "development" ? "http://localhost:8090" : "/",
    disableHostCheck: true,
  },
};

module.exports = config;

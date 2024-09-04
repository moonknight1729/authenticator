const Auth=require("./auth")

const Router = (server) => {
  server.get("/v1", (req, res) => {
    try {
      res.status(200).json({
        status: "Success",
        data: [],
        message: "Welcome to our API homepage",
      });
    } catch (err) {
      res.status(500).json({
        status: "Error",
        message: "Internal Server Error",
      });
    }
  });
  
  server.use("/v1/auth",Auth);
};
module.exports=Router

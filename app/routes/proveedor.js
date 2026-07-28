module.exports = app => {
    const proveedor = require("../controllers/proveedor.controller.js");
    var router = require("express").Router();
    router.post("/create", proveedor.create);
    router.get("/", proveedor.findAll);
    router.get("/status", proveedor.findAllStatus);
    router.get("/:id", proveedor.findOne);
    router.put("/update/:id", proveedor.update);
    router.delete("/delete/:id", proveedor.delete);
    router.delete("/delete", proveedor.deleteAll);
    app.use("/api/proveedores", router);
}; 
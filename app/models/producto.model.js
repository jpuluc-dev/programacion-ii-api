module.exports = (sequelize, Sequelize) => {
    const Producto = sequelize.define("producto", {
        nombre: {
            type: Sequelize.STRING
        },
        categoria: {
            type: Sequelize.STRING
        },
        codigo: {
            type: Sequelize.STRING
        },
        precio: {
            type: Sequelize.FLOAT
        },
        stock: {
            type: Sequelize.INTEGER
        },
        proveedor: {
            type: Sequelize.STRING
        },
        fecha_ingreso: {
            type: Sequelize.DATE
        }
    });
    return Producto;
};
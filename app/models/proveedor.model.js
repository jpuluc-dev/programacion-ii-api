module.exports = (sequelize, Sequelize) => {
    const Proveedor = sequelize.define("proveedor", {
        nombre: {
            type: Sequelize.STRING
        },
        contacto: {
            type: Sequelize.STRING
        },
        telefono: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.BOOLEAN
        }
    });
    return Proveedor;
};
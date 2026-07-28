const db = require("../models");
const Proveedor = db.proveedor;
const Op = db.Sequelize.Op;


exports.create = (req, res) => {
    if (!req.body.nombre) {
        res.status(400).send({
            message: "El contenido no puede estar vacio!"
        });
        return;
    }


    const proveedor = {
        nombre: req.body.nombre,
        contacto: req.body.contacto,
        telefono: req.body.telefono,
        status: req.body.status ? req.body.status : true
    };


    Proveedor.create(proveedor)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Se produjo un error al crear al proveedor!"
            });
        });
};


exports.findAll = (req, res) => {
    const nombre = req.query.nombre;
    var condition = nombre ? { nombre: { [Op.iLike]: `%${nombre}%` } } : null;

    Proveedor.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Se produjo un error al recuperar los proveedores!"
            });
        });
};


exports.findOne = (req, res) => {
    const id = req.params.id;

    Proveedor.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al recuperar al proveedor con id=" + id
            });
        });
};


exports.update = (req, res) => {
    const id = req.params.id;

    Proveedor.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "El Proveedor se actualizo correctamene."
                });
            } else {
                res.send({
                    message: `No se puede actualizar el proveedor con id=${id}. ¡Es posible que no se haya encontrado el proveedor o que req.body esté vacío!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al actualizar el proveedor con id=" + id
            });
        });
};


exports.delete = (req, res) => {
    const id = req.params.id;

    Proveedor.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "El Proveedor se elimino correctamente!"
                });
            } else {
                res.send({
                    message: `No se puede elimar el proveedor con id=${id}, el proveedor no fue encontrado!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "No se pudo eliminar el tutorial con id=" + id
            });
        });
};


exports.deleteAll = (req, res) => {
    Proveedor.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Los proveedores fueron eliminador correactamente!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Se produjo un error al eliminar todos los proveedores!"
            });
        });
};


exports.findAllStatus = (req, res) => {
    Proveedor.findAll({ where: { status: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Se produjo un error al recuperar los proveedores."
            });
        });
};
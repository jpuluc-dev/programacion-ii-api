const db = require("../models");
const Producto = db.producto;
const Op = db.Sequelize.Op;


exports.create = (req, res) => {
    if (!req.body.nombre) {
        res.status(400).send({
            message: "El contenido no puede estar vacio!"
        });
        return;
    }

    const producto = {
        nombre: req.body.nombre,
        categoria: req.body.categoria,
        codigo: req.body.codigo,
        precio: req.body.precio,
        stock: req.body.stock,
        proveedor: req.body.proveedor,
        fecha_ingreso: req.body.fecha_ingreso,
        status: req.body.status ? req.body.status : false
    };


    Producto.create(producto)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Se produjo un error al crear el producto!"
            });
        });
};


exports.findAll = (req, res) => {
    const nombre = req.query.nombre;
    var condition = nombre ? { nombre: { [Op.iLike]: `%${nombre}%` } } : null;

    Producto.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Se produjo un error al recuperar los productos!"
            });
        });
};


exports.findOne = (req, res) => {
    const id = req.params.id;

    Producto.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al recuperar el producto con id=" + id
            });
        });
};


exports.update = (req, res) => {
    const id = req.params.id;

    Producto.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "El Producto se actualizo correctamene."
                });
            } else {
                res.send({
                    message: `No se puede actualizar el producto con id=${id}. ¡Es posible que no se haya encontrado el producto o que req.body esté vacío!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al actualizar el producto con id=" + id
            });
        });
};


exports.delete = (req, res) => {
    const id = req.params.id;

    Producto.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "El Producto se elimino correctamente!"
                });
            } else {
                res.send({
                    message: `No se puede elimar el producto con id=${id}, el producto no fue encontrado!`
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
    Producto.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Los productos fueron eliminador correactamente!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Se produjo un error al eliminar todos los productos!"
            });
        });
};


exports.findAllStatus = (req, res) => {
    Producto.findAll({ where: { status: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Se produjo un error al recuperar los productos."
            });
        });
};
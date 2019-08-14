const express = require("express");
const path = require('path');
const router = express.Router();
const { Membership } = require("../models/membership");

router.get("/", (req, res, next) => {
    res.status(200).sendFile(path.resolve("src/views/index.html"));
});

// CREATE
router.post("/api/v1/newmembership", (req, res, next) => {
    const { creation_date, amount, name, last_name, email, 
        phone_number, holder_name, card_number, cvv2, expiration_month, expiration_year } = req.body;
    const newMembership = Membership({
        creation_date,
        membership_data: { amount },
        member_data: { name, last_name, email, phone_number },
        card_data: { holder_name, card_number, cvv2, expiration_month, expiration_year }
    });
    newMembership.save((err, membership) => {
        err ? res.status(409).send(err.message) : res.status(201).send(membership)
    });
});

// READ
router.get("/api/v1/members", (req, res, next) => {
    Membership.find().exec()
        .then(member => res.status(200).send(meber))
        .catch(err => res.status(404).send(err));
});

//Search
router.get("/api/v1/memberById/", (req, res, next) => {
    const { id } = req.query;
    Membership.findById(id).exec()
        .then(member => res.status(200).send(member))
        .catch(err => res.status(404).send(err));
});

// router.get("/api/v1/busqueda/pelicula", (req, res, next) => {
//     const { q } = req.query;
//     Movie.find({ title: q }).exec()
//         .then(movie => {
//             movie.length > 0
//                 ? res.status(200).send(movie)
//                 : res.status(404).send("Not found")
//         })
//         .catch(err => res.status(404).send(err))
// });

// UPDATE

// Modificar todo el objeto o registro
// router.put("/api/v1/peliculas/update", (req, res, next) => {
//     const { id } = req.query;
//     const body = req.body;

//     Movie.findByIdAndUpdate(id, { $set: body }, { new: true })
//         .then(newMovie => {
//             if (newMovie !== null) {
//                 res.status(202).send(newMovie)
//             } else {
//                 res.status(304).send("Registro no encontrado, imposible modificar")
//             }
//         })
//         .catch(err => res.status(404).send(err))
// });

// Modificar parcialmente el registro
// router.patch("/api/v1/peliculas/update", (req, res, next) => {
//     const { id } = req.query;
//     const body = req.body;

//     Movie.findByIdAndUpdate(id, { $set: body }, { new: true })
//         .then(newMovie => {
//             if (newMovie !== null) {
//                 res.status(202).send(newMovie)
//             } else {
//                 res.status(304).send("Registro no encontrado, imposible modificar")
//             }
//         })
//         .catch(err => res.status(404).send(err))
// });

// DELETE
// router.delete("/api/v1/peliculas/delete", (req, res, next) => {
//     const { id } = req.query;

//     Movie.findByIdAndRemove(id).exec()
//         .then(pelicula => {
//             pelicula !== null
//                 ? res.status(200).send({ mensaje: "Película borrada exitosamente", body: pelicula })
//                 : res.status(304).send({ mensaje: "Registro no eliminado " })
//         })
//         .catch(err => res.status(304).send({ mensaje: "Registro no eliminado " }))
// });

module.exports = { router };

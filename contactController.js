Contact = require("./contactModel");

// handle index action
exports.index = function (req, res) {
    Contact.get(function (err, contacts) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }

        res.json({
            status: "success",
            message: "Contact retrieved successfully",
            data: contacts,
        });
    });
}

// handle create contact
exports.new = function (req, res) {
    let contact = new Contact();
    contact.name = req.body.name ? req.body.name : contact.name;
    contact.gender = req.body.gender;
    contact.email = req.body.email;
    contact.phone = req.body.phone;
    contact.save()
    .then((data) => {
        res.json({
            status: "Success",
            message: "New Contact created",
            Contact: data
        });
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Internal Server Error"
        });
    });
}

// handle view contact info
exports.view = function (req, res) {
    Contact.findByid(req.param.contact_id, function (err, contact) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            message: "Contact detail loading ...",
            data: contact,
        });
    });
};

// handle update contact info
exports.update = function (req, res) {
    Contact.findById(req.params.contact_id, function (err, contact) {
        if (err) {
            res.json({
                status: "error",
                message: "ID Not Found",
            });
        }
        contact.name = req.body.name;
        contact.gender = req.body.gender;
        contact.email = req.body.email;
        contact.phone = req.body.phone;
        contact.save()
            .then((data) => {
                res.json({
                    status: "Success",
                    message: "Contact Updated",
                    Contact: data,
                });
            })
            .catch((err) => {
                res.status(500).send({
                    message: err.message || "Internal Server Error",
                });
            });         
    });
};

// handle delete contact info
exports.delete = function (req, res) {
    Contact.remove({
        _id: req.params.contact_id,

    }, function(err, contact){
        if (err)
        res.send(err);

        res.json({
            status: "success",
            message: "delete Contact success",
        });
    });
};

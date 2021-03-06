/**
 * This file is a controller to handle the uploads to node js server
 * Note that this file isn't used in the final project
 * Author: Asim Siddiqui
 */

// Dependencies
const mongoose = require("mongoose");
const Upload = require("../models/upload");

/**
 * GET all uploads
 * @param {*} req The GET all uploads request object
 * @param {*} res The GET all uploads response object
 * @param {*} next Executes the next middleware
 */
exports.uploads_get_all = (req, res, next) => {
    Upload
        .find()
        .select('_id name csv')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                uploads: docs.map(doc => {
                    return {
                        name: doc.name,
                        csv: doc.csv,
                        _id: doc._id,
                        request: {
                            type: "GET",
                            url: "http://localhost:3000/uploads/" + doc._id
                        }
                    };
                })
            };
            if (docs.length >= 0) {
                res.status(200).json(response);
            }
            else {
                res.status(404).json({
                    message: 'No entries found!'
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

/**
 * POST a single upload
 * @param {*} req The POST a single upload request object
 * @param {*} res The POST a single upload response object
 * @param {*} next Executes the middleware after
 */
exports.uploads_create_upload = (req, res, next) => {
    console.log('Next Request:')
    console.log(req);
    if (req.file.path){
        path = req.file.path
    }
    else{
        path = req.file.name
    }
    const upload = new Upload({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        csv: path
        // csv: req.path
        // csv: req.file.path
    });
    upload
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "Created upload successfully",
                createdUpload: {
                    name: result.name,
                    _id: result._id,
                    request: {
                        type: "GET",
                        url: "http://localhost:3000/uploads/" + result._id
                    }
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};
/**
 * GET a single upload
 * @param {*} req The GET a single upload request object
 * @param {*} res The GET a single upload response object
 * @param {*} next Executes the middleware after
 */
exports.uploads_get_upload = (req, res, next) => {
    const id = req.params.uploadId;
    Upload
        .findById(id)
        .select("name _id csv")
        .exec()
        .then(doc => {
            console.log("From database", doc);
            if (doc) {
                res.status(200).json({
                    upload: doc,
                    request: {
                        type: "GET",
                        url: "http://localhost:3000/uploads"
                    }
                });
            }
            else {
                res.status(404).json({
                    message: "No valid entry found for provided ID"
                });
            }
        })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
    });
};
/**
 * PATCH a single upload
 * @param {*} req The PATCH a single upload request object
 * @param {*} res The PATCH a single upload response object
 * @param {*} next Executes the middleware after
 */
exports.uploads_update_upload = (req, res, next) => {
    const id = req.params.uploadId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Upload
        .update({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Upload updated",
                request: {
                    type: "GET",
                    url: "http://localhost:3000/uploads/" + id
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};
/**
 * DELETE a single upload
 * @param {*} req The DELETE a single upload request object
 * @param {*} res The DELETE a single upload response object
 * @param {*} next Executes the middleware after
 */
exports.uploads_delete = (req, res, next) => {
    const id = req.params.uploadId;
    Upload
        // .remove({ _id: id })
        .deleteOne({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Upload deleted",
                request: {
                    type: "POST",
                    url: "http://localhost:3000/uploads",
                    body: { 
                        name: "String",
                    }
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

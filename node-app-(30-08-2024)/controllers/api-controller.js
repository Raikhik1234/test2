const userModel = require('../model/user-model');
var jwt = require('jsonwebtoken');
let fs = require('fs');

class apiController {

    login = async (req, res) => {
        try {
            if (req.body.email == "" || req.body.email == null) {
                return res.send({
                    "message": "email is required",
                    data: {}
                })
            }

            if (req.body.password == "" || req.body.password == null) {
                return res.send({
                    "message": "password is required",
                    data: {}
                })
            }

            let userExistData = await userModel.findOne({ "delete_status": false, "email": req.body.email });

            console.log(userExistData)

            if (userExistData) {
                let User = new userModel();
                let checkPassword = User.compareHash(req.body.password, userExistData.password);

                console.log(checkPassword, req.body.password, userExistData.password);

                if (checkPassword == true) {
                    var payload = {
                        id: userExistData._id,
                        email: userExistData.email
                    }
                    var expTime = "12h";
                    var token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: expTime });

                    res.send({
                        "message": "Login Successful",
                        "data": userExistData,
                        "token": token,
                        "status": 200
                    })
                } else {
                    res.send({
                        "message": "email or password is wrong",
                        data: {},
                        "status": 201
                    })
                }
            } else {
                res.send({
                    "message": "User not found",
                    data: {},
                    "status": 201
                })
            }
        } catch (err) {
            console.log(err)
            res.send({
                "message": "Error",
                data: err,
                "status": 500
            })
        }
    }

    getUser = async (req, res) => {
        try {
            console.log(req.user, '======req user=====')
            let userData = await userModel.find({ "active_status": true, "delete_status": false, "user_role": 'user' });
            let userSingleData = await userModel.findOne();
            console.log(userSingleData, 'userSingleData')

            res.send({
                "message": "Data fetched successfully",
                data: userData
            })
        }
        catch (err) {
            console.log(err)
            res.send({
                "message": "Error",
                data: err
            })
        }

    }

    addUser = async (req, res) => {
        try {
            console.log(req.body, 'req.body')
            console.log(req.files, 'req.files')

            let userExistData = await userModel.findOne({ "delete_status": false, "email": req.body.email });

            console.log(userExistData, 'userExistData')

            if (userExistData) {
                res.send({
                    "message": "User is already exists",
                    "data": {}
                });
                return;
            }

            let User = new userModel();
            req.body.password = User.generateHash(req.body.password);

            if (req.files && req.files.length > 0) {
                req.body.profile_pic = req.files[0].filename;
            }

            let userData = new userModel(req.body);
            let saveData = await userData.save();

            res.status(200).send({
                "message": "Data added successfully",
                "data": saveData,
                "status": 200
            })
        } catch (err) {
            console.log(err)
            res.send({
                "message": "Error",
                data: err
            })
        }
    }

    getSingleData = async (req, res) => {
        try {
            // console.log(req.params.id,'==req.params==')
            let userSingleData = await userModel.findOne({ _id: req.params.id });

            res.send({
                "message": "Data added successfully",
                "data": userSingleData
            })
        } catch (err) {
            res.send({
                "message": "Error",
                data: err
            })
        }
    }

    updateUser = async (req, res) => {
        try {
            console.log(req.body, 'req.body')
            console.log(req.files, 'req.files')

            let reqData = req.body;

            if (req.body.password != null && req.body.password != "") {
                req.body.password = User.generateHash(req.body.password);
            }

            if (req.files && req.files.length > 0) {
                let filePath = __dirname + '/../public/user/' + reqData.old_profile_pic;
                console.log(filePath, 'filePath', fs.existsSync(filePath))

                if (fs.existsSync(filePath)) {
                    await fs.unlinkSync(filePath);
                }

                reqData.profile_pic = req.files[0].filename;
            }

            console.log(reqData, '====reqData====')

            let updateData = await userModel.findByIdAndUpdate(req.body.id, reqData);
            let userSingleData = await userModel.findOne({ _id: req.body.id });

            res.status(200).send({
                "message": "Data updated successfully",
                "data": userSingleData,
                "status": 200
            })

        } catch (err) {
            res.status(500).send({
                "message": "Error",
                data: err
            })
        }
    }

    deleteUser = async (req, res) => {
        try {
            let reqData = {
                delete_status: true
            };

            let userSingleData = await userModel.findOne({ _id: req.params.id, delete_status: false });

            if (userSingleData) {

                console.log(__dirname, '__dirname')

                let filePath = __dirname + '/../public/user/' + userSingleData.profile_pic;
                console.log(filePath, 'filePath', fs.existsSync(filePath))

                if (fs.existsSync(filePath)) {
                    await fs.unlinkSync(filePath);
                }

                // let updateData = await userModel.findByIdAndUpdate(req.params.id, reqData);
                let updateData = await userModel.findByIdAndDelete(req.params.id);

                res.send({
                    "message": "Data deleted successfully",
                    "data": {}
                })
            } else {
                res.send({
                    "message": "Data not found",
                    "data": {}
                })
            }
        } catch (err) {
            res.send({
                "message": "Error",
                data: err
            })
        }
    }
}

module.exports = new apiController();
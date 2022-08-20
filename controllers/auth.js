const User = require("../models/User");


exports.getUsers = async (req, res, next) => {


    try {

        const users = await User.find({});

        res.status(200).json({
            success: true,
            count: users.length,
            data: users,
        });

    } catch (error) {

        res.status(error.statusCode).json({
            sucess: false,
            error: error.message
        })

    }



};

exports.registerUser = async (req, res, next) => {


    try {

        // Generating random Password
        const password = Math.random().toString(36).slice(-8);

        const { userName, email } = req.body;
        const user = await User.create({
            userName,
            email,
            password,
        });

        // Sending Email
        let mailer = require('nodemailer');
        const transporter = mailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'asankharidaricustomercare@gmail.com',
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: 'Rope Stam',
            to: email,
            subject: 'Welcome to Rope Stam',
            text: 'Dear ' + userName + ' welcome to the rope stam app your password to access your account is: ' + password
        };

        transporter.sendMail(mailOptions, (err, response) => {
            if (err) {
                console.log(err);
            }
            else {
                // JWT token
                sendTokenResponse(user, 200, res);
            }
        })


    } catch (error) {
        res.status(400).json({
            sucess: false,
            error: error.message,
            errorCode: error.code
        })
    }

};

exports.loginUser = async (req, res, next) => {


    try {


        const { email, password } = req.body;

        // validate eamil and password
        if (!email || !password) {
            res.status(400).json({
                sucess: false,
                error: "Please provide email and password"
            })
            return;
        }
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            res.status(400).json({
                sucess: false,
                error: "Invalid credentials",
                errorCode: 400
            })
            return;

        }

        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            res.status(400).json({
                sucess: false,
                error: "Invalid credentials",
                errorCode: 400
            })
            return;
        }

        // JWT token
        sendTokenResponse(user, 200, res);

    } catch (error) {

        res.status(500).json({
            sucess: false,
            error: error.message
        })
    }


};

exports.deleteUser = async (req, res, next) => {

    try {

        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            res.status(404).json({
                success: false,
                error: `User not found with id of ${req.params.id}`
            })
        }
        res.status(201).json({
            success: true,
            msg: `User deleted with id: ${req.params.id}`,
        });
    } catch (error) {

        res.status(500).json({
            sucess: false,
            error: error.message
        })
    }




};



const sendTokenResponse = (user, statusCode, res) => {
    const token = user.getSignedJwtToken();
    const options = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
    };

    res.status(statusCode).cookie("token", token, options).json({
        success: true,
        token,
        data: user,
    });
};

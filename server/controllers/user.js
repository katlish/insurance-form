const UserDetail = require('../models/userDetail');
const axios = require('axios');

exports.addUserDetails = async (req, res, next) => {
    try {
        const { zipcode, gender, birthdate, income } = req.body;
        await UserDetail.create({
                zipcode, 
                gender, 
                birthdate, 
                income
        });
        const response = await axios.post(process.env.SPROUTT_QUOTES_API, req.body);
        res.status(201).json(response.data);
    }catch(err){
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        err.message = "addUserDetails failed";
        next(err);
    }
}
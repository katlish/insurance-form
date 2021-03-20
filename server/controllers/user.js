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
        // const response = await axios.post(process.env.SPROUTT_QUOTES_API, req.body);
        // res.status(201).json(response.data);
        res.status(201).json({
            price: 75.6,
            coverage: 2000000,
            term: 30,
            carrier: 'Assurity Life Insurance',
            carrier_logo: 'https://s3.amazonaws.com/sproutt-images/assurity_small.png'
          });
        // const error = new Error("Test error");
        // error.statusCode = 401;
		// throw error;
    }catch(err){
        if (!err.statusCode) {
			err.statusCode = 500;
        }
		next(err);
    }
}
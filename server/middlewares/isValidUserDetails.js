const ValidationError = (msg) => {
    const error = new Error(msg);
    error.statusCode = 400;
    return error;
}


const isAgeValid = (yourDate, maxAge, minAge) => {
    const dateObj = new Date(yourDate);
	const now = new Date();
    const yourYear = dateObj.getFullYear();
    const currentYear = now.getFullYear();
    if(((currentYear - yourYear) >= maxAge) || (currentYear - yourYear) <= minAge){
        return true;
    }else{
        return false;
    }
}

module.exports = (req, res, next) => {
    const { zipcode, gender, birthdate, income } = req.body;
    if(!Number.isInteger(income)){
        req.body.income = Number(income);
    }
    if(zipcode && gender && birthdate && income){
        if(zipcode.length !== 5){
            throw ValidationError("zipcode length should be 5");
        }
        if(!(['male', 'female'].indexOf(gender) >= 0)){
            throw ValidationError("Gender is not valid");
        }
        if(isAgeValid(birthdate, 80, 18)){
            throw ValidationError("The age is not valid");
        }
        
        if(income<25000){
            throw ValidationError("income can't be less than 25,000$");
        }
    }
    
    next();
};

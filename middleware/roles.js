const {StatusCodes} = require('http-status-codes')

const verifyRoles = (...allowedRoles) => {
    return (req, res, next) =>{
        if(!req?.role) return res.status(StatusCodes.UNAUTHORIZED);
        const rolesArray = [...allowedRoles];
        console.log(rolesArray);
        console.log(req.role);

        const result = req.role.map(role => rolesArray.includes(role)).find(val => val === true);

        if (!result) return res.status(StatusCodes.UNAUTHORIZED)
    }

}

module.exports = verifyRoles
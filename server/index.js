const express =  require('express');
const cors = require('cors')
const {check, validationResult} = require('express-validator') 

const PORT = process.env.PORT || "3001";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.post('/api',[
    check('username', 'Please provide username').custom((value, {req})=> {
        const pattern = /.+/;
        const match = pattern.test(value);
        return match;
    }),
    check('password', 'Password must be minimum 8 characters').isLength({min: 8})
], function(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ errors: errors.array() });
    }
    return res.json({data: "valid"});
})
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})
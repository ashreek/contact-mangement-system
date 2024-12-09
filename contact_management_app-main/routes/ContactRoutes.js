const express = require("express");
// creation of routes 
const router = express.Router();

const {getContact,
    getContacts,
    postContacts,
    putContacts,
    deleteContacts
} = require("../controller/contactController");
const validateToken = require("../middleware/validateTokenHnadler");

router.use(validateToken);
router.route("/").get(getContacts).post(postContacts);

router.route("/:id").get(getContact).put(putContacts).delete(deleteContacts);


module.exports = router;
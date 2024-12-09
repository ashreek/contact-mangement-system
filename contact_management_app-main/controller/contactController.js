//adding async ahndler to avoid using try-catch in every block
const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
//@Desc get all the contacts
//@api /
//@access private
const getContacts = asyncHandler( async (req,res)=>{
    const contacts = await Contact.find({user_id:req.user.id});
    if(!contacts)
    {
        res.status(400);
        throw new Error("Validation error");
    }
    
    res.status(200).json(contacts);
});

//@Desc post all the contacts
//@api /
//@access private
const postContacts = asyncHandler(async (req,res)=>{
    const {name,mobile,email} = req.body;
    if(!name || !mobile || !email)
    {
        res.status(400);
        throw new Error("all feilds are mandatory");
    }
    const contact = await Contact.create({name,email,mobile,user_id:req.user.id});
    if(!contact)
    {
        res.status(400);
        throw new Error("Validation error");
    }

    res.status(201).json(contact);
});

//@Desc get a single contact
//@api /:id
//@access private
const getContact = asyncHandler(async (req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact)
    {
        res.status(404);
        throw new Error("contact not found");
    }
    res.status(200).json(contact);
});

//@Desc update a contact
//@api /:id
//@access private
const putContacts = asyncHandler(async (req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact)
    {
        res.status(404);
        throw new Error("contact not found");
    }
    if(contact.user_id.toString() !== req.user.id)
    {
        res.status(400);
        throw new Error("User doesnot have access to update the contact");
    }
    else{
    const updateContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new:true }
    );
    res.status(200).json(updateContact);
}
});

//@Desc delete a contact
//@api /:id
//@access private
const deleteContacts = asyncHandler(async (req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact)
    {
        res.status(404);
        throw new Error("contact not found");
    }
    if(contact.user_id.toString() !== req.user.id)
    {
        res.status(400);
        throw new Error("User doesnot have access to update the contact");
    }
    else{
    const deleteContact = await Contact.deleteOne({"_id":req.params.id});
    if(!deleteContact)
    {
        res.status(404);
        throw new Error("contact not found");
    }
    res.status(200).json(deleteContact);
}
});

module.exports={getContact,getContacts,postContacts,putContacts,deleteContacts};


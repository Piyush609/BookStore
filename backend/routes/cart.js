const router = require("express").Router();
const User = require("../models/user");
const authenticateToken = require("./userAuth.js");

// add book to cart
router.put("/add-to-cart", authenticateToken, async(req, res) => {
    try{
        const {bookid, id} = req.headers;
        const userData = await User.findById(id);

        const isBookInCart  = userData.cart.includes(bookid);
        if(isBookInCart){
            return res.status(200)
            .json({
                status : "success",
                message : "Already in cart"
            });
        }
        await User.findByIdAndUpdate(id, {$push : {cart : bookid}});
        return res.status(200).json({message : "book added"});
    }catch(err){
        res.status(500).json({message : "Internal server error"});
    }
});

// router.put("/remove-from-cart", authenticateToken, async(req, res) => {
//     try{
//         const {bookid, id} = req.headers;
//         const userData = await User.findById(id);

//         const isBookInCart  = userData.cart.includes(bookid);
//         if(isBookInCart){
//             await User.findByIdAndUpdate(id, {$pull : {cart : bookid}});
//         }
//         return res.status(200).json({message : "book remove from cart"});
//     }catch(err){
//         res.status(500).json({message : "Internal server error"});
//     }
// });

router.put("/remove-from-cart/:bookid", authenticateToken, async(req, res) => {
    try{
        const {bookid} = req.params;
        const {id} = req.headers;
        await User.findByIdAndUpdate(id, {$pull : {cart : bookid},});
        
        return res.status(200).json({message : "book remove from cart"});
    }catch(err){
        res.status(500).json({message : "Internal server error"});
    }
});

router.get("/get-cart-books", authenticateToken, async(req, res) => {
    try{
        const id = req.headers.id;
        const userData = await User.findById(id).populate("cart");

        const cartBooks = userData.cart;
        return res.json({
            status : "sucess",
            data : cartBooks
        });
    }catch(err){
        console.log(err);
        res.status(500).json({message : "Internal server error"});
    }
});

module.exports = router;
const router = require("express").Router();
const User = require("../models/user");
const authenticateToken = require("./userAuth.js");

// add book to fav
router.put("/add-book-to-fav", authenticateToken, async(req, res) => {
    try{
        const {bookid, id} = req.headers;
        const userData = await User.findById(id);

        const isBookFavourite  = userData.favourites.includes(bookid);
        if(isBookFavourite){
            return res.status(200).json({message : "Already added"});
        }
        await User.findByIdAndUpdate(id, {$push : {favourites : bookid}});
        return res.status(200).json({message : "book added"});
    }catch(err){
        res.status(500).json({message : "Internal server error"});
    }
});

router.put("/remove-book-from-fav", authenticateToken, async(req, res) => {
    try{
        const {bookid, id} = req.headers;
        const userData = await User.findById(id);

        const isBookFavourite  = userData.favourites.includes(bookid);
        if(isBookFavourite){
            await User.findByIdAndUpdate(id, {$pull : {favourites : bookid}});
        }
        return res.status(200).json({message : "book remove from fav"});
    }catch(err){
        res.status(500).json({message : "Internal server error"});
    }
});

router.get("/get-favourite-books", authenticateToken, async(req, res) => {
    try{
        const id = req.headers.id;
        const userData = await User.findById(id).populate("favourites");

        const favBooks = userData.favourites;
        return res.json({
            status : "sucess",
            data : favBooks
        });
    }catch(err){
        console.log(err);
        res.status(500).json({message : "Internal server error"});
    }
});

module.exports = router;
const router = require("express").Router();
const Book = require("../models/book");
const Order = require("../models/order");
const User = require("../models/user")
const authenticateToken = require("./userAuth.js");

router.post("/place-order", authenticateToken, async(req, res) => {
    try{
        const {id} = req.headers;
        const {order} = req.body;
        for(const orderData of order){
            const newOrder = new Order({user : id, book : orderData._id});
            const orderDataFromDb = await newOrder.save();

            await User.findByIdAndUpdate(id, {
                $push : {orders : orderDataFromDb._id},
            });

            await User.findByIdAndUpdate(id, {
                $pull : {cart : orderData._id},
            });
        }
        return res.json({
            status : "Success",
            message : "Order Placed Successfully"
        });
    }catch(err){
        console.log(err);
        res.status(500).json({message : "Internal server error"});
    }
});

router.get("/get-order-history", authenticateToken, async(req, res) => {
    try{
        const {id} = req.headers;
        const userData = await User.findById(id).populate({
            path : "orders",
            populate : {
                path : "book"
            },
        });
        const ordersData = userData.orders.reverse();
        const filteredOrdersData = [];
        for (const data of ordersData) {
            if (data.book) {
                filteredOrdersData.push(data);
            }
        }
        return res.json({
            status : "Success",
            data : filteredOrdersData
        });
    }catch(err){
        res.status(500).json({message : "Internal server error"});
    }
});

router.get("/get-all-orders", authenticateToken, async(req, res) => {
    try{
        const userData = await Order.find()
        .populate({
            path : "book",
        }).populate({
            path : "user",
        }).sort({createdAt : -1});
        const filterData = [];
        for(o of userData){
            if(o.book){
                filterData.push(o);
            }
        }
        return res.json({
            status : "Success",
            data : filterData
        });
    }catch(err){
        res.status(500).json({message : "Internal server error"});
    }
});

router.put("/update-status/:id", authenticateToken, async(req, res)=>{
    try{
        const {id} =  req.params;
        await Order.findByIdAndUpdate(id, {status : req.body.status});
        return res.json({
            status : "Success",
            message : "Status Updated Successfully"
        });
    }catch(err){
        console.log(err);
        return res.status(500).json({
            message : "An error occured"
        });
    }
});

// router.get("/get-all-orders", authenticateToken, async(req, res) => {
//     try{
//         const {id} = req.params;
//         await order.findByIdAndUpdate(id, {status : req.body.status});
//         return res.json({
//             status : "Success",
//             message : "Status Updated Successfully"
//         })
//     }catch(err){
//         res.status(500).json({message : "Internal server error"});
//     }
// });

module.exports = router;
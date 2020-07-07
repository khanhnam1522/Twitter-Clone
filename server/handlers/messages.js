const db = require("../models");

// POST - /api/users/:id/messages
exports.createMessage = async function(req,res,next){
    try {
        let message = await db.Message.create({
            text: req.body.text,
            user: req.params.id
        });
        let foundUser = await db.User.findById(req.params.id);
        foundUser.messages.push(message.id);
        await foundUser.save();
        let foundMessage = await (await db.Message.findById(message._id)).populated("user", {
            username: true,
            profileImageUrl: true
        });
        return res.status(200).json(foundMessage);
    } catch(err){
        return next(err);
    }
};

// GET - /api/users/:id/messages/:message_id
exports.getMessage = async function(req,res,next){
    try {
        let message = await db.Message.findById(req.params.message_id)            
        .populate("user", {
           username: true,
           profileImageUrl: true
        })
        .populate({
            path: "comments",
            model: "Comment",
            populate: {
                path: "user",
                model: "User"
            }
        })
        return res.status(200).json(message);
    } catch(err) {
        return next(err);
    }
};

// DELETE /api/users/:id/messages/:message_id
exports.deleteMessage = async function(req,res,next){
    try {
        let foundMessage = await db.Message.findById(req.params.message_id);
        await foundMessage.remove();
        return res.status(200).json(foundMessage);
    } catch (err) {
        return next(err);
    }
};

// PUT /api/users/:id/messages/:message_id
exports.likeMessage = async function(req,res,next){
    try{
        let foundMessage = await db.Message.findById(req.params.message_id);
        var newLike = 0;
        if(foundMessage.likedUsers.includes(req.params.id)){
            newLike = foundMessage.like - 1;
            var index = foundMessage.likedUsers.indexOf(req.params.id);
            foundMessage.likedUsers.splice(index, 1);
            await foundMessage.save();
        } else {
            newLike = foundMessage.like + 1;
            foundMessage.likedUsers.push(req.params.id);
            await foundMessage.save();
        }
        await foundMessage.updateOne({like:newLike});
        return res.status(200).json(foundMessage);
    } catch(err) {
        return next(err);
    }
}

// POST /api/users/:id/messages/:message_id
exports.postComment = async function(req,res,next){
    try{
        let comment = await db.Comment.create({
            text: req.body.text,
            user: req.params.id
        });
        let foundUser = await db.User.findById(req.params.id);
        let foundMessage = await db.Message.findById(req.params.message_id);
        foundMessage.comments.push(comment);
        await foundMessage.save();
        foundUser.comments.push(comment);
        await foundUser.save();
        let foundComment = await (await db.Comment.findById(comment._id)).populated("user", {
            username: true,
            profileImageUrl: true
        });
        return res.status(200).json(foundComment);
    }catch (err) {
        return next(err)
    }
}

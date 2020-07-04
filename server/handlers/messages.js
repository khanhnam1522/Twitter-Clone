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
        let message = await db.Message.find(req.params.message_id);
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
export.postComment = async function(req,res,next){
    try{
        let message = await db.Message.create({
            text: req.body.text,
            user: req.params.id
        });
        let foundUser = await db.Message.findById(req.params.message_id);
        return res.status(200).json();
    }catch (err) {
        return next(err)
    }
}

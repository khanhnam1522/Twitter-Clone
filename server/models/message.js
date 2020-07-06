const mongoose = require("mongoose");
const User = require("./user");
const Comments = require("./comment");

const messageSchema = new mongoose.Schema(
    {
        text: {
            type: String,
            required: true,
            maxlength: 160
        },
        created: {
            type:Date, 
            default: Date.now
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        like: {
            type: Number,
            default: 0
        },
        likedUsers: {
            type: [String]
        },
        comments: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }]
    }, 
    {
        timestamps: true
    }
);

messageSchema.pre('remove', async function(next){
    try {
        //find a user
        let user = await User.findById(this.user);

        //remove the id of the message from their messages list
        user.messages.remove(this.id);
        
        //save that user
        await user.save();
        //return next
        return next();
    } catch(err) {
        return next(err);
    }
})

const Message = mongoose.model("Message", messageSchema)
module.exports = Message;
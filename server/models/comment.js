const mongoose = require("mongoose");
// const User = require("./user");
// const Message = require("./message")

const commentSchema = new mongoose.Schema(
    {
        text: {
            type: String,
            required: true,
            maxlength: 160
        },
        created: {
            type: Date,
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
        }
        // message: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: "Message"
        // }
    },
    {
        timestamps: true
    }
);

// commentSchema.pre('remove', async function(next){
//     try{
//         //find the 
//         //find the message
//         let message = await 
//     } catch(err) {
//         return next(err);
//     }
// })

const Comment = mongoose.model("Comment", commentSchema)
module.exports = Comment;
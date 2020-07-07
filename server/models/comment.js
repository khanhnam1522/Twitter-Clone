const mongoose = require("mongoose");

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
    },
    {
        timestamps: true
    }
);

const Comment = mongoose.model("Comment", commentSchema)
module.exports = Comment;
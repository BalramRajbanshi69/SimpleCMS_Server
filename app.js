const express = require("express");
const app = express();
const cors = require("cors");
const connectDatabase = require("./Database/DB");
const Blog = require("./model/blogModel");
connectDatabase();


app.use(cors({
    origin:"http://localhost:5173"
}))


app.use(express.json());
app.use(express.urlencoded({extended:true}));

// get api
app.get("/",(req,res)=>{
    res.json({
        status:200,
        message:"Successfully fetched!"
    })
})



// get api for all blogs
app.get("/blogs",async(req,res)=>{
    const blogs = await Blog.find();
    if(blogs.length === 0){
        res.status(404).json({
            msg:"Empty blogs"
        })
    }else{

        res.status(200).json({
            status:200,
            msg:"All blogs fetched successfully",
            blog:blogs
        })
    }
})


// get single blog
app.get("/blogs/:id", async(req,res)=>{
    // const id = req.params.id;
    const id= req.params.id;
    // const blog = await Blog.find({_id:id});
    // alternative
    // const blog = await Blog.findById(id);
    // if(blog.length ==0){
    //     res.status(404).json({
    //         msg:"Not found blog with that id",
    //     })
    // }
    //     res.status(200).json({
    //         msg:"Single blog fetched succesfully",
    //         data:blog
    //     })

    // alternative
    const blog = await Blog.findById(id);
    if(blog){
        res.status(200).json({
            msg:"Single blog fetched successfully",
            data:blog
        })
        }
        else{
            res.status(404).json({
                msg:"Blog with this id not found"
            })
        }   
})


// create blog api
app.post("/createBlog", async(req,res)=>{

    const {title,subTitle,description} = req.body;
    

    await Blog.create({
        title,
        subTitle,
        description
    })
    res.status(200).json({
        message:"Blog created successfully"
    })
})

 
// update blog
app.patch("/blogs/:id", async(req,res)=>{
    const id = req.params.id;
    const {title,subTitle,description} = req.body;

    const blog = await Blog.findByIdAndUpdate(id,{
        title,
        subTitle,
        description
    })
    res.status(200).json({
        msg:"Blog updated successfully",
        data:blog
    })
})

// delete
app.delete("/blogs/:id", async(req,res)=>{
    const id = req.params.id;
    await Blog.findByIdAndDelete(id);
    res.status(200).json({
        msg:"blog deleted successfully"
    })
})

app.listen(4000,(req,res)=>{
    console.log("The system is running on port 4000");
    
})


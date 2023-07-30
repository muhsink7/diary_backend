const diaryModel = require("../model/diary");

const createDiary = async (req,res) =>{

    const {title, description} =req.body;

    const newDiary = new diaryModel({
        title : title,
        description : description,
        userId : req.userId
    });

    try {

        await newDiary.save();
        res.status(201).json(newDiary);
        
    } catch (error) {

        console.log(error);
        res.status(500).json({message : "Something went wrong"})
        
    }
}

const updateDiary = async (req,res) =>{

    const id = req.params.id;
    const {title, description} = req.body;

    const newDiary = {
        title: title,
        description : description,
        userId : req.userId
    }

    try {

        await newDiary.findByIdAndUpdate(id, newDiary,{new : true});
        res.status(200).json(newDiary)
        
    } catch (error) {
        
        console.log(error);
        res.status(500).json({message : "Something went wrong"});
    }
    
}

const deleteDiary = async (req,res) =>{

    const id = req.params.id;
    try {

        const diary =await diaryModel.findByIdAndRemove(id);
        res.status(200).json(diary)

        
    } catch (error) {
        
        console.log(error);
        res.status(500).json({message : "Something went wrong"});
    }
    
}

const getDiary = async (req,res) =>{
    try {

        const diaries =await diaryModel.find({userId : req.userId});
        res.status(200).json(diaries);

    } catch (error) {

        console.log(error);
        res.status(500).json({message : "Something went wrong"})
        
    }
}

module.exports = {
    createDiary,
    updateDiary,
    deleteDiary,
    getDiary
}
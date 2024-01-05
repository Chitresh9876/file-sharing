import { response } from "express";
import File from "../model/file.js";


export const uploadImage = async(req, res) =>{
    const fileObj = {
        path: req.file.path,
        name: req.file.name
    }
    try {
        const file = await File.create(fileObj);
        return res.status(200).json({path:`http://localhost:8000/file/${file._id}`});

    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

export const downloadImage = async(req,res) => {
    try {
        const file = await File.findById(req.params.fileId);
        file.downloadCount++;
        file.save();
        res.download(file.path, `${file.name ? file?.name : 'Download'}.jpg`);
    } catch (error) {
        return res.status(500).json({error : error.message});
    }
}
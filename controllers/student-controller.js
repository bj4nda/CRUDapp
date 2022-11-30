const Student = require('../models/Student');
const studentValidations = require('../validations/students');
const {validateAsync} = require('express-validation');

const getStudents = async(req, res, next) => {
    let students = await Student.find();
        if(!students) {
            return res.status(404).json({message: 'student not found'});
        }
        res.status(200).json({students})   
    }


const addStudents =  async(req, res, next) => {
    try{
        await studentValidations.validateAsync(req.body)
    } catch(err){
        return res.status(400).json({error: err.message})
    }
    let student = new Student({
        studentName: req.body.studentName,
        studentId: req.body.studentId,
        studentScores: req.body.studentScores,
        studentResults: req.body.studentResults,
    })

    await student.save();
    res.status(200).json("success student successfully added");
}


const getStudentsById = async(req, res, next) => {
    let studentsID = req.params.id;

    let student = await Student.findById(studentsID);
    if(!student) {
        return res.status(404).json({message: 'student not found'});
    } 
    res.status(200).json({student})    
}


const getStudentsByIdAndUpdate = async(req, res, next) => {
    let studentsID = req.params.id;
    let student = await Student.findByIdAndUpdate(studentsID, {
        studentName: req.body.studentName,
        studentId: req.body.studentId,
        studentScores: req.body.studentScores,
        studentResults: req.body.studentResults,
    });

    student = await student.save()
    if(!student) {
        return res.status(500).json({message: 'Cannot save student'});
    } else {
        return res.status(200).json({student});
    }
}


const deleteStudentsById = async(req, res, next) => {
    let studentsID = req.params.id;

    let student = await Student.findByIdAndRemove(studentsID);
    if(!student) {
        return res.status(404).json({message: 'unable to delete student '});
    } 
    res.status(200).json({message : "delete student"})    
}

exports.getStudents = getStudents;
exports.addStudents = addStudents;
exports.getStudentsById = getStudentsById;
exports.getStudentsByIdAndUpdate = getStudentsByIdAndUpdate;
exports.deleteStudentsById = deleteStudentsById;
import Course from '@models/Course.js';

const newCourse = async (req, res) => {
    try {

    }catch(err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
}

const updateCourse = async (req, res) => {
    try {

    }catch(err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
}

export default {
    newCourse,
    updateCourse
}
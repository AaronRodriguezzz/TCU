import Class from '@models/Class.js';

const newClass = async (req, res) => {
    try {

    }catch(err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
}

const updateClass = async (req, res) => {
    try {

    }catch(err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
}

export default {
    newClass,
    updateClass
}
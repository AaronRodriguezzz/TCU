import { useState, useEffect } from "react";
import { useFetch } from "./fetchData";
import { computeTotalGrade } from "../utils/gradeCompute";

export const useStudentGrades = (id) => {
  const [classes, setClasses] = useState([]);
  const [gwa, setGwa] = useState(0);

  const student = JSON.parse(localStorage.getItem("loggedInUser"));
  const studentId = id ? id : student._id;

  const { response } = useFetch(`/class/student/${studentId}`);

  useEffect(() => {
    if (!response) return;

    const computedGrades = response.data
      .map((cls) => {
        const studentRecord = cls.enrolledStudents.find(
          (s) => String(s.student) === String(studentId)
        );

        if (!studentRecord) return null;

        const { presentCount = 0, absentCount = 0 } = studentRecord.attendance || {};
        const { midTerm = 0, finals = 0 } = studentRecord.exams || {};

        const result = computeTotalGrade(
          presentCount,
          absentCount,
          midTerm,
          finals
        );

        return {
          code: cls.subject.subjectCode,
          name: cls.subject.subjectName,
          units: cls.subject.units,
          grade: result.total,
          status: result.status,
          schoolYear: cls.schoolYear,
          semester: cls.semester,
        };
      })
      .filter(Boolean);

    setClasses(computedGrades);

    const totalUnits = computedGrades.reduce((acc, cur) => acc + cur.units, 0);
    const totalPoints = computedGrades.reduce(
      (acc, cur) =>
        acc + (typeof cur.grade === "number" ? cur.grade * cur.units : 0),
      0
    );

    setGwa(totalUnits ? totalPoints / totalUnits : 0);
  }, [response]);

  return { classes, gwa };
};

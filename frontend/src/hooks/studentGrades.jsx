import { useState, useEffect } from "react";
import { useFetch } from "./fetchData";
import { computeTotalGrade } from "../utils/gradeCompute";

export const generateStudentGrades = () => {
  const student = JSON.parse(localStorage.getItem("loggedInUser"));
  const [classes, setClasses] = useState([]);
  const [gwa, setGwa] = useState(0);

  const { response, loading } = useFetch(`/class/student/${student._id}`);

  useEffect(() => {
    if (!response) return;

    const computedGrades = response.data
      .map((cls) => {
        // FIXED: compare ObjectIds correctly
        const studentRecord = cls.enrolledStudents.find(
          (s) => String(s.student) === String(student._id)
        );

        if (!studentRecord) return null;

        const { presentCount = 0, absentCount = 0 } = studentRecord.attendance || {};
        const { midTerm = 0, finals = 0 } = studentRecord.exams || {};

        const result = computeTotalGrade(presentCount, absentCount, midTerm, finals);

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

    // Compute overall GWA
    const totalUnits = computedGrades.reduce((acc, cur) => acc + cur.units, 0);
    const totalPoints = computedGrades.reduce(
      (acc, cur) => acc + (typeof cur.grade === "number" ? cur.grade * cur.units : 0),
      0
    );
    const overallGwa = totalUnits ? totalPoints / totalUnits : 0;
    setGwa(overallGwa.toFixed(2));
  }, [response]);

  return { classes, gwa, loading };
};

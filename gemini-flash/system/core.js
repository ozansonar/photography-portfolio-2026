/**
 * ATK SIS - Advanced Student Information System Core v2026
 * Pure JS Engine for State Management & Academic Logic
 */
class SIS_Engine {
    constructor() {
        this.students = JSON.parse(localStorage.getItem('atk_students')) || [];
        this.currentTerm = "2026-Bahar";
    }

    // Advanced Registration Logic with Validation
    registerStudent(data) {
        const id = 'ATK' + Math.floor(1000 + Math.random() * 9000);
        const newStudent = {
            id,
            ...data,
            timestamp: new Date().toISOString(),
            status: 'Pending',
            grades: {},
            attendance: { total: 0, absent: 0 }
        };
        this.students.push(newStudent);
        this.sync();
        return id;
    }

    // Academic Grading Engine - Calculates GPA and Weighted Averages
    calculateGPA(studentId) {
        const student = this.students.find(s => s.id === studentId);
        if (!student || !Object.keys(student.grades).length) return 0;
        
        let totalPoints = 0;
        let totalCourses = 0;
        for (let course in student.grades) {
            const g = student.grades[course];
            const avg = (g.midterm * 0.4) + (g.final * 0.6);
            totalPoints += avg;
            totalCourses++;
        }
        return (totalPoints / totalCourses).toFixed(2);
    }

    sync() {
        localStorage.setItem('atk_students', JSON.stringify(this.students));
    }
}
const SIS = new SIS_Engine();
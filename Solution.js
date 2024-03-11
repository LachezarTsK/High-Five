
/**
 * @param {number[][]} studentToScore
 * @return {number[][]}
 */
var highFive = function (studentToScore) {
    // import { MinPriorityQueue } from "@datastructures-js/priority-queue";
    // Map<number, MinPriorityQueue<number>>
    const studentToTopFiveScores = new Map();
    for (let [studentID, studentScore] of studentToScore) {

        if (!studentToTopFiveScores.has(studentID)) {
            studentToTopFiveScores.set(studentID, new MinPriorityQueue({compare: (x, y) => x - y}));
        }

        if (studentToTopFiveScores.get(studentID).size() < 5) {
            studentToTopFiveScores.get(studentID).enqueue(studentScore);
        } else if (studentToTopFiveScores.get(studentID).front() < studentScore) {
            studentToTopFiveScores.get(studentID).dequeue();
            studentToTopFiveScores.get(studentID).enqueue(studentScore);
        }
    }

    return createArrayStudentToAverageOfTopFiveScores(studentToTopFiveScores);
};

/**
 * @param {Map<number, MinPriorityQueue<number>>} studentToTopFiveScores
 * @return {number[][]}
 */
function  createArrayStudentToAverageOfTopFiveScores(studentToTopFiveScores) {

    const studentToAverageOfTopFiveScores = Array.from(new Array(studentToTopFiveScores.size), () => new Array(2));
    let index = 0;

    for (let studentID of studentToTopFiveScores.keys()) {
        let sumStudentTopFiveScores = 0;
        while (!studentToTopFiveScores.get(studentID).isEmpty()) {
            sumStudentTopFiveScores += studentToTopFiveScores.get(studentID).dequeue();
        }
        studentToAverageOfTopFiveScores[index][0] = studentID;
        studentToAverageOfTopFiveScores[index][1] = Math.floor(sumStudentTopFiveScores / 5);
        ++index;
    }

    studentToAverageOfTopFiveScores.sort((x, y) => x[0] - y[0]);
    return studentToAverageOfTopFiveScores;
}

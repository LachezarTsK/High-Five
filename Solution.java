
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import java.util.PriorityQueue;

public class Solution {

    public int[][] highFive(int[][] studentToScore) {

        Map<Integer, PriorityQueue<Integer>> studentToTopFiveScores = new HashMap<>();

        for (int[] current : studentToScore) {

            int studentID = current[0];
            int studentScore = current[1];
            studentToTopFiveScores.putIfAbsent(studentID, new PriorityQueue<>());

            if (studentToTopFiveScores.get(studentID).size() < 5) {
                studentToTopFiveScores.get(studentID).add(studentScore);
            } else if (studentToTopFiveScores.get(studentID).peek() < studentScore) {
                studentToTopFiveScores.get(studentID).poll();
                studentToTopFiveScores.get(studentID).add(studentScore);
            }
        }

        return createArrayStudentToAverageOfTopFiveScores(studentToTopFiveScores);
    }

    private int[][] createArrayStudentToAverageOfTopFiveScores(Map<Integer, PriorityQueue<Integer>> studentToTopFiveScores) {

        int[][] studentToAverageOfTopFiveScores = new int[studentToTopFiveScores.size()][2];
        int index = 0;

        for (int studentID : studentToTopFiveScores.keySet()) {
            int sumStudentTopFiveScores = 0;
            for (int studentScore : studentToTopFiveScores.get(studentID)) {
                sumStudentTopFiveScores += studentScore;
            }
            studentToAverageOfTopFiveScores[index][0] = studentID;
            studentToAverageOfTopFiveScores[index][1] = sumStudentTopFiveScores / 5;
            ++index;
        }

        Arrays.sort(studentToAverageOfTopFiveScores, (x, y) -> x[0] - y[0]);

        return studentToAverageOfTopFiveScores;
    }
}

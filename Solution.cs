
using System;
using System.Collections.Generic;

public class Solution
{
    public int[][] HighFive(int[][] studentToScore)
    {
        var studentToTopFiveScores = new Dictionary<int, PriorityQueue<int, int>>();

        foreach (int[] current in studentToScore)
        {
            int studentID = current[0];
            int studentScore = current[1];

            if (!studentToTopFiveScores.ContainsKey(studentID))
            {
                studentToTopFiveScores.Add(studentID, new PriorityQueue<int, int>());
            }

            if (studentToTopFiveScores[studentID].Count < 5)
            {
                studentToTopFiveScores[studentID].Enqueue(studentScore, studentScore);
            }
            else if (studentToTopFiveScores[studentID].Peek() < studentScore)
            {
                studentToTopFiveScores[studentID].Dequeue();
                studentToTopFiveScores[studentID].Enqueue(studentScore, studentScore);
            }
        }

        return CreateArrayStudentToAverageOfTopFiveScores(studentToTopFiveScores);
    }

    private int[][] CreateArrayStudentToAverageOfTopFiveScores(Dictionary<int, PriorityQueue<int, int>> studentToTopFiveScores)
    {
        int[][] studentToAverageOfTopFiveScores = new int[studentToTopFiveScores.Count][];
        int index = 0;

        foreach (int studentID in studentToTopFiveScores.Keys)
        {
            int sumStudentTopFiveScores = 0;
            while (studentToTopFiveScores[studentID].Count > 0)
            {
                sumStudentTopFiveScores += studentToTopFiveScores[studentID].Dequeue();
            }
            studentToAverageOfTopFiveScores[index] = new int[2];
            studentToAverageOfTopFiveScores[index][0] = studentID;
            studentToAverageOfTopFiveScores[index][1] = sumStudentTopFiveScores / 5;
            ++index;
        }

        Array.Sort(studentToAverageOfTopFiveScores, (x, y) => x[0] - y[0]);

        return studentToAverageOfTopFiveScores;
    }
}

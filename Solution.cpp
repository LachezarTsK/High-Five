
#include <queue>
#include <vector>
#include <ranges>
#include <algorithm>
#include <unordered_set>
using namespace std;

class Solution {

    using minHeapOfIntegers = priority_queue<int, vector<int>, greater<int>>;

public:
    vector<vector<int>> highFive(const vector<vector<int>>& studentToScore) const {

        unordered_map<int, minHeapOfIntegers> studentToTopFiveScores;

        for (const auto& current : studentToScore) {

            int studentID = current[0];
            int studentScore = current[1];

            if (studentToTopFiveScores[studentID].size() < 5) {
                studentToTopFiveScores[studentID].push(studentScore);
            }
            else if (studentToTopFiveScores[studentID].top() < studentScore) {
                studentToTopFiveScores[studentID].pop();
                studentToTopFiveScores[studentID].push(studentScore);
            }
        }

        return createArrayStudentToAverageOfTopFiveScores(studentToTopFiveScores);
    }

private:
    vector<vector<int>> createArrayStudentToAverageOfTopFiveScores(unordered_map<int, minHeapOfIntegers>& studentToTopFiveScores) const {

        vector<vector<int>> studentToAverageOfTopFiveScores(studentToTopFiveScores.size(), vector<int>(2));
        int index = 0;

        for (const auto& [studentID, studentTopFiveScores] : studentToTopFiveScores) {
            int sumStudentTopFiveScores = 0;
            while (!studentToTopFiveScores[studentID].empty()) {
                sumStudentTopFiveScores += studentToTopFiveScores[studentID].top();
                studentToTopFiveScores[studentID].pop();
            }
            studentToAverageOfTopFiveScores[index][0] = studentID;
            studentToAverageOfTopFiveScores[index][1] = sumStudentTopFiveScores / 5;
            ++index;
        }

        ranges::sort(studentToAverageOfTopFiveScores,
            [](const auto& x, const auto& y) {return x[0] < y[0]; });

        return studentToAverageOfTopFiveScores;
    }
};

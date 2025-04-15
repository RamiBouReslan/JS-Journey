function generateReport(students) {
  let report = [];

  for (let i = 0; i < students.length; i++) {
    let total = students[i].scores.reduce(function (sum, score) {
      return sum + score;
    }, 0);

    let average = total / students[i].scores.length;

    let grade;

    if (average >= 90) {
      grade = "A";
    } else if (average >= 80) {
      grade = "B";
    } else if (average >= 70) {
      grade = "C";
    } else if (average >= 60) {
      grade = "D";
    } else {
      grade = "F";
    }

    report.push({
        name: students[i].name,
        average: average,
        grade: grade
      });
  }

    return report;
  }



const students = [
  { name: "Alice", scores: [90, 85, 92] },
  { name: "Bob", scores: [70, 68, 72] },
  { name: "Charlie", scores: [100, 100, 100] },
];

console.log(generateReport(students));

function generateReport() {
  const examScoresInput = document.getElementById("examScores").value;
  const classScoresInput = document.getElementById("classScores").value;

  const examScores = examScoresInput
    .split(",")
    .map((score) => parseFloat(score.trim()));
  const classScores = classScoresInput
    .split(",")
    .map((score) => parseFloat(score.trim()));

  const subjects = [
    "Mathematics",
    "Science",
    "English",
    "Social Studies",
    "French",
    "Computing",
    "Creative Arts",
    "Career Technology",
    "Asante Twi",
    "Religious & Moral Education",
  ];
  const coreSubjects = ["Mathematics", "Science", "English", "Social Studies"];
  const reportBody = document.getElementById("reportBody");
  const errorMessages = document.getElementById("errorMessages");

  reportBody.innerHTML = "";
  errorMessages.textContent = "";

  if (checkScoresValidity(examScores, classScores)) {
    let overallTotal = 0;
    let coreSubjectsTotal = 0;
    let electiveSubjectsTotal = 0;

    const bestOverallGrades = [];
    const electiveGrades = [];

    for (let i = 0; i < subjects.length; i++) {
      const row = document.createElement("tr");
      const subjectCell = document.createElement("td");
      const examCell = document.createElement("td");
      const classCell = document.createElement("td");
      const totalCell = document.createElement("td");
      const gradeCell = document.createElement("td");
      const remarksCell = document.createElement("td");
      const classificationCell = document.createElement("td");

      subjectCell.textContent = subjects[i];
      examCell.textContent = examScores[i] || "N/A";
      classCell.textContent = classScores[i] || "N/A";

      const subjectTotal = examScores[i] + classScores[i];
      totalCell.textContent = subjectTotal || "N/A";

      overallTotal += subjectTotal;

      const overallGrade = calculateOverallGrade(examScores[i], classScores[i]);
      gradeCell.textContent = overallGrade;

      if (coreSubjects.includes(subjects[i])) {
        bestOverallGrades.push({
          subject: subjects[i],
          grade: overallGrade,
        });
        coreSubjectsTotal += parseInt(overallGrade, 10);
      } else {
        electiveGrades.push({
          subject: subjects[i],
          grade: overallGrade,
        });
      }

      const remarks = generateRemarks(overallGrade);
      remarksCell.textContent = remarks;

      const classification = coreSubjects.includes(subjects[i])
        ? "Core"
        : "Elective";
      classificationCell.textContent = classification;

      row.appendChild(subjectCell);
      row.appendChild(examCell);
      row.appendChild(classCell);
      row.appendChild(totalCell);
      row.appendChild(gradeCell);
      row.appendChild(remarksCell);
      row.appendChild(classificationCell);

      reportBody.appendChild(row);
    }

    // Sort elective grades to get the two lowest grades
    electiveGrades.sort((a, b) => {
      const gradeOrder = {
        1: 1,
        2: 2,
        3: 3,
        4: 4,
        5: 5,
        6: 6,
        7: 7,
        8: 8,
        9: 9,
      };
      return gradeOrder[a.grade] - gradeOrder[b.grade];
    });

    // Select the two lowest grades from the sorted array of electives
    const lowestTwoElectiveGrades = electiveGrades.slice(0, 2);

    // Add overall total row at the end
    const totalRow = document.createElement("tr");
    const totalLabelCell = document.createElement("td");
    const totalScoreCell = document.createElement("td");

    totalLabelCell.textContent = "Overall Total";
    totalScoreCell.textContent = overallTotal;

    totalRow.appendChild(totalLabelCell);

    totalRow.appendChild(document.createElement("td")); // Exam Score column
    totalRow.appendChild(document.createElement("td")); // Class Score column
    totalRow.appendChild(totalScoreCell);
    totalRow.appendChild(document.createElement("td")); // Overall Grade column
    totalRow.appendChild(document.createElement("td")); // Remarks column
    totalRow.appendChild(document.createElement("td")); // Classification column

    // Calculate the total grade for the core subjects and two lowest elective subjects
    const totalGrade = calculateTotalGrade(
      coreSubjectsTotal,
      lowestTwoElectiveGrades
    );

    // Display the total grade in the fourth cell of the "Overall Grade" column
    const totalGradeCell = document.createElement("td");
    //totalGradeCell.textContent = totalGrade;
    totalRow.appendChild(totalGradeCell);

    reportBody.appendChild(totalRow);
  } else {
    // Display error message if scores are outside the allowed ranges
    errorMessages.textContent =
      "Please enter valid exam scores (0-60) and class scores (0-40).";
  }

  // Toggle the visibility of exam score and class score input fields
  //const examScoresInput = document.getElementById("examScores");
  //const classScoresInput = document.getElementById("classScores");
}

function calculateOverallGrade(examScore, classScore) {
  // Add your logic here to calculate the overall grade based on exam and class scores
  // For simplicity, let's assume the overall grade is the average of exam and class scores
  const totalScore = examScore + classScore;

  // Assign a letter grade based on the average score
  if (totalScore >= 80) {
    return "1";
  } else if (totalScore >= 70) {
    return "2";
  } else if (totalScore >= 65) {
    return "3";
  } else if (totalScore >= 60) {
    return "4";
  } else if (totalScore >= 59) {
    return "5";
  } else if (totalScore >= 54) {
    return "6";
  } else if (totalScore >= 49) {
    return "7";
  } else if (totalScore >= 44) {
    return "8";
  } else {
    return "9";
  }
}

function calculateTotalGrade(coreSubjectsTotal, lowestTwoElectiveGrades) {
  // Calculate the total grade by adding the total grade of core subjects
  // and the two lowest grades from the elective subjects
  const totalElectiveGrade = lowestTwoElectiveGrades.reduce(
    (total, electiveGrade) => total + parseInt(electiveGrade.grade, 10),
    0
  );

  return coreSubjectsTotal + totalElectiveGrade;
}

function generateRemarks(overallGrade) {
  // Add your logic here to generate remarks based on the overall grade
  switch (overallGrade) {
    case "1":
      return "Excellent!";
    case "2":
      return "Very Good!";
    case "3":
      return "Good!";
    case "4":
      return "Credit!";
    case "5":
      return "Credit!";
    case "6":
      return "Pass!";
    case "7":
      return "Pass!";
    case "8":
      return "Week Pass!";
    default:
      return "Fail";
  }
}

function checkScoresValidity(examScores, classScores) {
  // Check if all exam scores are between 0 and 60, and all class scores are between 0 and 40
  const isValidExamScores = examScores.every(
    (score) => score >= 0 && score <= 60
  );
  const isValidClassScores = classScores.every(
    (score) => score >= 0 && score <= 40
  );

  return isValidExamScores && isValidClassScores;
}

//function generateReport() {
// Your existing generateReport function logic

//}

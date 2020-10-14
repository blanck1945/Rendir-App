export const getCircleColor = (value: boolean) => {
  if (value) {
    return "has-background-success";
  }
  return "has-background-danger";
};

const upArr = [5, 6, 7, 8, 9];

export const calGrade = (num: number) => {
  const digit = num.toString();
  if (upArr.includes(parseInt(digit[2]))) {
    return Math.ceil(num);
  } else {
    return Math.floor(num);
  }
};

export const rateGrade = (grade: number) => {
  if (grade < 4) {
    "desaprobado";
  } else if (grade >= 4 && grade < 7) {
    return "aprobado";
  } else {
    return "promoción";
  }
};

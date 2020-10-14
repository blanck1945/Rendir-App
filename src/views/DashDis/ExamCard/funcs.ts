export const getColorFunc = (control: string) => {
  switch (control) {
    case "sin":
      return "has-background-danger";
    case "review":
      return "has-background-info";
    case "succ":
      return "has-background-success";
  }
};

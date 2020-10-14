import { database } from "../../../firebase/init";

interface ResCorrect {
  id: number;
  correctRes: string;
}

interface UserExam {
  id: number;
  preguntaEstado: string;
  materia_id: number;
  producto_id: number;
  preguntaId: number;
  preguntaRes: string[];
  preguntaTitle: string;
  userRes: number | string;
}

export const fetchRes = async () => {
  const responses: any = [];
  const res = await database.collection("respuestas").get();
  res.docs.forEach((snapshot) => responses.push(snapshot.data()));
  return responses;
};

export const populateRes = (questions: UserExam[]) => {
  const resArr: any = [];
  questions.map((el: UserExam) =>
    el.preguntaRes.map((res: string, index: number) =>
      index === el.userRes ? resArr.push({ ...el, userRes: res }) : null
    )
  );
  return resArr;
};

export const checkExam = async (res: ResCorrect[], questions: UserExam[]) => {
  const correctArr: any = [];
  const wrongArr: any = [];
  const resArr: any = [];

  res.map((el: ResCorrect) => {
    resArr.push(el.correctRes);
  });

  questions.map((el: UserExam) =>
    resArr.includes(el.userRes)
      ? correctArr.push({ ...el, valorCorrecto: true })
      : wrongArr.push({ ...el, valorCorrecto: false })
  );

  return [...correctArr, ...wrongArr];
};

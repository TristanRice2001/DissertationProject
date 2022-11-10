import axios from "axios";
import { Challenge } from "types/challenge";

const DUMMY_DATA: Challenge[] = [
  {
    id: 1,
    name: "Cooky Command Injection",
    points: 30,
    status: "inactive",
    hints: [],
  },
  {
    id: 2,
    name: "Barking Binary Exploitation",
    points: 40,
    status: "active",
    ip: "10.10.10.10",
    totalSecondsAvailavble: 20,
    secondsLeftForChallenge: 20,
    hints: [],
  },
  {
    id: 3,
    name: "Lazy Local File Inclusion",
    points: 50,
    status: "inactive",
    hints: [],
  },
  {
    id: 4,
    name: "Super SQL Injection",
    points: 60,
    status: "inactive",
    hints: [],
  },
];

export const getChallenges = async () => {
  return new Promise<Challenge[]>((resolve, reject) => {
    return resolve(DUMMY_DATA);
  });
};

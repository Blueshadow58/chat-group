import { useState } from "react";

export const initials = (string) => {
  const words = string.split(" ");

  let newString = "";
  words.forEach((word, index) => {
    if (index < 2) {
      newString = newString + word[0];
    }
  });

  return newString;
};

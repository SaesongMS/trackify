export const encodeSubjectName = (subjectName) => {
  const encodedSubjectName = encodeURIComponent(
    subjectName.replaceAll(/\./g, "%2E")
  );
  return encodedSubjectName;
};

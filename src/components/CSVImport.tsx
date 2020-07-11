import React from "react";
import CSVReader from "react-csv-reader";

import { addUsersByEmail } from "../utils/firebaseUtils";

const papaparseOptions = {
  header: true,
  dynamicTyping: true,
  skipEmptyLines: true,
  transformHeader: (header: any) => header.toLowerCase().replace(/\W/g, "_"),
};

interface CSVImportProps {
  classId: string;
  setHasRoster?: Function;
}

export default function CSVImport({ classId, setHasRoster }: CSVImportProps) {
  return (
    <CSVReader
      cssClass="csv-reader-input"
      label="No imported class data. Select CSV of Class Emails list"
      onFileLoaded={(data, fileInfo) => {
        if (data.length > 0) {
          let emailKey: string = "";
          let emailList: Array<string> = [];
          const keys = Object.keys(data[0]);
          if (keys.length > 1) {
            // if there are multiple columns
            for (const key of keys) {
              if (
                typeof data[0][key] === "string" &&
                data[0][key].includes("@")
              ) {
                emailKey = key;
                break; // just take first instance
              }
            }
          } else {
            emailKey = keys[0];
          }
          data.forEach((csvRow: any) => {
            emailList.push(csvRow[emailKey]);
          });
          // TODO Change this to accept state
          if (setHasRoster) setHasRoster(true);
          console.log(emailList);
          // Keep commented out till BE connects with FE
          //addUsersByEmail(classId, emailList);
        }
      }}
      onError={(error) => {
        console.log(error);
      }}
      parserOptions={papaparseOptions}
      inputId="csv-input"
      inputStyle={{ color: "red" }}
    />
  );
}

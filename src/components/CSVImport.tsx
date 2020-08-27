import React from "react";
import firebase from "../constants/Firebase";
import CSVReader from "react-csv-reader";
import XLSX from "xlsx";
var functions = firebase.functions();
var sendEmails = functions.httpsCallable("sendEmails");

// eslint-disable-next-line
import { addUsersByEmail } from "../utils/firebaseUtils";

interface CSVImportProps {
  classId: string;
  setHasRoster?: Function;
}

export default function CSVImport({ classId, setHasRoster }: any) {
  return (
    <input
      type="file"
      id="xlsx import"
      accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      onChange={(e: any) => {
        e.preventDefault();
        const file = e.target.files[0];
        const reader = new FileReader();
        let names: string[][] = [],
          uniquenames: string[] = [];
        reader.onload = (event) => {
          var data = event?.target?.result;
          if (!data) return;
          let readedData = XLSX.read(data, { type: "binary" });
          const wsname = readedData.SheetNames[0];
          const ws = readedData.Sheets[wsname];
          const dataParse: any[][] = XLSX.utils.sheet_to_json(ws, {
            header: 1,
          });
          dataParse.slice(1).forEach((item: any[]) => {
            if (item[2]) uniquenames.push(`${item[2].toLowerCase()}@umich.edu`);
            if (item[3]) {
              // Name is formatted as `lastName,firstName Middle`
              const slice = item[3].split(",");
              const firstName = slice[1].split(" ")[0];
              const lastName = slice[0];
              names.push([firstName, lastName]);
            }
          });
          console.log(uniquenames);
          console.log(names);
          addUsersByEmail("1", uniquenames, names).then(() => {
            setHasRoster(true);
          });
        };
        reader.readAsBinaryString(file);
      }}
    />
  );
}

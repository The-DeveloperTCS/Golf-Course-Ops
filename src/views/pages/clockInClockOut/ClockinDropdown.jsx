import * as React from "react";
import FormControl from "@mui/material/FormControl";
import Select from "react-select";
import "../../style/ClockIn.css";
import { getAllTerminalsList } from "redux/terminal/service";
import { useEffect, useState } from "react";

export default function MultipleSelectPlaceholder({ checkIn, setCheckIn }) {
  const [terminals, setTerminals] = useState([]);

  useEffect(() => {
    getAllTerminalsList()
      .then((res) => {
        const terminalData = res.data.terminals.map((data) => {
          return {
            label: data.name,
            value: data.id,
          };
        });
        setTerminals(terminalData);
      })
      .catch((err) => {
        console.log(err, "err in check in terminal screen");
      });
  }, []);

  return (
    <div>
      <FormControl sx={{ width: "100%", mt: 3 }}>
        <label htmlFor="password" style={{ padding: "10px 0px" }}>
          Terminal
        </label>

        <Select
          value={terminals?.find((c) => c.value === checkIn.terminalId)}
          // disabled={!useEmployeePermission}
          onChange={(e) => {
            setCheckIn({
              ...checkIn,
              terminalId: e.value,
            });
          }}
          options={terminals}
        />
      </FormControl>
    </div>
  );
}

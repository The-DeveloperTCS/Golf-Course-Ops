import * as React from "react";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "../../style/ClockIn.css";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = ["Pro Shop", "Food & Beverage"];

function ClockinDropdown(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelectPlaceholder() {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState("");

  const handleChange = (event) => {
    setPersonName(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ width: "100%", mt: 3 }}>
        <label htmlFor="password" style={{ padding: "10px 0px" }}>
          Terminal
        </label>
        <Select
          displayEmpty
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput disableUnderline />}
          renderValue={(selected) => {
            if (selected === "") {
              return <em style={{ fontFamily: "Poppins" }}> Pro Shop</em>;
            }

            return selected;
          }}
          MenuProps={MenuProps}
          inputProps={{ "aria-label": "Without label" }}
        >
          <MenuItem disabled value="">
            {/* <em>Placeholder</em> */}
          </MenuItem>
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={ClockinDropdown(name, personName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

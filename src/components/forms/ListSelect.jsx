import React, { useMemo } from "react";
import Select from "react-select";

const ListSelect = ({
  value,
  onChange,
  list,
  labelSelector,
  allowEdit,
  isMulti = false,
}) => {
  const isLetter = (s) => typeof s === "string" && s.match("^[a-zA-Z()]+$");

  const options = useMemo(() => {
    return list.map((c) => {
      return {
        label: labelSelector(c),
        value: c.id,
      };
    });
  }, [list, labelSelector]);

  return (
    <Select
      isDisabled={allowEdit}
      isMulti={isMulti}
      value={
        value
          ? options.filter(
              (c) => (isLetter(c.value) ? c.value : parseInt(c.value)) === value
            )[0]
          : null
      }
      onChange={(o) => onChange(o.value)}
      options={options}
    ></Select>
  );
};

export default ListSelect;

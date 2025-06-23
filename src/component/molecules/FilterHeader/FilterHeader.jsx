"use client";

import DropDown from "@/component/molecules/DropDown/DropDown";
import { Input } from "@/component/atoms/Input";
import Button from "@/component/atoms/Button";
import classes from "./FilterHeader.module.css";
import { IoSearchOutline } from "react-icons/io5";

export default function FilterHeader({
  dropdownOption,
  placeholder,
  setValue,
  onChange,
  buttonLabel,
  buttonOnClick,
  inputPlaceholder,
  customStyle,
  showButton = false,
  showDropDown = false,
  secondDropdownOption = false,
  secondPlaceholder,
  setSecondValue,
  secondValue,
}) {
  return (
    <div className={classes.filterHeader}>
       <Input
        placeholder={inputPlaceholder}
        onChange={onChange}
        customStyle={customStyle}
        rightIcon={<IoSearchOutline color="#B0CD6E" size={20} />}
      />
      {showDropDown && (
        <DropDown
          options={dropdownOption}
          placeholder={placeholder}
          setValue={setValue}
        />
      )}
      {secondDropdownOption && (
        <DropDown
          options={secondDropdownOption}
          placeholder={secondPlaceholder}
          setValue={setSecondValue}
        />
      )}
     
      {showButton && <Button label={buttonLabel} onClick={buttonOnClick} />}
    </div>
  );
}

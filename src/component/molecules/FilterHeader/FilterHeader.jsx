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
  value,
  children,
  mainContClassName
}) {
  return (
    <div className={classes.filterHeader}>
       <Input
        placeholder={inputPlaceholder}
        setValue={onChange}
        customStyle={customStyle}
        mainContClassName={mainContClassName}
        rightIcon={<IoSearchOutline color="#B0CD6E" size={20} />}
      />
      {showDropDown && (
        <DropDown
          options={dropdownOption}
          placeholder={placeholder}
          setValue={setValue}
          value={value}
        />
      )}
      {secondDropdownOption && (
        <DropDown
          options={secondDropdownOption}
          placeholder={secondPlaceholder}
          setValue={setSecondValue}
          value={secondValue}
        />
      )}
     
      {showButton && <Button label={buttonLabel} onClick={buttonOnClick} />}
      {children}
    </div>
  );
}

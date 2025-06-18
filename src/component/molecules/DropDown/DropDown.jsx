import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import ReactSelect, { components } from "react-select";
import classes from "./DropDown.module.css";

const DropDown = ({
  options,
  label,
  customStyle,
  disabled,
  value,
  setValue,
  placeholder,
  isMulti,
  style,
  leftIcon,
  Components,
  labelClassName,
  indicatorColor = "#3F78A3",
  optionLabel,
  optionValue,
  selectRef,
  isSearchable = true,
  borderRadius = "5px",
  classNamePrefix,
  customContainerClass,
  className,
  variant = "",
  customContainerStyle,
  inputClass,
  iconClass,
  errorText,
  ...props
}) => {
  const DropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        {props.isFocused ? (
          <MdKeyboardArrowUp size={16} color={indicatorColor} />
        ) : (
          <MdKeyboardArrowDown size={16} color={indicatorColor} />
        )}
      </components.DropdownIndicator>
    );
  };

  const dropDownStyle = {
    control: (styles, { isDisabled }) => ({
      ...styles,
      backgroundColor: isDisabled
        ? "var(--disabled-input-color)"
        : "var(--white-color)",
      borderRadius:10,
      color: "#3F78A3",
      boxShadow: "none",
      fontFamily: "AvenirRegular",
      width: "120px",
      fontSize: "16px",
      cursor: "pointer",
      border: `1px solid #B8B6B6`,
      padding: "1px 15px",
      height: "40px",
      width: "100%",
      minWidth:"100px",
      ...customStyle,

      ":hover": {
        ...styles[":hover"],
        borderColor: "var(--Wild-Willow-100)",
      },
      ":placeholder": {
        ...styles[":placeholder"],
        color: "var(--Wild-Willow-100)",
      },
      ":active": {
        ...styles[":active"],
        borderColor: "var(--Wild-Willow-100)",
      },
    }),

    placeholder: (defaultStyles) => {
      return {
        ...defaultStyles,
        color: "#454545",
        textTransform: "capitalize",
        fontFamily: "AvenirRegular",
        fontSize: "14px",
      };
    },

    option: (styles, { isSelected }) => {
      return {
        ...styles,
        backgroundColor: isSelected && "var(--input-border-active)",
        color: isSelected ? "var(--white-color)" : "var(--text-color)",
        padding: "8px 12px",
        fontFamily: "var(--inter)",
        fontWeight: 400,
        fontSize: "14px",
        zIndex:"1050",

        ":active": {
          ...styles[":active"],
          color: "var(--text-color)",
        },
        ":hover": {
          ...styles[":hover"],
          color: "var(--text-color)",
          backgroundColor: "var(--border-blue)",
          cursor: "pointer",
        },
      };
    },

    multiValue: (styles) => {
      return {
        ...styles,
        backgroundColor: "var(--primary-color)",
        borderRadius: "5px",
        // padding: "4px 8px",
        fontSize: "16px",
        fontFamily: "var(--inter)",
        fontWeight: 400,
      };
    },
    singleValue: (styles) => {
      return {
        ...styles,
        fontSize: "14px",
        fontFamily: "var(--inter)",
        fontWeight: 300,
        color: "var(--black-color)",
      };
    },
    multiValueLabel: (styles) => ({
      ...styles,
      color: "#fff",
      fontWeight: 400,
    }),
    multiValueRemove: (styles) => ({
      ...styles,
      fontSize: "14px",
      color: "#fff",
      ":hover": {
        color: "var(--white-color)",
      },
    }),menu: (styles) => ({
      ...styles,
      zIndex:"999"
    }),
  };
  return (
    <div className={`${[classes.Container, className].join(" ")}`} data-variant={variant}>
      <style>{`
        .DropdownOptionContainer__menu {
          margin: 0px;
          border: 0px;
        }
        .DropdownOptionContainer__single-value {
          color: var(--text-black-clr)
        }
        .DropdownOptionContainer__menu {
          box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.25);
        }
        .css-hlgwow{
           padding: 0px 8px 0px 0px;
        }
        .css-1wy0on6{
        height: fit-content;
        margin: auto;
        }
      .css-1xc3v61-indicatorContainer, .css-15lsz6c-indicatorContainer,.css-1dyz3mf {
                padding: 0px;
}
      `}</style>
      {label && (
        <label
          htmlFor={`dropdown${label}`}
          className={`${[
            classes.label,
            labelClassName && labelClassName,
            disabled && classes.disabled,
          ].join(" ")}`}
        >
          {label}
        </label>
      )}

      <div
        className={[classes.dropdownContainer, customContainerClass].join(" ")}
        style={{ ...customContainerStyle }}
      >
        <ReactSelect
        // menuIsOpen
          inputId={`dropdown${label}`}
          value={value}
          onChange={(e) => {
            setValue(e);
          }}
          className={[classes.reactSelect, inputClass].join(" ")}
          isMulti={isMulti}
          isDisabled={disabled}
          placeholder={placeholder}
          options={options}
          styles={{ ...dropDownStyle, ...style ,}}
          isClearable={false}
          isSearchable={isSearchable}
          classNamePrefix={`DropdownOptionContainer ${
            classNamePrefix && classNamePrefix
          }`}
          components={{
            IndicatorSeparator: () => null,
            DropdownIndicator: (e) => DropdownIndicator(e),
            ...Components,
          }}
          getOptionLabel={(option) => {
            return optionLabel ? option[optionLabel] : option.label;
          }}
          getOptionValue={(option) =>
            optionValue ? option[optionValue] : option.value
          }
          ref={selectRef}
          {...props}
        />
        {leftIcon && <div className={classes.leftIconBox}>{leftIcon}</div>}
      </div>
      {errorText && (
        <p className={`mt-2 ${[classes.errorText].join(" ")}`}>{errorText}</p>
      )}
    </div>
  );
};

export default DropDown;

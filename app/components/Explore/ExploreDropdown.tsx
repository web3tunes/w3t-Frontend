"use client";
import { useEffect, useState } from "react";

export default function ExploreDropdown({
  id,
  defaultSelect = "Dropdown",
  data = ["😍", "🥰", "😘"],
  changeHandler,
}: {
  id?: string;
  defaultSelect: string;
  data: any[];
  changeHandler: any;
}) {
  const [getCurrentSelect, setCurrentSelect] = useState<number>(0);
  const [isHover, setHover] = useState<boolean>(false);
  const findMatch = (value: any) => {
    let obj: any = data.find((item: any) => item.value === value);
    if (obj?.name) {
      return obj?.name;
    }
    return defaultSelect;
  };
  const dropdownHoverHandler = () => {
    setHover(true);
  };
  const dropdownLeaveHandler = () => {
    setHover(false);
  };
  const selectHandler = (select: number) => {
    changeHandler(select);
    setCurrentSelect(select);
    setHover(false);
  };
  return (
    <>
      <div id={id} className="dropdown" onMouseLeave={dropdownLeaveHandler}>
        <a onMouseOver={dropdownHoverHandler} className="btn-selector nolink">
          {findMatch(getCurrentSelect)}
        </a>
        <ul
          className={isHover ? "show" : ""}
          style={
            !isHover ? { visibility: "hidden" } : { visibility: "visible" }
          }
        >
          {/* <li>{defaultSelect}</li> */}
          {data.map((item, index) => (
            <li
              onClick={() => selectHandler(item.value)}
              key={index}
              className={item.value === getCurrentSelect ? "active" : ""}
            >
              <span>{item.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

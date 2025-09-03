import React from 'react'
import { Filtersvg } from "../../../svgFiles/Filtersvg.jsx";
import Button from "../buttons/button";
import { PlusSvg } from "../../../svgFiles/PlusSvg.jsx";
const TableFilter = ({title,buttonTitle,onClick,}) => {
  return (
      <></>
  //   <div className="filter_head d-flex gap-2 align-items-center mb-3">
  //   <h3 className="flex-grow-1 mb-0">{title}</h3>{" "}
  //   <ul className="d-flex align-items-center gap-3 mb-0">
  //     <li className="d-flex align-items-center gap-3 supplier_count">
  //       Number of Suppliers <span className="cmn_btn grey_btn d-flex align-items-center justify-content-center">1</span>
  //     </li>
  //     <li>
  //     <Button className="grey_btn" size="small" icon={Filtersvg} label="Filters"/>
  //     </li>
  //     <li>{buttonTitle && <Button size="small" icon={PlusSvg} label={buttonTitle} onClick={onClick}/>}</li>
  //   </ul>
  // </div>
  )
}

export default TableFilter
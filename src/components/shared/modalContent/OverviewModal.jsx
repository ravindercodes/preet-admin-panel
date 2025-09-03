import React from 'react'
import CommonModal from '../modalLayout/CommonModal'
import { UnloadingSvg } from '../../../svgFiles/UnloadingSvg.jsx'
import { WashingSvg } from '../../../svgFiles/WashingSvg.jsx'
import TimeIcon from '../../../images/time.svg'
import MangoIcon from '../../../images/mango.svg'
import BrixIcon from '../../../images/brix.svg'
import KgsIcon from '../../../images/kgs.svg'
import CaseIcon from '../../../images/case.svg'
import PalletIcon from '../../../images/pallet.svg'
import ColdStorageIcon from '../../../images/cold-storage.svg'
import RipeningIcon from '../../../images/ripening.svg'
import RejectedIcon from '../../../images/rejected.svg'
import KgCaseIcon from '../../../images/kgCase.svg'
import { GreenTickSvg } from '../../../svgFiles/GreenTickSvg.jsx'
import './overview.css'
const OverviewModal = ({show,handleClose,setShow}) => {
  return (
    <CommonModal show={show} handleClose={handleClose} setShow={setShow} title="Adding Washing Data" headerInfo="true">
        <h4 className='overViewtitle'>{UnloadingSvg} Unloading Data</h4>
        <ul className='overviewGrid mb-4'>
            <li className='overviewGrid_card'> <img src={TimeIcon} alt="" />Time : <span>11:45 AM</span></li>
            <li className='overviewGrid_card'> <img src={MangoIcon} alt="" />Fruit Type :   <span>Ataulfo</span></li>
            <li className='overviewGrid_card'> <img src={BrixIcon} alt="" />Brix Level : <span>9.8</span></li>
            <li className='overviewGrid_card'> <img src={KgsIcon} alt="" />Kg Entered :  <span>5600 KG</span></li>
            <li className='overviewGrid_card'> <img src={CaseIcon} alt="" />Cases :  <span>200</span></li>
             <li className='overviewGrid_card'> <img src={PalletIcon} alt="" />Pallets : <span> 06</span></li>
        </ul>
        <h4 className='overViewtitle'>{WashingSvg} Washing Data</h4>
        <ul className='overviewGrid washingGrid mb-0'>
       
            <li className='overviewGrid_card'> <img src={ColdStorageIcon} alt="" />Cold Stored :   <span>192 Cases / 5420 Kg</span></li>
            <li className='overviewGrid_card'> <img src={KgCaseIcon} alt="" />KG/Case Fresh : <span> 28</span></li>
            <li className='overviewGrid_card'> <img src={RipeningIcon} alt="" />Ripening :  <span>136 Cases / 2900 KG</span></li>
            <li className='overviewGrid_card'> <img src={KgCaseIcon} alt="" />KG/Orange Case :  <span>25</span></li>
            <li className='overviewGrid_card'> <img src={RipeningIcon} alt="" />Already Ripened :  <span>56 Cases / 1400 KG</span></li>
            <li className='overviewGrid_card'> <img src={KgCaseIcon} alt="" />Orange Case Inc.% :   <span>12%</span></li>
            <li className='overviewGrid_card'> <img src={RejectedIcon} alt="" />Rejected :  <span>08 Cases / 108 KG</span></li>
        </ul>
        <ul className='totalData'>
            <li>{GreenTickSvg}</li>
            <li>
                <strong>5600 KG
                </strong>
                <span>(Total Entered)</span>
            </li>
            <li>=</li>
            <li>
                <strong>5420KG</strong>
               <span> (Cold Stored) </span>
            </li>
            <li>+</li>
            <li>
                <strong>2900 KG</strong>
                <span>(Ripening ) </span>
            </li>
            <li>+</li>
            <li>
                <strong>1400 KG</strong>
               <span> (Already Ripened) </span>
            </li>
            <li>+</li>
            <li>
                <strong>108 KG</strong>
                <span>(Rejected ) </span>
            </li>
        </ul>
      </CommonModal>
  )
}

export default OverviewModal
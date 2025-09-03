import React,{useState} from 'react'
import Button from '../../components/shared/buttons/button'
import { LeftChevronSvg } from '../../svgFiles/LeftChevronSvg.jsx'
import { RightChevronSvg } from '../../svgFiles/RightChevronSvg.jsx'
import { CalendarSvg } from '../../svgFiles/CalendarSvg.jsx'
import GridCard from '../../components/shared/gridCard/GridCard'
import AddEmployeeModal from '../../components/shared/modalContent/AddEmployeeModal'
const Dashboard = () => {
  const[showAddEmplyement, SetShowAddEmplyement] = useState(false)
  return (
    <div>
      {showAddEmplyement && <AddEmployeeModal show={showAddEmplyement} setShow={SetShowAddEmplyement}/>}
      <div className='overview cmn_card'>
        <div className='overview_header d-flex gap-2 align-items-center'>
          <h6 className='mb-0 flex-grow-1'>Overview</h6>
          <Button className="noTitleBtn" icon={LeftChevronSvg}/>
          <Button size="small" className="borderredBtn" icon={CalendarSvg} label="Date: 25-10-2024" />
          <Button className="noTitleBtn" icon={RightChevronSvg}/>
        </div>
        <ul className='m-0 grid_card_wrapper'>
        {Array(4).fill().map((_, index) => (        
       <GridCard key={index}/>
      ))}
       
        </ul>
      </div>

    </div>
  )
}

export default Dashboard
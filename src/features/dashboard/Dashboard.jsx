import React,{useState} from 'react'
import GridCard from '../../components/shared/gridCard/GridCard'
import AddEmployeeModal from '../../components/shared/modalContent/AddEmployeeModal'
import {
  useGetApprovedAdmissionsQuery,
  useGetNotApprovedAdmissionsQuery,
  useGetRejectedAdmissionsQuery
} from "@/features/admission/admissionsApi";
const Dashboard = () => {
  const { data: approvedAdmissions = [] } = useGetApprovedAdmissionsQuery();
  const { data: rejectedAdmissions = [] } = useGetRejectedAdmissionsQuery();
  const { data: nonApprovedAdmissions = [] } = useGetNotApprovedAdmissionsQuery();
  const[showAddEmplyement, SetShowAddEmplyement] = useState(false)
  return (
    <div>
      {showAddEmplyement && <AddEmployeeModal show={showAddEmplyement} setShow={SetShowAddEmplyement}/>}
      <div className='overview cmn_card'>
        <div className='overview_header d-flex gap-2 align-items-center'>
          <h6 className='mb-0 flex-grow-1'>Students</h6>
          {/*<Button className="noTitleBtn" icon={LeftChevronSvg}/>*/}
          {/*<Button size="small" className="borderredBtn" icon={CalendarSvg} label="Date: 25-10-2024" />*/}
          {/*<Button className="noTitleBtn" icon={RightChevronSvg}/>*/}
        </div>
        <ul className='m-0 grid_card_wrapper'>
          <GridCard key={0} count={approvedAdmissions.length + rejectedAdmissions.length + nonApprovedAdmissions.length} text={"Total Student"}/>
          <GridCard key={1} count={approvedAdmissions.length} text={"Approved"}/>
          <GridCard key={2} count={rejectedAdmissions.length} text={"Rejected"}/>
          <GridCard key={3} count={nonApprovedAdmissions.length} text={"Not Approved"}/>

        </ul>
      </div>

    </div>
  )
}

export default Dashboard

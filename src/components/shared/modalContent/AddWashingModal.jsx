import React from 'react'
import CommonModal from '../modalLayout/CommonModal'
import { Row,Col } from 'react-bootstrap'
import InputWithLabel from '../fields/InputWithLabel'
import InputWithIcon from '../fields/InputWithIcon'
import Button from '../buttons/button'
import { RefreshSvg } from '../../../svgFiles/RefreshSvg.jsx'
import SelectBox from '../fields/SelectBox '
const AddWashingModal = ({show,handleClose,setShow}) => {
  return (
    <CommonModal show={show} handleClose={handleClose} setShow={setShow} title="Adding Washing Data">
      <Row>
      <Col lg={6}>
        <InputWithLabel
          label="Batch Code"
          type="text"
          name="batchCode"          
          placeholder="5"
          required={false}
          disabled={true}
        />
        </Col>
      <Col lg={6}>
        <InputWithLabel
          label="KG Before Wash"
          type="text"
          name="beforwash"          
          placeholder="7894 KG"
          required={false}
          disabled={true}
        />
        </Col>
      <Col lg={6}>
        <InputWithLabel
          label="Total Cases Entered"
          type="text"
          name="totalcases"          
          placeholder="7894 KG"
          required={false}
          disabled={true}
        />
        </Col>
        <Col lg={6}>
        <Row>
        <Col lg={6}>
        <InputWithLabel
          label="Palletized Cases"
          type="text"
          name="palletizedCases"          
          placeholder="5"
          required={false}
          disabled={true}
        />
        </Col>
        <Col lg={6}>
        <InputWithLabel
          label="Not Palletized Cases"
          type="text"
          name="notPalletizedCases"          
          placeholder="5"
          required={false}
          disabled={true}
        />
        </Col>
        </Row>
        </Col>
        <Col lg={6}>
        <InputWithLabel
          label="Total pallets with36 boxes / pallet"
          type="5"
          name="totalPallets"          
          placeholder="5"
          required={false}
          disabled={true}
        />
        </Col>
        <Col lg={6}>
        <InputWithLabel
          label="KG/Case Fresh"
          type="5"
          name="greshKgCase"          
          placeholder="5"
          required={false}
          disabled={true}
        />
        </Col>
        <Col lg={6}>
        <InputWithIcon
          label="KG After Wash"
          type="text"
          name="afterwash"          
          placeholder="500 KG"
          required={false}
          icon={RefreshSvg}
          disabled={true}
        />      
        </Col>
        <Col lg={6}></Col>
        <Col lg={6}>
        <InputWithLabel
          label="Already Ripened Cases"
          type="5"
          name="alreadyPilled"          
          placeholder="5"
          required={false}
          disabled={true}
        />
        </Col>
        <Col lg={6}>
        <InputWithIcon
          label="Cold Storage in KG"
          type="text"
          name="coldStorage"          
          placeholder="500 KG"
          required={false}
          icon={RefreshSvg}
          disabled={true}
        />      
        </Col>
        <Col lg={6}>
        <InputWithIcon
          label="Already Ripened Cases in KG"
          type="text"
          name="alreadyripened"          
          placeholder="500 KG"
          required={false}
          icon={RefreshSvg}
          disabled={true}
        />      
        </Col>
        <Col lg={6}> 
         <InputWithLabel
          label="Cases going to Cold Storage"
          type="text"
          name="goingColdStorage"            
          placeholder="5"
          required={false}
          disabled={true}
        />    
        </Col>
        <Col lg={6}> 
         <InputWithLabel
          label="Ripening ready cases"
          type="text"
          name="ripenigReady"            
          placeholder="5"
          required={false}
          disabled={true}
        />    
        </Col>
        <Col lg={6}> 
         <InputWithLabel
          label="Cases going to Cold Storage in KG"
          type="text"
          name="caseColdStorage"            
          placeholder="5"
          required={false}
          disabled={true}
        />    
        </Col>
        <Col lg={6}>
        <InputWithIcon
          label="Already Ripened Cases in KG"
          type="text"
          name="ripenedinKg"          
          placeholder="500 KG"
          required={false}
          icon={RefreshSvg}
          disabled={true}
        />      
        </Col>
        <Col lg={6}>
        <InputWithIcon
          label="Rejected Case Count"
          type="text"
          name="rejectedCase"          
          placeholder="7.2"
          required={false}
          icon={RefreshSvg}
          disabled={true}
        />      
        </Col>
        <Col lg={6}> 
         <InputWithLabel
          label="KG/Orange Case"
          type="text"
          name="orangeCase"            
          placeholder="25"
          required={false}
          disabled={true}
        />    
        </Col>
        <Col lg={6}>
        <InputWithIcon
          label="Rejected Case Count KG"
          type="text"
          name="rejectedCaseKg"          
          placeholder="7.2"
          required={false}
          icon={RefreshSvg}
          disabled={true}
        />      
        </Col>
       <Col lg={6}>
        <SelectBox
          label="Status"
          name="status"
          options={[
            { value: "john", label: "John" },
            { value: "ram", label: "Ram" },
          ]}
          required={false}
        />
        </Col>
        <Col className='text-end' lg={6}>
        <label htmlFor="" className='opacity-0 d-block'>save</label>
        <Button label="Save Changes" size="small"/> 
        </Col>
      </Row>

    </CommonModal>
  )
}

export default AddWashingModal
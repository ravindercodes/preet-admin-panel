import React from 'react'
import CommonModal from '../modalLayout/CommonModal'
import { Row,Col } from 'react-bootstrap'
import InputWithLabel from '../fields/InputWithLabel'
import InputWithIcon from '../fields/InputWithIcon'
import Button from '../buttons/button'
import { RefreshSvg } from '../../../svgFiles/RefreshSvg.jsx'
import SelectBox from '../fields/SelectBox '
const AddRowMaterialModal = ({show,handleClose,setShow}) => {
  return (
    <CommonModal show={show} handleClose={handleClose} setShow={setShow} title="Add/Edit Raw Material">
      <Row>
        <Col lg={6}>
        <SelectBox
          label="Supplier Name"
          name="supplierName"
          options={[
            { value: "john", label: "John" },
            { value: "ram", label: "Ram" },
          ]}
          required={false}
        />
        </Col>
        <Col lg={6}>
        <SelectBox
          label="Fruit Type"
          name="fruittype"
          options={[
            { value: "john", label: "John" },
            { value: "ram", label: "Ram" },
          ]}
          required={false}
        />
        </Col>
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
          label="Time"
          type="text"
          name="time"          
          placeholder="11:45 AM"
          required={false}
          disabled={true}
        />
        </Col>
        <Col lg={6}>
        <InputWithLabel
          label="Brix Level"
          type="text"
          name="brixLevel"          
          placeholder="5"
          required={false}
        />
        </Col>
        <Col lg={6}>
        <InputWithIcon
          label="KG Entered Total"
          type="text"
          name="totalKg"          
          placeholder="500 KG"
          required={false}
          icon={RefreshSvg}
          disabled={true}
        />
        </Col>
        <Col lg={6}>
        <InputWithLabel
          label="Total Cases Entered"
          type="text"
          name="batchCode"          
          placeholder="5"
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

export default AddRowMaterialModal
import React from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from '../buttons/button';
import { CancelSvg } from '../../../svgFiles/CancelSvg.jsx';
import './commonModal.css'
const CommonModal = ({children,show,setShow,className,title,headerInfo}) => {
  const handleClose = () => setShow(false);
  return (
      <Modal show={show} onHide={handleClose} setShow={setShow} className={className}>
        <Modal.Header>
        
          {headerInfo ? <div className='flex-grow-1 text-center overviewHead'>
              <h6>Data Overview</h6>
              <h4> Jane Doe <span>(Batch Code-JDAUG12-1145 )</span></h4>
          </div> :   <Modal.Title>{title}</Modal.Title> }
           <Button onClick={handleClose} icon={CancelSvg} size="small"></Button>
          </Modal.Header>
        <Modal.Body className='p-4'>{children}</Modal.Body>
        </Modal>
  )
}

export default CommonModal
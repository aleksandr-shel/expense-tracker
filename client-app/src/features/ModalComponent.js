import React from 'react';
import {Modal} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../app/store/slices/modalSlice';

export default function ModalComponent(){

    const {body, open} = useSelector(state => state.modalReducer);
    const dispatch = useDispatch();

    return(
        <Modal
            open={open}
            onClose={()=> dispatch(closeModal())}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            {body}
        </Modal>
    )
}
import React, { useState } from "react";
import { ListItem, ListItemAvatar, Avatar, ListItemText, Typography, Button, ButtonGroup } from "@mui/material";
import { useDispatch } from "react-redux";
import { deleteExpenseAction } from './../app/store/actions/expenseActions';
import DeleteIcon from '@mui/icons-material/Delete';
import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory';
import UpdateExpenseForm from "./UpdateExpenseForm";

export default function ExpenseItem({expense}){

    const dispatch = useDispatch();
    const [edit, setEdit] = useState(false);

    function handleDeleteExpense(id){
        dispatch(deleteExpenseAction(id))
    }
    return(
        <>
            {
                !edit ? 
                <ListItem divider>
                    <ListItemAvatar>
                        <Avatar 
                            variant='rounded'
                            sx={{width:100, height:100}}
                            alt={expense.category.name} 
                            src={`/images/categories/${expense.category.name}.jpg`}
                        />
                    </ListItemAvatar>
                    <ListItemText
                        sx={{marginLeft:'1em'}}
                        primary={<span style={{fontSize:'1em'}}>${expense.amount}</span>}
                        secondary={
                            <>
                                <Typography
                                    sx={{display:'block'}}
                                    component="span"
                                    variant="body2"
                                >
                                    Category: {expense.category.name}
                                </Typography>
                                <Typography
                                    sx={{display:'block'}}
                                    component="span"
                                    variant="body2"
                                >
                                    Date: {expense.date.split('T')[0]}
                                </Typography>
                                <Typography
                                    sx={{display:'block'}}
                                    component="span"
                                    variant="body2"
                                >
                                    Description: {expense.name}
                                </Typography>
                            </>
                        }
                    />
                    <ButtonGroup variant="text" aria-label="text button group">
                        <Button title="Edit" onClick={()=>setEdit(true)}>
                            <ChangeHistoryIcon/>
                        </Button>
                        <Button title="Delete" onClick={()=>handleDeleteExpense(expense.id)}>
                            <DeleteIcon/>
                        </Button>
                    </ButtonGroup>
                </ListItem>
                :
                <>
                    <UpdateExpenseForm expense={expense} setEdit={setEdit}/>
                </>
            }
        </>
    )
}
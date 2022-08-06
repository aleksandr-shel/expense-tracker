import { Avatar, List, ListItem, ListItemAvatar, ListItemText, Typography, ButtonGroup, Button} from "@mui/material";
import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteExpenseAction, fetchExpenses } from './../app/store/actions/expenseActions';
import DeleteIcon from '@mui/icons-material/Delete';
import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory';


export default function ListExpenses(){
    const {expenses} = useSelector(state => state.expenseReducer)
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(fetchExpenses())
    },[dispatch])

    function handleDeleteExpense(id){
        dispatch(deleteExpenseAction(id))
    }

    return(
        <List>
            {expenses.map((expense, index)=>{
                return(
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
                            <Button title="Edit">
                                <ChangeHistoryIcon/>
                            </Button>
                            <Button title="Delete" onClick={()=>handleDeleteExpense(expense.id)}>
                                <DeleteIcon/>
                            </Button>
                        </ButtonGroup>
                    </ListItem>
                )
            })}
        </List>
    )
}
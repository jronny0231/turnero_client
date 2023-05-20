import { Button, Checkbox, FormControl, FormControlLabel, Grid, TextField, Typography } from "@mui/material"
import { useQueueInputState } from "./hooks/queueInput.hook";
import { ArrowForward, Backspace, RestartAlt } from "@mui/icons-material";
import React from "react";
import { AlphaNumericPad, NumericPad } from "./keyboardPad.shared";


export const QueueInputPanel = ((): JSX.Element => {

    const {active, document, checked, setDocument, setChecked, setActive, sliceDocument, resetAll} = useQueueInputState();
    
    const handlerInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const value:string = e.currentTarget.value.toUpperCase()
        if(document.length < active.ref.format.length) {
            setDocument(value);
        }
    }
    
    const handleCheckChange = (e: React.SyntheticEvent<Element, Event>, checked: boolean) => {
        setChecked(checked);
    }

    const handlerClearInput = (e: React.MouseEvent<HTMLButtonElement>) => {
        setChecked(false);
        resetAll();
    }

    const handlerBackSpace = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        sliceDocument();
    }

    const handlerSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if(document.length === active.ref.format.length){
            setActive({...active, step: 1});
        }
    }

    const keyboard: JSX.Element = React.useMemo(() => {
        
        const format: string = active.ref.format;
        
        if(format.includes("#") && format.includes("A")){
            return ( <AlphaNumericPad maxLen={format.length}/> )
        }

        return ( <NumericPad maxLen={format.length}/> )

    }, [active.ref])


    return (
        <Grid item container spacing={2}>
            <Grid item container xs={12} >
                <FormControl>
                    <Grid item container spacing={2} justifyContent="center" alignItems="center">
                        <Grid item container xs={12} spacing={2} >
                            
                            <Grid item sm xs={12}>
                                <TextField onChange={handlerInputChange} value={document} inputProps={{style:{textAlign: 'center', fontSize: '1.5rem', letterSpacing:'5px'}}} fullWidth />
                            </Grid>

                            <Grid item sm={4} xs={12} display={'flex'} justifyContent={'center'}>
                                <Button variant="outlined" style={{margin: '0px 5px', minWidth: 0, padding: '5px 8px'}} onClick={handlerBackSpace}>
                                    <Backspace/>
                                </Button>

                                <Button variant="outlined" style={{minWidth: 0, padding: '5px 8px'}} onClick={handlerClearInput}>
                                    <RestartAlt/>
                                </Button>

                                <Button variant="contained" style={{margin: '0px 5px', minWidth: 0, padding: '5px 8px'}} onClick={handlerSubmit}>
                                    <ArrowForward/>
                                </Button>
                            </Grid>                            
                        </Grid>
                        <Grid item container xs={12} justifyContent="center" alignItems="center" display={'flex'}>
                            <FormControlLabel
                                checked={checked}
                                label={
                                    <Typography style={{fontSize: 20, letterSpacing: 3 }}>
                                        Soy el padre. madre o tutor
                                    </Typography>}
                                control={<Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 35 } }}/>}
                                onChange={handleCheckChange}
                            />
                        </Grid>
                    </Grid>
                </FormControl>
            </Grid>
            <Grid item container style={{height: '250px', overflowY: 'auto', overflowX: 'clip'}} xs={12} display={'flex'} justifyContent={'center'}>
                {keyboard}
            </Grid>
        </Grid>
    )
})
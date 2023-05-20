import { Button, Grid, Typography } from "@mui/material"
import { useQueueInputState } from "./hooks/queueInput.hook";
import React from "react";
import styled from "@emotion/styled";

const CustomSpan = styled(Typography)({
    color: "white",
    fontSize: "1.8em",
    fontWeight: "bold",
    paddind: '5px 10px',
})

export const NumericPad = ({maxLen}: {maxLen: number}): JSX.Element => {

    const {document, setDocument} = useQueueInputState();
    
    const handleInputChange = (e: React.MouseEvent<HTMLButtonElement>) => {
        if(document.length < maxLen) {
            setDocument(document + e.currentTarget.value);
        }
    };

    const numbers: number[] = Array.from(Array(10).keys());
    const numberPad: JSX.Element[] = React.useMemo(() => {
        return [
            ...numbers.reverse().map((number) =>
                <Button key={'num' + number} value={number} variant="contained" fullWidth size="small" onClick={handleInputChange}>
                    <CustomSpan key={'ico' + number} >{number}</CustomSpan >
                </Button>
            )
        ]
    }, numbers)

    return (
        <Grid item container direction="row-reverse" justifyContent={"center"} spacing={2} >
            {numberPad.map((elem) => {
                return <Grid key={'numpad' + elem.key} item xs={4}>
                    {elem}
                </Grid>
            })}
        </Grid>
    )
} 

export const AlphabetPad = ({maxLen}: {maxLen: number}): JSX.Element => {

    const {document, setDocument} = useQueueInputState();

    const handleInputChange = (e: React.MouseEvent<HTMLButtonElement>) => {
        if(document.length < maxLen) {
            setDocument(document + e.currentTarget.value);
        }
    };

    const keychar: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
    const keycharPad: JSX.Element[] = React.useMemo(() => {
        return [
            ...keychar.map((char) => {
                    char = char.toUpperCase();
                    return (
                        <Button key={char} value={char} variant="contained" fullWidth size="small" onClick={handleInputChange}>
                            <CustomSpan key={'ico-' + char} >{char}</CustomSpan >
                        </Button>
                    )
                }
            )
        ]
    }, keychar)

    return (
        <Grid item container direction="row" justifyContent={"center"} spacing={1}>
            {keycharPad.map((elem) => {
                return <Grid key={'gr' + elem.key} item xs={2}>
                    {elem}
                </Grid>
            })}
        </Grid>
    )
}


export const AlphaNumericPad = ({maxLen}: {maxLen: number}): JSX.Element => {

    return (
        <Grid item container direction={'row'} justifyContent={"center"} spacing={4} maxWidth={'sm'}>
            <AlphabetPad key="chars" maxLen={maxLen} />
            <NumericPad key="nums" maxLen={maxLen} />
        </Grid>
    )
}
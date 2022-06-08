import { Typography, TextField, Button, Grid, Paper } from '@mui/material';
import { useState } from 'react';

function FontTester(props) {
    let [showcases, setShowcases] = useState(1);

    return <>
        <Typography variant='h2'>Test some fonts</Typography>
        <Typography variant='body2'>I've removed the body Paper component here; it's a bit limiting for this particular use case</Typography>
        <br/>
        {[...Array(showcases)].map((_, index) => <FontShowcase key={index} fontKey={index}/>)}
        <Button onClick={() => setShowcases(showcases + 1)}>Another one</Button>
    </>
}

function FontShowcase(props) {
    let [fontUrl, setFontUrl] = useState('');
    let [fontFace, setFontFace] = useState();

    let customFontKey = 'Custom-' + props.fontKey;
    let sx = { ...props.sx } ?? {}
    sx.width = '100%';
    sx.fontFamily = customFontKey + ', Roboto';

    async function applyFont() {
        if (!fontUrl)
            return;

        let font = new FontFace(customFontKey, `url(${fontUrl})`);
        font.load()
            .then((loadedFont) => {
                document.fonts.add(loadedFont);
                setFontFace(loadedFont);
            })
            .catch((error) => alert(error));
    }

    return <Grid container spacing={2} style={
        {
            margin: '15px',
            padding: '0 15px 15px 0',
            border: '1px dashed grey',
            borderRadius: '5px'
        }
    }>
        <Grid item xs={6}>
            <TextField
                sx={sx}
                label='Paste font URL'
                variant='outlined'
                value={fontUrl}
                onChange={(e) => setFontUrl(e.target.value)} />
        </Grid>
        <Grid item xs={6}>
            <Button sx={sx} variant='contained' onClick={applyFont}>Apply Font</Button>
        </Grid>
        <Grid item xs={12}>
            <Paper style={{ padding: '15px', margin: '15px' }}>
                <Typography sx={sx} variant='h4'>H4 on paper</Typography>
                <Typography sx={sx} variant='subtitle1'>A subtitle</Typography>
                <br/>
                <Typography sx={sx} variant='body1'>[Body content 1] It was a bright cold day in April, and the clocks were striking thirteen.
                    Winston Smith, his chin nuzzled into his breast in an effort to escape the
                    vile wind, slipped quickly through the glass doors of Victory Mansions,
                    though not quickly enough to prevent a swirl of gritty dust from entering
                    along with him.</Typography>
                <br/>
                <Button sx={sx} >A button on the paper</Button>
                <Button sx={sx} variant='contained'>A contained button off the paper</Button>
            </Paper>
            <Typography sx={sx} variant='body1'>[Body content 1, off paper] It was a bright cold day in April, and the clocks were striking thirteen.
                Winston Smith, his chin nuzzled into his breast in an effort to escape the
                vile wind, slipped quickly through the glass doors of Victory Mansions,
                though not quickly enough to prevent a swirl of gritty dust from entering
                along with him.</Typography>
            <br/>
            <Button sx={sx} >A button off the paper</Button>
            <Button sx={sx} variant='contained'>A contained button off the paper</Button>
        </Grid>
    </Grid>
}

export default FontTester;
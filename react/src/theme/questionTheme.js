import { createMuiTheme } from '@material-ui/core/styles';

const questionTheme = createMuiTheme({
    typography: {
        fontFamily: 'Open Sans',
        h1: {
            fontFamily: 'Playfair Display',
            fontSize: '2.5rem',
            fontWeight: 700,
            color: '#1E2148',
        },
        h2: {
            fontSize: '1.75rem',
            fontWeight: 600,
            color: '#1E2148',
        },
        h3: {
            fontSize: '1.3rem',
            fontWeight: 600,
            color: '#1E2148',
        },
        h4: {
            fontSize: '1rem',
            fontWeight: 300,
            color: '#333333',
        }
    },
    overrides: {
        MuiButton: {
            text: {
                fontFamily: 'Open Sans',
                fontSize: '1rem',
                fontWeight: 600,
                background: '#FA7413',
                color: 'white',
                borderRadius: 0,
                minWidth: '150px',
                textTransform: 'capitalize',
                '&:hover': {
                    background: '#B1A6D1'
                }
            },
        },
    },
});

export default questionTheme;
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#122055',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#5154D3',
            contrastText: '#fff',
        },
        contrastThreshold: 3,
        tonalOffset: 0.2,
    },
    overrides: {
        // Style sheet name ⚛️
        MuiListItem: {
            text: {
                // Some CSS
                color: 'white',
            },
            button: {
                background: 'white',
                color: '#4E4E4E',
                '&:hover': {
                    backgroundColor: '#5154D3',
                    color: 'white'
                },
                '&:active': {
                    backgroundColor: '#5154D3',
                    color: 'white'
                },
            },
            MuiTableCell: {
                root: {
                    color: 'red'
                },
                button: {
                    color: 'red'
                }
            }
        },
        MUIDataTableFilterList: {
            chip: {
                display: 'none'
            }
        }
    },
});

export default theme;
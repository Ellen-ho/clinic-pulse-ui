import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    text: {
      primary: '#354571',
      secondary: '#353a3f',
      disabled: '#fff',
    },
    primary: {
      main: '#61bdd1',
    },
    secondary: {
      main: '#80CADA',
    },
    error: {
      main: '#b32d1b',
    },
    // warning: {
    //   main: green[500],
    // },
    // info: {
    //   main: green[500],
    // },
    // success: {
    //   main: green[500],
    // },
  },
  typography: {
    fontFamily: 'Microsoft JhengHei',
    allVariants: {
      color: '#314674',
    },
  },
  components: {
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          padding: '16px',
        },
        content: {
          display: 'flex',
          alignItems: 'center',
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          backgroundColor: '#f6f7fa',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          color: '#666',
          borderColor: '#666',
          borderRadius: '99em !important',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '99em',
        },
        containedPrimary: {
          color: '#fff',
          '&:hover': {
            backgroundColor: '#80CADA', // Your desired hover color
          },
        },
        outlinedPrimary: {
          '&:hover': {
            borderColor: '#80CADA', // Adjust border color for outlined buttons
          },
        },
        textPrimary: {
          '&:hover': {
            color: '#80CADA', // Set hover color for text buttons
          },
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '20px',
          boxShadow:
            '1px 0px 0px -1px rgba(0,0,0,0.1), 1px 1px 0px 0px rgba(0,0,0,0.1), 0px 0px 0px 0px rgba(0,0,0,0.1)',
        },
      },
    },
    MuiCardActionArea: {
      styleOverrides: {
        root: {
          height: '100%',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow:
            '0px 0px 0px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 0px 0px rgba(0,0,0,0.12)',
        },
      },
    },
  },
});

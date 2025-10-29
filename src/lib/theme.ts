import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  colors: {
    // Primary brand color - Coral Red (#e36255)
    brand: {
      50: '#fef7f6',
      100: '#fde8e6',
      200: '#fbd1cd',
      300: '#f8b4ac',
      400: '#ee7c6d',
      500: '#e36255', // Your main color
      600: '#d54a3b',
      700: '#b23a2c',
      800: '#933127',
      900: '#792c26',
    },
    // Secondary/Accent - Light Coral (#ec9a86)
    secondary: {
      50: '#fef9f7',
      100: '#fef0eb',
      200: '#fdddd2',
      300: '#fbc4b0',
      400: '#f7a48c',
      500: '#ec9a86', // Your secondary color
      600: '#df7a5e',
      700: '#ca5f41',
      800: '#a84f37',
      900: '#8a4432',
    },
    // Success/Info - Soft Blue-Green (#a2c5c9)
    success: {
      50: '#f7fbfb',
      100: '#edf5f6',
      200: '#d7e9eb',
      300: '#b8d7da',
      400: '#92c0c5',
      500: '#a2c5c9', // Your blue-green color
      600: '#7ba5aa',
      700: '#658a8f',
      800: '#567176',
      900: '#4a5e62',
    },
    // Warning - Golden Yellow (#f3c262)
    warning: {
      50: '#fefcf3',
      100: '#fef7e0',
      200: '#feecb8',
      300: '#fedd85',
      400: '#fcc84f',
      500: '#f3c262', // Your golden color
      600: '#e6a441',
      700: '#c0842c',
      800: '#9a6928',
      900: '#7d5526',
    },
    // Neutral/Background - Cream (#f1e0ce)
    neutral: {
      50: '#fefcfa',
      100: '#fef6ee',
      200: '#fdecd7',
      300: '#fcdeb8',
      400: '#f9ca8e',
      500: '#f1e0ce', // Your cream color
      600: '#e6c49e',
      700: '#d1a474',
      800: '#ac8558',
      900: '#8b6d47',
    },
    // Keep error as a variation of your coral for consistency
    error: {
      50: '#fef7f6',
      100: '#fde8e6',
      200: '#fbd1cd',
      300: '#f8b4ac',
      400: '#f28b7a',
      500: '#e36255',
      600: '#d54a3b',
      700: '#b23a2c',
      800: '#933127',
      900: '#792c26',
    }
  },
  fonts: {
    heading: `'Inter', sans-serif`,
    body: `'Inter', sans-serif`,
  },
  styles: {
    global: {
      body: {
        bg: 'neutral.50', // Using your cream color palette
        color: 'gray.800',
      },
      // Mobile-first responsive utilities
      '*': {
        boxSizing: 'border-box',
      },
      // Ensure good touch targets on mobile
      'button, a, [role="button"]': {
        minHeight: '44px', // iOS recommendation for touch targets
        minWidth: '44px',
      },
    },
  },
  components: {
    Button: {
      defaultProps: {
        colorScheme: 'brand',
      },
      sizes: {
        xs: {
          fontSize: 'xs',
          px: 2,
          py: 1,
          minH: '32px',
        },
        sm: {
          fontSize: 'sm',
          px: 3,
          py: 2,
          minH: '36px',
        },
        md: {
          fontSize: 'md',
          px: 4,
          py: 2,
          minH: '44px', // Better mobile touch target
        },
      },
    },
    Card: {
      baseStyle: {
        borderRadius: 'lg',
        boxShadow: 'sm',
        border: '1px solid',
        borderColor: 'gray.200',
      },
      variants: {
        outline: {
          bg: 'transparent',
          borderWidth: '1px',
        },
        solid: {
          bg: 'white',
          borderWidth: '1px',
        },
      },
      defaultProps: {
        variant: 'solid',
      },
    },
  },
});

export default theme;
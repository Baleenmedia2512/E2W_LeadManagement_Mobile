'use client';

import {
  IconButton,
  useColorModeValue,
  Hide,
  Tooltip,
} from '@chakra-ui/react';
import { Plus } from 'lucide-react';

interface MobileFABProps {
  onClick: () => void;
  'aria-label'?: string;
  icon?: React.ReactElement;
  tooltip?: string;
}

export default function MobileFAB({ 
  onClick, 
  'aria-label': ariaLabel = 'Add', 
  icon = <Plus size={24} />,
  tooltip = 'Add New'
}: MobileFABProps) {
  const bg = useColorModeValue('brand.500', 'brand.600');
  const hoverBg = useColorModeValue('brand.600', 'brand.700');

  return (
    <Hide above="md">
      <Tooltip label={tooltip} placement="left">
        <IconButton
          aria-label={ariaLabel}
          icon={icon}
          position="fixed"
          bottom="80px" // Above bottom navigation
          right="16px"
          size="lg"
          colorScheme="brand"
          bg={bg}
          _hover={{ bg: hoverBg }}
          borderRadius="full"
          shadow="lg"
          zIndex={15}
          onClick={onClick}
          transform="scale(1)"
          transition="all 0.2s"
          _active={{
            transform: 'scale(0.95)',
          }}
        />
      </Tooltip>
    </Hide>
  );
}
import { Box, Tooltip } from '@mui/material';
import { Check as CheckIcon } from '@mui/icons-material';
import { ProductColor } from '../../types/product';
import './ColorSelector.scss';

interface ColorSelectorProps {
  colors: ProductColor[];
  selectedColor: string;
  onColorSelect: (colorName: string) => void;
}

export const ColorSelector = ({
  colors,
  selectedColor,
  onColorSelect,
}: ColorSelectorProps) => {
  return (
    <Box className="color-selector">
      {colors.map((color) => (
        <Tooltip key={color.name} title={color.name} arrow>
          <Box
            className={`color-selector__swatch ${
              selectedColor === color.name ? 'color-selector__swatch--selected' : ''
            }`}
            onClick={() => onColorSelect(color.name)}
            sx={{
              backgroundColor: color.hex,
              border: color.hex === '#FFFFFF' ? '1px solid #ddd' : 'none',
            }}
          >
            {selectedColor === color.name && (
              <CheckIcon
                className="color-selector__check"
                sx={{
                  color: color.hex === '#FFFFFF' || color.hex === '#ffffff' ? '#000' : '#fff',
                }}
              />
            )}
          </Box>
        </Tooltip>
      ))}
    </Box>
  );
};

export default ColorSelector;

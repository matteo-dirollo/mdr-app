import { useState } from 'react';
import {
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
} from '@chakra-ui/react';
import { MdContentCopy } from 'react-icons/md';

const ReadOnlyInputWithCopyButton = ({ value }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyClick = () => {
    // Create a temporary input element to copy the content to clipboard
    setIsCopied(true)
    navigator.clipboard.writeText(value);
  };

  return (
    <InputGroup>
      <Input
        value={value}
        readOnly
        pr="4rem" // Add padding-right to create space for the copy button
      />
      <InputRightElement>
        <IconButton
          aria-label="Copy"
          size="sm"
          icon={<MdContentCopy />}
          onClick={handleCopyClick}
          variant="ghost"
          colorScheme={isCopied ? 'teal' : 'gray'}
        />
      </InputRightElement>
    </InputGroup>
  );
};

export default ReadOnlyInputWithCopyButton;

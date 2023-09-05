/* eslint-disable react/prop-types */ import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';

const AccordionComponent = ({ children, rowID }) => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    if (isExpanded) {
      setExpanded(panel);
    } else {
      setExpanded(false);
    }
  };

  return (
    <Accordion expanded={expanded === rowID} onChange={handleChange(rowID)}>
      <AccordionSummary
        sx={{
          pointerEvents: 'none',
        }}
        expandIcon={
          <ExpandMoreIcon
            sx={{
              pointerEvents: 'auto',
            }}
          />
        }
        aria-controls={`panel-${rowID}-content`}
        id={`panel-${rowID}-header`}
        IconButtonProps={{
          onChange: handleChange(rowID),
        }}>
        {children[0]}
      </AccordionSummary>
      <AccordionDetails>{children[1]}</AccordionDetails>
    </Accordion>
  );
};

export default AccordionComponent;

import { useState } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  Container,
  Divider,
  Fade,
  IconButton,
  TextField,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import uuid from 'react-uuid';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EvaluationTopicForm from './components/EvaluationTopicForm';

// const schema = yup.object().shape({
//   items: yup.array().of(
//     yup.object().shape({
//       description: yup.string().required('Campo requerido'),
//       average: yup
//         .number()
//         .typeError('Debe ser un número')
//         .required('Campo requerido'),
//       quantity: yup
//         .number()
//         .typeError('Debe ser un número')
//         .required('Campo requerido'),
//     })
//   ),
// });

const App = () => {
  // const [isTransition] = useState(true);

  // const evualuation = {
  //   id: uuid(),
  //   description: '',
  //   average: '',
  //   date: '',
  // };

  // const initialValue = {
  //   id: uuid(),
  //   description: '',
  //   average: '',
  //   quantity: '',
  //   evualuation: [evualuation],
  // };

  // const {
  //   control,
  //   handleSubmit,
  //   formState: { errors },
  //   reset,
  // } = useForm({
  //   resolver: yupResolver(schema),
  //   defaultValues: {
  //     items: [initialValue],
  //   },
  // });

  // const { fields, append, remove } = useFieldArray({
  //   control,
  //   name: 'items',
  // });

  const onSubmit = (data) => {
    console.log(data);
  };

  // const [expandedRows, setExpandedRows] = useState(
  //   Array(fields.length).fill(false)
  // );

  // const open = (index) => {
  //   const updatedExpandedRows = [...expandedRows];
  //   updatedExpandedRows[index] = !updatedExpandedRows[index];
  //   setExpandedRows(updatedExpandedRows);
  // };

  return (
    <Container className="py-8" maxWidth="lg">
      <Box className=" gap-4">
        <EvaluationTopicForm
          onSubmit={onSubmit}
        />
        {/* <form onSubmit={handleSubmit(onSubmit)}>
          {fields.map((item, index) => (
            <Fade
              key={item.id}
              in={isTransition}
              style={{ transitionDelay: isTransition ? '200ms' : '100ms' }}>
              <Box>
                <Box
                  sx={{
                    boxShadow:
                      'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;',
                  }}
                  className=" bg-white rounded-lg p-4 flex flex-col w-full mb-3">
                  <Box className="flex flex-row">
                    <Controller
                      control={control}
                      name={`items[${index}].description`}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          size={'small'}
                          variant="outlined"
                          placeholder="description"
                          className="w-full  mb-2 px-2"
                          style={{ padding: '4px' }}
                          error={!!errors.items?.[index]?.description}
                          helperText={
                            errors.items?.[index]?.description?.message
                          }
                        />
                      )}
                    />
                    <Controller
                      control={control}
                      name={`items[${index}].average`}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          size={'small'}
                          variant="outlined"
                          placeholder="average"
                          className="w-full  mb-2 px-2"
                          style={{ padding: '4px' }}
                          error={!!errors.items?.[index]?.average}
                          helperText={errors.items?.[index]?.average?.message}
                        />
                      )}
                    />
                    <Controller
                      control={control}
                      name={`items[${index}].quantity`}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          size={'small'}
                          variant="outlined"
                          placeholder="edad"
                          className="w-full  mb-2 px-2"
                          style={{ padding: '4px' }}
                          error={!!errors.items?.[index]?.quantity}
                          helperText={errors.items?.[index]?.quantity?.message}
                        />
                      )}
                    />

                    <Box className="flex justify-center items-center px-1">
                      <IconButton
                        sx={{
                          backgroundColor: '#f2f2f2',
                          boxShadow:
                            'rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px;',
                          '&:hover': {
                            backgroundColor: '#e6f2ff',
                          },
                        }}
                        color="info"
                        onClick={() => open(index)}
                        aria-label="expand">
                        {expandedRows[index] ? (
                          <ExpandLessIcon />
                        ) : (
                          <ExpandMoreIcon />
                        )}
                      </IconButton>
                    </Box>

                    <Box className="flex justify-center items-center px-1">
                      <IconButton
                        sx={{
                          backgroundColor: '#f2f2f2',
                          boxShadow:
                            'rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px;',
                          '&:hover': {
                            backgroundColor: '#ffe6e6',
                          },
                        }}
                        onClick={() => remove(index)}
                        color="error"
                        aria-label="delete">
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Box>
                  <Box>
                    {expandedRows[index] && (
                      <Box className="flex flex-col bg-gray-100 mt-2 p-2 w-full">
                        <p>Este es el contenido del id {item.id}</p>
                      </Box>
                    )}
                  </Box>
                </Box>
              </Box>
            </Fade>
          ))}

          <Button
            style={{ marginTop: '20px' }}
            variant="outlined"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => {
              append(initialValue);
            }}>
            Nueva entrada
          </Button>

          <Divider sx={{ marginTop: '20px', marginBottom: '20px' }} />

          <Button
            sx={{ marginRight: '10px' }}
            type="submit"
            variant="contained"
            startIcon={<CloudUploadIcon />}>
            Send
          </Button>

          <Button
            type="button"
            variant="outlined"
            startIcon={<RestartAltIcon />}
            onClick={() => reset()}>
            Reiniciar
          </Button>
        </form> */}
      </Box>
    </Container>
  );
};

export default App;

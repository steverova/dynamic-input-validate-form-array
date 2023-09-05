/* eslint-disable react/prop-types */ import { useState } from 'react';import { useForm, useFieldArray, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
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

const schema = yup.object().shape({
  items: yup.array().of(
    yup.object().shape({
      description: yup.string().required('Campo requerido'),
      average: yup
        .number()
        .typeError('Debe ser un número')
        .required('Campo requerido'),
      note: yup
        .number()
        .typeError('Debe ser un número')
        .required('Campo requerido'),
      date: yup
        .number()
        .typeError('Debe ser un número')
        .required('Campo requerido'),
    })
  ),
});

const EvaluationForm = ({ initialEvaluationState, setTopicForm }) => {
  const [isTransition] = useState(true);

  const initialValue = {
    id: uuid(),
    description: '',
    average: '',
    note: '',
    date: '',
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialEvaluationState,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  const onSubmit = (data) => {
    setTopicForm('evualuation', data);
    console.log(data);
  };

  return (
    <Box className="">
      <form onSubmit={handleSubmit(onSubmit)}>
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
                        helperText={errors.items?.[index]?.description?.message}
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
                    name={`items[${index}].note`}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        size={'small'}
                        variant="outlined"
                        placeholder="note"
                        className="w-full  mb-2 px-2"
                        style={{ padding: '4px' }}
                        error={!!errors.items?.[index]?.note}
                        helperText={errors.items?.[index]?.note?.message}
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name={`items[${index}].date`}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        size={'small'}
                        variant="outlined"
                        placeholder="date"
                        className="w-full  mb-2 px-2"
                        style={{ padding: '4px' }}
                        error={!!errors.items?.[index]?.date}
                        helperText={errors.items?.[index]?.average?.date}
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
              </Box>
            </Box>
          </Fade>
        ))}

        <Divider sx={{ marginTop: '20px', marginBottom: '20px' }} />

        <Button
          variant="outlined"
          color="secondary"
          sx={{ marginRight: '10px' }}
          startIcon={<AddIcon />}
          onClick={() => {
            append(initialValue);
          }}>
          Nueva entrada
        </Button>

        <Button
          type="button"
          color="secondary"
          variant="outlined"
          startIcon={<RestartAltIcon />}
          onClick={() => reset()}>
          Reiniciar
        </Button>

        <Button
          sx={{ marginRight: '10px' }}
          onClick={handleSubmit(onSubmit)}
          variant="contained"
          startIcon={<CloudUploadIcon />}>
          Send
        </Button>
      </form>
    </Box>
  );
};

export default EvaluationForm;

import React from 'react';
import { useForm } from 'react-hook-form';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }),
);

function DetailsView({ item, add, update, resetSelectedItem }) {
  const styles = useStyles();
  const { register, handleSubmit } = useForm();
  const onSubmit = (textValue) => {
    if (item.id) {
      const updatedItem = Object.assign( item, textValue )
      update(updatedItem);
    } else {
      add(textValue);
    }
  }

  return (
    <div className="details-container">
      <h2 className="ml-5">{ item.id ? `Editing: ${item.name}` : 'Select a Item' }</h2>

      <form onSubmit={ handleSubmit(onSubmit) } className={ styles.root }>
        <input
          className="w-75"
          variant="outlined"
          type="text"
          name="name"
          placeholder="Title"
          ref={register({ required: true, maxLength: 80 })}
          defaultValue={ item.name }
        />
        <input
          name="description"
          className="w-75"
          variant="outlined"
          type="text"
          placeholder="Details"
          ref={register({ required: true, maxLength: 100 })}
          defaultValue={ item.description }
        />
        <div>
          <Button variant="contained" className="mr-2" color="primary" type="submit">{ item.id ? 'Update': 'Create' }</Button>
          <Button variant="contained" type="reset" onClick={ () => resetSelectedItem() }>Cancel</Button>
        </div>
      </form>
    </div>
  );
}

export default DetailsView;
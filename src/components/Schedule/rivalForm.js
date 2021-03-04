import React, { Component } from "react";
import { Grid, TextField, Button } from '@material-ui/core';

class RivalForm extends Component {
    render() {
      const {
        rivalName,
        scheduleDate,
        handleChange,
        scheduleGame
      } = this.props;
  
      return (
        <Grid className="student-form" container spacing={4}>
          {/* Inputs to add student */}
          <TextField
            name="rivalName"
            defaultValue={"" || rivalName}
            onChange={handleChange}
            label="Rival"
          />
  
          <form noValidate>
            <TextField
                name = "scheduleDate"
                id="datetime-local"
                label="Time"
                type="datetime-local"
                defaultValue={"" || scheduleDate}
                onChange={handleChange}
                InputLabelProps={{
                shrink: true,
                }}
            />
            </form>
  
          <Grid
            className="student-form__button-grid"
            item
            xl={2}
            lg={2}
            md={12}
            s={12}
            xs={12}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={scheduleGame}
              className="student-form__submit-button"
            >
              Confirm
            </Button>
          </Grid>
        </Grid>
      );
    }
  }
  
  export default RivalForm;
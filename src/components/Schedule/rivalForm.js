import React, { Component } from "react";
import { Grid, TextField, Button, Paper, MenuItem } from '@material-ui/core';
import { getUser } from "../../backend";

class RivalForm extends Component {

    

    render() {
        const {
            currUser,
            rivalName,
            scheduleDate,
            handleChange,
            scheduleGame
        } = this.props;
  
        
      const rivalNames = currUser.rivals.map((id) => getUser(id).name);
      return (
        <Grid className="student-form" container spacing={4}>

            <TextField
                id="rivalName"
                name="rivalName"
                controlled select
                defaultValue={"" || rivalName}
                onChange={handleChange}
                label="Rival"
            >
              {rivalNames.map(name => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </TextField> 

      
            <TextField
                id="scheduleDate"
                name = "scheduleDate"
                label="Time"
                type="datetime-local"
                defaultValue={scheduleDate}
                onChange={handleChange}
                InputLabelProps={{
                shrink: true,
                }}
            />
            
            
  
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
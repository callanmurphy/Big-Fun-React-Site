import React, { Component } from "react";
import { Grid, TextField, MenuItem } from '@material-ui/core';
import { getUser } from "../../backend";
import './Challenges.css';

class RivalForm extends Component {

    

    render() {
        const {
            rivalNames,
            rivalName,
            scheduleDate,
            handleChange,
            scheduleGame
        } = this.props;
        
      //const rivalNames = currUser.rivals.map((id) => getUser(id).name);
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
              {rivalNames.map(r => (
                <MenuItem key={r.id} value={r.username}>
                  {r.username}
                </MenuItem>
              ))}
            </TextField> 

      
            <TextField
                id="scheduleDate"
                name = "scheduleDate"
                label="Deadline"
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
            <button 
            type="submit" 
            className='purpleButton'
            onClick={scheduleGame}
            >
              Confirm
            </button>
            {/* <Button
              variant="contained"
              color="primary"
              onClick={scheduleGame}
              className="student-form__submit-button"
            >
              Confirm
            </Button> */}
          </Grid>
        </Grid>
      );
    }
  }
  
  export default RivalForm;
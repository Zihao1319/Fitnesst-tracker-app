import React from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@material-ui/core/Grid";
import Stack from "@mui/material/Stack";

class WorkoutSummary extends React.Component{
    constructor (props) {
        super (props) 

    }

    render () {
        let data = this.props.workoutData
        console.log(data["Dumbbell Front Raise"][0].weight)
        return (
            <>
            {/* {data.map ((workout, index) => {
                 return (
                    <div key = {index}>
                        {workout.keys}


                    </div>
                 )

            })} */}
            </>
        )
    }
}

export default WorkoutSummary
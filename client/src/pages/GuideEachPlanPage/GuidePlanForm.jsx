import React from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import AddActivitiesToPlan from '../CreatePlanPage/AddActivitiesToPlan'
import { useState } from 'react';
import Swal from 'sweetalert2'


const GuidePlanForm = ({plan, notes, guideId, status, okPlan}) => {

    const dateTimeFrom = plan ? new Date(plan.date_from) : new Date();
    const dateTimeTo = plan ? new Date(plan.date_to) : new Date();
    const [activityIds, setActivityIds] = useState(plan ? plan.activities.map(activity => activity.activity_id) : []);
    
    const confirmPlan = async(e) => {
          e.preventDefault()
        const isConfirmed = await Swal.fire({
            title: 'Please confirm the plan for booking',
            text: 'Once confirmed you are held responsible for making plans',
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, confirm it!'
        });

        if (isConfirmed.isConfirmed) {
            okPlan()
        }

    }


  return (
      <form onSubmit={confirmPlan} className="create-form">
            <section className="time-section">
                    <div style={{marginRight:'6em'}} >

                        <b>Date and Time from: </b>&nbsp; 
                        <DatePicker
                            selected={dateTimeFrom}
                            // onChange={(date) => setDateTimeFrom(date)}
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={15}
                            timeCaption="Time"
                            minDate={new Date()}
                            dateFormat="dd/MM/yyyy HH:mm"
                                className="form-control"
                                style={{fontSize:'50px'}}
                                //  style={{ width: '300px', fontSize: '20px' }}
                        />
                    </div>
                    <div>
                        <b>Date and Time to: </b>&nbsp;
                        <DatePicker
                            selected={dateTimeTo}
                            // onChange={(date) => setDateTimeTo(date)}
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={15}
                            timeCaption="Time"
                            minDate={dateTimeFrom}
                            dateFormat="dd/MM/yyyy HH:mm"
                            className="form-control"
                        />
                        </div>
                    </section>
                    <section className="pick-activity-section">
                        <label style={{ padding:'2em'}}><b>Activities to include:</b> </label>
              <AddActivitiesToPlan id={guideId} setActivityIds={setActivityIds} activityIds={activityIds} />
              </section>
                    <div style={{padding:'2em'}}>
                        <b>Notes:</b>
                        <textarea 
                            value={notes}
                            className="form-control"
                            placeholder="Share your thoughts, ideas, or any additional notes..."
                            rows={5}
                  cols={60}
                  style={{ fontSize:'20px'}}

                        />
                    </div>
                    {status =='Ongoing' && 

                        <div style={{ marginBottom: '0'}} className="button-form">
                            <button className="btn btn-primary">&#10003; Confirm the plan</button>
                        </div>
                    }
                </form>
  )
}

export default GuidePlanForm
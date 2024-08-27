import React from "react";


function GeneralExamination({ handleInputChange }) {
  return (
    <div className="general-examination-container">
      <h4 style={{ textAlign: 'left', marginBottom: '10px' }}>General Examination</h4>
      <div style={{ display: 'flex', marginBottom: '1px' }}>
        <div style={{ flex: 1, paddingRight: '2px' }}>General Appearance</div>
        <div style={{ flex: 2 }}>
          <input type="text" style={{ width: '70%', padding: '2px' }} name="general_appearance" onChange={handleInputChange}/>
        </div>
      </div>
      <div style={{ display: 'flex', marginBottom: '1px' }}>
        <div style={{ flex: 1, paddingRight: '2px' }}>Vital Signs</div>
        <div style={{ flex: 2 }}>
          <input type="text" style={{ width: '70%', padding: '2px' }} name="vital_signs" onChange={handleInputChange}/>
        </div>
      </div>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1, paddingRight: '2px' }}>Other Signs</div>
        <div style={{ flex: 2 }}>
          <input type="text" style={{ width: '70%', padding: '2px' }} name="other_signs" onChange={handleInputChange} />
        </div>
      </div>
    </div>
  );
}


export default GeneralExamination;

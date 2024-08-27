import React from "react";


function EntExamination({ handleSave }) {
  return (
    <div className="ent-examination-container">
      <h4 style={{ textAlign: 'left', marginBottom: '10px' }}>ENT Examination</h4>
      <div style={{ display: 'flex', marginBottom: '1px' }}>
        <div style={{ flex: 1, paddingRight: '2px' }}>Ears Examination</div>
        <div style={{ flex: 2 }}>
          <input type="text" style={{ width: '70%', padding: '2px' }} name="ears_examination" onChange={handleSave} />
        </div>
      </div>
      <div style={{ display: 'flex', marginBottom: '1px' }}>
        <div style={{ flex: 1, paddingRight: '2px' }}>Nose Examination</div>
        <div style={{ flex: 2 }}>
          <input type="text" style={{ width: '70%', padding: '2px' }} name="nose_examination" onChange={handleSave}/>
        </div>
      </div>
      <div style={{ display: 'flex', marginBottom: '1px' }}>
        <div style={{ flex: 1, paddingRight: '2px' }}>Throat Examination</div>
        <div style={{ flex: 2 }}>
          <input type="text" style={{ width: '70%', padding: '2px' }} name="throat_examination" onChange={handleSave} />
        </div>
      </div>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1, paddingRight: '2px' }}>Neck Examination</div>
        <div style={{ flex: 2 }}>
          <input type="text" style={{ width: '70%', padding: '2px' }} name="neck_examination " onChange={handleSave}/>
        </div>
      </div>
    </div>
  );
}


export default EntExamination;

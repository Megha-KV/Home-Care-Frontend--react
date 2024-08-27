import React, { useEffect, useState } from "react";
import "./VitalSigns.css";
import { RxCross1 } from "react-icons/rx";
import { IoIosSave } from "react-icons/io";
// import { IoCloseCircle } from "react-icons/io5";
// import { IoMdRefresh } from "react-icons/io";
import { Navigate, useNavigate } from "react-router-dom";
import { createVital } from "../../api/VitalSigns";
import { useLocation } from "react-router-dom";
import NurseHeader from "../../components/Header/NurseHeader";

function VitalSigns() {
  const [data, setData] = useState({});
  const mrn = localStorage.getItem("mrn");
  const cid = localStorage.getItem("cid");
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const validateData = (data) => {
    const newErrors = {};
    // Validate each field as needed
    if (!data.height) {
      newErrors.height = "height is required";
    }
    if (!data.weight) {
      newErrors.weight = "weight is required";
    }
    if (!data.o2_saturation) {
      newErrors.o2_saturation = "o2 saturation is required";
    }
    if (!data.temp_note) {
      newErrors.temp_note = "temperature notes is required";
    }
    if (!data.pulse_note) {
      newErrors.pulse_note = "pulse notes is required";
    }
    if (!data.respiration) {
      newErrors.respiration = "respiration is required";
    }
    if (!data.bp_note) {
      newErrors.bp_note = "blood pressure note is required";
    }

    // Add validations for other fields as needed
    return newErrors;
  };

  useEffect(() => {
    console.log("CID from local storage:", cid);
  }, [cid]);

  const handleDataChange = (field, value) => {
    setData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
    console.log(data);
  };

  // Function to handle removal of data
  const handleRemove = () => {
    console.log("Remove button clicked");
    setData({}); // Clear the data object
  };

  const handleSave = async () => {
    const validationErrors = validateData(data);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({}); // Clear errors if validation passes
    try {
      data.mrn = mrn;
      data.cid = cid;
      const responseData = await createVital(data);
      console.log("POST Response:", responseData);
      navigate("/apie-note");
    } catch (error) {
      console.error("POST Error:", error);
    }
  };

  return (
    <>
      <NurseHeader />
      <div className="vital-container">
        <div className="vital-header">
          <label className="vital-labels" htmlFor="cid">
            CID:
          </label>
          <input
            className="vital-inputs"
            type="text"
            id="cid"
            value={cid || ""}
          />
          <br />
          <label className="vital-labels" htmlFor="mrn">
            MRN:
          </label>
          <input
            className="vital-inputs"
            type="text"
            id="mrn"
            value={mrn || ""}
            readOnly
          />

          <button className="button-vital" onClick={handleRemove}>
            <RxCross1 />
            Remove
          </button>
          <button className="button-vital" onClick={handleSave}>
            <IoIosSave />
            Save
          </button>
        </div>

        <div className="vital-subcontainer">
          <div className="health-info">
            <div className="health-details">
              <div style={{ position: "relative", marginBlock: "8px" }}>
                <div class="input-row">
                  <div
                    className="health-label"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <label for="height">Height:</label>
                    {/* <div style={{}}>
                    <input
                      className="details-input"
                      type="checkbox"
                      id="height-checkbox"
                      style={{ marginRight: "10px" }}
                    />
                    <span style={{}}>infant?</span>
                  </div> */}
                  </div>
                  <input
                    className="details-input"
                    type="text"
                    id="height"
                    name="height"
                    onChange={(e) => handleDataChange("height", e.target.value)}
                    value={data.height ? data.height : ""}
                  />
                </div>
                {errors.height && (
                  <p
                    className="error-message"
                    style={{ position: "relative", left: "43%" }}
                  >
                    {errors.height}
                  </p>
                )}
              </div>
              <div style={{ position: "relative", marginBlock: "8px" }}>
                <div class="input-row">
                  <label className="health-label" for="weight">
                    Weight:
                  </label>
                  <input
                    className="details-input"
                    type="text"
                    id="weight"
                    name="weight"
                    onChange={(e) => handleDataChange("weight", e.target.value)}
                    value={data.weight ? data.weight : ""}
                  />
                </div>
                {errors.weight && (
                  <p
                    className="error-message"
                    style={{ position: "relative", left: "43%" }}
                  >
                    {errors.weight}
                  </p>
                )}
              </div>

              <div class="input-row">
                <label className="health-label" for="bmi">
                  BMI:
                </label>
                <input
                  className="details-input"
                  type="text"
                  id="bmi"
                  name="bmi"
                  onChange={(e) => handleDataChange("bmi", e.target.value)}
                  value={data.bmi ? data.bmi : ""}
                />
              </div>

              <div class="input-row">
                <label className="health-label" for="rbs">
                  RBS,FBS:
                </label>
                <div style={{ width: "50%" }}>
                  <input
                    className="details-input"
                    type="text"
                    id="rbs"
                    name="rbs"
                    // style={{ width: "50%" }}
                    onChange={(e) => handleDataChange("rbs", e.target.value)}
                    value={data.rbs ? data.rbs : ""}
                  />
                  <input
                    className="details-input"
                    type="text"
                    id="fbs"
                    name="fbs"
                    // style={{ width: "50%" }}
                    onChange={(e) => handleDataChange("fbs", e.target.value)}
                    value={data.fbs ? data.fbs : ""}
                  />
                </div>
              </div>

              <div style={{ position: "relative", marginBlock: "8px" }}>
                <div class="input-row">
                  <label className="health-label" for="o2">
                    O2 Saturation:
                  </label>
                  <input
                    className="details-input"
                    type="text"
                    id="o2"
                    name="o2"
                    onChange={(e) =>
                      handleDataChange("o2_saturation", e.target.value)
                    }
                    value={data.o2_saturation ? data.o2_saturation : ""}
                  />
                </div>
                {errors.o2_saturation && (
                  <p
                    className="error-message"
                    style={{ position: "relative", left: "43%" }}
                  >
                    {errors.o2_saturation}
                  </p>
                )}
              </div>

              <div class="input-row">
                <label className="health-label" for="head-circum">
                  Head Circum:
                </label>
                <input
                  className="details-input"
                  type="text"
                  id="head-circum"
                  name="head-circum"
                  onChange={(e) =>
                    handleDataChange("head_circum", e.target.value)
                  }
                  value={data.head_circum ? data.head_circum : ""}
                />
              </div>
              <div class="input-row">
                <label className="health-label" for="chest-circum">
                  Chest Circum:
                </label>
                <input
                  className="details-input"
                  type="text"
                  id="chest-circum"
                  name="chest-circum"
                  onChange={(e) =>
                    handleDataChange("chest_circum", e.target.value)
                  }
                  value={data.chest_circum ? data.chest_circum : ""}
                />
              </div>

              <div class="input-row">
                <label className="health-label" for="waist-circum">
                  Waist Circum:
                </label>
                <input
                  className="details-input"
                  type="text"
                  id="waist-circum"
                  name="waist-circum"
                  onChange={(e) =>
                    handleDataChange("waist_circum", e.target.value)
                  }
                  value={data.waist_circum ? data.waist_circum : ""}
                />
              </div>

              <div class="input-row">
                <label className="health-label" for="hip-circum">
                  Hip Circumference:
                </label>
                <input
                  className="details-input"
                  type="text"
                  id="hip-circum"
                  name="hip-circum"
                  onChange={(e) =>
                    handleDataChange("hip_circum", e.target.value)
                  }
                  value={data.hip_circum ? data.hip_circum : ""}
                />
              </div>

              <div class="input-row">
                <label className="health-label" for="abdo-circum">
                  Abdominal Circumference:
                </label>
                <input
                  className="details-input"
                  type="text"
                  id="abdo-circum"
                  name="abdo-circum"
                  onChange={(e) =>
                    handleDataChange("abdo_circum", e.target.value)
                  }
                  value={data.abdo_circum ? data.abdo_circum : ""}
                />
              </div>

              <div class="input-row">
                <label className="health-label" for="pain-score">
                  Pain Score:
                </label>
                <input
                  className="details-input"
                  type="text"
                  id="pain-score"
                  name="pain-score"
                  // value={0}
                  onChange={(e) =>
                    handleDataChange("pain_score", e.target.value)
                  }
                  value={data.pain_score ? data.pain_score : ""}
                />
              </div>
            </div>

            <div className="vital-check">
              <div className="vital-signs-form">
                <div className="form-group-vital">
                  <div>
                    <div className="vital-labels">
                      <label
                        className="label label-right "
                        htmlFor="temperature"
                      >
                        Temperature
                      </label>
                      <label className="label" htmlFor="site">
                        Site
                      </label>
                    </div>
                    <div className="input-container-vital">
                      <input
                        type="text"
                        placeholder="Notes"
                        onChange={(e) =>
                          handleDataChange("temp_note", e.target.value)
                        }
                        value={data.temp_note ? data.temp_note : ""}
                      />

                      <input
                        type="text"
                        onChange={(e) =>
                          handleDataChange("temp_site", e.target.value)
                        }
                        value={data.temp_site ? data.temp_site : ""}
                      />
                    </div>
                    {errors.temp_note && (
                      <p className="error-message">{errors.temp_note}</p>
                    )}
                  </div>
                </div>

                <div className="form-group-vital">
                  <div>
                    <div className="vital-labels">
                      <label className="label label-right1" htmlFor="pulse">
                        Pulse
                      </label>
                      <label className="label" htmlFor="pulse">
                        Site
                      </label>
                    </div>
                    <div className="input-container-vital">
                      <input
                        type="text"
                        placeholder="Notes"
                        onChange={(e) =>
                          handleDataChange("pulse_note", e.target.value)
                        }
                        value={data.pulse_note ? data.pulse_note : ""}
                      />

                      <input
                        type="text"
                        onChange={(e) =>
                          handleDataChange("pulse_site", e.target.value)
                        }
                        value={data.pulse_site ? data.pulse_site : ""}
                      />
                    </div>
                    {errors.pulse_note && (
                      <p className="error-message">{errors.pulse_note}</p>
                    )}
                  </div>
                </div>

                <div className="form-group-vital">
                  <div>
                    <div className="vital-labels">
                      <label className="label" htmlFor="respiration">
                        Respiration
                      </label>
                    </div>
                    <div className="input-container-vital">
                      <input
                        type="text"
                        placeholder="Notes"
                        onChange={(e) =>
                          handleDataChange("respiration", e.target.value)
                        }
                        value={data.respiration ? data.respiration : ""}
                      />
                    </div>
                    {errors.respiration && (
                      <p className="error-message">{errors.respiration}</p>
                    )}
                  </div>
                </div>

                <div className="form-group-vital">
                  <div>
                    <div className="vital-labels">
                      <label
                        className="label label-right2"
                        htmlFor="bloodPressure"
                      >
                        Blood Pressure
                      </label>

                      <label className="label" htmlFor="site">
                        Site
                      </label>
                    </div>
                    <div className="input-container-vital">
                      <input
                        type="text"
                        placeholder="Notes"
                        onChange={(e) =>
                          handleDataChange("bp_note", e.target.value)
                        }
                        value={data.bp_note ? data.bp_note : ""}
                      />
                      <input type="text" />{" "}
                    </div>
                    {errors.bp_note && (
                      <p className="error-message">{errors.bp_note}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default VitalSigns;

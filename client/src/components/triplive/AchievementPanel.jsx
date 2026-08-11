import { useEffect, useState } from "react";

import {
  getAchievements,
  addAchievement,
  deleteAchievement,
} from "../../api/achievementApi";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function AchievementPanel() {

  const [achievements,setAchievements]=useState([]);

  const [show,setShow]=useState(false);

  const [title,setTitle]=useState("");

  const [location,setLocation]=useState("");

  const [description,setDescription]=useState("");

  const [date,setDate]=useState("");

  const user=JSON.parse(localStorage.getItem("user"));

  useEffect(()=>{

    loadAchievements();

  },[]);

  const loadAchievements=async()=>{

    const res=await getAchievements(user.id);

    setAchievements(res.data.achievements);

  };

  const saveAchievement=async()=>{

    await addAchievement({

      userId:user.id,

      title,

      location,

      description,

      achievedDate:date

    });

    setShow(false);

    setTitle("");

    setLocation("");

    setDescription("");

    setDate("");

    loadAchievements();

  };

  const removeAchievement=async(id)=>{

    if(!window.confirm("Delete Achievement?"))
      return;

    await deleteAchievement(id);

    loadAchievements();

  };

  return(

    <>

      <div className="achievement-header mb-3">

        <h4 className="fw-bold text-primary achievement-title">
            🏆 My Achievements
        </h4>
        <button
  
         className="btn btn-success achievement-add-btn"
          onClick={()=>setShow(true)}
        >
          ➕ Add Achievement
        </button>

      </div>

      {achievements.length===0 ?(

        <div className="alert alert-info">

          No Achievements Yet.

        </div>

      ):(
        achievements.map((item)=>(

          <div
            className="card mb-3 shadow-sm achievement-card"
            key={item.id}
          >

            <div className="card-body achievement-card-body">

              <h5>🏆 {item.title}</h5>

              <h6 className="text-muted">

                📍 {item.location}

              </h6>

              <small>

                📅 {new Date(item.achieved_date).toLocaleDateString()}

              </small>

              <p className="mt-2">

                {item.description}

              </p>

              <button
                className="btn btn-danger btn-sm"
                onClick={()=>
                  removeAchievement(item.id)
                }
              >
                🗑 Delete
              </button>

            </div>

          </div>

        ))
      )}

      <Modal
        show={show}
        onHide={()=>setShow(false)}
      >

        <Modal.Header closeButton>

          <Modal.Title>

            Add Achievement

          </Modal.Title>

        </Modal.Header>

        <Modal.Body>

          <Form>

            <Form.Group className="mb-3">

              <Form.Label>

                Title

              </Form.Label>

              <Form.Control

                value={title}

                onChange={(e)=>
                  setTitle(e.target.value)
                }

              />

            </Form.Group>

            <Form.Group className="mb-3">

              <Form.Label>

                Location

              </Form.Label>

              <Form.Control

                value={location}

                onChange={(e)=>
                  setLocation(e.target.value)
                }

              />

            </Form.Group>

            <Form.Group className="mb-3">

              <Form.Label>

                Date

              </Form.Label>

              <Form.Control

                type="date"

                value={date}

                onChange={(e)=>
                  setDate(e.target.value)
                }

              />

            </Form.Group>

            <Form.Group>

              <Form.Label>

                Description

              </Form.Label>

              <Form.Control

                as="textarea"

                rows={3}

                value={description}

                onChange={(e)=>
                  setDescription(e.target.value)
                }

              />

            </Form.Group>

          </Form>

        </Modal.Body>

        <Modal.Footer>

          <Button
            variant="secondary"
            onClick={()=>setShow(false)}
          >

            Cancel

          </Button>

          <Button
            variant="success"
            onClick={saveAchievement}
          >

            Save

          </Button>

        </Modal.Footer>

      </Modal>

    </>

  );

}

export default AchievementPanel;